class SessionEvent extends Event {
    static LOGIN = 'session.login';
    static LOGOUT = 'session.logout';

    constructor(name, data) {
        super(name);
        this.data = data;
    }

    static newLogin(data) {
        return new SessionEvent(SessionEvent.LOGIN, data);
    }

    static newLogout(data) {
        return new SessionEvent(SessionEvent.LOGOUT, data);
    }
}

class Session extends EventTarget {
    static STORAGE_KEY = 'session';

    constructor() {
        super();
        this._loggedIn = false;
        this._user = null;
    }

    isLoggedIn() {
        return this._loggedIn;
    }

    getUser() {
        return this._user;
    }

    /**
     * 
     * @param {object} user data of who is logged in 
     * @returns true if login successful, false if already loggedIn
     */
    fireLogin(user) {
        if (this._loggedIn) {
            return false;
        }
        this._user = user;
        this._loggedIn = true;
        this.setLocalStorage(true, user);
        super.dispatchEvent(SessionEvent.newLogin({
            user: user
        }));
        return true;
    }

    /**
     * 
     * @returns true if logged out, false is not logged in
     */
    fireLogout() {
        if (!this._loggedIn) {
            return false;
        }
        let temp = this._user;
        this._loggedIn = false;
        this._user = null;
        this.setLocalStorage(false);
        super.dispatchEvent(SessionEvent.newLogout({
            user: temp
        }));
        return true;
    }

    loadLocalStorage() {
        const stored = localStorage.getItem(Session.STORAGE_KEY);
        if (stored !== null) {
            const userData = JSON.parse(stored);
            this._loggedIn = userData.loggedIn;
            this._user = userData.user;
        }
    }

    setLocalStorage(loggedIn, user) {
        if (loggedIn) {
            localStorage.setItem(Session.STORAGE_KEY, JSON.stringify({
                loggedIn: loggedIn,
                user: user
            }));
        } else {
            localStorage.removeItem(Session.STORAGE_KEY);
        }
    }
}

const session = new Session();
session.loadLocalStorage();
exports.session = session;
exports.SessionEvent = SessionEvent;