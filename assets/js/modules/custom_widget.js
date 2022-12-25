const {
    Widget
} = require('assets/js/modules/widget.js');

class PasswordInput extends Widget {
    static EYE_SHOW = String.fromCharCode(0xF070);
    static EYE_HIDE = String.fromCharCode(0xF06E);

    constructor(name, groupClass, inputId) {
        super('div', groupClass);
        this._input = Widget.input('password', {
            clazz: groupClass,
            id: inputId
        });
        this._input.setAttr('name', name);
        this._visibleIcon = Widget.div({
            id: 'visibility',
            clazz: 'fa visible'
        }).setInnerHtml(PasswordInput.EYE_SHOW);
        this._visibleIcon.on('click', this.toggleVisible.bind(this));
        this._visble = false;
        super.addChild(this._input);
        super.addChild(this._visibleIcon);
    }

    //toggleVisibility()
    toggleVisible() {
        if (!this._visble) {
            this._input.setAttr('type', 'text');
            this._visibleIcon.setInnerHtml(PasswordInput.EYE_HIDE);
        } else {
            this._input.setAttr('type', 'password');
            this._visibleIcon.setInnerHtml(PasswordInput.EYE_SHOW);
        }
        this._visble = !this._visble;//Flip the bool from false to true or vice-versa
    }

    getInput() {
        return this._input;
    }
}
exports.PasswordInput = PasswordInput;