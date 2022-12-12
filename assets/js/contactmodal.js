// Get modal 
const contactBtn = document.getElementById('contact-modal');
// Get open modal btn
const openContactModalBtn = document.getElementById('open-contact-modal-btn');
// Get close modal btn
const closeContactModalBtn = document.getElementById('close-contact-modal-btn');






function submitContactForm(e){
  e.preventDefault();
  console.log(contactBtn.value);
}

contactBtn.addEventListener('click', submitContactForm);
