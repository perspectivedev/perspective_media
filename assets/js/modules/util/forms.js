

class FormValue {
    static REGEX_NAME = /[a-z]{1,25}/i;
    static REGEX_USERNAME = /^[a-z]{3,}([0-9]+)?$/i;
    static REGEX_EMAIL = /[^@]+\w@[^@]/i;
    static REGEX_PASSWORD = /(?=.{8,}\W{1})/i;

    static NONE = 0;
    static NAME = 1;
    static USERNAME = 2;
    static EMAIL = 3;
    static PASSWORD = 4;

    constructor(id, name, vtype, node, nerr = null) {
        this._id = id;
        this._name = name;
        this._vtype = vtype;
        this._node = node;
        this._err = nerr;
        // Error support
    }

    getType() {
        return this._vtype;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    setError(message) {
        if (this.hasError()) {
            this._err.innerHTML = `<p class="err-msg">${message}</p>`;
        }
    }

    hasError() {
        return this._err !== null;
    }

    getValue() {
        return this._node.value;
    }

    isEmpty() {
        return this.getValue() === '';
    }
    reset() {
        this._node.value = null;
    }

    validate() {
        switch (this._vtype) {
            case FormValue.NONE: {
                return null;
            }
            case FormValue.NAME: {
                if (this.isEmpty()) {
                    return `Please enter your ${this.getName()}`;
                }
                if (FormValue.REGEX_NAME.test(this.getValue())) {
                    return null;
                }
                return 'Name is not Alphabetical or is not between 1 and 25 chars';
            }
            case FormValue.USERNAME: {
                if (this.isEmpty()) {
                    return `${this.getName()} cannot be empty`;
                }
                if (FormValue.REGEX_USERNAME.test(this.getValue())) {
                    return null;
                }
                return 'Username must be at least 2 letters, one digit, and one character';
            }

            case FormValue.EMAIL: {
                if (this.isEmpty()) {
                    return `${this.getName()} cannot be empty`;
                }
                if (FormValue.REGEX_EMAIL.test(this.getValue())) {
                    return null;
                }
                return `${this.getName()} must be valid`;
            }

            case FormValue.PASSWORD: {
                if (this.isEmpty()) {
                    return `${this.getName()} cannot be empty`;
                }
                if (FormValue.REGEX_PASSWORD.test(this.getValue())) {
                    return null;
                }
                return 'Password must be at least seven characters, example: abc123$';
            }
            default: {
                return 'Unhandled Validation Type';
            }
        }
    }
}

//   I think that I need to declare a variable that holds the values.

class Form {
    constructor(name, values) {
        this._name = name;
        this._values = values;
    }

    getName() {
        return this._name;
    }


    getFormValue(id) {
        const value = this._values[id];
        if (!value) {
            return null;
        }
        return value;
    }

    getFormValuesByType(type) {
        const found = [];
        for (const field of this.getFormValues()) {
            if (field.getType() === type) {
                found.push(field);
            }
        }
        return found;
    }

    validate() {
        let valid = true;
        for (const field of this.getFormValues()) {
            const error = field.validate();
            if (error !== null) {
                field.setError(error);
                valid = false;
            }
        }
        return valid;
    }

    getFormValues() {
        return Object.values(this._values);
    }



    // Should we include a helper method to reset the form fields across all forms?

    clearErrors() {
        for (const field of this.getFormValues()) {
            field.setError('');
        }
    }

    reset() {
        for (const field of this.getFormValues()) {
            field.reset();
        }
    }


}

class Forms {
    static INDEX = {};
    static REGISTER_FORM = 'Register';
    static getRegisterForm() {
        const stored = Forms.INDEX[Forms.REGISTER_FORM];
        if (stored) {
            return stored;
        }
        const fields = [
            { name: 'First Name', id: 'firstname', type: FormValue.NAME },
            { name: 'Last Name', id: 'lastname', type: FormValue.NAME },

            { name: 'User Name', id: 'username', type: FormValue.NAME },
            { name: 'Email', id: 'email', type: FormValue.EMAIL },

            { name: 'Password', id: 'password', type: FormValue.PASSWORD },
            { name: 'Confirm', id: 'confirm', type: FormValue.PASSWORD },

            { name: 'Newsletter', id: 'newsletter', type: FormValue.NONE },

        ];
        const form = Forms.getForm(Forms.REGISTER_FORM, fields);
        if (form === null) {
            return null;
        }
        Forms.INDEX[form.getName()] = form;
        return form;
    }

    static getForm(name, fields) {
        const values = {};
        for (const field of fields) {
            const node = document.getElementById(field.id);
            if (field.type !== FormValue.NONE) {
                const nerr = document.getElementById(`${field.id}-err`);
                if (node !== null && nerr !== null) {
                    values[field.id] = new FormValue(field.id, field.name, field.type, node, nerr);
                } else {
                    console.log('Form is missing:', field.id, node, 'err', nerr);
                    return null;
                }
            } else {
                if (node !== null) {
                    values[field.id] = new FormValue(field.id, field.name, field.type, node);
                } else {
                    console.log('Form is missing:', field.id, node);
                    return null;
                }
            }
        }
        // Form successfully found
        return new Form(name, values);
    }
}

exports.Forms = Forms;
exports.FormValue = FormValue;






