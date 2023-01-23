


//  get err fields
const  firstNameEl = document.getElementById('first-name-err');
const  lastNameEl = document.getElementById('last-name-err');
const  userNameEL = document.getElementById('user-name-err');
const  emailEl = document.getElementById('email-err');
const  passWordEl = document.getElementById('password-err');
const  confirmPassWordEl = document.getElementById('confirm-password-err');
// console.log();
class FormValue {
  static REGEX_NAME = /[a-z]{1,25}/i;
  static REGEX_USERNAME = /\w{2,25}\d?\W?/i;
  static REGEX_EMAIL = /[a-z]+(?:\.[a-z]{3})/i;
  static REGEX_PASSWORD = /(\w{3,}\d{3}\W{1,})/i;

  static NONE = 0;
  static NAME = 1;
  static USERNAME = 2;
  static EMAIL = 3;
  static PASSWORD = 4;

  constructor(name, id, validationType) {
    this._name = name;
    this._node = document.getElementById(id);
    this._err = document.getElementById(id + '-err');
    this._vtype = validationType;
  }

  setError(message) {
    this._err.innerHTML = `<p class="err-msg">${message}</p>`;
  }

  getValue() {
    return this._node.value;
  }

  isEmpty() {
    return this.getValue() === '';
  }

  validate() {
    switch (this._vtype) {
      case FormValue.NONE:
        return null;
      case FormValue.NAME: {
        if (this.isEmpty()) {
          return `Please enter your ${this._name}`;
        }
        if (FormValue.REGEX_NAME.test(this.getValue())) {
          return null;
        }
        window.FIELD = this;
        console.log(`[${this._name}] Why is this not valid: ${this.getValue()}: ${FormValue.REGEX_NAME.test(this.getValue())}`);
        return 'Name is not Alphabetical or is not between 1 and 25 chars';
      }

        case FormValue.USERNAME: {
            if (this.isEmpty()) {
                return `Please enter your ${this._userName}`;
            }
            if (FormValue.REGEX_USERNAME.test(this.getValue())) {
                return null;
            }
            window.FIELD = this;
            console.log(`[${this._userName}] Why is this not valid: ${this.getValue()}: ${FormValue.REGEX_USERNAME.test(this.getValue())}`);
            return 'Username must be at least 2 letters, one digit, and one character';
        }

      case FormValue.EMAIL: {
        if (this.isEmpty()) {
          return `Enter a valid ${this._email}`;
        }
        if (FormValue.REGEX_EMAIL.test(this.getValue())) {
          return null;
        }
        window.FIELD = this;
        console.log(`[${this._email}] Why is this not valid: ${this.getValue()}: ${FormValue.REGEX_EMAIL.test(this.getValue())}`);
        return 'Email must be valid';
      }

      case FormValue.PASSWORD: {
        if (this.isEmpty()) {
          return `Enter a valid ${this._pass}`
        }
        if (FormValue.REGEX_PASSWORD.test(this.getValue())) {
          return null;
        }
        window.FIELD = this;
        console.log(`[${this._vtype}] Required for: ${this.getValue()}: ${FormValue.REGEX_PASSWORD.test(this.getValue())}`);
        return 'Password must be at least seven characters, example: abc123$';
      }
      default: {
        return 'Unhandled Validation Type';
      }
    }
  }

}
class RegisterForm {

  constructor(first, last, userName, email, pass, cpass, news) {
    this._first = new FormValue('First Name', first, FormValue.NAME);
    this._last = new FormValue('Last Name', last, FormValue.NAME);
    this._userName = new FormValue('user-name', userName, FormValue.USERNAME);
    this._email = new FormValue('Email', email, FormValue.EMAIL);
    this._pass = new FormValue('Password', pass, FormValue.PASSWORD);
    this._cpass = new FormValue('Confirm Password', cpass, FormValue.PASSWORD);
    this._news = new FormValue('newsletter', news, FormValue.NEWS)
    //this._news = new FormValue('Newsletter', news, FormValue.NONE);

    this._fields = [this._first, this._last, this._userName, this._email, this._pass, this._cpass, this._news];
  }

  getFirstName() {
    return this._first;
  }
  
  getLastName() {
    return this._last;
  }

  getUserName() {
    return this._userName;
  }

  getEmail() {
    return this._email;
  }

  getPassword() {
    return this._pass;
  }

  getConfirmPassword() {
    return this._cpass;
  }

  getNews() {
    return this._news;
  }

  getFields() {
    return this._fields;
  }

  clearErrors() {
    for (const field of this.getFields()) {
      field.setError('');
    }
  }
}

const rForm = new RegisterForm('first-name', 'last-name', 'user-name', 'email', 'password', 'confirm-password');

// get registration form
const form = document.getElementById('registration-form');
// get form btn
// const registrationBtn = document.getElementById('registration-btn');
// console.log(registrationBtn);


// function's


function getFormValues() {

  let success = true;
  for (const field of rForm.getFields()) {
    const validation = field.validate();
    if (validation !== null) {
      field.setError(validation);
      success = false;
    }
  }
  if (rForm.getPassword() === rForm.getConfirmPassword()) {
    success = false;
    rForm.getConfirmPassword().setError('Passwords do not match');
  }
  if (success) {
    console.log('We have successful validation of all fields');
  } else {
    console.log('We failed to validate all the fields');
  }
}


// submit registration function

function submitRegistrationForm(e){
  e.preventDefault();
  getFormValues()
  rForm.clearErrors();

    // get form
    const form = document.getElementById('registration-form');
    
    // // get input fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const userName = document.getElementById('user-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;
    
    // set schema for localStorage

    const id = Date.now();
    const user = {
        id,
        firstName,
        lastName,
        userName,
        email,
        password,
        confirm,
        done: true
    }
    const userRegistrationValues = JSON.parse(localStorage.getItem('userRegistrationValues')) || [];
    userRegistrationValues.push(user);
    localStorage.setItem('userRegistrationValues', JSON.stringify(userRegistrationValues));
    session.fireLogin(user.userName);
    form.reset();
    open('index.html');
  }
  
