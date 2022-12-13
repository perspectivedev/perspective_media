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
registrationBtn.addEventListener('submit', submitRegistrationForm);



// submit registration function
function submitRegistrationForm(e){
    e.preventDefault();

const firstName = document.getElementById('first-name').value;
const lastName = document.getElementById('last-name').value;
const email = document.getElementById('email').value;
const passWord = document.getElementById('password').value;
const confirmPassWord = document.getElementById('confirm-password').value;
    const id = new Date().getTime();
    const user = {
        id: id,
        userName: userName,
        userEmail: userEmail,
        userImg: userImg,
        userComment: userComment,
        done: true
    }
    
    const userRegistrationValues = JSON.parse(localStorage.getItem('userRegistrationValues')) || [];
    userRegistrationValues.push(user);
    localStorage.setItem('userRegistrationValues', JSON.stringify(userRegistrationValues));
    this.reset();
}