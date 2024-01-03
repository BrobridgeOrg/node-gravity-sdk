const events = require('events');
const util = require('util');
const nats = require('nats');

const coreAPI = '$GVT.%s.API.CORE.%s'

module.exports = class Connection extends events.EventEmitter {

	constructor(opts = {}) {
		super();

		this.opts = opts;
		this.nc = null;
		this.isActive = false;
		this.isConnecting = false;
		this.reconnectTimer = null;
		this.states = {
			durable: '',
			permissions: []
		};
	}

	async _connect() {

		let opts = {
			servers: this.opts.servers,
			maxPingOut: this.opts.maxPingOut,
			maxReconnectAttempts: this.opts.maxReconnectAttempts,
			pingInterval: this.opts.pingInterval,
			reconnectTimeWait: this.opts.reconnectTimeWait
		};

		// Connecting to server
		this.nc = await nats.connect(opts);
		this.eventUpdater();
		
		try {
			// Authenticate with token
			await this.authenticate();
		} catch(e) {
			this.nc.close()
			throw e
		}
	}

	async connect() {
		await new Promise(async (resolve, reject) => {

			this.isConnecting = true;

			if (this.opts.waitOnFirstConnect) {

				while(this.isConnecting) {
					try {
						await this._connect();
						this.isActive = true;
						this.emit('connected');
						return resolve();
					} catch(e) {

						// Attempt to re-connect in few seconds
						await this.reconnectDelay();

						this.emit('reconnect', e);

						// Reconnect
						continue;
					}
				}

				return reject(new Error('Cancelled'));
			}

			// Connect to server directly
			try {
				await this._connect();
			} catch(e) {
				this.emit('disconnected');
				reject();
				return
			}

			this.isActive = true;
			this.emit('connected');
			resolve();
		});

		this.isConnecting = false;
	}

	reconnectDelay() {
		return new Promise((resolve) => {
			this.reconnectTimer = setTimeout(resolve, this.opts.reconnectTimeWait);
		});
	}

	async disconnect() {

		this.isConnecting = false;
		this.isActive = false;
		clearTimeout(this.reconnectTimer);

		if (!this.nc)
			return;

		await this.nc.close();
	}

	async eventUpdater() {

		for await (const s of this.nc.status()) {
			switch(s) {
			case nats.Events.DISCONNECT:
				this.emit('disconnect');
			case nats.Events.RECONNECT:
				this.emit('reconnect');
				this.initializeConnection();
			}
		}
	}

	async authenticate() {

		if (!this.opts.token) {

			this.states = {
				durable: '',
				permissions: []
			};

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
		this.states.durable = resp.durable;
		this.states.permissions = resp.permissions;
	}

	async initializeConnection() {

		try {
			// Authenticate with token
			await this.authenticate();
		} catch(e) {
			console.error(e);
			await this.disconnect();

			// reconnect
			await this.connect();
		}
	}

	getDomain() {
		return this.opts.domain;
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

		let resp = JSON.parse(sc.decode(msg.data))
		if (resp.error) {

			let err = new Error(resp.error.message);
			err.code = resp.error.code;

			throw err
		}

		return resp
	}

	jetstream() {
		return this.nc.jetstream();
	}

	getStates() {
		return this.states;
	}
};
