
const { LoginModal } = require('assets/js/modules/modals.js');
const { SessionEvent, session } = require("assets/js/modules/session.js");

class LoginButton extends SessionEvent {

    constructor(loginBtn) {
        this._loginBtn = loginBtn;
        this._session = super(this.session);
    }

    static logOut() {
        if (session.isLoggedIn()) {
            loginBtn.addEventListener('click', session.fireLogout());
        }
    }

    static logIn() {
        if (!session.isLoggedIn()) {
            loginBtn.addEventListener('click', LoginModal.show(this.session.fireLogin()));
            // if (LoginModal.getInputs().values === localStorage.users) {
            //     // LoginModal.onSubmit(SessionEvent.CHANGED);
            // }
        }
    }

}



exports.LoginButton = LoginButton;