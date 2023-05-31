/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.gravity = (function() {

    /**
     * Namespace gravity.
     * @exports gravity
     * @namespace
     */
    var gravity = {};

    gravity.sdk = (function() {

        /**
         * Namespace sdk.
         * @memberof gravity
         * @namespace
         */
        var sdk = {};

        sdk.types = (function() {

            /**
             * Namespace types.
             * @memberof gravity.sdk
             * @namespace
             */
            var types = {};

            types.product_event = (function() {

                /**
                 * Namespace product_event.
                 * @memberof gravity.sdk.types
                 * @namespace
                 */
                var product_event = {};

                /**
                 * Method enum.
                 * @name gravity.sdk.types.product_event.Method
                 * @enum {number}
                 * @property {number} INSERT=0 INSERT value
                 * @property {number} UPDATE=1 UPDATE value
                 * @property {number} DELETE=2 DELETE value
                 * @property {number} TRUNCATE=3 TRUNCATE value
                 */
                product_event.Method = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "INSERT"] = 0;
                    values[valuesById[1] = "UPDATE"] = 1;
                    values[valuesById[2] = "DELETE"] = 2;
                    values[valuesById[3] = "TRUNCATE"] = 3;
                    return values;
                })();

                product_event.ProductEvent = (function() {

                    /**
                     * Properties of a ProductEvent.
                     * @memberof gravity.sdk.types.product_event
                     * @interface IProductEvent
                     * @property {string|null} [eventName] ProductEvent eventName
                     * @property {string|null} [table] ProductEvent table
                     * @property {gravity.sdk.types.product_event.Method|null} [method] ProductEvent method
                     * @property {Array.<string>|null} [primaryKeys] ProductEvent primaryKeys
                     * @property {Uint8Array|null} [primaryKey] ProductEvent primaryKey
                     * @property {Uint8Array|null} [data] ProductEvent data
                     */

                    /**
                     * Constructs a new ProductEvent.
                     * @memberof gravity.sdk.types.product_event
                     * @classdesc Represents a ProductEvent.
                     * @implements IProductEvent
                     * @constructor
                     * @param {gravity.sdk.types.product_event.IProductEvent=} [properties] Properties to set
                     */
                    function ProductEvent(properties) {
                        this.primaryKeys = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ProductEvent eventName.
                     * @member {string} eventName
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     */
                    ProductEvent.prototype.eventName = "";

                    /**
                     * ProductEvent table.
                     * @member {string} table
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     */
                    ProductEvent.prototype.table = "";

                    /**
                     * ProductEvent method.
                     * @member {gravity.sdk.types.product_event.Method} method
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     */
                    ProductEvent.prototype.method = 0;

                    /**
                     * ProductEvent primaryKeys.
                     * @member {Array.<string>} primaryKeys
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     */
                    ProductEvent.prototype.primaryKeys = $util.emptyArray;

                    /**
                     * ProductEvent primaryKey.
                     * @member {Uint8Array} primaryKey
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     */
                    ProductEvent.prototype.primaryKey = $util.newBuffer([]);

                    /**
                     * ProductEvent data.
                     * @member {Uint8Array} data
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     */
                    ProductEvent.prototype.data = $util.newBuffer([]);

                    /**
                     * Creates a new ProductEvent instance using the specified properties.
                     * @function create
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {gravity.sdk.types.product_event.IProductEvent=} [properties] Properties to set
                     * @returns {gravity.sdk.types.product_event.ProductEvent} ProductEvent instance
                     */
                    ProductEvent.create = function create(properties) {
                        return new ProductEvent(properties);
                    };

                    /**
                     * Encodes the specified ProductEvent message. Does not implicitly {@link gravity.sdk.types.product_event.ProductEvent.verify|verify} messages.
                     * @function encode
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {gravity.sdk.types.product_event.IProductEvent} message ProductEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProductEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.eventName != null && Object.hasOwnProperty.call(message, "eventName"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.eventName);
                        if (message.table != null && Object.hasOwnProperty.call(message, "table"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.table);
                        if (message.method != null && Object.hasOwnProperty.call(message, "method"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.method);
                        if (message.primaryKeys != null && message.primaryKeys.length)
                            for (var i = 0; i < message.primaryKeys.length; ++i)
                                writer.uint32(/* id 4, wireType 2 =*/34).string(message.primaryKeys[i]);
                        if (message.primaryKey != null && Object.hasOwnProperty.call(message, "primaryKey"))
                            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.primaryKey);
                        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.data);
                        return writer;
                    };

                    /**
                     * Encodes the specified ProductEvent message, length delimited. Does not implicitly {@link gravity.sdk.types.product_event.ProductEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {gravity.sdk.types.product_event.IProductEvent} message ProductEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProductEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ProductEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {gravity.sdk.types.product_event.ProductEvent} ProductEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProductEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gravity.sdk.types.product_event.ProductEvent();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.eventName = reader.string();
                                break;
                            case 2:
                                message.table = reader.string();
                                break;
                            case 3:
                                message.method = reader.int32();
                                break;
                            case 4:
                                if (!(message.primaryKeys && message.primaryKeys.length))
                                    message.primaryKeys = [];
                                message.primaryKeys.push(reader.string());
                                break;
                            case 5:
                                message.primaryKey = reader.bytes();
                                break;
                            case 6:
                                message.data = reader.bytes();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ProductEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {gravity.sdk.types.product_event.ProductEvent} ProductEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProductEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProductEvent message.
                     * @function verify
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProductEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.eventName != null && message.hasOwnProperty("eventName"))
                            if (!$util.isString(message.eventName))
                                return "eventName: string expected";
                        if (message.table != null && message.hasOwnProperty("table"))
                            if (!$util.isString(message.table))
                                return "table: string expected";
                        if (message.method != null && message.hasOwnProperty("method"))
                            switch (message.method) {
                            default:
                                return "method: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.primaryKeys != null && message.hasOwnProperty("primaryKeys")) {
                            if (!Array.isArray(message.primaryKeys))
                                return "primaryKeys: array expected";
                            for (var i = 0; i < message.primaryKeys.length; ++i)
                                if (!$util.isString(message.primaryKeys[i]))
                                    return "primaryKeys: string[] expected";
                        }
                        if (message.primaryKey != null && message.hasOwnProperty("primaryKey"))
                            if (!(message.primaryKey && typeof message.primaryKey.length === "number" || $util.isString(message.primaryKey)))
                                return "primaryKey: buffer expected";
                        if (message.data != null && message.hasOwnProperty("data"))
                            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                                return "data: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a ProductEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {gravity.sdk.types.product_event.ProductEvent} ProductEvent
                     */
                    ProductEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.gravity.sdk.types.product_event.ProductEvent)
                            return object;
                        var message = new $root.gravity.sdk.types.product_event.ProductEvent();
                        if (object.eventName != null)
                            message.eventName = String(object.eventName);
                        if (object.table != null)
                            message.table = String(object.table);
                        switch (object.method) {
                        case "INSERT":
                        case 0:
                            message.method = 0;
                            break;
                        case "UPDATE":
                        case 1:
                            message.method = 1;
                            break;
                        case "DELETE":
                        case 2:
                            message.method = 2;
                            break;
                        case "TRUNCATE":
                        case 3:
                            message.method = 3;
                            break;
                        }
                        if (object.primaryKeys) {
                            if (!Array.isArray(object.primaryKeys))
                                throw TypeError(".gravity.sdk.types.product_event.ProductEvent.primaryKeys: array expected");
                            message.primaryKeys = [];
                            for (var i = 0; i < object.primaryKeys.length; ++i)
                                message.primaryKeys[i] = String(object.primaryKeys[i]);
                        }
                        if (object.primaryKey != null)
                            if (typeof object.primaryKey === "string")
                                $util.base64.decode(object.primaryKey, message.primaryKey = $util.newBuffer($util.base64.length(object.primaryKey)), 0);
                            else if (object.primaryKey.length)
                                message.primaryKey = object.primaryKey;
                        if (object.data != null)
                            if (typeof object.data === "string")
                                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                            else if (object.data.length)
                                message.data = object.data;
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProductEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @static
                     * @param {gravity.sdk.types.product_event.ProductEvent} message ProductEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProductEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.primaryKeys = [];
                        if (options.defaults) {
                            object.eventName = "";
                            object.table = "";
                            object.method = options.enums === String ? "INSERT" : 0;
                            if (options.bytes === String)
                                object.primaryKey = "";
                            else {
                                object.primaryKey = [];
                                if (options.bytes !== Array)
                                    object.primaryKey = $util.newBuffer(object.primaryKey);
                            }
                            if (options.bytes === String)
                                object.data = "";
                            else {
                                object.data = [];
                                if (options.bytes !== Array)
                                    object.data = $util.newBuffer(object.data);
                            }
                        }
                        if (message.eventName != null && message.hasOwnProperty("eventName"))
                            object.eventName = message.eventName;
                        if (message.table != null && message.hasOwnProperty("table"))
                            object.table = message.table;
                        if (message.method != null && message.hasOwnProperty("method"))
                            object.method = options.enums === String ? $root.gravity.sdk.types.product_event.Method[message.method] : message.method;
                        if (message.primaryKeys && message.primaryKeys.length) {
                            object.primaryKeys = [];
                            for (var j = 0; j < message.primaryKeys.length; ++j)
                                object.primaryKeys[j] = message.primaryKeys[j];
                        }
                        if (message.primaryKey != null && message.hasOwnProperty("primaryKey"))
                            object.primaryKey = options.bytes === String ? $util.base64.encode(message.primaryKey, 0, message.primaryKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.primaryKey) : message.primaryKey;
                        if (message.data != null && message.hasOwnProperty("data"))
                            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                        return object;
                    };

                    /**
                     * Converts this ProductEvent to JSON.
                     * @function toJSON
                     * @memberof gravity.sdk.types.product_event.ProductEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProductEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return ProductEvent;
                })();

                return product_event;
            })();

            return types;
        })();

        return sdk;
    })();

    return gravity;
})();

$root.compton = (function() {

    /**
     * Namespace compton.
     * @exports compton
     * @namespace
     */
    var compton = {};

    compton.types = (function() {

        /**
         * Namespace types.
         * @memberof compton
         * @namespace
         */
        var types = {};

        types.record = (function() {

            /**
             * Namespace record.
             * @memberof compton.types
             * @namespace
             */
            var record = {};

            /**
             * DataType enum.
             * @name compton.types.record.DataType
             * @enum {number}
             * @property {number} BOOLEAN=0 BOOLEAN value
             * @property {number} BINARY=1 BINARY value
             * @property {number} STRING=2 STRING value
             * @property {number} UINT64=3 UINT64 value
             * @property {number} INT64=4 INT64 value
             * @property {number} FLOAT64=5 FLOAT64 value
             * @property {number} ARRAY=6 ARRAY value
             * @property {number} MAP=7 MAP value
             * @property {number} NULL=8 NULL value
             * @property {number} TIME=9 TIME value
             */
            record.DataType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "BOOLEAN"] = 0;
                values[valuesById[1] = "BINARY"] = 1;
                values[valuesById[2] = "STRING"] = 2;
                values[valuesById[3] = "UINT64"] = 3;
                values[valuesById[4] = "INT64"] = 4;
                values[valuesById[5] = "FLOAT64"] = 5;
                values[valuesById[6] = "ARRAY"] = 6;
                values[valuesById[7] = "MAP"] = 7;
                values[valuesById[8] = "NULL"] = 8;
                values[valuesById[9] = "TIME"] = 9;
                return values;
            })();

            record.Record = (function() {

                /**
                 * Properties of a Record.
                 * @memberof compton.types.record
                 * @interface IRecord
                 * @property {google.protobuf.IStruct|null} [meta] Record meta
                 * @property {compton.types.record.IValue|null} [payload] Record payload
                 */

                /**
                 * Constructs a new Record.
                 * @memberof compton.types.record
                 * @classdesc Represents a Record.
                 * @implements IRecord
                 * @constructor
                 * @param {compton.types.record.IRecord=} [properties] Properties to set
                 */
                function Record(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Record meta.
                 * @member {google.protobuf.IStruct|null|undefined} meta
                 * @memberof compton.types.record.Record
                 * @instance
                 */
                Record.prototype.meta = null;

                /**
                 * Record payload.
                 * @member {compton.types.record.IValue|null|undefined} payload
                 * @memberof compton.types.record.Record
                 * @instance
                 */
                Record.prototype.payload = null;

                /**
                 * Creates a new Record instance using the specified properties.
                 * @function create
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {compton.types.record.IRecord=} [properties] Properties to set
                 * @returns {compton.types.record.Record} Record instance
                 */
                Record.create = function create(properties) {
                    return new Record(properties);
                };

                /**
                 * Encodes the specified Record message. Does not implicitly {@link compton.types.record.Record.verify|verify} messages.
                 * @function encode
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {compton.types.record.IRecord} message Record message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Record.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.meta != null && Object.hasOwnProperty.call(message, "meta"))
                        $root.google.protobuf.Struct.encode(message.meta, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                        $root.compton.types.record.Value.encode(message.payload, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Record message, length delimited. Does not implicitly {@link compton.types.record.Record.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {compton.types.record.IRecord} message Record message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Record.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Record message from the specified reader or buffer.
                 * @function decode
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {compton.types.record.Record} Record
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Record.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.compton.types.record.Record();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.meta = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.payload = $root.compton.types.record.Value.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Record message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {compton.types.record.Record} Record
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Record.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Record message.
                 * @function verify
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Record.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.meta != null && message.hasOwnProperty("meta")) {
                        var error = $root.google.protobuf.Struct.verify(message.meta);
                        if (error)
                            return "meta." + error;
                    }
                    if (message.payload != null && message.hasOwnProperty("payload")) {
                        var error = $root.compton.types.record.Value.verify(message.payload);
                        if (error)
                            return "payload." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Record message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {compton.types.record.Record} Record
                 */
                Record.fromObject = function fromObject(object) {
                    if (object instanceof $root.compton.types.record.Record)
                        return object;
                    var message = new $root.compton.types.record.Record();
                    if (object.meta != null) {
                        if (typeof object.meta !== "object")
                            throw TypeError(".compton.types.record.Record.meta: object expected");
                        message.meta = $root.google.protobuf.Struct.fromObject(object.meta);
                    }
                    if (object.payload != null) {
                        if (typeof object.payload !== "object")
                            throw TypeError(".compton.types.record.Record.payload: object expected");
                        message.payload = $root.compton.types.record.Value.fromObject(object.payload);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Record message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof compton.types.record.Record
                 * @static
                 * @param {compton.types.record.Record} message Record
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Record.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.meta = null;
                        object.payload = null;
                    }
                    if (message.meta != null && message.hasOwnProperty("meta"))
                        object.meta = $root.google.protobuf.Struct.toObject(message.meta, options);
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        object.payload = $root.compton.types.record.Value.toObject(message.payload, options);
                    return object;
                };

                /**
                 * Converts this Record to JSON.
                 * @function toJSON
                 * @memberof compton.types.record.Record
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Record.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Record;
            })();

            record.Field = (function() {

                /**
                 * Properties of a Field.
                 * @memberof compton.types.record
                 * @interface IField
                 * @property {string|null} [name] Field name
                 * @property {compton.types.record.IValue|null} [value] Field value
                 */

                /**
                 * Constructs a new Field.
                 * @memberof compton.types.record
                 * @classdesc Represents a Field.
                 * @implements IField
                 * @constructor
                 * @param {compton.types.record.IField=} [properties] Properties to set
                 */
                function Field(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Field name.
                 * @member {string} name
                 * @memberof compton.types.record.Field
                 * @instance
                 */
                Field.prototype.name = "";

                /**
                 * Field value.
                 * @member {compton.types.record.IValue|null|undefined} value
                 * @memberof compton.types.record.Field
                 * @instance
                 */
                Field.prototype.value = null;

                /**
                 * Creates a new Field instance using the specified properties.
                 * @function create
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {compton.types.record.IField=} [properties] Properties to set
                 * @returns {compton.types.record.Field} Field instance
                 */
                Field.create = function create(properties) {
                    return new Field(properties);
                };

                /**
                 * Encodes the specified Field message. Does not implicitly {@link compton.types.record.Field.verify|verify} messages.
                 * @function encode
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {compton.types.record.IField} message Field message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Field.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                        $root.compton.types.record.Value.encode(message.value, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Field message, length delimited. Does not implicitly {@link compton.types.record.Field.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {compton.types.record.IField} message Field message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Field.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Field message from the specified reader or buffer.
                 * @function decode
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {compton.types.record.Field} Field
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Field.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.compton.types.record.Field();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 3:
                            message.value = $root.compton.types.record.Value.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Field message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {compton.types.record.Field} Field
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Field.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Field message.
                 * @function verify
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Field.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.value != null && message.hasOwnProperty("value")) {
                        var error = $root.compton.types.record.Value.verify(message.value);
                        if (error)
                            return "value." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Field message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {compton.types.record.Field} Field
                 */
                Field.fromObject = function fromObject(object) {
                    if (object instanceof $root.compton.types.record.Field)
                        return object;
                    var message = new $root.compton.types.record.Field();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.value != null) {
                        if (typeof object.value !== "object")
                            throw TypeError(".compton.types.record.Field.value: object expected");
                        message.value = $root.compton.types.record.Value.fromObject(object.value);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Field message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof compton.types.record.Field
                 * @static
                 * @param {compton.types.record.Field} message Field
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Field.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.value = null;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = $root.compton.types.record.Value.toObject(message.value, options);
                    return object;
                };

                /**
                 * Converts this Field to JSON.
                 * @function toJSON
                 * @memberof compton.types.record.Field
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Field.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Field;
            })();

            record.Value = (function() {

                /**
                 * Properties of a Value.
                 * @memberof compton.types.record
                 * @interface IValue
                 * @property {compton.types.record.DataType|null} [type] Value type
                 * @property {Uint8Array|null} [value] Value value
                 * @property {compton.types.record.IMapValue|null} [map] Value map
                 * @property {compton.types.record.IArrayValue|null} [array] Value array
                 * @property {google.protobuf.ITimestamp|null} [timestamp] Value timestamp
                 */

                /**
                 * Constructs a new Value.
                 * @memberof compton.types.record
                 * @classdesc Represents a Value.
                 * @implements IValue
                 * @constructor
                 * @param {compton.types.record.IValue=} [properties] Properties to set
                 */
                function Value(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Value type.
                 * @member {compton.types.record.DataType} type
                 * @memberof compton.types.record.Value
                 * @instance
                 */
                Value.prototype.type = 0;

                /**
                 * Value value.
                 * @member {Uint8Array} value
                 * @memberof compton.types.record.Value
                 * @instance
                 */
                Value.prototype.value = $util.newBuffer([]);

                /**
                 * Value map.
                 * @member {compton.types.record.IMapValue|null|undefined} map
                 * @memberof compton.types.record.Value
                 * @instance
                 */
                Value.prototype.map = null;

                /**
                 * Value array.
                 * @member {compton.types.record.IArrayValue|null|undefined} array
                 * @memberof compton.types.record.Value
                 * @instance
                 */
                Value.prototype.array = null;

                /**
                 * Value timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof compton.types.record.Value
                 * @instance
                 */
                Value.prototype.timestamp = null;

                /**
                 * Creates a new Value instance using the specified properties.
                 * @function create
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {compton.types.record.IValue=} [properties] Properties to set
                 * @returns {compton.types.record.Value} Value instance
                 */
                Value.create = function create(properties) {
                    return new Value(properties);
                };

                /**
                 * Encodes the specified Value message. Does not implicitly {@link compton.types.record.Value.verify|verify} messages.
                 * @function encode
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {compton.types.record.IValue} message Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Value.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                    if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                        $root.compton.types.record.MapValue.encode(message.map, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.array != null && Object.hasOwnProperty.call(message, "array"))
                        $root.compton.types.record.ArrayValue.encode(message.array, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Value message, length delimited. Does not implicitly {@link compton.types.record.Value.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {compton.types.record.IValue} message Value message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Value.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Value message from the specified reader or buffer.
                 * @function decode
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {compton.types.record.Value} Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Value.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.compton.types.record.Value();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.type = reader.int32();
                            break;
                        case 2:
                            message.value = reader.bytes();
                            break;
                        case 3:
                            message.map = $root.compton.types.record.MapValue.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.array = $root.compton.types.record.ArrayValue.decode(reader, reader.uint32());
                            break;
                        case 5:
                            message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Value message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {compton.types.record.Value} Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Value.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Value message.
                 * @function verify
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Value.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            break;
                        }
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                            return "value: buffer expected";
                    if (message.map != null && message.hasOwnProperty("map")) {
                        var error = $root.compton.types.record.MapValue.verify(message.map);
                        if (error)
                            return "map." + error;
                    }
                    if (message.array != null && message.hasOwnProperty("array")) {
                        var error = $root.compton.types.record.ArrayValue.verify(message.array);
                        if (error)
                            return "array." + error;
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Value message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {compton.types.record.Value} Value
                 */
                Value.fromObject = function fromObject(object) {
                    if (object instanceof $root.compton.types.record.Value)
                        return object;
                    var message = new $root.compton.types.record.Value();
                    switch (object.type) {
                    case "BOOLEAN":
                    case 0:
                        message.type = 0;
                        break;
                    case "BINARY":
                    case 1:
                        message.type = 1;
                        break;
                    case "STRING":
                    case 2:
                        message.type = 2;
                        break;
                    case "UINT64":
                    case 3:
                        message.type = 3;
                        break;
                    case "INT64":
                    case 4:
                        message.type = 4;
                        break;
                    case "FLOAT64":
                    case 5:
                        message.type = 5;
                        break;
                    case "ARRAY":
                    case 6:
                        message.type = 6;
                        break;
                    case "MAP":
                    case 7:
                        message.type = 7;
                        break;
                    case "NULL":
                    case 8:
                        message.type = 8;
                        break;
                    case "TIME":
                    case 9:
                        message.type = 9;
                        break;
                    }
                    if (object.value != null)
                        if (typeof object.value === "string")
                            $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                        else if (object.value.length)
                            message.value = object.value;
                    if (object.map != null) {
                        if (typeof object.map !== "object")
                            throw TypeError(".compton.types.record.Value.map: object expected");
                        message.map = $root.compton.types.record.MapValue.fromObject(object.map);
                    }
                    if (object.array != null) {
                        if (typeof object.array !== "object")
                            throw TypeError(".compton.types.record.Value.array: object expected");
                        message.array = $root.compton.types.record.ArrayValue.fromObject(object.array);
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".compton.types.record.Value.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Value message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof compton.types.record.Value
                 * @static
                 * @param {compton.types.record.Value} message Value
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Value.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type = options.enums === String ? "BOOLEAN" : 0;
                        if (options.bytes === String)
                            object.value = "";
                        else {
                            object.value = [];
                            if (options.bytes !== Array)
                                object.value = $util.newBuffer(object.value);
                        }
                        object.map = null;
                        object.array = null;
                        object.timestamp = null;
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.compton.types.record.DataType[message.type] : message.type;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    if (message.map != null && message.hasOwnProperty("map"))
                        object.map = $root.compton.types.record.MapValue.toObject(message.map, options);
                    if (message.array != null && message.hasOwnProperty("array"))
                        object.array = $root.compton.types.record.ArrayValue.toObject(message.array, options);
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this Value to JSON.
                 * @function toJSON
                 * @memberof compton.types.record.Value
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Value.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Value;
            })();

            record.MapValue = (function() {

                /**
                 * Properties of a MapValue.
                 * @memberof compton.types.record
                 * @interface IMapValue
                 * @property {Array.<compton.types.record.IField>|null} [fields] MapValue fields
                 */

                /**
                 * Constructs a new MapValue.
                 * @memberof compton.types.record
                 * @classdesc Represents a MapValue.
                 * @implements IMapValue
                 * @constructor
                 * @param {compton.types.record.IMapValue=} [properties] Properties to set
                 */
                function MapValue(properties) {
                    this.fields = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * MapValue fields.
                 * @member {Array.<compton.types.record.IField>} fields
                 * @memberof compton.types.record.MapValue
                 * @instance
                 */
                MapValue.prototype.fields = $util.emptyArray;

                /**
                 * Creates a new MapValue instance using the specified properties.
                 * @function create
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {compton.types.record.IMapValue=} [properties] Properties to set
                 * @returns {compton.types.record.MapValue} MapValue instance
                 */
                MapValue.create = function create(properties) {
                    return new MapValue(properties);
                };

                /**
                 * Encodes the specified MapValue message. Does not implicitly {@link compton.types.record.MapValue.verify|verify} messages.
                 * @function encode
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {compton.types.record.IMapValue} message MapValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MapValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.fields != null && message.fields.length)
                        for (var i = 0; i < message.fields.length; ++i)
                            $root.compton.types.record.Field.encode(message.fields[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified MapValue message, length delimited. Does not implicitly {@link compton.types.record.MapValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {compton.types.record.IMapValue} message MapValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MapValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a MapValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {compton.types.record.MapValue} MapValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MapValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.compton.types.record.MapValue();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.fields && message.fields.length))
                                message.fields = [];
                            message.fields.push($root.compton.types.record.Field.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a MapValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {compton.types.record.MapValue} MapValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MapValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MapValue message.
                 * @function verify
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MapValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.fields != null && message.hasOwnProperty("fields")) {
                        if (!Array.isArray(message.fields))
                            return "fields: array expected";
                        for (var i = 0; i < message.fields.length; ++i) {
                            var error = $root.compton.types.record.Field.verify(message.fields[i]);
                            if (error)
                                return "fields." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a MapValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {compton.types.record.MapValue} MapValue
                 */
                MapValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.compton.types.record.MapValue)
                        return object;
                    var message = new $root.compton.types.record.MapValue();
                    if (object.fields) {
                        if (!Array.isArray(object.fields))
                            throw TypeError(".compton.types.record.MapValue.fields: array expected");
                        message.fields = [];
                        for (var i = 0; i < object.fields.length; ++i) {
                            if (typeof object.fields[i] !== "object")
                                throw TypeError(".compton.types.record.MapValue.fields: object expected");
                            message.fields[i] = $root.compton.types.record.Field.fromObject(object.fields[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a MapValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof compton.types.record.MapValue
                 * @static
                 * @param {compton.types.record.MapValue} message MapValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MapValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.fields = [];
                    if (message.fields && message.fields.length) {
                        object.fields = [];
                        for (var j = 0; j < message.fields.length; ++j)
                            object.fields[j] = $root.compton.types.record.Field.toObject(message.fields[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this MapValue to JSON.
                 * @function toJSON
                 * @memberof compton.types.record.MapValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MapValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return MapValue;
            })();

            record.ArrayValue = (function() {

                /**
                 * Properties of an ArrayValue.
                 * @memberof compton.types.record
                 * @interface IArrayValue
                 * @property {Array.<compton.types.record.IValue>|null} [elements] ArrayValue elements
                 */

                /**
                 * Constructs a new ArrayValue.
                 * @memberof compton.types.record
                 * @classdesc Represents an ArrayValue.
                 * @implements IArrayValue
                 * @constructor
                 * @param {compton.types.record.IArrayValue=} [properties] Properties to set
                 */
                function ArrayValue(properties) {
                    this.elements = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ArrayValue elements.
                 * @member {Array.<compton.types.record.IValue>} elements
                 * @memberof compton.types.record.ArrayValue
                 * @instance
                 */
                ArrayValue.prototype.elements = $util.emptyArray;

                /**
                 * Creates a new ArrayValue instance using the specified properties.
                 * @function create
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {compton.types.record.IArrayValue=} [properties] Properties to set
                 * @returns {compton.types.record.ArrayValue} ArrayValue instance
                 */
                ArrayValue.create = function create(properties) {
                    return new ArrayValue(properties);
                };

                /**
                 * Encodes the specified ArrayValue message. Does not implicitly {@link compton.types.record.ArrayValue.verify|verify} messages.
                 * @function encode
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {compton.types.record.IArrayValue} message ArrayValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ArrayValue.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.elements != null && message.elements.length)
                        for (var i = 0; i < message.elements.length; ++i)
                            $root.compton.types.record.Value.encode(message.elements[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ArrayValue message, length delimited. Does not implicitly {@link compton.types.record.ArrayValue.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {compton.types.record.IArrayValue} message ArrayValue message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ArrayValue.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ArrayValue message from the specified reader or buffer.
                 * @function decode
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {compton.types.record.ArrayValue} ArrayValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArrayValue.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.compton.types.record.ArrayValue();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.elements && message.elements.length))
                                message.elements = [];
                            message.elements.push($root.compton.types.record.Value.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an ArrayValue message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {compton.types.record.ArrayValue} ArrayValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArrayValue.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ArrayValue message.
                 * @function verify
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ArrayValue.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.elements != null && message.hasOwnProperty("elements")) {
                        if (!Array.isArray(message.elements))
                            return "elements: array expected";
                        for (var i = 0; i < message.elements.length; ++i) {
                            var error = $root.compton.types.record.Value.verify(message.elements[i]);
                            if (error)
                                return "elements." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an ArrayValue message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {compton.types.record.ArrayValue} ArrayValue
                 */
                ArrayValue.fromObject = function fromObject(object) {
                    if (object instanceof $root.compton.types.record.ArrayValue)
                        return object;
                    var message = new $root.compton.types.record.ArrayValue();
                    if (object.elements) {
                        if (!Array.isArray(object.elements))
                            throw TypeError(".compton.types.record.ArrayValue.elements: array expected");
                        message.elements = [];
                        for (var i = 0; i < object.elements.length; ++i) {
                            if (typeof object.elements[i] !== "object")
                                throw TypeError(".compton.types.record.ArrayValue.elements: object expected");
                            message.elements[i] = $root.compton.types.record.Value.fromObject(object.elements[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an ArrayValue message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof compton.types.record.ArrayValue
                 * @static
                 * @param {compton.types.record.ArrayValue} message ArrayValue
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ArrayValue.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.elements = [];
                    if (message.elements && message.elements.length) {
                        object.elements = [];
                        for (var j = 0; j < message.elements.length; ++j)
                            object.elements[j] = $root.compton.types.record.Value.toObject(message.elements[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this ArrayValue to JSON.
                 * @function toJSON
                 * @memberof compton.types.record.ArrayValue
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ArrayValue.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ArrayValue;
            })();

            return record;
        })();

        return types;
    })();

    return compton;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Struct = (function() {

            /**
             * Properties of a Struct.
             * @memberof google.protobuf
             * @interface IStruct
             * @property {Object.<string,google.protobuf.IValue>|null} [fields] Struct fields
             */

            /**
             * Constructs a new Struct.
             * @memberof google.protobuf
             * @classdesc Represents a Struct.
             * @implements IStruct
             * @constructor
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             */
            function Struct(properties) {
                this.fields = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Struct fields.
             * @member {Object.<string,google.protobuf.IValue>} fields
             * @memberof google.protobuf.Struct
             * @instance
             */
            Struct.prototype.fields = $util.emptyObject;

            /**
             * Creates a new Struct instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             * @returns {google.protobuf.Struct} Struct instance
             */
            Struct.create = function create(properties) {
                return new Struct(properties);
            };

            /**
             * Encodes the specified Struct message. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct} message Struct message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Struct.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.fields != null && Object.hasOwnProperty.call(message, "fields"))
                    for (var keys = Object.keys(message.fields), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.google.protobuf.Value.encode(message.fields[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified Struct message, length delimited. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct} message Struct message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Struct.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Struct message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Struct
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Struct} Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Struct.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Struct(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (message.fields === $util.emptyObject)
                            message.fields = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.google.protobuf.Value.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.fields[key] = value;
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Struct message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Struct
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Struct} Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Struct.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Struct message.
             * @function verify
             * @memberof google.protobuf.Struct
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Struct.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.fields != null && message.hasOwnProperty("fields")) {
                    if (!$util.isObject(message.fields))
                        return "fields: object expected";
                    var key = Object.keys(message.fields);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.google.protobuf.Value.verify(message.fields[key[i]]);
                        if (error)
                            return "fields." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Struct message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Struct
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Struct} Struct
             */
            Struct.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Struct)
                    return object;
                var message = new $root.google.protobuf.Struct();
                if (object.fields) {
                    if (typeof object.fields !== "object")
                        throw TypeError(".google.protobuf.Struct.fields: object expected");
                    message.fields = {};
                    for (var keys = Object.keys(object.fields), i = 0; i < keys.length; ++i) {
                        if (typeof object.fields[keys[i]] !== "object")
                            throw TypeError(".google.protobuf.Struct.fields: object expected");
                        message.fields[keys[i]] = $root.google.protobuf.Value.fromObject(object.fields[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Struct message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.Struct} message Struct
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Struct.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.fields = {};
                var keys2;
                if (message.fields && (keys2 = Object.keys(message.fields)).length) {
                    object.fields = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.fields[keys2[j]] = $root.google.protobuf.Value.toObject(message.fields[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this Struct to JSON.
             * @function toJSON
             * @memberof google.protobuf.Struct
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Struct.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Struct;
        })();

        protobuf.Value = (function() {

            /**
             * Properties of a Value.
             * @memberof google.protobuf
             * @interface IValue
             * @property {google.protobuf.NullValue|null} [nullValue] Value nullValue
             * @property {number|null} [numberValue] Value numberValue
             * @property {string|null} [stringValue] Value stringValue
             * @property {boolean|null} [boolValue] Value boolValue
             * @property {google.protobuf.IStruct|null} [structValue] Value structValue
             * @property {google.protobuf.IListValue|null} [listValue] Value listValue
             */

            /**
             * Constructs a new Value.
             * @memberof google.protobuf
             * @classdesc Represents a Value.
             * @implements IValue
             * @constructor
             * @param {google.protobuf.IValue=} [properties] Properties to set
             */
            function Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Value nullValue.
             * @member {google.protobuf.NullValue|null|undefined} nullValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.nullValue = null;

            /**
             * Value numberValue.
             * @member {number|null|undefined} numberValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.numberValue = null;

            /**
             * Value stringValue.
             * @member {string|null|undefined} stringValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.stringValue = null;

            /**
             * Value boolValue.
             * @member {boolean|null|undefined} boolValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.boolValue = null;

            /**
             * Value structValue.
             * @member {google.protobuf.IStruct|null|undefined} structValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.structValue = null;

            /**
             * Value listValue.
             * @member {google.protobuf.IListValue|null|undefined} listValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.listValue = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Value kind.
             * @member {"nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue"|undefined} kind
             * @memberof google.protobuf.Value
             * @instance
             */
            Object.defineProperty(Value.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue=} [properties] Properties to set
             * @returns {google.protobuf.Value} Value instance
             */
            Value.create = function create(properties) {
                return new Value(properties);
            };

            /**
             * Encodes the specified Value message. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.nullValue != null && Object.hasOwnProperty.call(message, "nullValue"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nullValue);
                if (message.numberValue != null && Object.hasOwnProperty.call(message, "numberValue"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.numberValue);
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.stringValue);
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolValue);
                if (message.structValue != null && Object.hasOwnProperty.call(message, "structValue"))
                    $root.google.protobuf.Struct.encode(message.structValue, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.listValue != null && Object.hasOwnProperty.call(message, "listValue"))
                    $root.google.protobuf.ListValue.encode(message.listValue, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.nullValue = reader.int32();
                        break;
                    case 2:
                        message.numberValue = reader.double();
                        break;
                    case 3:
                        message.stringValue = reader.string();
                        break;
                    case 4:
                        message.boolValue = reader.bool();
                        break;
                    case 5:
                        message.structValue = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.listValue = $root.google.protobuf.ListValue.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Value message.
             * @function verify
             * @memberof google.protobuf.Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                    properties.kind = 1;
                    switch (message.nullValue) {
                    default:
                        return "nullValue: enum value expected";
                    case 0:
                        break;
                    }
                }
                if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (typeof message.numberValue !== "number")
                        return "numberValue: number expected";
                }
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (!$util.isString(message.stringValue))
                        return "stringValue: string expected";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (typeof message.boolValue !== "boolean")
                        return "boolValue: boolean expected";
                }
                if (message.structValue != null && message.hasOwnProperty("structValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Struct.verify(message.structValue);
                        if (error)
                            return "structValue." + error;
                    }
                }
                if (message.listValue != null && message.hasOwnProperty("listValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.ListValue.verify(message.listValue);
                        if (error)
                            return "listValue." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Value} Value
             */
            Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Value)
                    return object;
                var message = new $root.google.protobuf.Value();
                switch (object.nullValue) {
                case "NULL_VALUE":
                case 0:
                    message.nullValue = 0;
                    break;
                }
                if (object.numberValue != null)
                    message.numberValue = Number(object.numberValue);
                if (object.stringValue != null)
                    message.stringValue = String(object.stringValue);
                if (object.boolValue != null)
                    message.boolValue = Boolean(object.boolValue);
                if (object.structValue != null) {
                    if (typeof object.structValue !== "object")
                        throw TypeError(".google.protobuf.Value.structValue: object expected");
                    message.structValue = $root.google.protobuf.Struct.fromObject(object.structValue);
                }
                if (object.listValue != null) {
                    if (typeof object.listValue !== "object")
                        throw TypeError(".google.protobuf.Value.listValue: object expected");
                    message.listValue = $root.google.protobuf.ListValue.fromObject(object.listValue);
                }
                return message;
            };

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.Value} message Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                    object.nullValue = options.enums === String ? $root.google.protobuf.NullValue[message.nullValue] : message.nullValue;
                    if (options.oneofs)
                        object.kind = "nullValue";
                }
                if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
                    object.numberValue = options.json && !isFinite(message.numberValue) ? String(message.numberValue) : message.numberValue;
                    if (options.oneofs)
                        object.kind = "numberValue";
                }
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs)
                        object.kind = "stringValue";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    object.boolValue = message.boolValue;
                    if (options.oneofs)
                        object.kind = "boolValue";
                }
                if (message.structValue != null && message.hasOwnProperty("structValue")) {
                    object.structValue = $root.google.protobuf.Struct.toObject(message.structValue, options);
                    if (options.oneofs)
                        object.kind = "structValue";
                }
                if (message.listValue != null && message.hasOwnProperty("listValue")) {
                    object.listValue = $root.google.protobuf.ListValue.toObject(message.listValue, options);
                    if (options.oneofs)
                        object.kind = "listValue";
                }
                return object;
            };

            /**
             * Converts this Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Value;
        })();

        /**
         * NullValue enum.
         * @name google.protobuf.NullValue
         * @enum {number}
         * @property {number} NULL_VALUE=0 NULL_VALUE value
         */
        protobuf.NullValue = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NULL_VALUE"] = 0;
            return values;
        })();

        protobuf.ListValue = (function() {

            /**
             * Properties of a ListValue.
             * @memberof google.protobuf
             * @interface IListValue
             * @property {Array.<google.protobuf.IValue>|null} [values] ListValue values
             */

            /**
             * Constructs a new ListValue.
             * @memberof google.protobuf
             * @classdesc Represents a ListValue.
             * @implements IListValue
             * @constructor
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             */
            function ListValue(properties) {
                this.values = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ListValue values.
             * @member {Array.<google.protobuf.IValue>} values
             * @memberof google.protobuf.ListValue
             * @instance
             */
            ListValue.prototype.values = $util.emptyArray;

            /**
             * Creates a new ListValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             * @returns {google.protobuf.ListValue} ListValue instance
             */
            ListValue.create = function create(properties) {
                return new ListValue(properties);
            };

            /**
             * Encodes the specified ListValue message. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue} message ListValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.values != null && message.values.length)
                    for (var i = 0; i < message.values.length; ++i)
                        $root.google.protobuf.Value.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ListValue message, length delimited. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue} message ListValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ListValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.ListValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ListValue} ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.ListValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.values && message.values.length))
                            message.values = [];
                        message.values.push($root.google.protobuf.Value.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ListValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.ListValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.ListValue} ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ListValue message.
             * @function verify
             * @memberof google.protobuf.ListValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ListValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                    if (!Array.isArray(message.values))
                        return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i) {
                        var error = $root.google.protobuf.Value.verify(message.values[i]);
                        if (error)
                            return "values." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ListValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ListValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ListValue} ListValue
             */
            ListValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.ListValue)
                    return object;
                var message = new $root.google.protobuf.ListValue();
                if (object.values) {
                    if (!Array.isArray(object.values))
                        throw TypeError(".google.protobuf.ListValue.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i) {
                        if (typeof object.values[i] !== "object")
                            throw TypeError(".google.protobuf.ListValue.values: object expected");
                        message.values[i] = $root.google.protobuf.Value.fromObject(object.values[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ListValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.ListValue} message ListValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ListValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.values = [];
                if (message.values && message.values.length) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                        object.values[j] = $root.google.protobuf.Value.toObject(message.values[j], options);
                }
                return object;
            };

            /**
             * Converts this ListValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.ListValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ListValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ListValue;
        })();

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
