const events = require('events');

const Message = require('./message');
const Types = require('./types');
const MsgExpire = 10000;

module.exports = class Channel extends events.EventEmitter {

	constructor(sub, consumer) {
		super();

		this.closed = false;
		this.sub = sub;
		this.consumer = consumer;
		this.msgs = [];
		this.cursor = -1;
		this.wipTimer = null;
		this.batchMode = sub.batchMode;
		this.eventCount = 0;
		this.isLastBatchReturned = false;
		this.lastBufferSize = 0;
		this.unChangedCount = 0;
		this.maxUnchangedCount = 10;
		this.batchSize = Number(sub.batchSize);
		this.count = 0;
		this.empty=0;
		this.elseCnt = 0;
		this.retry = false;
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
				return message;
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
		this.lastBufferSize = 0;
		this.unChangedCount = 0;
	}

	close() {
    	clearTimeout(this.wipTimer);
		this.closed = true;
		this.consumer.unsubscribe();
	}

	enabledRetry(){
		this.retry = true;
	}

	disabledRetry(){
		this.retry = false;
	}

	async pull(batch = 1000, expires = MsgExpire) {
		// if(!this.batchMode){
		// 	batch = 1;
		// }
		this.consumer.fetch(batch,expires);
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

	async batchFetch() {
		console.log("batchSize:",this.batchSize,"msgsLength:",this.msgs.length);
		if(!this.closed) {
			if (this.msgs.length >= this.batchSize){
				if (this.cursor < 0){
					this.cursor = 0;
				}

				this.cursor = this.cursor + this.batchSize;
				// let temp = this.msgs.slice(this.cursor,Math.min(nextCursor, this.msgs.length));
				let temp = this.msgs.slice(0,this.batchSize);
				this.msgs = this.msgs.slice(this.batchSize);
				this.isLastBatchReturned = false;
				console.log("send and msgs length:",this.msgs.length);
				console.log("call send and isLastBatchReturned and length :",this.isLastBatchReturned,this.msgs.length);
				return temp;
			}
			else if (this.msgs.length > 0 && this.msgs.length <  this.batchSize && !this.isLastBatchReturned){
				if (this.msgs.length == this.lastBufferSize){
					this.unChangedCount++;
				}else{
					this.unChangedCount = 0;
				}

				this.lastBufferSize = this.msgs.length;

				if(this.unChangedCount >= this.maxUnchangedCount){
					this.isLastBatchReturned = true;
					let temp = this.msgs;
					this.clear();
					console.log("last send");
					return temp
				}
			}
			else{
				const now = new Date();
				console.log("promise: ",this.msgs.length, now.toISOString());
				await new Promise(resolve => setTimeout(resolve, 200));
				return null;
			}
		}
	}


	async poll() {

		while(!this.closed) {
			if (this.msgs.length == 0) {
				// pull new messages if no messages
				const now = new Date();
				console.log("polling...",now.toISOString());
				process.stdout.write("");
				if(this.retry){
					console.log("resend");
					await this.consumer.resend();
				}else{
					console.log("pulling");
					this.consumer.iter.flushBackup();
					await this.pull();
				}
			}

			// Delay
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

	async start() {

		this.poll().then(() => {
			this.emit('closed');
		});

    // Keepalive
    clearTimeout(this.wipTimer);
    this.keepalive();
		// for ack all use by the last message in iterator
		let lastMsg = null;

		try {
			for await (const m of this.consumer.iter) {
				this.count++;
				// console.log("execute count(seq=",m.seq,")","and count:",this.count);
				let date = new Date();
				// console.log("execute count(seq=",m.seq,")","and count:",this.count,date.toISOString());
				// console.log(`execute count(seq=%d):%d,m.seq,`);
				if (!m) {
					this.empty++;
					console.log("empty message:",this.empty);
					continue;  // 跳過空消息
				}
				let message = this.getMessage(m.seq);
				if (message == null) {
					lastMsg = m;

					// Create a new message
					message = new Message();
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

				}else{
					this.elseCnt++;
					console.log("else count:",this.elseCnt);
				}

				// Update internal instance
				message.msg = m;
				// this.msgs.push(message);
			}

		} catch (error) {
			console.error("Error processing messages:", error);
		}
	}
}
