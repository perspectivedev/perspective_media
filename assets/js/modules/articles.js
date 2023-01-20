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
        '_titleShort',
        '_date',
        '_image',
        '_content',

        { name: '_comments', type: Comment }
    ];

    constructor(author, title, titleShort, date, image, content, comments = []) {
        super();
        if (arguments.length !== 0) {
            this._author = author;
            this._title = title;
            this._titleShort = titleShort;
            this._date = date;
            this._image = image;
            this._content = content;
            this._comments = comments;
        }
        // Do nothing because we are loading from storage, hopefully.
    }

    getAuthor() {
        return this._author;
    }

    getTitle() {
        return this._title;
    }

    getShortTitle() {
        return this._titleShort;
    }

    getDate() {
        return this._date;
    }

    getImage() {
        return this._image;
    }

    getContent() {
        return this._content;
    }

    getComments() {
        return this._comments;
    }

    toRealDate() {
        return new Date(this._date);
    }

    getFields() {
        return Article._FIELDS_;
    }
}

const ARTICLES_KEY = 'articles';

class Articles {
    static _list = null;
    static _LISTENERS_ = [];

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

    static addArticleListener(handler) {
        if (!Articles._LISTENERS_.includes(handler)) {
            Articles._LISTENERS_.push(handler);
        }
    }

    static _fireAddArticle(article) {
        for (const listen of Articles._LISTENERS_) {
            listen(article);
        }
    }

    static save() {
        console.log('ArticleList:', Articles._list)
        localStorage.setItem(ARTICLES_KEY, JsonEncoder.writeObject(Articles._list));
    }

    static addArticle(article) {
        const found = Articles._list.filter(item => {
            return item.getTitle() === article.getTitle();
        });

        if (found.length !== 0) {
            return {
                success: false,
                error: 'Article already exists'
            };
        }
        Articles._list.push(article);
        Articles.save();//This can take a little while but for now that's not much
        Articles._fireAddArticle(article);
        return {
            success: true,
            article: article
        };
    }

    static getArticles() {
        return Articles._list;
    }

    static count() {
        return Articles._list.length;
    }

    static search(flags, data) {
        // const flags = new ArticleSearchFlags(flags);

        const result = [];


        return flags;
    }
}
Articles.init();

exports.Articles = Articles;
exports.Article = Article;
exports.ArticleSearchFlags = ArticleSearchFlags;

