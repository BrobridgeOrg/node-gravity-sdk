const Types = require('./types');

const Record = Types.compton.types.record.Record;

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
		let d = new Date(value.timestamp.seconds.low * 1000);
		d.setMilliseconds(value.timestamp.nanos / 1e6);
		return d;
	case Types.compton.types.record.DataType.NULL:
		return null;
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
