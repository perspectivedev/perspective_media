class Widget {
    static WRAP_KEY = '--wrap--';
    /**
     *
     * @param {*} type This is the dom element type ie. div, span, header, body, head, html, etc
     * @param {*} clazz | options
     *
     * Options is like such:
     *      id: 'element id',
     *      text: 'element inner text',
     *      innerHtml: 'Inner HTML Text',
     *      clazz: 'element class',
     *      style: 'element style object, such as { 'color': 'red' },
     *      attrs: 'element attrs object, such as {
     *                                              'type': 'text',
     *                                              'name': 'username'
     *                                             }
     *
     * @returns
     */
    constructor(type, clazz = '') {
        if (type === Widget.WRAP_KEY) {
            this._node = clazz;
            return;
        }
        this._node = document.createElement(type);
        if (typeof clazz === 'object') {
            const options = clazz;
            if (options.id) {
                this.setAttr('id', options.id);
            }
            if (options.clazz) {
                this.setClasses(options.clazz);
            }
            if (options.style) {
                if (typeof options.style !== 'object') {
                    throw new TypeError('Style must be an object');
                }
                this.setStyle(options.style);
            }
            if (options.attrs) {
                if (typeof options.attrs !== 'object') {
                    throw new TypeError('Attrs must be an object');
                }
                const attrs = Object.entries(options.attrs);
                for (const attr of attrs) {
                    this.setAttr(attr[0], attr[1]);
                }
            }
            if (options.text) {
                if (typeof options.text !== 'string') {
                    throw new TypeError('Text must be a string');
                }
                this.setText(options.text);
            }
            if (options.innerHtml) {
                if (typeof options.innerHtml !== 'string') {
                    throw new TypeError('InnerHtml must be a string');
                }
                this.setInnerHtml(options.innerHtml);
            }
        } else if (typeof clazz === 'string') {
            this.setClasses(clazz);
        }
    }
    setClasses(classes) {
        if (typeof classes === 'string' && classes !== "") {
            this._node.classList = classes;
        }
        return this._node;
    }

    setInnerHtml(html) {
        this._node.innerHTML = html;
        return this;
    }

    getInnerHtml() {
        return this._node.innerHTML;
    }

    setAttr(name, value) {
        this._node.setAttribute(name, value);
        return this;
    }

    getAttr(name) {
        return this._node.getAttribute(name);
    }

    hasAttr(name) {
        return this._node.hasAttribute(name);
    }

    setText(text) {
        this._node.innerText = text;
        return this;
    }

    getText() {
        return this._node.innerText;
    }

    getNode() {
        return this._node;
    }

    setStyle(style) {
        if (style === null) {
            this._node.style = null;
        } else {
            const entries = Object.entries(style);
            for (const entry of entries) {
                this._node.style[entry[0]] = entry[1];
            }
        }
        return this;
    }

    findSelector(selector) {
        const node = this._node.querySelector(selector);
        if (node === null) {
            return null;
        }
        return Widget.wrap(node);
    }

    addChild(...children) {
        for (const child of children) {
            if (child instanceof Widget) {
                this._node.appendChild(child.getNode());
            } else if (child instanceof Node) {
                this._node.appendChild(child);
            } else if (typeof child === 'string') {
                this._node.append(child);
            } else {
                throw new Error('Unhandled Child Type');
            }
        }
        return this;
    }

    addClass(...classes) {
        for (const clazz of classes) {
            if (clazz === '') {
                continue;
            }
            this._node.classList.add(clazz);
        }
        return this;
    }

    removeClass(...classes) {
        for (const clazz of classes) {
            if (clazz === '') {
                continue;
            }
            this._node.classList.remove(clazz);
        }
        return this;
    }

    /**
     * Removes a child from the Widget 
     * 
     * @param {Widget | Node} Child to remove 
     * @returns this
     */
    removeChild(child) {
        if (child instanceof Widget) {
            this._node.removeChild(child.getNode());
        } else if (child instanceof Node) {
            this._node.removeChild(child);
        } else {
            throw new Error('Unhandled Child Type');
        }
        return this;
    }


    /**
     * Adds EventListener's to the Widget
     * 
     * @param {string | array} The types of events to listen for 
     * @param {function} The handler function for said events 
     * @returns this
     */
    on(type, handler) {
        this._node.addEventListener(type, handler);
        return this;
    }

    /**
     * Get the DOM elemt
     * @returns {x, y, width, height}
     */
    getBounds() {
        return this._node.getBoundingClientRect();
    }

    /**
     * 
     * @param {Node} Wraps the DOM Node into a Widget 
     * @returns 
     */
    static wrap(node) {
        return new Widget(Widget.WRAP_KEY, node);
    }

    /**
     * Creates a Widget of an Div DOM Node
     * 
     * @param {string} <div class="(param here)">
     * @returns Widget
     */
    static div(clazz) {
        return new Widget('div', clazz);
    }

    /**
     * Creates a Widget of an Input DOM Node
     * 
     * @param {string} <input type="(param here)"> 
     * @param {string} <input class="(param here)">
     * @returns Widget
     */
    static input(type, clazz) {
        const input = new Widget('input', clazz);
        input.setAttr('type', type);
        return input;
    }

    /**
     * Checks to see if we have the document body as a widget 
     * if so return it, otherwise create it and then return
     * 
     * @returns the document.body as a Widget
     */
    static getBody() {
        if (Widget.__BODY === undefined) {
            const body = Widget.wrap(document.body);
            Widget.__BODY = body;
            return body;
        }
        return Widget.__BODY;
    }

    /**
     * This function basically does the same as
     * document.getElementById but wraps with Widget
     * 
     * @param {string} id 
     * @returns Widget
     */
    static getById(id) {
        const node = document.getElementById(id);
        if (!!node) {
            return Widget.wrap(node);
        }
        return null;
    }

    /**
     * 
     * This function basically does the same as 
     * document.querySelector but wraps the query in a Widget
     * 
     * @param {string} selector 
     * @returns Widget
     */
    static querySelector(selector) {
        const node = document.querySelector(selector);
        if (!!node) {
            return Widget.wrap(node);
        }
        return null;
    }
}

