const gravity = require('../');

const client = new gravity.Client();

(async () => {
	await client.connect();
	console.log('Connected to NATS server', client.opts.servers);

	// Subscribe
	let product = await client.getProduct('accounts');
	let sub = await product.subscribe([], { delivery: 'startSeq', seq: 110 });
	sub.on('event', (m) => {
		console.log(m.seq);
		console.log(m.data.record);
		m.ack();
	});
})()
