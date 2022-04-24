const events = require('events');
const util = require('util');
const nats = require('nats');

const Message = require('./message');
const Types = require('./types');

const productEventSubject = "$GVT.%s.DP.%s.%s.EVENT.>"

module.exports = class Subscription extends events.EventEmitter {

	constructor(product, ) {
		super();

		this.product = product || null;
		this.subscriptions = {};
	}

	async _fetch(partition, opts) {

		let js = this.product.client.nc.jetstream()

		if (partition <= 0) {
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
		cOpts.startSequence(opts.seq || 1);

		// Starting subscribe to data product
		let sub = await js.subscribe(subject, cOpts);

		let self = this;

		return {
			unsubscribe: () => {
				sub.unsubscribe();
			},
			[Symbol.asyncIterator]() {
				return {
					sub: (async function* () {
						for await (const m of sub) {

							// Create a new message
							let message = new Message()
							message.product = self.name;
							message.subject = m.subject;
							message.msg = m;
							message.seq = m.seq;

							yield message;
						}
					})(),
					async next() {
						let { value, done } = await this.sub.next();
						if (done)
							return { done: done };

						let message = value;

						// Figure time
						let nano = message.msg.di.timestampNanos % 1000;
						let d = new Date((message.msg.di.timestampNanos - nano) / 1000)
						message.time = d;
						message.timeNano = nano;

						// Convert data to JavaScript Object
						let pe = Types.gravity.sdk.types.product_event.ProductEvent.decode(message.msg.data);
						message.data = pe.toJSObject();

						return {
							value: message,
							done: false
						};
					},
					return() {
						return {
							done: true
						};
					}
				};
			}
		};
	}

	async subscribe(partition, opts) {

		let _opts = opts || {};
		let sub = await this._fetch(partition, _opts);
		this.subscriptions[partition] = sub;
		for await (const m of sub) {
			this.emit('event', m);
			await m.wait();
		}

		// Remove subscription from list
		delete this.subscriptions[partition];

		if (Object.keys(this.subscriptions).length == 0) {
			this.emit('unsubscribed');
		}
	}

	unsubscribe() {

		return new Promise((resolve) => {

			if (Object.keys(this.subscriptions).length == 0) {
				return resolve();
			}

			this.once('unsubscribed', () => {
				resolve();
			})

			Object.values(this.subscriptions).forEach((sub) => {
				sub.unsubscribe();
			})
		});
	}
}
