const events = require('events');

const Message = require('./message');
const Types = require('./types');

module.exports = class Channel extends events.EventEmitter {

	constructor(sub, jsSub) {
		super();

		this.closed = false;
		this.sub = sub;
		this.jsSub = jsSub;
		this.msgs = [];
		this.cursor = -1;
		this.wipTimer = null;
	}

	next() {
		if (this.msgs.length == 0) {
			return null;
		}

		if (this.cursor >= this.msgs.length - 1) {
			this.clear();
			return null;
		}

		this.cursor++;

		return this.msgs[this.cursor];
	}

	getMessage(seq) {

		for (let i in this.msgs) {
			let message = this.msgs[i];
			if (message.seq == seq) {
				return messsage;
			}
		}

		return null;
	}

  keepalive() {

    for (let cur = this.cursor + 1; cur < this.msgs.length; cur++) {
      let msg = this.msgs[cur];
      msg.keepalive();
    }

		this.wipTimer = setTimeout(() => {
			this.keepalive();
		}, 5000);
  }

	clear() {
		this.cursor = -1;
		this.msgs = [];
	}

	close() {
    clearTimeout(this.wipTimer);
		this.closed = true;
		this.jsSub.unsubscribe();
	}

	pull(batch = 2000, expires = 10000) {
		this.jsSub.pull({ batch: batch, expires: expires });
	}

	async fetch() {

		while(!this.closed) {

			let m = this.next();
			if (m != null) {
				return m;
			}

			// Delay
			await new Promise(resolve => setTimeout(resolve, 200));
		}

	}

	async poll() {

		while(!this.closed) {

			if (this.msgs.length == 0) {
				// pull new messages if no messages
				this.pull();
			}

			// Delay
			await new Promise(resolve => setTimeout(resolve, 200));
		}
	}

	async start() {

		this.poll().then(() => {
			this.emit('closed');
		});

    // Keepalive
    clearTimeout(this.wipTimer);
    this.keepalive();

		for await (const m of this.jsSub) {

			let message = this.getMessage(m.seq);
			if (message == null) {

				// Create a new message
				message = new Message()
				message.subscription = this.sub;
				message.channel = this;
				message.product = this.sub.product;
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

				// Push message to the list
				this.msgs.push(message);

				continue;
			}

			// Update internal instance
			message.msg = m;
		}
	}
}
