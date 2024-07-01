const events = require('events');
const util = require('util');
const nats = require('nats');

const Subscription = require('./subscription');

const productAPI = "$GVT.%s.API.PRODUCT.%s"

module.exports = class Product extends events.EventEmitter {

	constructor(client, name, info = {}) {
		super();

		this.settings = Object.assign({
		}, info.setting);
		this.states = Object.assign({
		}, info.state);
		this.client = client;
		this.name = name;
	}

	async subscribe(partitions, opts) {


		// Preparing subscription if token is given
		if (this.client.token) {

			let js = this.client.conn.jetstream()

			// Preparing payload
			let api = util.format(productAPI, this.client.getDomain(), "PREPARE_SUBSCRIPTION");
			let payload = JSON.stringify({
				product: this.name,
			});

			let resp = await this.client.request(api, payload);

			// Check response
			if (resp.error) {
				throw resp.error;
			}
		}

		if (!partitions) {
			partitions = [];
		}

		let sub = new Subscription(this);

		if (partitions.length == 0) {
			// Subscribe to all partitions
			sub.subscribe(0, opts || {});
			return sub;
		}

		// Subscribe to specific partitions we need
		for (let index in partitions) {
			let partition = partitions[index];
			sub.subscribe(partition, opts || {});
		}

		return sub;
	}
}
