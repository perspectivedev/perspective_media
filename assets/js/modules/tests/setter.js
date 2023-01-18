const _KEY_ = '';

class Setters {
    _value = 'Look, I did it.';
    _arr = [];
    _obj = {
        0: 'string',
        1: [0,1 , 2, 3, 4, 5, 6, 7, 8, 9],
        2: true,
        3: Symbol(),
        4: null,
        5: undefined,
    }

    getType(key) {
        console.log(key);
        if (arguments.length !== 1) {
            return this.key;
        }
        console.log(key);
    }

    setType(key, value) {
        console.log(key, value);
        if (arguments.length !== 2) {
            this._key[value] = this._key[value];
        }
        console.log(key, value);
    }
}


const setters = new Setters();

const rndText = {
    greeting: 'Hello there',
    salutations: 'Bye bye',
    inquiry: 'How are you doing'
}
const key = 1
// setters.getType('name');
// setters.setType('name', 'Beau Currier');

// setters._obj['greeting'] = `Look ${name}, no hands!`;

setters.getType(setters._obj[key].push(10));

// console.log('Get test:', setters.getType(setters._obj[key]));
// console.log('Settter test:', setters.setType('name', 'Phoenix Knight'));



const arrConstruct = function () { 
    console.log('arrScope test:', name, storage);
    this.name = 0; 
    this.storage = {}; 
    
    
    
    this.push = function(value){
        this.storage[this.count] = value;
        this.count++;
        console.log('w/param/push test:', name, storage, count,  value);
    }


    this.pop = function(){
        if(this.count === 0){
            console.log('w/o params test:', name, storage, count, result);
            return undefined;
    }

    this.count--;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
}
}


arrConstruct.name;
arrConstruct.push;
arrConstruct.pop;
arrConstruct.count;
arrConstruct.storage;
arrConstruct.result;


console.log('arrConstruct test:', arrConstruct);
// setters._value = 'I think that I understand a bit more';
setTimeout(() => { }, 10000000);