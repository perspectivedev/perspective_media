
class JsonObject {
    constructor() { }

    getFields() {
        throw new Error('Override Required');
    }

    asJson() {
        return JsonEncoder.writeObject(this);
    }

    encodeJson(fields) {
        if (fields !== null) {
            let result = '';
            const len = fields.length;
            for (let i = 0, last = len - 1; i < len; i++) {
                const field = fields[i];
                const ft = typeof field;
                if (ft === 'string') {
                    const value = this[field];
                    if (value === undefined) {
                        throw new TypeError(`Failed to find field: ${field}`);
                    }
                    result += `"${field}":${JSON.stringify(value)}`;
                } else if (ft === 'object') {
                    const value = this[field.name];
                    if (value === undefined) {
                        throw new TypeError('Failed to find field:', field.name, this);
                    }
                    result += `"${field.name}":${JsonEncoder.writeObject(value)}`;
                }
                if (i !== last) {
                    result += ',';
                }
            }
            return `{${result}}`;
        }
        throw new TypeError('Fields is null');
    }

    decodeJson(json, fields) {
        if (!!json) {
            for (const field of fields) {
                // check if field is present in JSON
                const ftype = typeof field;
                if (typeof field === 'object') {
                    if (field['name'] !== undefined && field['type'] !== undefined) {
                        const Type = field.type;
                        if (Type._FIELDS_ === undefined) {
                            throw new TypeError('JsonObject Type is missing _FIELDS_:', field);
                        }
                        this[field.name] = JsonDecoder.readObject(json[field.name], Type);
                    } else {
                        throw new TypeError('JsonObject Field require name, and Type');
                    }
                } else if (typeof field === 'string') {
                    if (json[field] === undefined) {
                        console.log('JsonObject is missing field:', this, field);
                        return null;
                    }
                    // transfer json field
                    this[field] = json[field];
                } else {
                    throw new TypeError('Unhandled type:', ftype);
                }
            }
        }
        return this;
    }
}

class JsonEncoder {

    static writeArray(arr) {
        let result = '';
        if (Array.isArray(arr)) {
            const len = arr.length;
            for (let i = 0, last = len - 1; i < len; i++) {
                result += JsonEncoder.writeObject(arr[i]);
                if (i !== last) {
                    result += ',';
                }
            }
        }
        return `[${result}]`;
    }

    static writeObject(obj) {
        if (Array.isArray(obj)) {
            return JsonEncoder.writeArray(obj);
        }
        if (obj instanceof JsonObject) {
            return obj.encodeJson(obj.getFields());
        }
        return JSON.stringify(obj);
    }
}

class JsonDecoder {

    static readArray(json, Type) {
        if (!!json && !!Type) {
            const arr = [];
            for (const item of json) {
                arr.push(JsonDecoder.readObject(item, Type));
            }
            return arr;
        }
        throw new TypeError('Json or Type:', json, Type);
    }
    // Decode
    static readObject(value, Type) {
        let json = null;
        if (typeof value === 'string') {
            if (value === 'undefined') {
                return null;
            }
            json = JSON.parse(value);
        } else if (typeof value === 'object') {
            if (value === null) {
                return null;
            }
            json = value;
        } else {
            throw new TypeError('Value is not valid');
        }
        if (json !== null) {
            if (Array.isArray(json)) {
                return JsonDecoder.readArray(json, Type);
            }
            const obj = new Type();
            // Loop over the fields of the article class
            if (obj instanceof JsonObject) {
                obj.decodeJson(json, Type._FIELDS_);
                return obj;
            } else {
                console.log('Type is not of JsonObject:', obj);
            }

            // Woohoo, article passed JSON Validation!
            return obj;
        }
        return null;
    }
}

exports.JsonEncoder = JsonEncoder;
exports.JsonDecoder = JsonDecoder;
exports.JsonObject = JsonObject;

if (globalThis['process'] !== undefined) {

    class TestingChild extends JsonObject {
        static _FIELDS_ = [
            '_name',
            '_age',
        ];

        constructor(name, age) {
            super();
            if (arguments.length !== 0) {
                this._name = name;
                this._age = age;
            }
        }

        getFields() {
            return TestingChild._FIELDS_;
        }
    }

    class TestingParent extends JsonObject {
        static _FIELDS_ = [
            '_name',
            '_age',
            { name: '_children', type: TestingChild }
        ];

        constructor(name, age, ...children) {
            super();
            if (arguments.length !== 0) {
                this._name = name;
                this._age = age;
                this._children = children;
            }
        }

        getFields() {
            return TestingParent._FIELDS_;
        }
    }


    const childa = new TestingChild('Test A', 20);
    const childb = new TestingChild('Test B', 31);

    const parenta = new TestingParent('Test PA', 99, childa, childb);

    const obj = parenta;

    const _stringify = JSON.stringify(obj);

    const _encoder = obj.asJson();

    console.log('JSON:', _stringify);
    console.log('Encoder:', _encoder);
    console.log('Compare:', _stringify === _encoder);
    setTimeout(() => { }, 1000000);
}