const ref = require('ref-napi');
const StructType = require('ref-struct-napi');

const GravityError = StructType({
	message: ref.types.CString,
});

const GravityErrorPtr = ref.refType(GravityError);

module.exports = {
	Error: GravityError,
	ErrorPtr: GravityErrorPtr,
};
