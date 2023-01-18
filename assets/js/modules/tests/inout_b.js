

class InOutB {


    constructor() {
        this._name = 'InOutB';
        this._id = Date.now();
    }

    getId() {
        return this._id;
    }
    
    getName() {
        return this._name;
    }
}

//Export the whole class so we just: const InOutB = require(...)
module.exports = InOutB;