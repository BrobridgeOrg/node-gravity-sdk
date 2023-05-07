const gravity = require('../');

const client = new gravity.Client();

(async () => {
	await client.connect();
	console.log('Connected to NATS server', client.opts.servers);

	// Getting all products
	let products = await client.getProducts();
	console.log(products);

	// Getting information of specific product
	let product = await client.getProduct(products[0].name);

	console.log(product);
})()
