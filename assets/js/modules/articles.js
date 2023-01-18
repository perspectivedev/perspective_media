const {
    JsonObject,
    JsonDecoder,
    JsonEncoder
} = require('assets/js/modules/jobject.js');


class ArticleSearchFlags {
    // Flags are always: last_flag * 2

    static FLAG_NONE = 0;
    static FLAG_TITLE = 1;
    static FLAG_AUTHOR = 2;
    static FLAG_DATE = 4;
    static FLAG_CONTENT = 8;

    constructor(flags = ArticleSearchFlags.FLAG_NONE) {
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
        return this.value !== ArticleSearchFlags.FLAG_NONE;
    }
}

class Comment extends JsonObject {

    static _FIELDS_ = [
        '_depth',
        '_img',
        '_author',
        '_title',
        '_date',
        '_time',
        '_content',
        '_rating',


    ];

    constructor(depth, image, author, title, date, time, content, rating = 0) {
        super();
        if (arguments.length !== 0) {
            this._depth = depth;
            this._image = image;
            this._author = author;
            this._title = title;
            this._date = date;
            this._time = time;
            this._content = content;
            this._rating = rating;
        }
        // Do nothing because we are loading from storage, hopefully.
    }

    getFields() {
        return Comment._FIELDS_;
    }
}

class Article extends JsonObject {

    static _FIELDS_ = [
        '_author',
        '_title',
        '_date',
        '_time',
        '_img',
        '_content',

        { name: '_comments', type: Comment }
    ];

    constructor(author, title, date, time, image, content, comments = []) {
        super();
        if (arguments.length !== 0) {
            this._author = author;
            this._title = title;
            this._date = date;
            this._time = time;
            this._image = image;
            this._content = content;
            this._comments = comments;
        }
        // Do nothing because we are loading from storage, hopefully.
    }

    getFields() {
        return Article._FIELDS_;
    }

}

const ARTICLES_KEY = 'articles';

class Articles {
    static _list = null;

    // init Articles data
    static init() {
        Articles._list = [];
        const stored = localStorage.getItem(ARTICLES_KEY);
        if (stored !== null) {
            try {
                Articles._list = JsonDecoder.readObject(stored, Article);
            } catch (ex) {
                //JSON can throw exception
                Articles._list = [];
                console.log('Exception', ex);
            }
        }
        // Do nohting is stored is null
    }

    static save() {
        // Save all Users at the given time.
        localStorage.setItem(ARTICLES_KEY, JsonEncoder.writeObject(Articles._list));
    }

    static getArticles() {
        return Articles._list;
    }


    /*
      TODO: Rename user to article j, and update access fields accordingly.
    */

    static search(flags, data) {
        // const flags = new ArticleSearchFlags(flags);

        const result = [];


        return flags;
    }

    static findUser(username) {
        for (const user of Articles.getArticles()) {
            if (user._username === username || user._email === username) {
                return user;
            }
        }
        return null;
    }

}
Articles.init();

exports.Articles = Articles;
exports.ArticleSearchFlags = ArticleSearchFlags;