class Modal extends Widget {
    static SHOWN = null;

    constructor(clazz) {
        super('div', clazz);
        this._visible = false;
        this._autoCenter = true;
    }

    getHandler() {
        return this._handler;
    }

    isVisible() {
        return this._visible;
    }

    canShow() {
        return !this._visible && Modal.SHOWN === null;
    }

    show(handler) {
        if (!this.canShow()) {
            return false;
        }
        this._visible = true;
        Modal.SHOWN = this;
        const body = Widget.getBody();
        body.setStyle({
            'overflow': 'hidden'
        })
        body.addChild(this);
        if (this._autoCenter) {
            this.center();
        }
        this._handler = handler;
        return true;
    }

    hide() {
        if (!this._visible) {
            return false;
        }
        const body = Widget.getBody();
        body.setStyle({
            'overflow': 'auto'
        });
        body.removeChild(this);
        this._visible = false;
        Modal.SHOWN = null;
        return true;
    }

    shouldCenter() {
        return this._autoCenter;
    }

    center() {
        const xCenter = window.innerWidth / 2;
        const yCenter = window.innerHeight / 2;

        const bounds = super.getBounds();
        super.setStyle({
            left: (xCenter - (bounds.width / 2)) + 'px',
            top: (document.documentElement.scrollTop + (yCenter - (bounds.height / 2))) + 'px',
        });
        return this;
    }

    static hookWindow() {
        window.addEventListener('click', e => {
            if (Modal.SHOWN === null) {
                return;
            }
            if (e.target === Modal.SHOWN.getNode()) {
                Modal.SHOWN.hide();
            }
        });
        window.addEventListener('resize', _ => {
            if (Modal.SHOWN !== null) {
                if (Modal.SHOWN.shouldCenter()) {
                    Modal.SHOWN.center();
                }
            }
        });
        //We are deleting this method because
        //it only needs to happen once.
        Modal.hookWindow = undefined;
    }
}

Modal.hookWindow();
class OverlayModal extends Modal {
    constructor(clazz) {
        super(clazz);
        this._overlay = Widget.div('overlay');
        this._overlay.on('click', (_ => {
            this.hide();
        }).bind(this));
    }

