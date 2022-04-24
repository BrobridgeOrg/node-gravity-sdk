const events = require('events');
const nats = require('nats');

const Product = require('./product');
const ConfigStore = require('./config-store');

module.exports = class Client extends events.EventEmitter {

	constructor(opts = {}) {
		super();

		this.opts = Object.assign({
			servers: '0.0.0.0:32803',
			domain: 'default',
			maxPingOut: 3,
			maxReconnectAttempts: -1,
			pingInterval: 10000,
		}, opts);
		this.nc = null;
		this.store = new ConfigStore(this, 'PRODUCT');
	}

	async connect() {
		let opts = {
			servers: this.opts.servers,
			maxPingOut: this.opts.maxPingOut,
			maxReconnectAttempts: this.opts.maxReconnectAttempts,
			pingInterval: this.opts.pingInterval,
		};
		this.nc = await nats.connect(opts);
	}

	async disconnect() {
		if (!this.nc)
			return;

		await this.nc.close();
	}

	getDomain() {
		return this.opts.domain;
	}

	async getProduct(name) {

		let p = await this.store.get(name);
		if (!p)
			return null;

		let buf = Buffer.from(p.value);

		return new Product(this, name, JSON.parse(buf));
	}

	async getProducts() {

		// Getting products
		let keys = await this.store.keys()

		let products = await Promise.all(keys.map(async (key) => {
			let p = await this.store.get(key);
			let buf = Buffer.from(p.value);
			let product = new Product(this, key, JSON.parse(buf));
			return product;
		}))

		return products;
	}

	async deleteProduct(name) {
		await this.store.delete(name);
	}
}
