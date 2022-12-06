// global variables
const container = document.getElementById('#container');
const postSection = document.getElementById('#post-section');
const articleTitle = document.querySelector('.article-title');
const article = document.querySelector('.date');
const articleDate = document.querySelector('.article-date');
let articleTime = document.querySelector('.article-time');
const articleContent = document.querySelector('.article-content');
const displayAmPm = true;



class Blog {
constructor(id,title,date,time,content) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
    this.content = content;
}
}

// function()'s
function currentDate(){
    let today = new Date();
    let month = today.getMonth();
    let date = today.getDate();
    let year = today.getFullYear();

    articleDate.innerHTML = `${getMonthName(month)}&ensp;${date}<sub>th</sub>,&ensp;${year}`;
}

function getMonthName(month) {
    const date = new Date().setMonth(month);
    return Intl.DateTimeFormat('en-US', { month: "long" }).format(date);
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

function getPost(){
    
}
currentDate();
currentTime();
console.log(Blog.prototype);