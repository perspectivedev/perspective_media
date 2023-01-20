// variables for the blog article
const articleForm = document.getElementById('author-form');
const title = document.getElementById('title');
const date = document.getElementById('date');
const time = document.getElementById('time');
const img = document.getElementById('img');
const post = document.querySelector('.post');
const blog = document.getElementById('blog');
const postArticleBtn = document.getElementById('post-article-btn');
const postComments = document.getElementById('post-comments');
const addCommentBtn = document.getElementById('add-comments');



class Articles {

    constructor(author, titles, dates, times, images, posts) {
        this._author = author;
        this._titles = titles;
        this._dates = dates;
        this._times = times;
        this._images = images;
        this._posts = posts;
    }



    currentDate() {
        let today = new Date();
        let month = today.getMonth();
        let date = today.getDate();
        let year = today.getFullYear();
        let suffix = getSuffix(date);
        // date.innerHTML = `${getMonthName(month)}&ensp;${date}<sub>${suffix}</sub>,&ensp;${year}`;
    }

     getMonthName(month) {
        const date = new Date().setMonth(month);
        return Intl.DateTimeFormat('en-US', { month: "long" }).format(date);
    }

    getSuffix(dateNumber) {
        switch (dateNumber) {
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


    currentTime() {
        let today = new Date();
        let hour = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();

        const amPm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12 || 12;

        // time.innerHTML = `${hour}<span>:</span>${zeroToTime(min)}<span>:</span>${zeroToTime(sec)}${amPm ? amPm : ''}`;

        setTimeout(currentTime, 1000);
    }

    zeroToTime(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }


    // TODO: This is the right spot, however the code is looking good! 
    // I'm glad that you are learning what I am trying to teach you.
    // onSubmitArticle(e){
    //     e.preventDefault();
    //     articleForm.reset(); 
    // }

    // displayPost(){
    //     return `
    //      <header class="blog-header">
    //         <h1 id="title" class="article-title">${title}</h1>
    //         <h2 id="date" class="article-date">${date}</h2>
    //         <h2 id="time" class="article-time">${time}</h2>
    //     </header>
    //     <div class="article-section">
    //         <img src=${img} id="img" class="blogImg" alt=${title} />
    //         <p  class="content">${post}</p>
    //     </div>`
    // }
}


function submitPost(e) {
    e.preventDefault();
    addBlogs();
}

function addBlogs(blogs = []) {
    const stored = localStorage.getItem('blogs');
    if (!!stored) {
        blogs = JSON.parse(stored);
    }
    blogs.push(Articles);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    let userPosts = blogs.map(function (blog) {
        return `
         <header class="blog-header">
            <h1 id="title" class="article-title">${blog.title}</h1>
            <h2 id="date" class="article-date">${blog.date}</h2>
            <h2 id="time" class="article-time">${blog.time}</h2>
        </header>
        <div class="article-section">
            <img src=${blog.images} id="img" class="blogImg" alt=${blog.title} />
            <p class="article-content">${blog.post}</p>
        </div>` ;
    })
    userPosts = userPosts.join('');
    postBlog.innerHTML = userPosts;
}

if (postArticleBtn !== null)
    postArticleBtn.addEventListener('click', submitPost);


    
exports.Articles = Articles;
exports.submitPost = submitPost;
exports.addBlogs = addBlogs;
