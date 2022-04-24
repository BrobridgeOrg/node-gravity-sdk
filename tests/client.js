const gravity = require('../');

const client = new gravity.Client();

(async () => {
	await client.connect();
	console.log('Connected to NATS server', client.opts.servers);

	// Getting all products
	let products = await client.getProducts();
	//console.log(products);

	// Subscribe
	let product = await client.getProduct('accounts');
	product.on('event', (m) => {
		console.log(m.data.record);

		setTimeout(() => {
			m.ack();
		}, 1000);
	});
	product.subscribe();

	/*
	let sub = await product.subscribe();

	for await (const m of sub) {
		console.log(m.data.record);
		setTimeout(() => {
			m.ack();
		}, 1000);
		await m.wait()
	}
	*/
})()
