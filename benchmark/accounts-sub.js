const gravity = require('../');

if (process.argv.length < 3) {
	console.log('require argument <count>');
	process.exit();
}

const client = new gravity.Client();

(async () => {
	await client.connect();
	console.log('Connected to NATS server', client.opts.servers);

	let count = process.argv[2];

	// Getting all products
	let products = await client.getProducts();
	//console.log(products);

	// Subscribe
	let product = await client.getProduct('accounts');
	let sub = await product.subscribe([]);

	let received = 0;
	let unit = Math.round(Number(count) / 1000);
	if (unit < 100) {
		unit = 100;
	}

	sub.on('event', (m) => {
		received++;
		m.ack();

		if (unit == 1 || (unit > 1 && received != 0 && received % unit == 0)) {
			console.log('receiving messages (', received, '/', count, ')');
		}

		if (received == count) {
			client.disconnect();
			process.exit();
		}
	});
})()
