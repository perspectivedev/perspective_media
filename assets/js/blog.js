// global variables
const container = document.getElementById('#container');
// post section
const postSection = document.getElementById('#post-section');
let articleTitle = document.querySelector('.article-title');
let article = document.querySelector('.date');
let articleDate = document.querySelector('.article-date');
let articleTime = document.querySelector('.article-time');
let articleContent = document.querySelector('.article-content');
// btn controls
const deleteCommentBtn = document.querySelector('.delete-comment');
const editCommentBtn = document.querySelector('.edit-comment');
const submitBtn = document.querySelector('.add-comment');
const inputSection = document.querySelector('.input-section');
// form error section
const userNameEl = document.querySelector('#user-name-err');
const userEmailEl = document.querySelector('#user-email-err');
const userCommetEl = document.querySelector('#user-comment-err');
const userWebsiteEl = document.querySelector('#user-website-err');
const userImgEl = document.querySelector('#user-img-err');
// comment section
const commentArticle = document.querySelector('.comments');
const postComment = document.querySelector('.post-comment');
const clearBtn = document.querySelector('.clear-btn');
const displayAmPm = true;
const errors = {};
let editElement;
let editFlag = false;
let editID = '';

// form variables
const userCommentForm = document.querySelector('.comment-form');
const userWebsite = document.querySelector('.user-website');
// const userCommentValues = JSON.parse(localStorage.getItem('userCommentValues')) || [];
// console.log(userCommentValues);

// submit btn function
function submitCommentForm(e){
    e.preventDefault();
    const userName = document.querySelector('.user-name').value;
    const userEmail = document.querySelector('.user-email').value;
    const userImg = document.querySelector('.user-img').value;
    const userComment = document.querySelector('.user-comment').value;
    const id = new Date().getTime();
    const user = {
        id: id,
        userName: userName,
        userEmail: userEmail,
        userImg: userImg,
        userComment: userComment,
        done: true
    }
    
    const userCommentValues = JSON.parse(localStorage.getItem('userCommentValues')) || [];
    userCommentValues.push(user);
    localStorage.setItem('userCommentValues', JSON.stringify(userCommentValues));
    addUserComments(userCommentValues);
    this.reset();
}
// console.log(userCommentValues);

function addUserComments(comments = []){
    
    let displayCommentList = comments.map(function(comment){
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
// event listener
userCommentForm.addEventListener('submit', submitCommentForm);

// run function()'s
// addUserComments(userCommentValues);



// function()'s
function currentDate(){
    let today = new Date();
    let month = today.getMonth();
    let date = today.getDate();
    let year = today.getFullYear();
    let suffix = getSuffix(date);
    articleDate.innerHTML = `${getMonthName(month)}&ensp;${date}<sub>${suffix}</sub>,&ensp;${year}`;
}

function getMonthName(month) {
    const date = new Date().setMonth(month);
    return Intl.DateTimeFormat('en-US', { month: "long" }).format(date);
}

function getSuffix(dateNumber){
    switch (dateNumber){
        case 1:
        case 21:
        case 31:
            return 'st';
        case 2:
        case 22:
            return 'nd';
        case 3:
        case 23:
            return 'rd';
        default:
            return 'th';
    }
}

function currentTime(){
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    const amPm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    articleTime.innerHTML = `${hour}<span>:</span>${zeroToTime(min)}<span>:</span>${zeroToTime(sec)}${displayAmPm ? amPm : ''}`;

    setTimeout(currentTime, 1000);
}

function zeroToTime(n){
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

currentDate();
currentTime();