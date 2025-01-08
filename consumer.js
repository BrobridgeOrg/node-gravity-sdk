const events = require('events');
const util = require('util');
const nats = require('nats');
const consumerQueueIterator = require('./consumer-queue-iterator');
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
        this.iter = new consumerQueueIterator();
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

    async fetch(batch, expires) {
        try {
            const startTime = Date.now();
            let lastMsg = null;
            let processedCount = 0;
            const processedSeqs = new Map();  // 使用 Map 來追蹤每個序號的處理時間

            let jsFetch = await this.js.fetch(this.streamName, this.consumerName, {
                batch: batch,
                expires: expires
            });

            for await (const msg of jsFetch) {
                const now = Date.now();
                // duplicate data check
                if (processedSeqs.has(msg.seq)) {
                    const timeDiff = now - processedSeqs.get(msg.seq);
                    console.log(`Duplicate seq: ${msg.seq}, time since first appearance: ${timeDiff}ms`);
                    continue;
                }

                processedSeqs.set(msg.seq, now);
                console.log(`Processing seq: ${msg.seq}, fetch progress: ${processedCount + 1}/${batch}`);

                this.iter.push(msg);
                this.iter.addBackup(msg);
                processedCount++;
                lastMsg = msg;
            }

            // if (lastMsg && processedCount % 100 !== 0) {
            //     await lastMsg.ack();
            //     console.log("final ack");
            // }


            const processingTime = Date.now() - startTime;
            console.log(`Fetch complete: ${processedCount} messages in ${processingTime}ms`);

        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }

    async resend(){
        try {
            this.iter.backup.forEach(value => this.iter.push(value));
        } catch (error) {
            console.error("Resend error:", error);
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