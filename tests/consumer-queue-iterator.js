const consumerQueueIterator = require('../consumer-queue-iterator');

(async () => {
    const cq = new consumerQueueIterator();
    // const cq = new gravity.Client();
    let cnt = 10000;

   setTimeout(()=>{
    for (let i = 0; i < cnt; i++) {
        let msg = i;

        cq.push(msg);
    }

    cq.close();
   },3000);

   setTimeout(()=>{
    console.log("20s");
   },20000);

    console.log("======consume========");
    let i = 0;
    for await (const m of cq){
        i++;
        console.log("consume: ",m,"index:",i);
    }

    console.log("end");
    setTimeout(()=>{
        console.log("after end");
    },3000);
})()