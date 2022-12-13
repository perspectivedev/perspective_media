// get form btn
const registrationBtn = document.getElementById('registration-btn');

// get form
const form = document.querySelectorAll('registration-form');

// get input fields
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let email = document.getElementById('email');
let passWord = document.getElementById('password');
let confirmPassWord = document.getElementById('confirm-password');
//  get err fields
let elFirstName = document.getElementById('err-first-name');
let elLastName = document.getElementById('err-last-name');
let elEmail = document.getElementById('err-email');
let elPassWord = document.getElementById('err-password');
let elConfirmPassWord = document.getElementById('err-confirm-password');
console.log(firstName.value);
console.log(form.value);



// EventListener's
registrationBtn.addEventListener('click', submitRegistrationForm);




// f()'s
function submitRegistrationForm(e){
  e.preventDefault();
  console.log(this.target);
}