class CosumerQueuedIteratorImpl {
    constructor() {
        // self-handled data queue
        this.queue = [];
        this.resolvers = [];
        this.done = false;
        this.error = null;
        this.processed = 0;
        this.received = 0;
        this.pending = 0;
    }

    [Symbol.asyncIterator]() {
        return {
            next: () => this.next()
        };
    }

    // close(){
    //     this.done = true;
    // }

    async next() {
        try {
            // console.log(`Next called: queue=${this.queue.length}, processed=${this.processed}, received=${this.received}`);
            // if there a message in queue，just return
            if (this.queue.length > 0) {
                this.processed++;
                let value = this.queue.shift();
                console.log("seq in next:",value.seq);
                return {
                    // value: this.queue.shift(),
                    value:value,
                    done: false
                };
            }

            // if it end, return done
            if (this.done) {
                return { value: undefined, done: true };
            }

            // if there's no message, just pass a resolve to make producer consume
            return new Promise((resolve) => {
                this.resolvers.push({resolve});
            });

        } catch (err) {
            this.error = err;
            throw err;
        }
    }

    push(msg) {
        if (this.done) {
            throw new Error("Iterator is closed");
        }

        this.received++;
        this.pending++;
        // console.log(`Queue status: length=${this.queue.length}, resolvers=${this.resolvers.length}`);

        // if (msg.done){
        //     this.done = true;
        // }

        if (this.resolvers.length > 0) {
            // if there's a waitting resolver, just pass it by the resolver
            const { resolve } = this.resolvers.shift();
            this.processed++;
            this.pending--;
            // resolve({ value: msg, done: msg.done });
            resolve({ value: msg, done: false });
            // console.log("Resolved directly to consumer");
        } else {
            // or push into the  queue
            this.queue.push(msg);
            // console.log("Pushed to queue:",this.received);
        }
    }

    close() {
        this.done = true;
        // solve all waitting promise
        while (this.resolvers.length > 0) {
            const { resolve } = this.resolvers.shift();
            resolve({ value: undefined, done: true });
        }
    }

    // get information of the iterator
    getProcessed() { return this.processed; }
    getPending() { return this.pending; }
    getReceived() { return this.received; }
}


module.exports = CosumerQueuedIteratorImpl;