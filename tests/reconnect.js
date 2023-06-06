const gravity = require('../');

const client = new gravity.Client({
	servers: 'localhost:31803',
	waitOnFirstConnect: true
});

(async () => {

	console.log('Connecting to NATS server', client.opts.servers);

	let retries = 0;
	client.on('reconnect', () => {
		console.log('Reconnecting');

		retries++;
		if (retries == 3)
			client.disconnect();
			
	});

	client.on('connected', () => {
		console.log('Connected');
	});

	try {
		await client.connect();
	} catch(e) {
		console.log(e);
	}
})()
