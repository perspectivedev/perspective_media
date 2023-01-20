(function () {
    const {
        Articles,
        Article
    } = require('assets/js/modules/articles.js');
    const {
        Widget
    } = require('assets/js/modules/widget.js');
    const {
        session,
        SessionEvent
    } = require('assets/js/modules/session.js');

    class ArticleListItem extends Widget {
        _selected = false;

        constructor(list, article) {
            super('div', 'article-item');
            this._list = list;
            this._article = article;
            this.on('click', this.onClick.bind(this));
            this.setInnerHtml(this.getFormattedTitle(false));
        }

        setSelected(selected) {
            if (this._selected === selected) {
                return false;
            }
            if (this._selected) {
                this.removeClass('expanded');
            }
            if (selected) {
                this.addClass('expanded');
            }
            this.setInnerHtml(this.getFormattedTitle(selected));
            this._selected = selected;
            return true;
        }

        onClick(e) {
            if (this.setSelected(true)) {
                this._list.updateSelected(this);
            }
        }

        getArticle() {
            return this._article;
        }

        getFormattedTitle(long) {
            return `${long ? this._article.getTitle() : this._article.getShortTitle()} by <b>${this._article.getAuthor()}</b>`;
        }
    }

    class ArticleContentView {

        static _VIEW = null;
        //height: ; border:none; box-shadow: none;
        static ERROR_STYLE = {
            'height': '250px',
            'border': 'none',
            'box-shadow': 'none'
        };

        static init() {
            const image = Widget.querySelector('.article-section>.blogImg');
            const content = Widget.querySelector('.article-section> .article-content');
            const title = Widget.querySelector('.blog-header > .title');
            const date = Widget.querySelector('.blog-header > .date');
            if (image !== null && content !== null && title !== null && date !== null) {
                ArticleContentView._VIEW = {
                    image: image,
                    content: content,
                    title: title,
                    date: date,
                };
            }
            if (ArticleContentView._VIEW === null) {
                console.log(`ArticleContentView failed to init:`, image, content, title, date);
            }
        }

        static update(article) {
            const view = ArticleContentView._VIEW;
            if (view === null) {
                return false;
            }
            if (article === null) {
                view.image.setStyle(ArticleContentView.ERROR_STYLE);
                return true;
            }
            view.image.setStyle(null);
            view.title.setInnerHtml(article.getShortTitle());
            view.image.setAttr('src', article.getImage());
            view.content.setInnerHtml(article.getContent());
            view.date.setInnerHtml(article.getDateString());
            return true;
        }
    }

    ArticleContentView.init();
    class ArticlePanel {

        static HIDDEN_STYLE = {
            'display': 'none'
        };

        _selected = null;

        constructor() {
            this._list = Widget.querySelector('.left-side-panel');
            this._addPost = Widget.querySelector('.submit-blog');
            this._postControls = Widget.querySelector('.user-controls');

            this._addPost.on('click', this.onAddPostClick.bind(this));
        }

        onAddPostClick(e) {
            console.log('WE need to show a modal!');
        }

        updateSelected(selected) {
            if (this._selected !== null) {
                this._selected.setSelected(false);
            }
            this._selected = selected;
            ArticleContentView.update(selected.getArticle());
        }

        update() {
            console.log('Article update', session);
            if (session.isLoggedIn()) {
                this._addPost.setStyle(null);
                this._postControls.setStyle(null);
            } else {
                this._addPost.setStyle(ArticlePanel.HIDDEN_STYLE);
                this._postControls.setStyle(ArticlePanel.HIDDEN_STYLE);
            }
        }

        init(selectedTitle) {
            for (const article of Articles.getArticles()) {
                this.addItem(article, article.getShortTitle() === selectedTitle);
            }
            if (this._selected === null) {
                ArticleContentView.update(null);
            }
        }

        addItem(article, selected = false) {
            const item = new ArticleListItem(this, article);
            if (selected) {
                item.setSelected(selected);
                this.updateSelected(item);
            }
            this._list.addChild(item);
        }

        getSelected() {
            return this._selected;
        }
    }

    const ARTICLE_TITLE_KEY = 'articleTitle';

    const articlePanel = new ArticlePanel();

    session.addEventListener(SessionEvent.CHANGED, articlePanel.update.bind(articlePanel));

    Articles.addArticleListener(article => {
        articlePanel.addItem(article, Articles.count() === 1);
    });
    articlePanel.update();
    if (Articles.count() === 0) {
        const art = new Article(
            'Marvis Knight',
            'Hello World from Digital Design',
            'Hello World',
            1573929670230,
            'assets/images/perspective_blog_img.jpg',
            `Introductions are in order here. First, 
             let me introduce myself: Marvis Knight.
             I have had a interesting entry into the web development community. 
             An article for different time perhaps. For now, I would like to talk 
             about my academic journey. I began by enrolling in Digital Design at Walla Walla community college, 
             my instructor was Mr. Dale Chapman.`
        );
        const result = Articles.addArticle(art);
        if (!result.success) {
            throw new Error('Failed to init Hello World Article');
        }

    } else {
        const value = location.search;
        if (value === '') {
            articlePanel.init('Hello World');
            console.log('Blog Added -- TEST 2');
        } else {
            const search = new URLSearchParams(value);
            let initArticle = null;
            if (search.has(ARTICLE_TITLE_KEY)) {
                initArticle = search.get(ARTICLE_TITLE_KEY);
            }
            articlePanel.init(initArticle);
            console.log('Blog Added -- TEST 3', initArticle);
        }
    }

})();