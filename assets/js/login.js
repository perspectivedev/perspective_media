const {
  session,
  SessionEvent
} = require('assets/js/modules/session.js');

// Get modal 
// Get open modal btn
const openLoginModalBtn = document.getElementById('login-btn');
// Get close modal btn
const closeLoginModalBtn = document.getElementById('close-login-modal-btn');

// eventlistener
openLoginModalBtn.addEventListener('click', openLoginModal);
closeLoginModalBtn.addEventListener('click', closeLoginModal);
window.addEventListener('click', clickOutsideLogin);
visibilityBtn.addEventListener('click', passwordVisibility);


const loginBtn = document.getElementById('login-btn');
const logOutCta = document.querySelector('.cta-msg');

if (loginBtn) {
  if (session.isLoggedIn()) {
    loginBtn.innerText = 'Logout';
  }else {
    loginBtn.innerText = 'Login'
  }
}
