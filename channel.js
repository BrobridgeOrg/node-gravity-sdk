const events = require('events');

const Message = require('./message');
const Types = require('./types');
const MsgExpire = 10000;

module.exports = class Channel extends events.EventEmitter {

	constructor(sub, jsSub) {
		super();

		this.closed = false;
		this.sub = sub;
		this.jsSub = jsSub;
		this.msgs = [];
		this.cursor = -1;
		this.wipTimer = null;
		this.batchMode = true;
		this.eventCount = 0;
		this.isLastBatchReturned = false;
		this.lastBufferSize = 0;
		this.unChangedCount = 0;
		this.maxUnchangedCount = 3;
		this.batchSize = sub.batchSize;
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
		this.jsSub.unsubscribe();
	}

	pull(batch = 2000, expires = MsgExpire) {
		this.jsSub.pull({ batch: batch, expires: expires });
	}

	async fetch() {
		while(!this.closed) {
			console.log(this.msgs.length);
			let m = this.next();
			if (m != null) {
				return m;
			}

			// Delay
			await new Promise(resolve => setTimeout(resolve, 200));
		}

	}

	async batchFetch() {
		this.batchMode = true;
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
				return temp;
			}else if (this.msgs.length > 0 && this.msgs.length <  this.batchSize && !this.isLastBatchReturned){
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
					return temp
				}

				// let data = await new Promise(resolve => setTimeout(()=>{
				// 	console.log("timeout promise and msgs length:",this.msgs.length);
				// 	let temp = this.msgs;
				// 	this.clear();
				// 	resolve(temp)
				// }, 200));
				// return data;
				let temp = this.msgs;
				this.clear();
				return temp;
			}else{
				await new Promise(resolve => setTimeout(resolve, 200));
				return null;
			}
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
				if (this.batchMode){
					m.ack();
				}

				this.eventCount = this.sub.product.states.eventCount;
				continue;
			}

			// Update internal instance
			message.msg = m;
		}
	}
}
