const {
  Widget,
  Modal
} = require('assets/js/modules/widget.js', true);

class ContactModal extends Modal {
  static COMPANY_NUMBER = '(253)-555-5555';
  static COMPANY_EMAIL = 'marvisknight360@outlook.com';
  static COMPANY_WEBSITE = 'www.perspectivemedia.com';

  constructor() {
    super('modal');
    super.setAttr('id', 'contact-modal');

    const content = new Widget('div', 'contact-modal-content');

    {//Header
      const header = new Widget('div', 'contact-modal-header');
      header.addChild(new Widget('p').setText('Contact us!'));
      const close = new Widget('span', 'close-contact-modal');
      close.setAttr('id', 'close-contact-modal-btn');
      close.setInnerHtml('&times;');
      close.on('click', super.hide.bind(this));
      header.addChild(close);
      content.addChild(header);
    }

    {//Info
      const info = new Widget('div', 'contact-items');
      info.addChild(new Widget('p', 'company-number').setText(ContactModal.COMPANY_NUMBER));
      info.addChild(new Widget('p', 'company-email').setText(ContactModal.COMPANY_EMAIL));
      info.addChild(new Widget('p', 'company-website').setText(ContactModal.COMPANY_WEBSITE));
      content.addChild(info);
    }
    {
      const footer = new Widget('div', 'contact-modal-footer');
      const f = new Widget('footer', 'modal-footer');
      
      f.addChild(new Widget('p', 'about-us').setInnerHtml(
        '&copy; <span class="date"> 2023</span> <span class="company">Perspective</span> Media'
      ));
      footer.addChild(f);
      content.addChild(footer);
    }
    super.addChild(content);
  }
}


class FormInput {
  constructor(group, input, error) {
    this._group = group;
    this._input = input;
    this._error = error;
  }

  getValue() {
    return this._input.getNode().value;
  }

  setError(error) {
    this._error.setText(error);
  }

  clearError() {
    this._error.setText('');
  }
}

class LoginModal extends Modal {
  constructor() {
    super('modal-login');//Should Make Modal and Modal-Login basically the same.

    this._inputs = [];

    super.setAttr('id', 'login-modal');

    const modalContent = new Widget('div', 'login-modal-content');
    
    {//header
      const header = new Widget('div', 'login-modal-header');
      const titleHeader = new Widget('header', 'login-header');
      titleHeader.addChild(Widget.div().addChild(new Widget('p','cta-msg').setText('Login!')));
      titleHeader.addChild(new Widget('span', {
        id: 'close-login-modal-btn',
        clazz: 'close-login-modal',
      }).setInnerHtml('&times;'));
      header.addChild(titleHeader);
      modalContent.addChild(header);
    }//end of header
    {//start of login form

    }
    
  }
  static createLoginForm() {


    const passwordInput = LoginModal.createFormInput({
      name: 'password',
      inputClass: 'user-password',
      type: 'password',
      visiblity: true,
      labelText: 'Password:'
    });


  }


  static createFormInput(inputInfo){
    const group = Widget.div('login-group');
    const label = new Widget('label');
    label.setAttr('for', inputInfo.name);
    //
    const inputGroup = Widget.div(inputInfo.inputClass);
    const input = Widget.input(inputInfo.type, {
      id: inputInfo.name, 
      clazz: inputInfo.inputClass
    });
    inputGroup.addChild(input);
    if (inputInfo.visiblity) {
      inputGroup.addChild(Widget.div({
        id: 'visibility',
        clazz: 'fa visible'
      }));
    }
    const inputError = Widget.div({
      id: `${inputInfo.name}-err`
    });
    label.addChild(inputInfo.labelText, inputGroup, inputError);
    group.addChild(label);
    return new FormInput(group, input, inputError);
  }
  static createLoginSubmitBtn(submitSection){
    const submitSection = Widget.div('login-submit-section');
    const loginFooter = new Widget('login-footer');
    const loginBtn = new Widget('loging-btn');
    loginBtn.setAttr('type', 'button');
  }
}


/*



        <!-- start of login form -->
        <div id="login-modal-formm" class="modal-login-form">
            <form action="" onsubmit="userLogin()" name="login" id="login-form" class="login-form"
                aria-required="false">
                <div class="login-form-legend">
                    <legend class="legend-header"> <img src="assets/images/perspective_logo.svg" class="login-logo"
                            alt="logo">
                    </legend>
                </div>

                <div class="inputs">

                    <div class="login-group">
                        <label for="password">
                        Password:
                            <div class="user-password">
                                <input type="password" id="password" class="user-password" name="password"/>
                                <div id="visibility" class="fa visible"></div>
                            </div>
                            <div id="password-err"></div>
                        </label>
                    </div>
                </div>

                <div class="login-submit-section">
                    <footer class="login-footer">
                        <button type="button" id="login-btn" class="login-btn">Submit</button>
                    </footer>
                </div>
            </form>
        </div>
        <!-- end of login form -->
        <div class="login-modal-footer">
            <footer class="modal-footer">
                <p class="about-us">&copy; <span class="date"> 2023</span>
                    <span class="company">Perspective</span> Media
                </p>
            </footer>
        </div>
    </div>

*/




exports.ContactModal = new ContactModal();

