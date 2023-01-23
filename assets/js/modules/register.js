
const {
    Forms,
    FormValue
} = require('assets/js/modules/util/forms.js');

const {
    UserList
} = require('assets/js/modules/users.js');


const {
    session
} = require('assets/js/modules/util/session.js');

const regBtn = document.getElementById('registration-btn');
if (regBtn !== null) {
    regBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const form = Forms.getRegisterForm();
        if (form !== null) {
            form.clearErrors();
            if (form.validate()) {
                // Create User Data Object and set the keys/values
                const userData = {};
                for (const field of form.getFormValues()) {
                    userData[field.getId()] = field.getValue();
                }
                // User Data is set, lets do stuffs

                // Lets register the user if possible.
                const result = UserList.register(userData);
                if (Array.isArray(result)) {
                    for (const error of result) {
                        if (error === UserList.R_ERROR_USERNAME_EXISTS) {
                            console.log('Username already exists');
                            form.getFormValue('username').setError(error);
                        } else if (error === UserList.R_ERROR_EMAIL_EXISTS) {
                            console.log('Email already exists');
                            form.getFormValue('email').setError(error);
                        } else if (error === UserList.R_ERROR_PASS_MISMATCH) {
                            console.log('Password does not match');
                            for (const field of form.getFormValuesByType(FormValue.PASSWORD)) {
                                field.setError(error);
                            }
                        }
                    }
                    console.log('Form Errors', result);
                } else {
                    // Result is a user obj; do something with it.
                    const user = result;
                    if (!session.fireLogin(user)) {
                        // session already exist 
                        session.fireLogout(user);
                        session.fireLogin(user);
                        form.reset();
                    }
                    console.log('Register successful:', user);
                    // Do stuff with the user
                }
            } else {
                console.log('Form Validate failed');
            }
        } else {
            console.log('Do nothing:', form);
        }
        // Do nothing
    });
}
