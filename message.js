const events = require('events');

module.exports = class Message extends events.EventEmitter {

	constructor() {
		super();

		this.subscription = null;
		this.channel = null;
		this.msg = null;
		this.seq = 0;
		this.subject = '';
		this.time = 0;
		this.timeNanos = 0;
		this.product = null;
		this.data = null;
	}

	ack() {

		if (!this.msg)
			return;

		this.msg.ack();

		this.emit('ack');
	}

	keepalive() {

		if (!this.msg)
			return;

		if (this.msg.didAck)
			return;

		this.msg.working();
	}

	wait() {
		return new Promise((resolve, reject) => {

			if (this.msg.didAck) {
				resolve();
				return;
			}

			this.once('ack', resolve);
		})
	}
};
