const {
    JsonObject,
    JsonDecoder,
    JsonEncoder
} = require('assets/js/modules/util/jobject.js');


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
        //Multi Comment Depth Number (UNUSED AT THE MOMENT)
        '_depth',
        // User Data
        '_img',
        '_author',
        // Post Data
        '_date',
        '_content',
        '_rating',
    ];

    constructor(depth, image, author, date, content, rating = 0) {
        super();
        if (arguments.length !== 0) {
            this._depth = depth;
            this._image = image;
            this._author = author;
            this._date = date;
            this._content = content;
            this._rating = rating;
        }
        // Do nothing because we are loading from storage, hopefully.
    }

    getFields() {
        return Comment._FIELDS_;
    }

    getDepth() {
        return this._depth;
    }

    getImage() {
        return this._image;
    }

    getAuthor() {
        return this._author;
    }
    getDate() {
        return this._date;
    }

    getContent() {
        return this._content;
    }

    getRating() {
        return this._rating;
    }
}
function getSuffix(dateNumber) {
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

function getMonthName(month, short = false) {
    switch (month) {
        case 0: return short ? 'Jan' : 'January';
        case 1: return short ? 'Feb' : 'February';
        case 2: return short ? 'Mar' : 'March';
        case 3: return short ? 'Apr' : 'April';
        case 4: return 'May';
        case 5: return short ? 'Jun' : 'June';
        case 6: return short ? 'Jul' : 'July';
        case 7: return short ? 'Aug' : 'August';
        case 8: return short ? 'Sept' : 'September';
        case 9: return short ? 'Oct' : 'October';
        case 10: return short ? 'Nov' : 'November';
        case 11: return short ? 'Dec' : 'December';
        default: throw new Error('Unsupported month:' + month);
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

    addComments(...comments) {
        console.log('add comment test:', comments);
    }

    getRealDate() {
        return new Date(this._date);
    }

    getDateString() {
        const today = this.getRealDate();
        const month = today.getMonth();
        const date = today.getDate();
        const year = today.getFullYear();
        const suffix = getSuffix(date);
        const ds = `${getMonthName(month)} ${date}<sup>${suffix}</sup>, ${year}`;
        const dt = `${today.toLocaleTimeString()}`;
        return `Posted: ${ds} at ${dt}`;
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

    static _fireAddArticle(article, select) {
        for (const listen of Articles._LISTENERS_) {
            listen(article, select);
        }
    }

    static save() {
        console.log('ArticleList:', Articles._list)
        localStorage.setItem(ARTICLES_KEY, JsonEncoder.writeObject(Articles._list));
    }

    static addArticle(article, fire = true, select = false) {
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
        Articles.save();
        //This can take a little while but for now that's not much of an issue.
        //Ref: Saving to localStorage is a sync method
        if (fire) {
            Articles._fireAddArticle(article, select);
        }
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

