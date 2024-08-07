const events = require('events');
const util = require('util');
const nats = require('nats');

const Channel = require('./channel');

const productEventSubject = "$GVT.%s.DP.%s.%s.EVENT.>"

module.exports = class Subscription extends events.EventEmitter {

	constructor(product) {
		super();

		this.product = product || null;
		this.channels = {};
	}

	async assertConsumer(consumerName, opts = {}) {

		let conn = this.product.client.getConnection();
		let js = conn.jetstream();

		if (!consumerName) {
			// Emphermeral consumer
		}

		const c = await js.consumers.get(this.product.settings.stream, consumerName);
	}

	async _fetch(partition, opts = {}) {

		let conn = this.product.client.getConnection();
		let js = conn.jetstream();

		if (partition < 0) {
			// Receiving from all partitions by default
			partition = '*';
		} else {
			partition = partition.toString();
		}

		// Preparing subject to subscribe to specific partition
		let subject = util.format(productEventSubject, this.product.client.getDomain(), this.product.name, partition);

		// Preparing subscription options
		let cOpts = nats.consumerOpts();
		//cOpts.deliverTo(nats.createInbox());
		cOpts.ackExplicit();
		cOpts.manualAck();
		cOpts.maxAckPending(2000);

		switch(opts.delivery) {
		case 'all':
			cOpts.startSequence(1);
			break;
		case 'startSeq':
			cOpts.startSequence(Number(opts.seq) || 1);
			break;
		default:
			cOpts.deliverNew();
			break;
		}

		let connStates = conn.getStates();

		// Set durable to use persistent consumer if token is enabled
		if (connStates.durable) {
			cOpts.durable(connStates.durable);
		}

		// Starting subscribe to data product
		//let sub = await js.subscribe(subject, cOpts);
		let sub = await js.pullSubscribe(subject, cOpts);

		// Preparing channel
		return new Channel(this, sub);
	}

	async subscribe(partition, opts = {}) {

		let _opts = Object.assign({
			deliver: 'new',
			seq: 0,
		}, opts)

		// Fetch messages
		let ch = await this._fetch(partition, _opts);
		this.channels[partition] = ch;

		ch.start();

		while(true) {

			try {
				let m = await ch.fetch();

				this.emit('event', m);

				// Wait for message to be acked
				await m.wait();
			} catch(e) {
				break;
			}
		}

		// Remove subscription from list
		delete this.channels[partition];

		if (Object.keys(this.channels).length == 0) {
			this.emit('unsubscribed');
		}
	}

	unsubscribe() {

		return new Promise((resolve) => {

			if (Object.keys(this.channels).length == 0) {
				return resolve();
			}

			this.once('unsubscribed', () => {
				resolve();
			})

			Object.values(this.channels).forEach((ch) => {
				ch.close();
			})
		});
	}
}
