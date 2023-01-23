(function () {
    require('assets/js/modules/register.js');

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
    } = require('assets/js/modules/modals.js');
    const {
        PasswordInput
    } = require('assets/js/modules/widget.js');

    const {
        session,
        SessionEvent
    } = require('assets/js/modules/util/session.js');

    /**
     * This script is your entry-point of your entire page app
     * This will update the page with session data / and other stuff
     */

    const loginBtn = document.getElementById('login-btn');
    const contactBtn = document.getElementById('open-contact-modal-btn');

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
            };
            // Hook the session event
            session.addEventListener(SessionEvent.CHANGED, Page.onSessionChanged);

            //Update the page
            Page.update();
        }

        //Update the session state
        static update() {
            const greeting = document.querySelector('.hero-text');
            if (session.isLoggedIn()) {
                //POSSIBLE ERROR: Login Button could be null.
                loginBtn.innerText = 'Logout';
                greeting.innerText = `Its how you see it ${session.getUser().getUsername()}.`
            } else {
                loginBtn.innerText = 'Login';
                greeting.innerText = 'Its how you see it.';
            }
            for (const key of Object.keys(Page.FORMS)) {
                const value = Page.FORMS[key];
                if (value.form === null) {
                    console.log(`Failed to find ${key} form`);
                    continue;
                }
                if (value.sessionRequired) {
                    value.form.style.display = session.isLoggedIn() ? 'block' : 'none';
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
