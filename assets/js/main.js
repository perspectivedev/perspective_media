(function () {
    window.dict = function (...kvs) {
        if (!Number.isInteger(kvs.length / 2)) {
            throw new Error('KeyVal pairs is not valid');
        }
        const dict = {};
        for (let i = 0, len = kvs.length; i < len; i += 2) {
            const key = kvs[i + 0];
            if (typeof key !== 'string') {
                throw new Error(`Invalid Key type: ${typeof key}`);
            }
            dict[key] = kvs[i + 1];
        }
        return dict;
    };
    require('assets/js/modules/pages/register.js');
    const {
        Forms,
        FormValue
    } = require('assets/js/modules/util/forms.js');
    const {
        UserList,
    } = require('assets/js/modules/users.js');
    const {
        LoginModal,
        ContactModal
    } = require('assets/js/modules/ui/modals.js');
    const {
        session,
        SessionEvent
    } = require('assets/js/modules/util/session.js');
    const Consts = require('assets/js/modules/util/consts.js');

    //Create a form object to prevent misspellings and or other stuff.
    const new_form = function (sessionRequired, selector) {
        return {
            sessionRequired: sessionRequired,
            form: document.querySelector(selector)
        }
    };
    class Page {
        static FORMS = null;

        static init() {
            //Init Page
            Page.FORMS = {
                AUTHOR: new_form(true, '.author-form-section'),
                COMMENT: new_form(true, '.comment-form-section'),
                REGISTER: new_form(false, '#registration-form-section'),
                // LOGIN: new_form(false, '#login-btn'),
            };
            // Hook the session event                                                                     
            session.addEventListener(SessionEvent.CHANGED, Page.onSessionChanged);

            Page.injectStuffs();
            //Update the page
            Page.update();
        }

        static injectStuffs() {
            //Site Nav
            const siteNav = document.querySelector('nav.nav.top-nav');

            if (siteNav === null) {
                throw new Error('We are missing the site nav');
            }

            siteNav.innerHTML = Consts.getSiteNavHtml();
            //End Site Nav

            // Start of Footer
            const siteFooter = document.getElementById('site-footer');
            if (siteFooter === null) {
                throw new Error('We are missing the site footer injection point! All bad.');
            }
            siteFooter.innerHTML = Consts.getFooterHtml();
            //End of footer.

            /**
    * This script is your entry-point of your entire page app
    * This will update the page with session data / and other stuff
    */


            const loginBtn = Page.LOGIN_BUTTON = document.getElementById('login-btn');
            const registerButton = Page.REGISTER_BUTTON = document.getElementById('register-button');
            const contactBtn = Page.CONTACT_BUTTON = document.getElementById('open-contact-modal-btn');

            if (loginBtn !== null) {
                let _clearTimeout = null;
                loginBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (session.isLoggedIn()) {
                        session.fireLogout();
                    } else {
                        LoginModal.show(modal => {
                            // This is where you do validation of the login before you pass to
                            // The username and password to the UserList and get the result in here.
                            // And then process from there.
                            const user = LoginModal.getInputs().get('username');
                            const pass = LoginModal.getInputs().get('password');

                            const username = user.getValue();
                            const password = pass.getValue();

                            const validUsername = FormValue.REGEX_USERNAME.exec(username);
                            const validPassword = FormValue.REGEX_PASSWORD.exec(password);

                            if (validUsername === null || validPassword === null) {
                                // Should Validate username and password but for now it's okay I guess.
                                if (validUsername === null) {
                                    user.setError('Username must be valid');
                                }
                                if (validPassword === null)
                                    pass.setError('Password must be valid');

                                //
                                if (_clearTimeout == null) {
                                    _clearTimeout = setTimeout(() => {
                                        user.clearError();
                                        pass.clearError();
                                        _clearTimeout = null;
                                    }, 3 * 1000);
                                }

                            } else {
                                console.log(`Login Attempt: ${username}, ${password}`);
                                const result = UserList.login(username, password);
                                if (typeof result === 'string') {
                                    if (result === UserList.ERROR_NO_SUCH_USER) {
                                        user.setError(result);
                                    } else if (result === UserList.ERROR_PASSWORD_MISMATCH) {
                                        pass.setError(result);

                                    } else {
                                        console.log('Error handling:', result);
                                    } if (_clearTimeout == null) {
                                        _clearTimeout = setTimeout(() => {
                                            user.clearError();
                                            pass.clearError();
                                            _clearTimeout = null;
                                        }, 3 * 1000);
                                    }
                                } else {
                                    // User: if successful login
                                    session.fireLogin(result);
                                    return true;
                                }
                            }
                            return false;
                        });
                    };
                });
            }
            if (contactBtn !== null) {
                contactBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    ContactModal.show();
                });
            }


            // This is a special function created by ALBERT, Don't recommend
            // Editing it, only adding tags as they arrive. :)
            //
            //### IF DRAG EVENTS ARE MISSING THIS IS WHY ###
            //
            (function (...tags) {
                for (const tag of tags) {
                    const nodes = document.querySelectorAll(tag);
                    if (nodes.length !== 0) {
                        for (const node of nodes) {
                            node.ondragstart = function (e) { e.preventDefault() };
                        }
                    }
                }
            })('a', 'img'); // <-- Insert tags here !! AS NEEDED !!
            //End of special function
        }

        //Update the session state
        static update() {
            const greeting = document.querySelector('.hero-text');
            if (Page.LOGIN_BUTTON === null || greeting === null || Page.REGISTER_BUTTON === null) {
                throw new Error(`Missing Login or Greeting: (buttons: [${Page.LOGIN_BUTTON}, ${Page.REGISTER_BUTTON}], greeting: ${greeting})`);
            }
            const hasSession = session.isLoggedIn();
            Page.LOGIN_BUTTON.innerText = hasSession ? 'Logout' : 'Login';
            Page.REGISTER_BUTTON.style.display = hasSession ? 'none' : 'block';
            greeting.innerText = `Its how you see it${hasSession ? ' ' + session.getUser().getUsername() : ''}.`;
            for (const key of Object.keys(Page.FORMS)) {
                const value = Page.FORMS[key];
                if (value.form === null) {
                    console.log(`Failed to find ${key} form`);
                    continue;
                }
                if (value.sessionRequired) {
                    value.form.style.display = hasSession ? 'block' : 'none';
                }
            }
        }

        static onSessionChanged(event) {
            console.log('Do stuff with session changed:', event);
            Page.update();
        }
    }
    Page.init();
    console.log(`Session in progress: ${session.isLoggedIn() ? 'positive' : 'negative'}`);
})();
