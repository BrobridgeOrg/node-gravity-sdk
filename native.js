const ffi = require('ffi-napi');
const path = require('path');
const os = require('os');

let methodDefinitions = {}
let gravity = null;

module.exports = {
	register: function(definitions = {}) {
		methodDefinitions = Object.assign(methodDefinitions, definitions);
	},
	getLibrary: function() {

		if (gravity === null) {

			// First time to load library
			let libPath = path.join(__dirname, 'native', 'gravity-sdk-' + os.platform() + '-' + os.arch());
			gravity = ffi.Library(libPath, methodDefinitions);
		}

		return gravity;
	},
};
