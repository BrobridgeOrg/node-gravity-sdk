const Types = require('./types');

const ProductEvent = Types.gravity.sdk.types.product_event.ProductEvent;

ProductEvent.prototype.toJSObject = function() {

	let obj = Object.assign({}, this);

	obj.record = Types.gravity.sdk.types.record.Record.decode(this.data).toJSObject();

	return obj;
}
