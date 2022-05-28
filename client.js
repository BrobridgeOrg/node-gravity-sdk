const events = require('events');
const util = require('util');
const nats = require('nats');

const Product = require('./product');
const ConfigStore = require('./config-store');

const domainEventSubject = '$GVT.%s.EVENT.%s'
const coreAPI = '$GVT.%s.API.CORE.%s'
const productAPI = '$GVT.%s.API.PRODUCT.%s'

module.exports = class Client extends events.EventEmitter {

	constructor(opts = {}) {
		super();

		this.opts = Object.assign({
			servers: '0.0.0.0:32803',
			domain: 'default',
			maxPingOut: 3,
			maxReconnectAttempts: -1,
			pingInterval: 10000,
			token: '',
		}, opts);
		this.nc = null;
		//this.store = new ConfigStore(this, 'PRODUCT');

		this.connStates = {
			durable: '',
			permissions: []
		};
	}

	async connect() {
		let opts = {
			servers: this.opts.servers,
			maxPingOut: this.opts.maxPingOut,
			maxReconnectAttempts: this.opts.maxReconnectAttempts,
			pingInterval: this.opts.pingInterval,
		};
		this.nc = await nats.connect(opts);
		this.eventUpdater();

		// Authenticate with token
		await this.authenticate();
	}

	async request(api, payload, headers = {}) {

		// Preparing headers
		let h = nats.headers();
		if (this.opts.token) {
			h.set('Authorization', this.opts.token);
		}

		for (let k in headers) {
			h.set(k, headers[k]);
		}

		// Sent request
		let sc = nats.StringCodec();
		let msg = await this.nc.request(api, sc.encode(payload), { headers: h });

		return JSON.parse(sc.decode(msg.data))
	}

	async authenticate() {

		if (!this.opts.token) {
			return
		}

		// Preparing payload
		let api = util.format(coreAPI, this.getDomain(), 'AUTHENTICATE');
		let payload = JSON.stringify({
			token: this.opts.token,
		});

		// Sent request
		let resp = await this.request(api, payload);

		// Update connection states
		this.connStates.durable = resp.durable;
		this.connStates.permissions = resp.permissions;
	}

	async disconnect() {
		if (!this.nc)
			return;

		await this.nc.close();
	}

	async eventUpdater() {

		this.emit('connected');

		for await (const s of this.nc.status()) {
			switch(s) {
			case nats.Events.DISCONNECT:
				this.emit('disconnect');
			case nats.Events.RECONNECT:
				this.emit('reconnect');
			}
		}
	}

	getDomain() {
		return this.opts.domain;
	}

	getConnectionStates() {
		return this.connStates;
	}

	async publish(eventName, payload) {

		// Prparing subject
		let subject = util.format(domainEventSubject, this.getDomain(), eventName);

		let msg = JSON.stringify({
			event: eventName,
			payload: Buffer.from(payload).toString('base64'),
		});

		let js = this.nc.jetstream();
		let sc = nats.StringCodec();

		await js.publish(subject, sc.encode(msg));
	}

	async getProduct(name) {

		// Preparing payload
		let api = util.format(productAPI, this.getDomain(), 'INFO');
		let payload = JSON.stringify({
			name: name,
		});

		// Sent request
		let resp = await this.request(api, payload);

		return new Product(this, name, resp.setting);
/*
		let p = await this.store.get(name);
		if (!p)
			return null;

		let buf = Buffer.from(p.value);

		return new Product(this, name, JSON.parse(buf));
*/
	}

	async getProducts() {

		// Preparing payload
		let api = util.format(productAPI, this.getDomain(), 'LIST');
		let payload = JSON.stringify({});

		// Sent request
		let resp = await this.request(api, payload);

		return resp.products.map((p) => {
			return new Product(this, p.name, p);
		});
/*
		// Getting products
		let keys = await this.store.keys()

		let products = await Promise.all(keys.map(async (key) => {
			let p = await this.store.get(key);
			let buf = Buffer.from(p.value);
			let product = new Product(this, key, JSON.parse(buf));
			return product;
		}))

		return products;
		*/
	}

	async deleteProduct(name) {

		// Preparing payload
		let api = util.format(productAPI, this.getDomain(), 'DELETE');
		let payload = JSON.stringify({
			name: name,
		});

		// Sent request
		let resp = await this.request(api, payload);

//		await this.store.delete(name);
	}
}
