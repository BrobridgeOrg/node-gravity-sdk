const gravity = require('../');

const client = new gravity.Client({
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklEIjoiYzFkM2RiZDItYzZiMS0xMWVjLWJlYzUtYWNkZTQ4MDAxMTIyIiwiaXNzIjoiR3Jhdml0eSJ9.S_lewq7k_O7vgf5t0Z3riLiRZtZbvCaMjkkPzki8ZLg'
});

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
		m.ack();
	});

	setInterval(async () => {
		await client.publish('accountCreated', JSON.stringify({
			id: 1000,
			name: 'test'
		}));
		console.log('published new message');
	}, 1000);

})()
