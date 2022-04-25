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

//		this.msg.ack();
		this.channel.ack(this);

		this.emit('ack');
	}

	wait() {
		return new Promise((resolve, reject) => {
			this.once('ack', resolve);
		})
	}
};
