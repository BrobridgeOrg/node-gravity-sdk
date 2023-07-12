const Types = require('./types');

const Record = Types.compton.types.record.Record;

// Extend for nano seconds
Date.prototype.setNanoseconds = function(nanos) {

	if (nanos == 0 ) {
		this.setMilliseconds(0);
		this.nanos = 0;
		return;
	}

	this.setMilliseconds(nanos / 1e6);
	this.nanos = nanos % 1000000;
}

Date.prototype.getNanoseconds = function() {
	return this.nanos;
}

Date.prototype.toISOString	= function(digits) {

	let date = [
		String(this.getFullYear()).padStart(4, '0'),
		String(this.getMonth() + 1).padStart(2, '0'),
		String(this.getDate()).padStart(2, '0')
	].join('-');

	let time = [
		String(this.getHours()).padStart(2, '0'),
		String(this.getMinutes()).padStart(2, '0'),
		String(this.getSeconds()).padStart(2, '0')
	].join(':');

	// Specify digits
	let details = String(this.getMilliseconds()).padStart(3, '0');
	if (digits > 3) {

		if (digits > 9)
			digits = 9;

		// Using nano seconds if existing
		if (this.getNanoseconds() > 0) {

			let nanos = String(this.getNanoseconds()).padStart(6, '0');

			let nd = digits - 3;
			let low = nanos.substr(0, nd)

			details = details + low;
		}
	}

	return date + 'T' + time + '.' + details + 'Z';
}

function getMapValueObject(value) {
	return value.map.fields.reduce((data, field) => {
		data[field.name] = getValueObject(field.value);
		return data;
	}, {});
}

function getArrayValueObject(value) {
	return value.array.elements.map((element) => {
		return getValueObject(element);
	});
}

function getValueObject(value) {

	switch(value.type) {
	case Types.compton.types.record.DataType.MAP:
		return getMapValueObject(value)
	case Types.compton.types.record.DataType.ARRAY:
		return getArrayValueObject(value)
	case Types.compton.types.record.DataType.STRING:
		let buf = Buffer.from(value.value);
		return buf.toString();
	case Types.compton.types.record.DataType.UINT64:
	{
		// Somehow value is Uint8Array rather than Buffer so we convert it first
		let buf = Buffer.from(value.value);
		return (buf.readUInt32BE(0) << 8) + buf.readUInt32BE(4);
	}
	case Types.compton.types.record.DataType.INT64:
	{
		// Somehow value is Uint8Array rather than Buffer so we convert it first
		let buf = Buffer.from(value.value);
		return (buf.readUInt32BE(0) << 8) + buf.readUInt32BE(4);
	}
	case Types.compton.types.record.DataType.FLOAT64:
	{
		// Somehow value is Uint8Array rather than Buffer so we convert it first
		let buf = Buffer.from(value.value);
		return buf.readDoubleBE(0);
	}
	case Types.compton.types.record.DataType.BOOLEAN:
		return value.value[0] ? true : false;
	case Types.compton.types.record.DataType.TIME:
	{
		let d = new Date(value.timestamp.seconds.toNumber() * 1000 + new Date().getTimezoneOffset() * 60000);
		d.setNanoseconds(value.timestamp.nanos);
		return d;
	}
	case Types.compton.types.record.DataType.NULL:
		return null;
	case Types.compton.types.record.DataType.BINARY:
	{
		let buf = Buffer.from(value.value);
		return buf;
	}
	default:
		return value.value;
	}
}

Record.prototype.toJSObject = function() {

//	console.log(Types.compton.types.record.DataType)
//	console.log(this.payload)

	let v = getValueObject(this.payload);

	return v
}
