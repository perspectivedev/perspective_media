const { Widget, Modal, OverlayModal } = require("assets/js/modules/widget.js");
const { PasswordInput } = require('assets/js/modules/custom_widget.js');

class ContactModal extends Modal {
    static COMPANY_NUMBER = "(253)-555-5555";
    static COMPANY_EMAIL = "perspectivemedia@email.com";
    static COMPANY_WEBSITE = "www.perspectivemedia.com";

    constructor() {
        super("modal");
        super.setAttr("id", "contact-modal");

        const content = new Widget("div", "contact-modal-content");

        {
            //Header
            const header = new Widget("div", "contact-modal-header");
            header.addChild(new Widget("p").setText("Contact us!"));
            const close = new Widget("span", "close-contact-modal");
            close.setAttr("id", "close-contact-modal-btn");
            close.setInnerHtml("&times;");
            close.on("click", super.hide.bind(this));
            header.addChild(close);
            content.addChild(header);
        }

        {
            //Info 
            const info = new Widget("div", "contact-items");
            info.addChild(
                new Widget("p", "company-number").setText(ContactModal.COMPANY_NUMBER)
            );
            info.addChild(
                new Widget("p", "company-email").setText(ContactModal.COMPANY_EMAIL)
            );
            info.addChild(
                new Widget("p", "company-website").setText(ContactModal.COMPANY_WEBSITE)
            );
            content.addChild(info);
        }
        {
            const footer = new Widget("div", "contact-modal-footer");
            const f = new Widget("footer", "modal-footer");

            f.addChild(
                new Widget("p", "about-us").setInnerHtml(
                    '&copy; <span class="date"> 2023</span> <span class="company">Perspective</span> Media'
                )
            );
            footer.addChild(f);
            content.addChild(footer);
        }
        super.addChild(content);
    }
}

class FormInput {
    constructor(name, group, input, error) {
        this._name = name;
        this._group = group;
        this._input = input;
        this._error = error;
    }

    getName() {
        return this._name;
    }

    getValue() {
        return this._input.getNode().value;
    }

    getWidgetGroup() {
        return this._group;
    }

    setError(error) {
        this._error.setText(error);
    }

    clearError() {
        this._error.setText("");
    }
}


class LoginModal extends OverlayModal {
    constructor() {
        super({
            clazz: 'modal-login',
            id: 'login-modal'
        }); //Should Make Modal and Modal-Login basically the same.
        this._inputs = new Map();
        const modalContent = Widget.div('login-modal-content');
        {
            //header
            const header = Widget.div('login-modal-header');
            const titleHeader = new Widget('header', 'login-header');
            titleHeader.addChild(
                Widget.div().addChild(new Widget("p", "cta-msg").setText("Login!"))
            );
            titleHeader.addChild(
                new Widget("span", {
                    id: "close-login-modal-btn",
                    clazz: "close-login-modal",
                }).setInnerHtml("&times;").on('click', this.onClose.bind(this))
            );
            header.addChild(titleHeader);
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
            const email = LoginModal.createFormInput({
                name: "email",
                inputClass: "user-modal-email",
                type: "text",
                labelText: "Email:",
            });
            const password = LoginModal.createFormInput({
                name: "password",
                labelText: "Password:",
            }, new PasswordInput('password', 'user-modal-password'));

            //Register inputs into the Modal.inputs map
            this._inputs.set(email.getName(), email);
            this._inputs.set(password.getName(), password);

            const inputs = Widget.div('inputs');
            inputs.addChild(email.getWidgetGroup());
            inputs.addChild(password.getWidgetGroup());

            form.addChild(inputs);

            const submitSection = Widget.div('login-submit-section login-footer');
            //Submit Button
            const submitBtn = new Widget('button', 'login-btn');
            submitBtn.setText('Login!');
            submitBtn.on('click', this.onSubmit.bind(this));
            //
            submitSection.addChild(submitBtn);
            form.addChild(submitSection);
            modalContent.addChild(Widget.div({
                id: 'login-modal-form',
                clazz: 'modal-login-form'
            }).addChild(form));
        }
        {
            const footer = Widget.div('login-modal-footer');
            footer.setInnerHtml(`
            <footer class="modal-footer">
                <p class="about-us">&copy; <span class="date"> 2023</span>
                    <span class="company">Perspective</span> Media
                </p>
            </footer>
      `);
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
        console.log('Should close');
        super.hide();
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

    static createFormInput(inputInfo, inputObject = null) {
        const group = Widget.div("login-group");
        const label = new Widget("label");
        label.setAttr("for", inputInfo.name);
        //
        let inputGroup = null;
        let input = null;
        if (inputObject === null) {
            inputGroup = Widget.div(inputInfo.inputClass);
            input = Widget.input(inputInfo.type, {
                id: inputInfo.name,
                clazz: inputInfo.inputClass,
            });
            inputGroup.addChild(input);

        } else {
            inputGroup = inputObject;
            input = inputObject.getInput();
        }
        const inputError = Widget.div({
            id: `${inputInfo.name}-err`,
        });
        label.addChild(inputInfo.labelText, inputGroup, inputError);
        group.addChild(label);
        return new FormInput(inputInfo.name, group, input, inputError);
    }
}

exports.LoginModal = new LoginModal();
exports.ContactModal = new ContactModal();