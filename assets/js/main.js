// global variables
// const container = document.querySelectorAll('#body-container');
// // console.log(container);
// const time = document.getElementById('current-time');
// const clientName = document.getElementById('client-name');
// const clientMessage = document.getElementById('client-message');
// const displayAmPm = true;


// // landing page functions
// function currentTime(){
//     let today = new Date();
//     let hour = today.getHours();
//     let min = today.getMinutes();
//     let sec = today.getSeconds();

//     // Set AM or PM
//     const amPM = hour >= 12 ? 'PM' : 'AM';
    
//     // 12hr format
//     hour = hour % 12 || 12;

//     // Output time
//     time.innerHTML = `${hour}<span>:</span>${zeroToTime(min)}<span>:</span>${zeroToTime(sec)} ${displayAmPm ? amPM : ''}`;
    
//     setTimeout(currentTime, 1000);
// }

// // add zeros
// function zeroToTime(n){
//     return (parseInt(n, 10) < 10 ? '0' : '') + n;
// }

// set background and greeting
// function setBackgroundGreeting(){
    //     let today = new Date();
    //     let hour = today.getHours();
    
    
    //     if(hour < 12){
        //         // morning
        //         // DocumentFragment.body.style.backgroundImage = url(../images/perspective2.jpg);
        //         // greeting.textContent = 'Good Morning';
        //     }else if(hour < 18){
            //         // afternoon
            //                 // DocumentFragment.body.style.backgroundImage = url(../images/perspective2.jpg);
            //         // greeting.textContent = 'Good Afternoon';

            //     }else{
                //         // evening
                //                 // DocumentFragment.body.style.backgroundImage = url(../images/perspective2.jpg);
                //         // greeting.textContent = 'Good Evening';
    //     }
    // }
    // currentTime();


//     function getClientName(){
//         if(localStorage.getItem('name') === null){
//         clientName.textContent = `${'[Enter name].'}`;
//     } else {
//         clientName.textContent = localStorage.getItem('name');
//     }
// }
// // set client name

// function setClientName(e){
//     if(e.type === 'keypress'){
//         if(e.keyCode == 13){
//             localStorage.setItem('name', e.target.innerText);
//             clientName.blur();
//         }
//     }else{
//         localStorage.setItem('name', e.target.innerText);
//     }
// }
// console.log(setClientName.textContent);
// // Get client message 

// function getClientMessage(){
//     if(localStorage.getItem('message') === null){
//         clientMessage.textContent = `${'[Your message].'}`;
//     } else {
//         clientMessage.textContent = localStorage.getItem('message');
//     }
// }
// // set client message

// function setClientMessage(e){
//     if(e.type === 'keypress'){
//         if(e.keyCode == 13){
//             localStorage.setItem('message', e.target.innerText);
//             clientMessage.blur();
//         }
//     }else{
//         localStorage.setItem('message', e.target.innerText);
//     }
// }
// console.log(setClientMessage.textContent);
// getClientName();
// getClientMessage();
// // setClientMessage();
// // setClientName();

// // Call function()'s before eventListeners

// // addEventListener
// clientName.addEventListener('keypress', setClientName);
// clientName.addEventListener('blur', setClientName);
// clientMessage.addEventListener('keypress', setClientMessage);
// clientMessage.addEventListener('blur', setClientMessage);

const {
    ContactModal
} = require('assets/js/contactmodal.js', true);

const openContact = document.getElementById('open-contact-modal-btn');
if (openContact !== null) {
    openContact.addEventListener('click', _=> {
        ContactModal.show();
    });
}



/*
TODO 
const {
    LoginModal
} = require('assets/js/login_modal.js', true);
*/
const LoginModal = null; // TODO remove.

const openLogin = document.getElementById('open-login-modal-btn');
if (openLogin !== null && LoginModal) {
    openLogin.addEventListener('click', e => {
        LoginModal.show();
    });
}