// Get modal 
const loginModal = document.getElementById('login-modal');
// Get open modal btn
const openLoginModalBtn = document.getElementById('login-btn');
// Get close modal btn
const closeLoginModalBtn = document.getElementById('close-login-modal-btn');

// eye-btn
const visibilityBtn = document.getElementById('visibility');

const EYE_SHOW = String.fromCharCode(0xF070);
const EYE_HIDE = String.fromCharCode(0xF06E);

visibilityBtn.innerHTML = EYE_SHOW;


// function's to open/close modal
function openLoginModal() {
  loginModal.style.display = 'block';
}


function closeLoginModal() {
  loginModal.style.display = 'none';
}


function clickOutsideLogin(e) {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
}

//toggleVisibility()
function passwordVisibility() {
  const pass = document.getElementById("password");
  if (pass.type === 'password') {
    pass.type = 'text';
    visibilityBtn.innerHTML = EYE_HIDE;
  } else {
    pass.type = 'password';
    visibilityBtn.innerHTML = EYE_SHOW;
  }
  console.log('Toggled Visible Password');
}

// eventlistener
openLoginModalBtn.addEventListener('click', openLoginModal);
closeLoginModalBtn.addEventListener('click', closeLoginModal);
window.addEventListener('click', clickOutsideLogin);
visibilityBtn.addEventListener('click', passwordVisibility);







