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
	let sub = await product.subscribe([]);
	sub.on('event', (m) => {
		console.log(m.seq);
		console.log(m.data.record);

		setTimeout(() => {
			m.ack();
		}, 1000);
	});

	setTimeout(async () => {
		console.log('Attempt to unsubscribe');
		await sub.unsubscribe()
		console.log('Unsubscribed');
	}, 1000);

})()
