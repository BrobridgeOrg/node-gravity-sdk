const gravity = require('../');

const client = new gravity.Client({
	servers: 'localhost:32803',
});

(async () => {
	console.log('Connecting to Gravity server', client.opts.servers);
	await client.connect();
	console.log('Connected to server', client.opts.servers);

	// Getting all products
	let products = await client.getProducts();
	//console.log(products);

	// Subscribe
	let product = await client.getProduct('accounts');
	let sub = await product.subscribe([], { delivery: 'all' });
	sub.on('event', (m) => {
		console.log(m.seq, m.data.record);
		m.ack();
	});
})()
