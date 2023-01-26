const {
    Widget,
    Modal,
    OverlayModal,
    PasswordInput
} = require("assets/js/modules/widget.js");

const Consts = require('assets/js/modules/util/consts.js');

class ContactModal extends OverlayModal {


    constructor() {
        super({
            clazz: 'modal-login',
            id: 'contact-modal'
        });

        const content = new Widget('div', 'contact-modal-content');

        {
            //Header
            const header = new Widget('div', 'contact-modal-header');
            header.addChild(new Widget('p').setText('Contact us!'));
            const close = new Widget("span", 'close-contact-modal');
            close.setAttr('id', 'close-contact-modal-btn');
            close.setInnerHtml('&times;');
            close.on("click", super.hide.bind(this));
            header.addChild(close);
            content.addChild(header);
        }

        {
            //Info 
            const info = new Widget("div", 'contact-items');
            info.addChild(
                new Widget("p", 'company-number').setText(Consts.Company.NUMBER)
            );
            info.addChild(
                new Widget("p", 'company-email').setText(Consts.Company.EMAIL)
            );
            info.addChild(
                new Widget("p", "company-website").setText(Consts.Company.WEBSITE)
            );
            content.addChild(info);
        }
        {
            const footer = new Widget('div', 'contact-modal-footer');
            const f = new Widget('footer', 'modal-footer');

            f.addChild(
                new Widget('p', 'about-us').setInnerHtml(Consts.getCopyrightHtml())
            );
            footer.addChild(f);
            content.addChild(footer);
        }
        super.addChild(content);
    }
}

class FormInput {
    constructor(name, input, error) {
        this._name = name;
        this._input = input;
        this._error = error;
    }

    getName() {
        return this._name;
    }

    getValue() {
        return this._input.getNode().value;
    }

    clear() {
        this._input.getNode().value = null;
    }

    setError(error) {
        if (error === null) {
            this._error.setStyle({
                display: 'none'
            });
            error = '';
        } else {
            this._error.setStyle({
                display: 'block'
            });
        }
        this._error.setText(error);
    }

    clearError() {
        this._error.setText(null);
    }
}


class LoginModal extends OverlayModal {
    constructor() {
        super({
            clazz: 'modal-login',
            id: 'login-modal'
        });
        this._inputs = new Map();
        const modalContent = Widget.div('login-modal-content');
        {
            //header
            const header = Widget.div('login-modal-header');
            header.addChild(
                Widget.div().addChild(new Widget("p", "cta-msg").setText("Login!"))
            );
            header.addChild(
                new Widget('span', {
                    id: 'close-login-modal-btn',
                    clazz: 'close-login-modal',
                }).setInnerHtml('&times;').on('click', this.onClose.bind(this))
            );
            modalContent.addChild(header);
        } //end of header
        {//start of login form
            const form = new Widget('form', {
                clazz: 'login-form',
                id: 'login-form',
                attrs: {
                    name: 'login'
                }
            });
            const legend = Widget.div('login-form-legend');
            legend.setInnerHtml(`
        <legend class="legend-header"> 
            <img src="assets/images/perspective_logo.svg" class="login-logo" alt="logo">
        </legend>`);
            form.addChild(legend);

            function newInputRow(p, label, input, hasError = true) {
                let name = input.getAttr('name');
                if (input instanceof PasswordInput) {
                    name = input.getInput().getAttr('name');
                }

                const row = new Widget('div', 'login-row');
                const lbl = new Widget('label');
                lbl.setText(label);
                lbl.setAttr('for', name);

                row.addChild(lbl);
                row.addChild(input);
                let err = null;
                if (hasError) {
                    err = Widget.div({
                        id: name + '-err',
                        clazz: 'fill-row login-err'
                    });
                    err.setStyle({
                        display: 'none'
                    });
                    row.addChild(err);
                }

                p.addChild(row);

                if (input instanceof PasswordInput) {
                    input = input.getInput();
                }
                return new FormInput(name, input, err);
            }
            //
            const nUsername = 'username';
            const nPassword = 'password';
            //
            const username = Widget.input('text', {
                id: nUsername,
                clazz: 'dark-input',
                attrs: {
                    name: nUsername
                }
            });
            const password = new PasswordInput('vt-none', {
                id: nPassword,
                clazz: 'dark-input',
                attrs: {
                    name: nPassword
                }
            });

            //Inputs
            const inputRows = Widget.div('login-input-rows');
            const uinput = newInputRow(inputRows, 'Username:', username);
            const pinput = newInputRow(inputRows, 'Password:', password);

            console.log('Modal:', uinput, pinput);

            //Register inputs into the Modal.inputs map
            this._inputs.set(nUsername, uinput);
            this._inputs.set(nPassword, pinput);



            const submitSection = Widget.div('login-row login-btn-row ');
            //Submit Button
            const submitBtn = new Widget('button', 'login-btn fill-row');
            submitBtn.setText('Login!');
            submitBtn.on('click', this.onSubmit.bind(this));
            //
            submitSection.addChild(submitBtn);
            inputRows.addChild(submitSection);

            //
            form.addChild(inputRows);
            //This is odd -__-
            modalContent.addChild(Widget.div({
                id: 'login-modal-form',
                clazz: 'modal-login-form'
            }).addChild(form));
        }
        {
            const footer = Widget.div('login-modal-footer');
            footer.setInnerHtml(Consts.getCopyrightHtml());
            modalContent.addChild(footer);
        }
        super.addChild(modalContent);
    }

    onSubmit(e) {
        e.preventDefault();
        const handler = super.getHandler();
        if (handler === null) {
            console.warn('You didn\'t pass a handler on the modal.show()');
        } else {
            if (handler(this)) {
                super.hide();
            }
        }
    }

    onClose() {
        super.hide();
        for (const input of this._inputs.values()) {
            input.clear();
            input.clearError();
        }
    }

    getInputs() {
        return this._inputs;
    }

    getInput(name) {
        //Check if the input is in the inputs map
        if (!this._inputs.has(name)) {
            //Throw error to let you know your naming is off...
            throw new Error(`There is no input field for ${name}`);
        }
        //Return valid inputs.
        return this._inputs.get(name);
    }


    static createFormInput(name, input, err) {
        return new FormInput(name, input, err);
    }
}



exports.LoginModal = new LoginModal();
exports.ContactModal = new ContactModal();