(function () {
    const {
        Articles,
        Article
    } = require('assets/js/modules/articles.js');
    const {
        Widget,
        Modal,
        OverlayModal,
        ResizingTextArea,
    } = require('assets/js/modules/widget.js');

    const {
        session,
        SessionEvent
    } = require('assets/js/modules/util/session.js');

    const Consts = require('assets/js/modules/util/consts.js');

    function getAllMethods(obj, filter) {
        const list = [];
        for (let p = obj.__proto__; p !== null; p = p.__proto__) {
            const names = Object.getOwnPropertyNames(p);
            for (const name of names) {
                if (filter(name)) {
                    list.push(name);
                }
            }
        }
        return list;
    }
    class ArticleContentModal extends OverlayModal {
        constructor() {
            super('base-modal');
            const panel = new Widget('div', 'user-panel-section');

            {
                const header = new Widget('header', {
                    clazz: 'post-article-header',
                });
                this._header = header;

                {
                    const content = new ResizingTextArea({
                        clazz: 'content',
                        attrs: {
                            'placeholder': 'Article Content'
                        }
                    });

                    content.on('resize', (() => {
                        if (this.isVisible()) {
                            this.center();
                        }
                    }).bind(this));
                    content.setMinHeight(15, 'vh');
                    content.setMinWidth(370, 'px');
                    content.setMaxWidth(70, 'vw');
                    content.setMaxHeight(50, 'vh');

                    this._content = content;
                }
                const title = new Widget('input', {
                    clazz: 'title',
                    attrs: {
                        'placeholder': 'Title'
                    }
                });
                this._title = title;

                const imagepreview = new Widget('img', {
                    clazz: 'imagepreview',
                    attrs: {
                        'src': 'assets/images/perspective_blog_img.jpg',
                        'alt': 'Image Missing'
                    }
                });
                this._imagepreview = imagepreview;

                const image = new Widget('input', {
                    clazz: 'image',
                    attrs: {
                        'placeholder': 'Image URL'
                    }
                });
                this._image = image;


                const shortTitle = new Widget('input', {
                    clazz: 'short',
                    attrs: {
                        'placeholder': 'Short Title'
                    }
                });
                this._shortTitle = shortTitle;

                const footer = new Widget('footer', {
                    clazz: 'post-article-footer',
                });
                this._footer = footer;

                header.addChild(new Widget('span').setText('Post Article'));

                {
                    footer.setInnerHtml(Consts.getCopyrightHtml());

                }


                panel.addChild(header);

                const row = new Widget('div', 'article-info-grid');
                row.addChild(imagepreview);


                const col = new Widget('div', 'article-info-col');
                col.addChild(title);
                col.addChild(shortTitle);
                col.addChild(image);
                row.addChild(col);
                panel.addChild(row);
                // End of URLS / Preview Row
                panel.addChild(this._content);
                const postArticleBtn = new Widget('button', 'content-button');
                postArticleBtn.setAttr('type', 'button').setText('Submit');
                postArticleBtn.on('click', this.onPostClick.bind(this));
                panel.addChild(postArticleBtn);
                panel.addChild(footer);
            }
            super.addChild(panel);
        }

        getTitle() {
            return this._title.getNode().value;
        }

        getShortTitle() {
            return this._shortTitle.getNode().value;
        }

        getImage() {
            return this._image.getNode().value;
        }

        getContent() {
            return this._content.getNode().value;
        }

        getPreviewImage() {
            return this._imagepreview.getNode().value;
        }

        onPostClick(e) {
            const title = this.getTitle();
            const shortTitle = this.getShortTitle();
            const image = this.getImage();
            const content = this.getContent();

            const errors = [];

            if (title.trim().length === 0) {
                errors.push('Title is empty');
            }
            if (shortTitle.trim().length === 0) {
                errors.push('Short Title is empty');
            }
            if (image.trim().length === 0) {
                errors.push('Image is empty');
            }
            if (content.trim().length === 0) {
                errors.push('Article Content is empty');
            }
            if (errors.length === 0) {
                const author = session.getUser().getUsername();
                const date = Date.now();
                const article = new Article(author, title, shortTitle, date, image, content);
                //
                const result = Articles.addArticle(article, true, true);
                if (result.success) {
                    this.clearInputs();
                    super.hide();
                    return;
                }
                errors.push(result.error);
            }
            console.log('Should display these!');
            console.log('Errors:', errors);
        }


        clearInputs() {
            this._content.getNode().value = null;
            this._shortTitle.getNode().value = null;
            this._title.getNode().value = null;
            this._image.getNode().value = null;
        }


        static get() {
            if (ArticleContentModal.INSTANCE !== undefined) {
                return ArticleContentModal.INSTANCE;
            }
            const instance = new ArticleContentModal();
            ArticleContentModal.INSTANCE = instance;
            return instance;
        }

    }
    window.ArticleContentModal = ArticleContentModal;
    window.session = session;

    class ArticleListItem extends Widget {
        _selected = false;

        constructor(list, article) {
            super('div', 'article-item');
            this._list = list;
            this._article = article;
            this.on('click', this.onClick.bind(this));

            const container = new Widget('div');
            this._title = new Widget('span');
            this._author = new Widget('b').setText(article.getAuthor());

            container.addChild(this._title);
            container.addChild(new Widget('span').setText(' by'));
            this.addChild(container);
            this.addChild(this._author);
            this.updateTitle(false);
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
            this.updateTitle(selected);
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

        updateTitle(selected) {
            this._title.setText(this.getFormattedTitle(selected));
        }

        getFormattedTitle(long) {
            return `${long ? this._article.getTitle() : this._article.getShortTitle()}`;
        }
    }

    class ArticleContentView {

        static _VIEW = null;

        static init() {
            const image = Widget.querySelector('.article-section>.blogImg');
            const content = Widget.querySelector('.article-section>.article-content');
            const title = Widget.querySelector('.blog-header>.title');
            const date = Widget.querySelector('.blog-header>.date');
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

        static FONT_SIZE = /font-size: ([0-9]+)/;

        static fixContent(content) {



            return content;
        }

        static update(article) {
            const view = ArticleContentView._VIEW;
            if (view === null) {
                return false;
            }
            if (article === null) {
                view.image.addClass('blog-image-err');
                return true;
            }
            view.image.removeClass('blog-image-err');
            view.title.setText(article.getShortTitle());
            view.image.setAttr('src', article.getImage());
            view.content.setInnerHtml(ArticleContentView.fixContent(article.getContent()));
            view.date.setInnerHtml(article.getDateString());
            return true;
        }
    }



    ArticleContentView.init();

    window.ArticleContentView = ArticleContentView;
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
            ArticleContentModal.get().show();
        }

        updateSelected(selected) {
            if (this._selected !== null) {
                this._selected.setSelected(false);
            }
            this._selected = selected;
            ArticleContentView.update(selected.getArticle());
        }

        update() {
            if (session.isLoggedIn()) {
                this._addPost.setStyle(null);
                // this._postControls.setStyle(null);
            } else {
                this._addPost.setStyle(ArticlePanel.HIDDEN_STYLE);
                // this._postControls.setStyle(ArticlePanel.HIDDEN_STYLE);
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
            return item;
        }

        getSelected() {
            return this._selected;
        }
    }

    const ARTICLE_TITLE_KEY = 'articleTitle';

    const articlePanel = new ArticlePanel();

    session.addEventListener(SessionEvent.CHANGED, articlePanel.update.bind(articlePanel));

    Articles.addArticleListener((article, selected) => {
        articlePanel.addItem(article, selected || Articles.count() === 1);
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