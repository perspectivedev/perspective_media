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
        this._userId = null;
    }

    isLoggedIn() {
        return this._loggedIn;
    }

    getUserId() {
        return this._userId;
    }

    fireLogin(userId) {
        if (this._loggedIn) {
            return false;
        }
        this._userId = userId;
        this._loggedIn = true;
        this.setLocalStorage(true, userId);
        super.dispatchEvent(SessionEvent.newLogin({
            user: userId
        }));
        return true;
    }

    fireLogout() {
        if (!this._loggedIn) {
            return false;
        }
        let temp = this._userId;
        this._loggedIn = false;
        this._userId = null;
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
            this._userId = userData.user;
        }
    }

    setLocalStorage(loggedIn, userId) {
        if (loggedIn) {
            localStorage.setItem(Session.STORAGE_KEY, JSON.stringify({
                loggedIn: loggedIn,
                user: userId
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
