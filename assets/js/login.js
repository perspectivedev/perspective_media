// eye-btn
const visibilityBtn = document.getElementById('visibility');

const EYE_SHOW = String.fromCharCode(0xF070);
const EYE_HIDE = String.fromCharCode(0xF06E);

visibilityBtn.innerHTML = EYE_SHOW;

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
visibilityBtn.addEventListener('click', passwordVisibility);