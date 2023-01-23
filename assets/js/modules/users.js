

const {
    JsonDecoder, JsonEncoder, JsonObject
} = require('assets/js/modules/util/jobject.js');


class SearchFlags {
    // Flags are always: last_flag * 2

    static FLAG_NONE = 0;
    // 
    static FLAG_USERNAME = 1;
    static FLAG_EMAIL = 2;
    // NOT IMPORTANT RIGHT NOW, JUST REMEMBER FOR FUTURE USE
    static FLAG_FISTNAME = 4;
    static FLAG_LASTNAME = 8;

    constructor() {
        this._value = SearchFlags.FLAG_NONE;
    }

    // Unset
    ust(flag) {
        this._value &= ~flag;
    }
    // Set
    set(flag) {
        this._value |= flag;
    }
    // Check
    has(flag) {
        return (this._value & flag) === flag;
    }
    // Any
    any() {
        console.log('Has an error:', this._value, SearchFlags.FLAG_NONE);
        return this._value !== SearchFlags.FLAG_NONE;
    }
}

/**
 * This is basically the helper that loads the list of users
 * and also updates local storage  of the users.
 * - Can also validate whether or not users password is correct
 * - Can also validate user ids
 * - Can handle a lot of validation per user.
 */
class User extends JsonObject {

    static _FIELDS_ = [
        '_firstname',
        '_lastname',
        '_username',
        '_email',
        '_password',
        '_confirmed',
    ];

    constructor(firstname, lastname, username, email, password, confirmed = false) {
        super();
        if (arguments.length !== 0) {
            this._firstname = firstname;
            this._lastname = lastname;
            this._username = username;
            this._email = email;
            this._password = password;
            this._confirmed = confirmed;
        }
        // Do nothing because we are loading from storage, hopefully.
    }

    getFields() {
        return User._FIELDS_;
    }

    getFirstName() {
        return this._firstname;
    }

    getLastName() {
        return this._lastname;
    }

    getUsername() {
        return this._username;
    }

    getEmail() {
        return this._email;
    }

    getPassword() {
        return this._password;
    }

    getConfirmed() {
        return this._confirmed;
    }
}

const USERS_KEY = 'users';
/**
 * Users is really a stored list of user data 
 * UserData is as follows:
 * -FirstName
 * -LastName
 * _UserName
 * -Email
 * -Password
 * -RegisteredDate
*/
class UserList {
    static _users = null;

    // init UserList data
    static init() {
        UserList._users = [];
        const stored = localStorage.getItem(USERS_KEY);
        if (stored !== null) {
            try {
                UserList._users = JsonDecoder.readObject(stored, User);
            } catch (ex) {
                UserList._users = [];
                console.log('Exception', ex);
            }
        }
        // Do nohting is stored is null
    }

    static save() {
        // Save all Users at the given time.
        localStorage.setItem(USERS_KEY, JsonEncoder.writeObject(UserList._users));
    }

    static getUsers() {
        return UserList._users;
    }

    /*
        This method is for searching to see if register is valid for username / email
    */

    static search(username, email) {
        const flags = new SearchFlags();
        for (const user of UserList.getUsers()) {
            if (user._username === username) {
                flags.set(SearchFlags.FLAG_USERNAME);
            }
            if (user._email === email) {
                flags.set(SearchFlags.FLAG_EMAIL);
            }
        }

        return flags;
    }

    static findUser(username) {
        for (const user of UserList.getUsers()) {
            if (user._username === username || user._email === username) {
                return user;
            }
        }
        return null;
    }
    /**
     * Login Example of userData
     * 
     * {
     *      username: 'Marvis', //username or email 
     *      password: 'testing123',
     *      time: 1379779832, //rnd from Date.now();  const userData['time'] = user.login(userData) - Date.now();
     *
     * } 
     */

    /*
        Validation:
        #1: Username/Email exists
        #2: Test password in the User object

        Returns: 
            String: if error 
            User: if successful login

        Errors:
            #1: No such username / email
            #2: Password is not valid

            Optional:
                #3: Require Confirm?
        
    */
    static ERROR_NO_SUCH_USER = 'No such username';
    static ERROR_PASSWORD_MISMATCH = 'Incorrect password';

    static login(username, password) {
        // process UserData
        const user = UserList.findUser(username);
        if (user === null) {
            return UserList.ERROR_NO_SUCH_USER;
        }

        if (user._password === password) {
            return user;
        }
        return UserList.ERROR_PASSWORD_MISMATCH;
    }

    /*
        Register Example of UserData
        {
            firstname: 'Marvis',
            lastname: 'Knight',
            username: 'mmk78$',
            email: 'marvisknight360@outlook.com',
            password: 'Abc123$',
            confirm: 'Abc123$',
            time: 12943974,
        } 

        keep in mind:
            -Confirmed is not a part of this


            Validation:
                #1: username does not exists
                #2: email does not exists
                #3: password and confirm are the same


            Returns:
                Array: if errors
                User: if successful

            Errors:
            #1: Username exist
            #2: Email exists
            #3: Password & Confirm mismatch
     */

    static R_ERROR_PASS_MISMATCH = 'Password & Confirm do not match';
    static R_ERROR_USERNAME_EXISTS = 'Username already exists';
    static R_ERROR_EMAIL_EXISTS = 'Email already exists';


    static register(userData) {
        // process UserData
        const errors = [];
        // Search for user in the list
        const search = UserList.search(userData.username, userData.email);


        // Validate passwords
        if (userData.password !== userData.confirm) {
            errors.push(UserList.R_ERROR_PASS_MISMATCH);
        }
        // Validate & Process any errors
        if (search.any() || errors.length !== 0) {
            if (search.has(SearchFlags.FLAG_USERNAME)) {
                errors.push(UserList.R_ERROR_USERNAME_EXISTS);
            }
            if (search.has(SearchFlags.FLAG_EMAIL)) {
                errors.push(UserList.R_ERROR_EMAIL_EXISTS);
            }
            return errors;
        }
        // There is no errors, process register

        const user = new User(
            userData.firstname,
            userData.lastname,
            userData.username,
            userData.email,
            userData.password
        );
        // Step 1: Add user to memory
        UserList._users.push(user);
        // Step 2: Save to storage
        UserList.save();
        // Step 3: Successful Register
        return user;
    }
}
UserList.init();

exports.UserList = UserList;
exports.User = User;