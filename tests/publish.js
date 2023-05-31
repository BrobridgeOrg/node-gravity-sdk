const gravity = require('../');

const client = new gravity.Client();

(async () => {
	await client.connect();
	console.log('Connected to NATS server', client.opts.servers);

	for (let i = 0; i < 1000; i++) {
		await client.publish('accountCreated', JSON.stringify({
			id: i+1,
			name: 'test'
		}));
		console.log('published new message');
	}

	client.disconnect();
//	process.exit();
})()
