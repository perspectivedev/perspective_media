const { Widget } = require('assets/js/modules/widget.js');
const {
    ContactModal,
    LoginModal
} = require('assets/js/modules/modals.js');

const {
    session,
    SessionEvent
} = require('assets/js/modules/session.js');

class PerspectiveMedia {
    static init() {
        const pm = new PerspectiveMedia();
        //Add the handlers to the Modal's buttons
        pm.initModals();
        //Update the User State for the current page.
        pm.updateUserState();

        //Init any data that is for the current page.
        pm.initPageData();
    }

    initModals() {
        const openContact = Widget.getById('open-contact-modal-btn');
        if (openContact !== null) {
            openContact.on('click', _ => {
                ContactModal.show();
            });
        }

        const logButton = Widget.getById('login-btn');
        if (logButton !== null) {
            logButton.on('click', (e => {
                if (session.isLoggedIn()) {
                    //This is where logout functionality comes into play.
                    session.fireLogout();
                    this.updateUserState();
                    return;
                }
                LoginModal.show(this.onUserLogin.bind(this));
            }).bind(this));
            this._bLogin = logButton;
        }
        const bRegister = Widget.getById('register-button');
        if (bRegister !== null) {
            this._bRegister = bRegister;
        }
    }

    /**
     * All this is doing is check if we have non-empty fields
     */
    isLoginValid(modal) {
        let valid = true;
        for (const input of modal.getInputs().values()) {
            if (input.getValue() === '') {
                valid = false;
            }
        }
        return valid;
    }

    onUserLogin(modal) {
        if (this.isLoginValid(modal)) {
            //Get the input from the modal
            const email = modal.getInput('email').getValue();
            console.log('We are logged in with email:', email);
            session.fireLogin({
                'email': email,
                'extra': 'This is their custom greeting'
            });
            this.updateUserState();
            return true;
        }
        return false;
    }

    updateUserState() {
        if (!this._bLogin) {
            console.warn('Login Button was not found on init');
        }
        if (!this._bRegister) {
            console.warn('Register Button was not found on init');
        }
        //This only runs when the page is loaded, basically checking if we changed pages and have a valid session
        //If so turn the login button text back to logout.    
        const siteHeader = Widget.querySelector('.hero-text');
        if (session.isLoggedIn()) {
            //If we load and we are logged in then we update here
            //If we login  we also update here.
            this._bLogin.setText('Logout');
            this._bRegister.setStyle({
                'display': 'none'
            });
            const userData = session.getUser();
            if (siteHeader !== null) {
                siteHeader.setText(`Welcome ${userData.email}`);
            }
        } else {
            //We are not logged in so set the buttons to login even though they should already be unless you
            //just logged out.
            this._bLogin.setText('Login');
            if (siteHeader !== null) {
                siteHeader.setText(`Its how you see it.`);
            }
            this._bRegister.setStyle({
                'display': 'list-item'
            });
            console.log('User is not logged in');
        }
    }

    static LOG_PAGES = true;

    initPageData() {
        //Get the 
        const path = location.pathname;
        if (path.startsWith('/') && path.endsWith('.html')) {
            const page = path.substring(1, path.indexOf('.'));

            const fn = `load_${page}_page`;
            const func = this[fn];
            if (!!func) {
                func.call(this);
            } else {
                if (PerspectiveMedia.LOG_PAGES)
                    console.warn('We dont have a page handler for:', page);
            }
        }
    }

    load_blog_page() {
        console.log('We should be loading blog data');
        const commentArticle = document.querySelector('.comments');
        function addUserComments(comments = []) {
            let displayCommentList = comments.map(function (comment) {
                return `
        <div class="post-comment" id="id">
        <img src="${comment.userImg}" alt="Photo of User" class="user-pic">
        <h1 class="comment-title">Hello World</h1>
        <h1 class="commentor-user-name">${comment.userName}</h1>
        <h1 class="commentor-user-email">${comment.userEmail}</h1>
        <p class="commentor-article">${comment.userComment}</p>
        </div>
        `
            });
            displayCommentList = displayCommentList.join('');
            commentArticle.innerHTML = displayCommentList;
        }

        const userCommentValues = JSON.parse(localStorage.getItem('userCommentValues')) || [];
        addUserComments(userCommentValues);
    }

}
//This basically tells the page we just reran let's init the user state and any other stuff.
PerspectiveMedia.init();







