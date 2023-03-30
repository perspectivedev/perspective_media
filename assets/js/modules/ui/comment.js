(function () {
    // const { Widget } = require('assets/js/modules/ui/widget.js');

    class CommentForm extends Widget {
        //TODO FILL IN
        constructor() {
            super('div', {
                clazz: 'comment-ctrls'
            });

            const postCommentBtn = new Widget('button', {
                clazz: 'add-comment',
            })
                .setAttr('type', 'submit')
                .setText('Post');
        
            console.log(postCommentBtn.on('click', (e) => {
                e.preventDefault();
                console.log('Post test:', e);
            }))
            const form = new Widget('form', 'form-comment');
            const content = new Widget('textarea', {
                clazz: 'txt-comment',
            })
                .setAttr('placeholder', 'Leave a comment');
            const rating = new Widget('div', 'ratings').setText('rating:');
            this.addChild(form, content, rating, postCommentBtn);
        }
    }

    window.CommentForm = CommentForm;
    window.postCommentBtn = CommentForm.postCommentBtn;
    const commentsView = Widget.querySelector('.comment-section');
    if (commentsView !== null) {

    }


    // if (hook !== null) {
    //     let state = false;

    //     hook.addEventListener('click', function (e) {
    //         const func = state ? 'hidden' : 'shown';
    //         const time = state ? '.25' : '.5';
    //         const anim = `${func} ${time}s ease-in 0s 1 forwards`;
    //         form.style.animation = anim;
    //         state = !state;
    //         console.log('Changed:');
    //     });
    // }
    class CommentsPanel extends Widget {

        _formShowing = false;

        _form = null;

        constructor(count = 0) {
            super('div', 'comment-panel');
            let addBtn;
            this.addChild(addBtn = new Widget('span', 'add-btn')
                .setText(`Add Comment ( ${count} )`));
            addBtn.on('click', this.onClick.bind(this));
            const form = this._form = new CommentForm();
            this ? form.setStyle({ display: 'none' }) : form.setStyle({ display: 'grid' });
            this.addChild(form);


        }

        onClick(e) {
            //TODO fill in with something form
            //Toggling and what not.
            console.log('onClick test:');
            this.addBtn;
            const shown = this._formShowing;
            const form = this._form;

            if (shown) {
                form.setStyle({ display: 'none' });
            } else {
                form.setStyle({ display: 'grid' });
            }


            this._formShowing = !shown;
        }
    }


    const item = Widget.querySelector('#user-panel-section');
    if (item !== null) {
        item.addChild(new CommentsPanel());
    }

})();