const events = require('events');

module.exports = class ConfigStore extends events.EventEmitter {

	constructor(client, catalog = '', opts = {}) {
		super();

		if (!catalog)
			throw new Error('catalog is empty');

		this.client = client;
		this.opts = Object.assign({
			domain: 'default',
			catalog: catalog,
		}, opts);
	}

	getBucketName() {
		return 'GVT_' + this.opts.domain + '_' + this.opts.catalog;
	}

	async keys() {
		let js = this.client.nc.jetstream()

		const kv = await js.views.kv(this.getBucketName(), { history: 5 });

		let keys = await kv.keys();

		let values = [];
		for await (const k of keys) {
			values.push(k)
		}

		return values;
	}

	async get(key) {
		let js = this.client.nc.jetstream()

		const kv = await js.views.kv(this.getBucketName(), { history: 5 });

		return await kv.get(key);
	}

	async delete(key) {
		let js = this.client.nc.jetstream()

		const kv = await js.views.kv(this.getBucketName(), { history: 5 });

		return await kv.delete(key);
	}
}
