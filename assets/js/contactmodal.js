const {
  Widget,
  Modal
} = require('assets/js/modules/widget.js', true);
class ContactModal extends Modal {
  static COMPANY_NUMBER = '(253)-555-5555';
  static COMPANY_EMAIL = 'marvisknight360@outlook.com';
  static COMPANY_WEBSITE = 'www.perspectivemedia.com';

  constructor() {
    super('modal');
    super.setAttr('id', 'contact-modal');

    const content = new Widget('div', 'contact-modal-content');

    {//Header
      const header = new Widget('div', 'contact-modal-header');
      header.addChild(new Widget('p').setText('Contact us!'));
      const close = new Widget('span', 'close-contact-modal');
      close.setAttr('id', 'close-contact-modal-btn');
      close.setInnerHtml('&times;');
      close.on('click', super.hide.bind(this));
      header.addChild(close);
      content.addChild(header);
    }
    {//Info
      const info = new Widget('div', 'contact-items');
      info.addChild(new Widget('p', 'company-number').setText(ContactModal.COMPANY_NUMBER));
      info.addChild(new Widget('p', 'company-email').setText(ContactModal.COMPANY_EMAIL));
      info.addChild(new Widget('p', 'company-website').setText(ContactModal.COMPANY_WEBSITE));
      content.addChild(info);
    }
    {
      const footer = new Widget('div', 'contact-modal-footer');
      const f = new Widget('footer', 'modal-footer');
      
      f.addChild(new Widget('p', 'about-us').setInnerHtml(
        '&copy; <span class="date"> 2023</span> <span class="company">Perspective</span> Media'
      ));
      footer.addChild(f);
      content.addChild(footer);
    }
    super.addChild(content);
  }
}
exports.ContactModal = new ContactModal();


// const contactModal = document.getElementById('contact-modal');
// // Get open modal btn
// const openContactModalBtn = document.getElementById('open-contact-modal-btn');
// // Get close modal btn
// const closeContactModalBtn = document.getElementById('close-contact-modal-btn');


// // EventListerner's 
// openContactModalBtn.addEventListener('click', openModal);
// closeContactModalBtn.addEventListener('click', closeModal);
// window.addEventListener('click', clickOutside);


// // f()'s

// function openModal(){
//   contactModal.style.display = 'block';
// }

// function closeModal(){
//   contactModal.style.display = 'none';
// }

// function clickOutside(e){
//   if(e.target === contactModal){
//     contactModal.style.display = 'none';
//   }
// }

