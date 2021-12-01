const events = require('events');
const ffi = require('ffi-napi');
const ref = require('ref-napi');
const utils = require('./utils');
const StructType = require('ref-struct-napi');
const nativeModule = require('./native');

// AdapterOptions
const AdapterOptions = StructType({
	endpoint: ref.types.CString,
	domain: ref.types.CString,
	batchSize: ref.types.int,
	appID: ref.types.CString,
	accessKey: ref.types.CString,
	verbose: ref.types.bool,
});

const AdapterOptionsPtr = ref.refType(AdapterOptions);

// Register methods
nativeModule.register({
	'NewAdapterOptions': [ AdapterOptionsPtr, [] ],
	'NewAdapterWithClient': [ 'pointer', [ 'pointer', AdapterOptionsPtr ] ],
	'AdapterRegister': [ utils.ErrorPtr, [ 'pointer', ref.types.CString, ref.types.CString, ref.types.CString ] ],
	'AdapterPublish': [ utils.ErrorPtr, [ 'pointer', ref.types.CString, ref.types.CString ] ],
});

module.exports = class Adapter extends events.EventEmitter {

	constructor(client, opts) {
		super();

		this.client = client;

		let gravity = nativeModule.getLibrary();

		// Getting default options
		let sOpts = gravity.NewAdapterOptions().deref();
		Object.assign(sOpts, opts);
		this.options = sOpts;

		// Initializing instance
		this.instance = gravity.NewAdapterWithClient(this.client.instance, sOpts.ref());
	}

	register(componentName, adapterID, adapterName) {

		return new Promise((resolve, reject) => {

			// Register
			let err = nativeModule.getLibrary().AdapterRegister.async(this.instance, componentName, adapterID, adapterName, (err, res) => {
				if (!ref.isNull(res)) {
					return reject(res.deref());
				}
			});

			resolve();
		});
	}

	publish(eventName, payload) {

		return new Promise((resolve, reject) => {

			// Register
			let err = nativeModule.getLibrary().AdapterPublish.async(this.instance, eventName, payload, (err, res) => {
				if (!ref.isNull(res)) {
					return reject(res.deref());
				}
			});

			resolve();
		});
	}
}
