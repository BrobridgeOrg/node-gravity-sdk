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
	let sent = 0;
	let unit = Math.round(Number(count) / 1000);
	if (unit < 100) {
		unit = 100;
	}

	for (let i = 0; i < count; i++) {

		await client.publish('accountCreated', JSON.stringify({
			id: i+1,
			name: generator.Name.generate(),
			type: '01',
			phone: generator.Mobile.generate(0, 10),
			address: generator.Address.generate(),
		}));

		sent++;

		if (unit == 1 || (unit > 1 && sent % unit == 0))
			console.log('publishing messages (', i+1, '/', count, ')');
	}

	client.disconnect();
//	process.exit();
})()
