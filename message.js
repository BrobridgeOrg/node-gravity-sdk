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
		if (!this.msg)
			return;

		clearInterval(this.wipTimer);

//		this.msg.ack();
		this.channel.ack(this);

		this.emit('ack');
	}

	wait() {

		this.wipTimer = setInterval(() => {

			if (this.msg.didAck)
				return;

			this.msg.working();

		}, 5000);

		return new Promise((resolve, reject) => {
			this.once('ack', resolve);
		})
	}
};