    getOverlay() {
        return this._overlay;
    }

    show(handler) {
        if (!super.canShow()) {
            return false;
        }
        Widget.getBody().addChild(this._overlay);
        return super.show(handler);
    }

    hide() {
        if (super.hide()) {
            Widget.getBody().removeChild(this._overlay);
        }
    }
}

class Calcs {
    static computeWidth(width, unit = 'px') {
        if (unit === null) {
            return 0;
        }
        if (unit === 'px') {
            return width;
        } else if (unit === 'vw') {
            return window.innerWidth * parseFloat('.' + width);
        } else {
            throw new Error('Unhandled Unit Type:' + unit);
        }
    }
    static computeHeight(height, unit = 'px') {
        if (unit === null) {
            return 0;
        }
        if (unit === 'px') {
            return height;
        } else if (unit === 'vh') {
            return window.innerHeight * parseFloat('.' + height);
        } else {
            throw new Error('Unhandled Unit Type:' + unit);
        }
    }
}

class ResizingTextArea extends Widget {

    _sizing = false;
    _winHook = null;

    _maxWidth = -1;
    _maxWidthUnit = null;
    _maxHeight = -1;
    _maxHeightUnit = null;

    constructor(clazz) {
        super('textarea', clazz);
        const hook = this.onMouse.bind(this);
        super.on('mousedown', hook);
        super.on('mouseup', hook);
        this._winBlur = function (e) {
            this.setResizing(false);
        }.bind(this);

        this._winHook = hook;
    }

    setResizing(resizing) {
        if (this._sizing === resizing) {
            return;
        }
        if (resizing) {
            window.addEventListener('mousemove', this._winHook);
            window.addEventListener('blur', this._winBlur);
        } else {
            window.removeEventListener('mousemove', this._winHook);
            window.removeEventListener('blur', this._winBlur);
        }
        this._sizing = resizing;
        return;
    }

    setMinWidth(minWidth, unit = 'px') {
        if (typeof minWidth === 'number' && typeof unit === 'string') {
            this._minWidth = minWidth;
            this._minWidthUnit = unit;
            super.setStyle({
                'min-width': minWidth + unit
            });
        }
    }

    setMinHeight(minHeight, unit = 'px') {
        if (typeof minHeight === 'number' && typeof unit === 'string') {
            this._minHeight = minHeight;
            this._minHeightUnit = unit;
            super.setStyle({
                'min-height': minHeight + unit
            });
        }
    }

    setMaxWidth(maxWidth, unit = 'px') {
        if (typeof maxWidth === 'number' && typeof unit === 'string') {
            this._maxWidth = maxWidth;
            this._maxWidthUnit = unit;
            super.setStyle({
                'max-width': maxWidth + unit
            });
        }
    }

    setMaxHeight(maxHeight, unit = 'px') {
        if (typeof maxHeight === 'number' && typeof unit === 'string') {
            this._maxHeight = maxHeight;
            this._maxHeightUnit = unit;
            super.setStyle({
                'max-height': maxHeight + unit
            });
        }
    }

    isResizing() {
        return this._sizing;
    }

    onMouse(e) {
        if (e.type === 'mousedown') {
            this.setResizing(true);
        } else if (e.type === 'mouseup') {
            this.setResizing(false);
        } else if (e.type === 'mousemove') {
            if (this.isResizing()) {
                const bounds = this.getBounds();
                const cw = Calcs.computeWidth(this._maxWidth, this._maxWidthUnit);
                const ch = Calcs.computeHeight(this._maxHeight, this._maxHeightUnit);
                if (this._maxWidth > 0 && cw < bounds.width + 1 && this._maxHeight > 0 && ch < bounds.height + 1) {
                    return;
                }
                super.getNode().dispatchEvent(new Event('resize'));
            }
        }
    }
}
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
        this._visble = !this._visble;  //Flip the boolean from false to true or vice-versa
    }

    getInput() {
        return this._input;
    }
}
exports.PasswordInput = PasswordInput;
exports.Widget = Widget;
exports.Modal = Modal;
exports.OverlayModal = OverlayModal;
exports.ResizingTextArea = ResizingTextArea;