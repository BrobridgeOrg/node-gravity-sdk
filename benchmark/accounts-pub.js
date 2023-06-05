const gravity = require('../');
const FakeDataGenerator = require('fake-data-generator-taiwan');

if (process.argv.length < 3) {
	console.log('require argument <count>');
	process.exit();
}

const client = new gravity.Client();

(async () => {
	let generator = new FakeDataGenerator();

	await client.connect();
	console.log('Connected to NATS server', client.opts.servers);

	let count = process.argv[2];

	for (let i = 0; i < count; i++) {

		await client.publish('accountCreated', JSON.stringify({
			id: i+1,
			name: generator.Name.generate(),
			type: '01',
			phone: generator.Mobile.generate(0, 10),
			address: generator.Address.generate(),
		}));

		if (i % 100 == 1)
			console.log('published 100 messages');
	}

	client.disconnect();
//	process.exit();
})()
