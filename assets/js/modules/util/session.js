/*
 * Session Functions DO NOT EDIT unless required. 
 */

const { User } = require('assets/js/modules/users.js');
const {
    JsonDecoder, JsonEncoder
} = require('assets/js/modules/util/jobject.js');

class SessionEvent extends Event {
    static CHANGED = 'session.changed';

    constructor(user) {
        super(SessionEvent.CHANGED);
        this._user = user;
    }

    // This is a login event
    isLoginEvent() {
        return this._user !== null;
    }

    // This is a logout event
    isLogoutEvent() {
        return this._user === null;
    }
}

class Session extends EventTarget {
    static STORAGE_KEY = 'session';

    constructor() {
        super();
        this._user = null;
    }

    /**
     * This method is used to check weather or not we have a session
     * 
     * @returns {true} if there is a session 
     * @returns {false} if there is not a session
     */

    isLoggedIn() {
        return this._user !== null;
    }

    /**
     * 
     * @returns {User} if there is a session
     * @returns {null} if there is no session
     */

    getUser() {
        return this._user;
    }

    /**
     * 
     * This basically sets the login state of the current user.
     * 
     * @param {object} user data of who is logged in 
     * @returns true if login successful, false if already loggedIn
     */

    fireLogin(user) {
        if (this.isLoggedIn()) {
            return false;
        }
        this._user = user;
        this.setLocalStorage(user);
        super.dispatchEvent(new SessionEvent(user));
        return true;
    }


    /**
     * 
     * This handles logging out..
     * 
     * @returns true if logged out, false is not logged in
     */

    fireLogout() {
        if (!this.isLoggedIn()) {
            return false;
        }
        this._user = null;
        this.setLocalStorage(null);
        super.dispatchEvent(new SessionEvent(null));
        return true;
    }

    /**
     * This is an internal Function you won't be calling it yourself.
     * 
     */

    loadLocalStorage() {
        const stored = localStorage.getItem(Session.STORAGE_KEY);
        if (stored !== null) {
            //TODO: Should process the info and make sure it is valid..
            this._user = JsonDecoder.readObject(stored, User);
        }
    }

    /*
    This is also a internal function
    */

    setLocalStorage(user) {
        if (user !== null) {
            localStorage.setItem(Session.STORAGE_KEY, JsonEncoder.writeObject(user));
        } else {
            localStorage.removeItem(Session.STORAGE_KEY);
        }
    }
}

const session = new Session();
session.loadLocalStorage();
exports.session = session;
exports.SessionEvent = SessionEvent;
/*
    Using this class is basically

    const {
        session
    } = require('the/path/to/session.js');

    //to login
    session.fireLogin(USER_DATA_HERE); //UserData can be an object or an id or whatever you want.

    //to log out
    session.fireLogout();

    //to check if user is logged in or really (Session is valid)
    const boolState = session.isLoggedIn(); //This is true or false if there is a session
    //If you want a session fireLogin
    //Basically if you look at somewhere there is a function called updateUserState(); 
    //Which handles the setting and unsetting of the login button text.

    or 
        
    session.addEventListener(SessionEvent.CHANGED, (e) => {
        //Do stuff.
        console.log('Do stuff with session changed:', e);
    });
*/