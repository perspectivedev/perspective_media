

const {
    Widget, Modal, OverlayModal
} = require('assets/js/modules/widget.js');
// console.log(Widget, Modal, OverlayModal);
const {
    PasswordInput,
} = require('assets/js/modules/custom_widget.js');
const {
    ContactModal,
    LoginModal
} = require('assets/js/modules/modals.js');
// console.log(ContactModal, LoginModal);
const {
    session,
    SessionEvent
} = require('assets/js/modules/session.js');
// console.log(session, SessionEvent);

class PageContent {
    static getMainSectionHeader() {
        if (PageContent._MAIN_HEADER) {
            return PageContent._MAIN_HEADER;
        }

        const header = Widget.div('hero-section');
        const image = new Widget('img', {
            clazz: 'hero-img',
            attrs: {
                src: 'assets/images/perspective.jpg',
            }
        });
        const bContact = new Widget('button', {
            id: 'open-contact-modal-btn', clazz: 'contact'
        }).setText('Contact').on('click', e => {
            ContactModal.show();
        });
        header.addChild(image);

        const heading = Widget.div('hero-heading');
        heading.addChild(new Widget('p', 'hero-text').setText('Its how you see it.'));
        heading.addChild(bContact);
        header.addChild(heading);
        PageContent._MAIN_HEADER = header;
        return header;
        
    }

    static getRegisterContent() {
        if (PageContent._REGISTER) {
            return PageContent._REGISTER;
        }

        const form = new Widget('form', {
            clazz: 'registration',
            attrs: {
                name: 'user-registration',
                oninvalid: 'getFormValues()',
            }
        });
        form.addChild(Widget.div('form-legend').setInnerHtml(
            `<legend class="legend-header"> <img src="assets/images/perspective_logo.svg" class="form-logo" alt="logo">
              </legend>`
        ));
        function newFormGroup(info) {
            const group = Widget.div('form-group');
            group.addChild(new Widget('label', 'registration-label').setText(info.label));
            if (info.type === 'password') {
                group.addChild(new PasswordInput(info.id, info.type, info.id));
            } else {
                group.addChild(new Widget('input', {
                    id: info.id,
                    attrs: {
                        type: info.type
                    }
                }));
            }
            group.addChild(Widget.div({ id: info.id + '-err' }));
            return group;
        }
        const groups = [
            { type: 'text', id: 'first-name', label: 'First:' },
            { type: 'text', id: 'last-name', label: 'Last:' },
            { type: 'text', id: 'user-name', label: 'username:'  },
            { type: 'email', id: 'email', label: 'Email:' },
            { type: 'password', id: 'password', label: 'Password:' },
            { type: 'password', id: 'confirm-password', label: 'Confirm:' },
            { type: 'checkbox', id: 'newsletter', label: 'Newsletter:' },
        ];
        for (const group of groups) {
            form.addChild(newFormGroup(group));
        }
        form.addChild(Widget.div('valid-registration-section')
            .addChild(new Widget('button', {
                id: 'registration-btn', clazz: 'valid-registration'
            }).setText('Submit'))
        );
        PageContent._REGISTER = form;
        return form;
    }
}


const SiteNav = {
    'index': Widget.div().setText('Home'),
    'about': Widget.div().setText('About'),
    'blog': Widget.div().setText('Blog'),
    'services': Widget.div().setText('Services'),
    'registration': Widget.div().setText('Register'),
    'login': Widget.div().addChild(new Widget('span', {
        id: 'login-btn', clazz: 'login'
    }).setText('login'))
};

console.log(SiteNav.login);

const body = Widget.getBody();

{
    // widget container
    const container = Widget.div('widget-wrapper');

    // widget header
    const headerSection = Widget.div('header-section');
    const header = Widget.div('header-widget');
    const logo = new Widget('img', 'logo');
    logo.setAttr('src', 'assets/images/logo.png');
    const siteNav = new Widget('nav', 'site-nav');

    siteNav.addChild(SiteNav.about);
    siteNav.addChild(SiteNav.blog);
    siteNav.addChild(SiteNav.services);
    siteNav.addChild(SiteNav.registration);
    siteNav.addChild(SiteNav.login);

    SiteNav.login.on('click', e=> {
        LoginModal.show();
    });
    /*
        Why are we logging a widget? if it returns ones 
        More or less logging the e.target would have been better

        addChild of Modal why? When modal auto adds it self and removes
        when it closes
    */
    // console.log(Pages.login.on('click', e => {
    //     if (e.target === 'login') {
    //         Pages.login.addChild(LoginModal.OverlayModal.hookWindow());
    //     } else {
    //         Pages.login.removeChild(LoginModal.hookWindow());
    //     }
    // }));

    container.addChild(headerSection);
    headerSection.addChild(header);
    header.addChild(logo);
    header.addChild(siteNav);
    
    
    // widget body
    const mainSection = Widget.div('widget-main-section');
    mainSection.addChild(PageContent.getMainSectionHeader());
    mainSection.addChild(PageContent.getRegisterContent());
    container.addChild(mainSection);


    // widget footer
    const footerSection = Widget.div('widget-footer-section');
    {
        const footer = new Widget('footer', 'footer-widget');
        footer.setInnerHtml(`
    <p id="footer-content" class="content-footer-widget">
    Copyright &COPY; <span class="company">
    Perspective
    </span> Media
    </p>
    `);
        footerSection.addChild(footer);
    }

    container.addChild(footerSection);


    //Add the container

    body.addChild(container);


    //At the end of the containers elements so we can grab any of it
    //Without reassinging or querying for it.
    let registerShown = true;
    siteNav.on('click', e => {
        switch (e.target) {
            case SiteNav.about.getNode(): {
                console.log('Clicked about');
                if (registerShown) {
                    mainSection.removeChild(PageContent.getRegisterContent());
                } else {
                    mainSection.addChild(PageContent.getRegisterContent());
                }
                registerShown = !registerShown;
                break;
            }
        }
    });
}


// const TESTING_STRING_CHILDREN = true;
// if (TESTING_STRING_CHILDREN) {
//   //body.setInnerHtml('');
//   //This is a string, widget, string, widget, string example.

//   const BLUE_STYLE = {
//     'background': 'blue',
//     'color': 'black'
//   };
//   const RED_STYLE = {
//     'color': 'black',
//     'background': 'red'
//   };

//   const textTest = new Widget('div');

//   const redText = new Widget('span');
//   redText.setText('This text is red!');
//   redText.setStyle(RED_STYLE);
//   redText.setAttr('id', 'ThisIsRed');

//   textTest.addChild('This is adding ', redText, ' and ', new Widget('span', {
//     id: 'Testing',
//     attrs: {
//       name: 'testing',
//       id: 'OverrideID'
//     },
//     style: BLUE_STYLE,
//     text: 'This is blue text'
//   }), ', this is handy for some things... ', new Widget('span', {
//     innerHtml: '&times;'
//   }));


//   body.addChild(textTest);
// }



