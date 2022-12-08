const contactBtn = document.querySelector('.contact-btn'
);

function submitContactForm(e){
  e.preventDefault();
  console.log(contactBtn.value);
}

contactBtn.addEventListener('click', submitContactForm);
