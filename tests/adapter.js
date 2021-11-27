const Gravity = require('../');

process.on('SIGINT', () => process.exit(1));

let client = new Gravity.Client();

(async () => {

	try {
		console.log('Connecting...');
		await client.connect('0.0.0.0:32803');
	} catch(e) {
		console.log(e);
	}


	console.log('Initializing adapter...');

	let adapter = client.createAdapter({
		verbose: true,
	});

	try {
		console.log('Registering adapter...');
		await adapter.register('testing-adapter', 'node-testing-adapter', 'Node.js Adapter Testing');
	} catch(e) {
		console.log(e);
	}

	try {
		console.log('Publishing message...');
		await adapter.publish('accountCreated', JSON.stringify({
			'id': 99999,
			'name': 'Fred Chien',
		}));
	} catch(e) {
		console.log(e);
	}
})();
