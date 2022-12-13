// get form btn
const registrationBtn = document.getElementById('registration-btn');
// console.log();

//  get err fields
let elFirstName = document.getElementById('err-first-name');
let elLastName = document.getElementById('err-last-name');
let elEmail = document.getElementById('err-email');
let elPassWord = document.getElementById('err-password');
let elConfirmPassWord = document.getElementById('err-confirm-password');
// console.log();



// EventListener's


// submit registration function

registrationBtn.addEventListener('click', submitRegistrationForm);

function submitRegistrationForm(e){
    e.preventDefault();
    console.log('Testing Submit Register');

    // get form
    const form = document.getElementById('registration-form');
    
    // // get input fields
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const passWord = document.getElementById('password').value;
    const confirmPassWord = document.getElementById('confirm-password').value;
    const id = new Date().getTime();
    const user = {
        id,
        firstName,
        lastName,
        email,
        passWord,
        confirmPassWord,
        done: true
    }
    
    const userRegistrationValues = JSON.parse(localStorage.getItem('userRegistrationValues')) || [];
    userRegistrationValues.push(user);
    localStorage.setItem('userRegistrationValues', JSON.stringify(userRegistrationValues));
    form.reset();
    console.log(registrationBtn.target);
  }
  
