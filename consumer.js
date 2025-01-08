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
        this.connectionClosed = true;
    }

    async unsubscribe() {
        try {
            this.iter.close();

            if (this.consumerName) {
                try {
                    if (this.connectionClosed) {
                        console.log("Connection is closed, trying to reconnect...");
                        await this.reinitialize();  // 重新建立連接
                    }

                    try {
                        await this.jsm.consumers.info(this.streamName, this.consumerName);
                        // 如果存在，則刪除
                        await this.jsm.consumers.delete(this.streamName, this.consumerName);
                        console.log(`Consumer ${this.consumerName} deleted from stream ${this.streamName}`);
                    } catch (infoError) {
                        console.log(`Consumer ${this.consumerName} might not exist:`, infoError.message);
                    }

                } catch (deleteError) {
                    if (deleteError.code === 'CONNECTION_CLOSED') {
                        console.error("Connection closed during delete operation");
                        this.connectionClosed = true;
                    } else {
                        console.error("Error deleting consumer:", deleteError);
                    }
                    throw deleteError;
                }
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            this.consumerName = "";

        } catch (error) {
            console.error("Unsubscribe error:", error);
            throw error;
        }
    }

    async fetch(batch, expires) {
        let maxtries = 3;
        try {
            if (!this.consumerName || this.connectionClosed) {
                await this.reinitialize();
                if (!this.consumerName) {
                    throw new Error("Consumer initialization failed");
                }
            }

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
                    // console.log(`Duplicate seq: ${msg.seq}, time since first appearance: ${timeDiff}ms`);
                    continue;
                }

                processedSeqs.set(msg.seq, now);
                // console.log(`Processing seq: ${msg.seq}, fetch progress: ${processedCount + 1}/${batch}`);

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
            // console.log(`Fetch complete: ${processedCount} messages in ${processingTime}ms`);

        } catch (error) {
            if (error instanceof Error &&(error.code === 'CONNECTION_CLOSED' ||error.message.includes('CONNECTION_CLOSED'))) {
                while(maxtries > 0){
                    this.connectionClosed = true;
                    console.log("Connection closed, trying to reinitialize...");
                    try {
                        await this.reinitialize();
                        maxtries--;
                        return this.fetch(batch, expires);
                    } catch (reinitializeError) {
                        console.log("reInitialize error:",reinitializeError);
                    }
                }

            }
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
        let retries = 3;
        let error;

        while (retries > 0) {
            try {
                let ci = await this.jsm.consumers.add(this.streamName, this.cOpts);
                this.consumerName = ci.name;
                this.connectionClosed = false;
                return;
            } catch (err) {
                error = err;
                if (err.code === 'CONNECTION_CLOSED') {
                    console.log(`Connection attempt failed, retries left: ${retries}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    retries--;
                } else {
                    throw err;
                }
            }
        }

        throw error || new Error("Failed to initialize after retries");
    }

    async reinitialize() {
        // 先清理舊的 consumer
        if(this.consumerName) {
            await this.unsubscribe();
        }

        // 重新創建 consumer
        await this.initialize();
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