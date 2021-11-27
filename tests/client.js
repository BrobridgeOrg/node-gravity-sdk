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
})();
