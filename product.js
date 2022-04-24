const events = require('events');
const util = require('util');
const nats = require('nats');

const Message = require('./message');
const Types = require('./types');

const productEventSubject = "$GVT.%s.DP.%s.%s.EVENT.>"

module.exports = class Product extends events.EventEmitter {

	constructor(client, name, settings = {}) {
		super();

		this.settings = Object.assign({
		}, settings);
		this.client = client;
		this.name = name;
		this.subscriptions = [];
	}

	async _fetch(partition) {

		let js = this.client.nc.jetstream()

		if (partition <= 0) {
			partition = '*';
		} else {
			partition = partition.toString();
		}

		// Preparing subject to subscribe to specific partition
		let subject = util.format(productEventSubject, this.client.getDomain(), this.name, partition);

		// Preparing subscription options
		let opts = nats.consumerOpts();
		opts.ackAll();
		opts.deliverTo(nats.createInbox());

		// Starting subscribe to data product
		let sub = await js.subscribe(subject, opts);

		let self = this;

		return {
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

	async _subscribe(partition) {
		let sub = await this._fetch(partition);
		for await (const m of sub) {
			this.emit('event', m);
			await m.wait();
		}
	}

	async subscribe(partitions) {

		if (!partitions) {
			partitions = [];
		}

		if (partitions.length == 0) {
			// Subscribe to all partitions
			this._subscribe(0);
			return;
		}

		// Subscribe to specific  partitions we need
		for (let index in partitions) {
			let partition = partitions[index];
			this._subscribe(partition);
		}
	}
}
