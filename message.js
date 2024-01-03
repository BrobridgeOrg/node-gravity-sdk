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
		this.wipTimer = null;
	}

	ack() {

		clearTimeout(this.wipTimer);

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

		if (this.msg.didAck)
			return;

		this.wipTimer = setTimeout(() => {
			this.keepalive();
		}, 5000);
	}

	wait() {

		this.wipTimer = setTimeout(() => {
			this.keepalive();
		}, 5000);

		return new Promise((resolve, reject) => {
			this.once('ack', resolve);
		})
	}
};
