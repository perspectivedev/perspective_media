
// Get modal 
const contactModal = document.getElementById('contact-modal');
// Get open modal btn
const openContactModalBtn = document.getElementById('open-contact-modal-btn');
// Get close modal btn
const closeContactModalBtn = document.getElementById('close-contact-modal-btn');



// EventListerner's 
openContactModalBtn.addEventListener('click', openModal);
closeContactModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);


// f()'s

function openModal(){
  contactModal.style.display = 'block';
}


function closeModal(){
  contactModal.style.display = 'none';
}


function clickOutside(){
  if(e.target === contactModal){
    contactModal.style.display = 'none';
  }
}

