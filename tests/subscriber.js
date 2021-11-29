const Gravity = require('../');

let client = new Gravity.Client();
let subscriber;

process.on('SIGINT', async () => {
	await subscriber.stop();
	await client.disconnect();
	process.exit(1);
});

(async () => {

	try {
		console.log('Connecting...');
		await client.connect('0.0.0.0:32803');
	} catch(e) {
		console.log(e);
	}


	console.log('Initializing Subscriber...');

	subscriber = client.createSubscriber({
		verbose: true,
		initialLoad: {
			enabled: true,
		}
	});

	try {
		console.log('Registering Subscriber...');
		await subscriber.register('transmitter', 'testing', 'node-testing', 'Node.js Testing');
	} catch(e) {
		console.log(e);
	}

	console.log('Initializing event handlers...');
	subscriber.on('event', (msg) => {
		console.log('event', msg.eventName, msg.collection, msg.payload);
		msg.ack();
	});

	let count = 0;
	subscriber.on('snapshot', (msg) => {
//		console.log('snapshot', msg.collection, msg.payload);
		count++;
		console.log(count);
		msg.ack();
	});

	try {
		console.log('Subscribing to collections...');
		await subscriber.subscribeToCollections({
			"accounts": []
		});
	} catch(e) {
		console.log(e);
	}

	let pipelineCount = await subscriber.getPipelineCount();
	console.log('Getting pipelines count:', pipelineCount);

	try {
		console.log('Subscribing to pipelines...');
		await subscriber.addAllPipelines();
	} catch(e) {
		console.log(e);
	}

	console.log('Starting subscriber...');
	subscriber.start();
})();
