const events = require('events');
const util = require('util');
const nats = require('nats');
module.exports = class Consumer extends events.EventEmitter {

    constructor(js,jsm,cOpts={},stream){
        super();

        this.streamName = stream;
        this.js = js;
        this.jsm = jsm;
        this.cOpts = cOpts;
        this.consumerName = "";
        this.count = 0;
        this.lastMsg = null;
        this.iter = new CosumerQueuedIteratorImpl();
    }

    async unsubscribe(){
        try {
            this.iter.close();
            await new Promise(resolve => setTimeout(resolve, 500));
            this.consumerName = "";
        } catch (error) {
                console.error("Unsubscribe error:", error);
        }
    }

    async fetch(batch,expires){
        try {
            let jsFetch =  await this.js.fetch(this.streamName,this.consumerName,{ batch: batch, expires: expires });
            for await (const msg of jsFetch) {
                this.iter.push(msg);
            }

        } catch (error) {
            console.error("fetch error:", error);
            throw error;
        }

    }

    async initialize(){
        try {
            if(this.consumerName){
                await this.unsubscribe();
            }

            await new Promise(resolve=>setTimeout(resolve,1000));
            let ci = await this.jsm.consumers.add(this.streamName,this.cOpts);
            this.consumerName = ci.name;
        } catch (error) {
            console.log("failed to initialize consumer: ",error);
            return error;
        }
    }

    async getStream(){
        try {
            let stream = await this.jsm.streams.info(this.streamName);
            console.log(stream);
        } catch (error) {
            console.log("failed to get stream: ",error);
            return error;
        }
    }

}

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

    // get information of the iterator
    getProcessed() { return this.processed; }
    getPending() { return this.pending; }
    getReceived() { return this.received; }
}