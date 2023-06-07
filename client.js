const events = require('events');
const util = require('util');
const nats = require('nats');

const Connection = require('./connection');
const Product = require('./product');
const ConfigStore = require('./config-store');

const domainEventSubject = '$GVT.%s.EVENT.%s'
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
			reconnectTimeWait: 3000,
			token: '',
			waitOnFirstConnect: false
		}, opts);
		this.conn = null;
	}

	async connect() {

		let conn = new Connection(this.opts);
		this.conn = conn;

		conn.on('connected', () => {
			this.emit('connected');
		});

		conn.on('disconnected', () => {
			this.emit('disconnected');
		});

		conn.on('reconnect', () => {
			this.emit('reconnect');
		});

		await conn.connect();
	}

	request(api, payload, headers = {}) {
		return this.conn.request(api, payload, headers);
	}

	async disconnect() {
		if (this.conn) {
			await this.conn.disconnect();
		}
	}

	getDomain() {
		return this.opts.domain;
	}

	getConnection() {
		return this.conn;
	}

	async publish(eventName, payload) {

		// Prparing subject
		let subject = util.format(domainEventSubject, this.getDomain(), eventName);

		let msg = JSON.stringify({
			event: eventName,
			payload: Buffer.from(payload).toString('base64'),
		});

		let js = this.conn.jetstream();
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

		return new Product(this, name, resp);
	}

	async getProducts() {

		// Preparing payload
		let api = util.format(productAPI, this.getDomain(), 'LIST');
		let payload = JSON.stringify({});

		// Sent request
		let resp = await this.request(api, payload);

		return resp.products.map((p) => {
			return new Product(this, p.setting.name, p);
		});
	}

	async deleteProduct(name) {

		// Preparing payload
		let api = util.format(productAPI, this.getDomain(), 'DELETE');
		let payload = JSON.stringify({
			name: name,
		});

		// Sent request
		let resp = await this.request(api, payload);
	}
}
