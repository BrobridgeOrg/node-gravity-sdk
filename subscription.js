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

	async _fetch(partition, opts = {}) {

		let js = this.product.client.conn.jetstream()

		if (partition <= 0) {
			// Receiving from all partitions by default
			partition = '*';
		} else {
			partition = partition.toString();
		}

		// Preparing subject to subscribe to specific partition
		let subject = util.format(productEventSubject, this.product.client.getDomain(), this.product.name, partition);

		// Preparing subscription options
		let cOpts = nats.consumerOpts();
		cOpts.ackAll();
		cOpts.deliverTo(nats.createInbox());

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

		let connStates = this.product.client.getConnectionStates();

		// Set durable to use persistent consumer if token is enabled
		if (connStates.durable) {
			cOpts.durable(connStates.durable);
		}

		// Starting subscribe to data product
		let sub = await js.subscribe(subject, cOpts);

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

		for await (const m of ch) {
			let task = m.wait();
			this.emit('event', m);
			await task;
			ch.ackPending = m;
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
