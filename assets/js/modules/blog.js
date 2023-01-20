(function () {
    const {
        Articles,
        Article
    } = require('assets/js/modules/articles.js');
    const {
        Widget
    } = require('assets/js/modules/widget.js');
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


    class ArticlePanel {

        _selected = null;

        constructor() {
            this._list = Widget.querySelector('.left-side-panel');

        }

        updateSelected(selected) {
            if (this._selected !== null) {
                this._selected.setSelected(false);
            }
            this._selected = selected;
        }


        init(selectedTitle) {
            for (const article of Articles.getArticles()) {
                this.addItem(article, article.getShortTitle() === selectedTitle);
            }
        }

        addItem(article, selected = false) {
            const item = new ArticleListItem(this, article);
            if (selected) {
                item.setSelected(selected);
            }
            this._list.addChild(item);
        }

        getSelected() {
            return this._selected;
        }
    }

    const ARTICLE_TITLE_KEY = 'articleTitle';

    const articlePanel = new ArticlePanel();

    Articles.addArticleListener(article => {
        articlePanel.addItem(article, Articles.count() === 1);
    });


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
             about my academic journey. I began by enrolling Digital Design at Walla Walla community college, 
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