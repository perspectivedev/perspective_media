const {
    JsonObject,
    JsonDecoder,
    JsonEncoder
} = require('assets/js/modules/json._decoder.js');


class CommentSearchFlags {
    // Flags are always: last_flag * 2

    static FLAG_NONE = 0;
    static FLAG_TITLE = 1;
    static FLAG_AUTHOR = 2;
    static FLAG_DATE = 4;
    static FLAG_CONTENT = 8;

    constructor(flags = CommentSearchFlags.FLAG_NONE) {
        this._value = flags;
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
        return this.value !== CommentSearchFlags.FLAG_NONE;
    }
}

// // class Comment extends JsonObject {

//     static _FIELDS_ = [
//         '_depth',
//         '_img',
//         '_author',
//         '_title',
//         '_date',
//         '_time',
//         '_content',
//         '_rating',


//     ];

//     constructor(depth, image, author, title, date, time, content, rating = 0) {
//         super();
//         if (arguments.length !== 0) {
//             this._depth = depth;
//             this._image = image;
//             this._author = author;
//             this._title = title;
//             this._date = date;
//             this._time = time;
//             this._content = content;
//             this._rating = rating;
//         }
//         // Do nothing because we are loading from storage, hopefully.
//     }

//     getFields() {
//         return Comment._FIELDS_;
//     }

//     addComment(comments = []) {
//         const stored = localStorage.getItem('comments');
//         const postComments = document.getElementById('post-comments');
//         if (!!stored) {
//             comments = JSON.parse(stored);
//         }
//         comments.push(Comments);
//         localStorage.setItem('comments', JSON.stringify(comments));
//         let userComments = new comments.map(function (comment) {
//             return `
//         <img src="${comment.image}" alt="Photo of User" class="user-pic">
//         <h1 class="comment-title">Hello World</h1>
//         <h1 class="commentor-user-name">${comment.username}</h1>
//         <h1 class="commentor-user-email">${comment.email}</h1>
//         <p class="commentor-article">${comment.content}</p>
//         ` ;
//         })
//         userComments = userComments.join('');
//         postComments.innerHTML = userComments;
//     }

//     onSubmit(e){
//         e.preventDefault();
    
//     }

// }

const COMMENTS_KEY = 'articles';

class Comments {
    static _list = null;

    // init Articles data
    static init() {
        Comments._list = [];
        const stored = localStorage.getItem(COMMENTS_KEY);
        if (stored !== null) {
            try {
                Comments._list = JsonDecoder.readObject(stored, Comment);
            } catch (ex) {
                //JSON can throw exception
                Comments._list = [];
                console.log('Exception', ex);
            }
        }
        // Do nohting is stored is null
    }

    static save() {
        // Save all Users at the given time.
        localStorage.setItem(COMMENTS_KEY, JsonEncoder.writeObject(Comments._list));
    }

    static getComments() {
        return Comments._list;
    }


    /*
      TODO: Rename user to article j, and update access fields accordingly.
    */

    static search(flags, data) {
        // const flags = new CommentSearchFlags(flags);

        const result = [];


        return flags;
    }

    static findUser(username) {
        for (const user of Comments.getComments()) {
            if (user._username === username || user._email === username) {
                return user;
            }
        }
        return null;
    }

}
Comments.init();

// exports.Comment = Comment;
// exports.Comments = Comments;
// exports.CommentSearchFlags = CommentSearchFlags;

