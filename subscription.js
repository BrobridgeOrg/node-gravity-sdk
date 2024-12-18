const events = require('events');
const util = require('util');
const nats = require('nats');

const Channel = require('./channel');
const Consumer = require('./consumer');

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
		let jsm = await conn.nc.jetstreamManager()

		if (partition < 0) {
			// Receiving from all partitions by default
			partition = '*';
		} else {
			partition = partition.toString();
		}

		// Preparing subject to subscribe to specific partition
		let subject = util.format(productEventSubject, this.product.client.getDomain(), this.product.name, partition);

		// Preparing subscription options
		let cOpts = {
			"ack_policy":nats.AckPolicy.All,
			"max_ack_pending":2000,
			"max_deliver": 5,
			"filter_subject":subject,
			"replay_policy": 'original'
		};
		//cOpts.deliverTo(nats.createInbox());
		switch(opts.delivery) {
		case 'all':
			// cOpts.startSequence(1);
			cOpts.deliver_policy = nats.DeliverPolicy.StartSequence;
			cOpts.opt_start_seq = 1;
			break;
		case 'startSeq':
			// cOpts.startSequence(Number(opts.seq) || 1);
			cOpts.deliver_policy = nats.DeliverPolicy.StartSequence;
			cOpts.opt_start_seq = Number(opts.seq) || 1;
			break;
		default:
			// cOpts.deliverNew();
			cOpts.deliver_policy = nats.DeliverPolicy.New;
			break;
		}

		let connStates = conn.getStates();

		// Set durable to use persistent consumer if token is enabled
		if (connStates.durable) {
			cOpts.durable_name = connStates.durable;
		}

		// Create self-defined consumer for specified ack policy
		let consumer = new Consumer(js,jsm,cOpts,this.product.settings.stream);
		await consumer.initialize();

		this.batchSize = opts.batchSize;
		// Preparing channel
		return new Channel(this, consumer);
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

		while(!ch.closed) {
				let m;
				try {
					if(!opts.batchMode){
						m = await ch.fetch();
						if(m){
							this.emit('event', m);
							await m.wait();
						}else{
							console.log("No data available, waiting for new data...");
						}
					}else{
						m = await ch.batchFetch();
						if(m){
							if (m.constructor == Array && m.length > 0){
								console.log("seq from:",m[0].seq,"->",m[m.length-1].seq,"length:",m.length);
								this.emit('event', m);
								await m[m.length-1].wait();
							}
						}else{
							console.log("No data available, waiting for new batch data...");
						}
					}
				} catch(error) {
					console.log("subscribe error: ",error);
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
