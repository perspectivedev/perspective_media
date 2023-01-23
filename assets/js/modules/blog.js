(function () {
    const {
        Articles,
        Article
    } = require('assets/js/modules/articles.js');
    const {
        Widget,
        Modal,
        OverlayModal,
    } = require('assets/js/modules/widget.js');

    const {
        session,
        SessionEvent
    } = require('assets/js/modules/session.js');


    class ArticleContentModal extends OverlayModal {
        constructor() {
            super('base-modal');
            const panel = new Widget('div', 'user-panel-section');

            {
                const header = new Widget('header', {
                    clazz: 'post-article-header',
                });
                this._header = header;

                const content = new Widget('textarea', {
                    clazz: 'content',
                    attrs: {
                        'placeholder': 'Article Content'
                    }
                });
                this._content = content;

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
                        'alt': 'Image missing'
                    }
                });
                this._imagepreview = imagepreview;

                const image = new Widget('input', {
                    clazz: 'image',
                    attrs: {
                        'placeholder': 'url()'
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

                header.addChild(new Widget('h1')
                    .addChild(new Widget('span')
                        .setText('Post Article')));

                footer.addChild(new Widget('p')
                    .addChild(new Widget('span', 'company')
                        .setText('Perspective')));



                panel.addChild(header);
                panel.addChild(footer);
                panel.addChild(shortTitle);
                panel.addChild(imagepreview);
                panel.addChild(image);
                panel.addChild(title);
                panel.addChild(content);
                const postArticleBtn = new Widget('button', 'content-button');
                postArticleBtn.setAttr('type', 'button').setText('Submit');
                postArticleBtn.on('click', this.onPostClick.bind(this));
                panel.addChild(postArticleBtn);
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

        getPostField() {



            return this._fields.getNode().value;
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
                console.log('No errors time to do stuff.');
                console.log('Inputs:', shortTitle, title, content, image);
                console.log('Post Clicked', this);
                this.clearInputs();
                this.postArticle();
            } else {
                console.log('Should display these!');
                console.log('Errors:', errors);
            }
        }


        clearInputs() {
            this._content.getNode().value = null;
            this._shortTitle.getNode().value = null;
            this._title.getNode().value = null;
            this._image.getNode().value = null;
        }

        updateArticle() {
            // Posting the Article is not by updating the content.. 
            // Update the content.


            // const content = this.getContent();
            // document.querySelector('.article-content').setInnerHtml = content;
            // const shortTitle = this.getShortTitle();
            // document.querySelector('.title').setInnerHtml = shortTitle;
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
            console.log('WE need to show a modal!');

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
            console.log('Article update', session);
            if (session.isLoggedIn()) {
                this._addPost.setStyle(null);
                // this._postControls.setStyle(null);
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