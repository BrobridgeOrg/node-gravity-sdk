class CosumerQueuedIteratorImpl {
    constructor() {
        // self-handled data queue
        this.queue = [];
        this.backup = [];
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

    async next() {
        try {
            // if there a message in queue，just return
            if (this.queue.length > 0) {
                this.processed++;
                return {
                    value: this.queue.shift(),
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

        if (this.resolvers.length > 0) {
            // if there's a waitting resolver, just pass it by the resolver
            const { resolve } = this.resolvers.shift();
            this.processed++;
            this.pending--;
            resolve({ value: msg, done: false });
        } else {
            // or push into the  queue
            this.queue.push(msg);
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

    open(){
        this.done = false;
    }

    addBackup(msg){
        this.backup.push(msg);
    }

    flushBackup(){
        this.backup = [];
    }



    // get information of the iterator
    getProcessed() { return this.processed; }
    getPending() { return this.pending; }
    getReceived() { return this.received; }
}


module.exports = CosumerQueuedIteratorImpl;