//This is a bunch of comments for some stuff.
{
    // global variables
    // const container = document.querySelectorAll('#body-container');
    // // console.log(container);
    // const time = document.getElementById('current-time');
    // const clientName = document.getElementById('client-name');
    // const clientMessage = document.getElementById('client-message');
    // const displayAmPm = true;


    // // landing page functions
    // function currentTime(){
    //     let today = new Date();
    //     let hour = today.getHours();
    //     let min = today.getMinutes();
    //     let sec = today.getSeconds();

    //     // Set AM or PM
    //     const amPM = hour >= 12 ? 'PM' : 'AM';

    //     // 12hr format
    //     hour = hour % 12 || 12;

    //     // Output time
    //     time.innerHTML = `${hour}<span>:</span>${zeroToTime(min)}<span>:</span>${zeroToTime(sec)} ${displayAmPm ? amPM : ''}`;

    //     setTimeout(currentTime, 1000);
    // }

    // // add zeros
    // function zeroToTime(n){
    //     return (parseInt(n, 10) < 10 ? '0' : '') + n;
    // }

    // set background and greeting
    // function setBackgroundGreeting(){
    //     let today = new Date();
    //     let hour = today.getHours();


    //     if(hour < 12){
    //         // morning
    //         // DocumentFragment.body.style.backgroundImage = url(../images/perspective2.jpg);
    //         // greeting.textContent = 'Good Morning';
    //     }else if(hour < 18){
    //         // afternoon
    //                 // DocumentFragment.body.style.backgroundImage = url(../images/perspective2.jpg);
    //         // greeting.textContent = 'Good Afternoon';

    //     }else{
    //         // evening
    //                 // DocumentFragment.body.style.backgroundImage = url(../images/perspective2.jpg);
    //         // greeting.textContent = 'Good Evening';
    //     }
    // }
    // currentTime();


    //     function getClientName(){
    //         if(localStorage.getItem('name') === null){
    //         clientName.textContent = `${'[Enter name].'}`;
    //     } else {
    //         clientName.textContent = localStorage.getItem('name');
    //     }
    // }
    // // set client name

    // function setClientName(e){
    //     if(e.type === 'keypress'){
    //         if(e.keyCode == 13){
    //             localStorage.setItem('name', e.target.innerText);
    //             clientName.blur();
    //         }
    //     }else{
    //         localStorage.setItem('name', e.target.innerText);
    //     }
    // }
    // console.log(setClientName.textContent);
    // // Get client message 

    // function getClientMessage(){
    //     if(localStorage.getItem('message') === null){
    //         clientMessage.textContent = `${'[Your message].'}`;
    //     } else {
    //         clientMessage.textContent = localStorage.getItem('message');
    //     }
    // }
    // // set client message

    // function setClientMessage(e){
    //     if(e.type === 'keypress'){
    //         if(e.keyCode == 13){
    //             localStorage.setItem('message', e.target.innerText);
    //             clientMessage.blur();
    //         }
    //     }else{
    //         localStorage.setItem('message', e.target.innerText);
    //     }
    // }
    // console.log(setClientMessage.textContent);
    // getClientName();
    // getClientMessage();
    // // setClientMessage();
    // // setClientName();

    // // Call function()'s before eventListeners

    // // addEventListener
    // clientName.addEventListener('keypress', setClientName);
    // clientName.addEventListener('blur', setClientName);
    // clientMessage.addEventListener('keypress', setClientMessage);
    // clientMessage.addEventListener('blur', setClientMessage);
}