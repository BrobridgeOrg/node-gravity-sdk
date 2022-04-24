const events = require('events');
const util = require('util');

const Subscription = require('./subscription');

module.exports = class Product extends events.EventEmitter {

	constructor(client, name, settings = {}) {
		super();

		this.settings = Object.assign({
		}, settings);
		this.client = client;
		this.name = name;
	}

	async subscribe(partitions, opts) {

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
