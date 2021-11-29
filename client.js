const events = require('events');
const ffi = require('ffi-napi');
const ref = require('ref-napi');
const StructType = require('ref-struct-napi');
const ArrayType = require('ref-array-napi')
const utils = require('./utils');
const Subscriber = require('./subscriber');
const Adapter = require('./adapter');
const nativeModule = require('./native');

// ClientOptions
const ClientOptions = StructType({
	appID: ref.types.CString,
	appKey: ref.types.CString,
	pingInterval: ref.types.longlong,
	maxPingsOutstanding: ref.types.int,
	maxReconnects: ref.types.int,
});

const ClientOptionsPtr = ref.refType(ClientOptions);

// Register methods
nativeModule.register({
	'NewClientOptions': [ ClientOptionsPtr, [] ],
	'NewClient': [ 'pointer', [] ],
	'ClientConnect': [ utils.ErrorPtr, [ 'pointer', ref.types.CString, ClientOptionsPtr ] ],
	'ClientDisconnect': [ 'void', [ 'pointer'] ],
	'ClientSetDisconnectHandler': [ 'void', [ 'pointer', 'pointer' ] ],
	'ClientSetReconnectHandler': [ 'void', [ 'pointer', 'pointer' ] ],
});

module.exports = class Client extends events.EventEmitter {

	constructor() {
		super();

		let gravity = nativeModule.getLibrary();

		this.instance = gravity.NewClient();
		this.loop = null;

		// Disconnect handler
		let disconnectHandler = ffi.Callback('void', [], () => {
			this.emit('disconnect');
		});

		gravity.ClientSetDisconnectHandler(this.instance, disconnectHandler);

		// Reconnect handler
		let reconnectHandler = ffi.Callback('void', [], () => {
			this.emit('reconnect');
		});

		gravity.ClientSetReconnectHandler(this.instance, reconnectHandler);
	}

	connect(host, opts = {}) {

		return new Promise((resolve, reject) => {

			let gravity = nativeModule.getLibrary();

			let cOpts = gravity.NewClientOptions().deref();

			Object.assign(cOpts, opts);

			gravity.ClientConnect.async(this.instance, host, cOpts.ref(), (err, res) => {
				if (!ref.isNull(res)) {
					return reject(res.deref());
				}

				this.loop = setInterval(() => {}, 10000);

				resolve();
			});
		});
	}

	disconnect() {
		return new Promise((resolve, reject) => {
			nativeModule.getLibrary().ClientDisconnect.async(this.instance, (err, res) => {
				clearTimeout(this.loop);
				this.loop = null;
				resolve();
			});
		});
	}

	createSubscriber(opts = {}) {
		return new Subscriber(this, opts);
	}

	createAdapter(opts = {}) {
		return new Adapter(this, opts);
	}
}
