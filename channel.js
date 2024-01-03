const events = require('events');

const Message = require('./message');
const Types = require('./types');

module.exports = class Channel extends events.EventEmitter {

	constructor(sub, jsSub) {
		super();

		this.sub = sub;
		this.jsSub = jsSub;
	}

	close() {
		this.jsSub.unsubscribe();
	}

	[Symbol.asyncIterator]() {

		let self = this;

		return {
			sub: (async function* () {
				for await (const m of self.jsSub) {
					yield m;
				}
			})(),
			async next() {
				let { value, done } = await this.sub.next();
				if (done)
					return { done: done };

				// Create a new message
				let m = value;
				let message = new Message()
				message.subscription = self.sub;
				message.channel = self;
				message.product = self.sub.product;
				message.subject = m.subject;
				message.msg = m;
				message.seq = m.seq;

				// Figure time
				let nano = message.msg.di.timestampNanos % 1000;
				let ts = Math.floor(message.msg.di.timestampNanos / 1000000);
				let d = new Date(ts);
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
}
