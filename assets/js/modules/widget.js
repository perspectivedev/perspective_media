class Widget {
    static WRAP_KEY = "--wrap--";
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
    constructor(type, clazz = "") {
        if (type === "--wrap--") {
            this._node = clazz;
            return;
        }
        this._node = document.createElement(type);
        if (typeof clazz === "object") {
            const options = clazz;
            if (options.id) {
                this.setAttr("id", options.id);
            }
            if (options.clazz) {
                this.setClasses(options.clazz);
            }
            if (options.style) {
                if (typeof options.style !== "object") {
                    throw new TypeError("Style must be an object");
                }
                this.setStyle(options.style);
            }
            if (options.attrs) {
                if (typeof options.attrs !== "object") {
                    throw new TypeError("Attrs must be an object");
                }
                const attrs = Object.entries(options.attrs);
                for (const attr of attrs) {
                    this.setAttr(attr[0], attr[1]);
                }
            }
            if (options.text) {
                if (typeof options.text !== "string") {
                    throw new TypeError("Text must be a string");
                }
                this.setText(options.text);
            }
            if (options.innerHtml) {
                if (typeof options.innerHtml !== "string") {
                    throw new TypeError("InnerHtml must be a string");
                }
                this.setInnerHtml(options.innerHtml);
            }
        } else if (typeof clazz === "string") {
            this.setClasses(clazz);
        }
    }
    setClasses(classes) {
        if (typeof classes === "string" && classes !== "") {
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

    addChild(...children) {
        for (const child of children) {
            if (child instanceof Widget) {
                this._node.appendChild(child.getNode());
            } else if (child instanceof Node) {
                this._node.appendChild(child);
            } else if (typeof child === "string") {
                this._node.append(child);
            } else {
                throw new Error("Unhandled Child Type");
            }
        }
        return this;
    }

    removeChild(child) {
        if (child instanceof Widget) {
            this._node.removeChild(child.getNode());
        } else if (child instanceof Node) {
            this._node.removeChild(child);
        } else {
            throw new Error("Unhandled Child Type");
        }
        return this;
    }

    on(type, handler) {
        this._node.addEventListener(type, handler);
        return this;
    }

    getBounds() {
        return this._node.getBoundingClientRect();
    }

    static wrap(node) {
        return new Widget(Widget.WRAP_KEY, node);
    }

    static div(clazz = "") {
        return new Widget("div", clazz);
    }

    static input(type, clazz) {
        const input = new Widget("input", clazz);
        input.setAttr("type", type);
        return input;
    }

    static getBody() {
        if (Widget.__BODY === undefined) {
            const body = Widget.wrap(document.body);
            Widget.__BODY = body;
            return body;
        }
        return Widget.__BODY;
    }

    static getById(id) {
        const node = document.getElementById(id);
        if (node !== null) {
            return Widget.wrap(node);
        }
        return null;
    }
}

class Modal extends Widget {
    static SHOWN = null;

    constructor(clazz) {
        super("div", clazz);
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
        Widget.getBody().addChild(this);
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
        Widget.getBody().removeChild(this);
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
            left: (xCenter - (bounds.width / 2)) + "px",
            top: (yCenter - (bounds.height / 2)) + "px",
        });
        return this;
    }

    static hookWindow() {
        window.addEventListener('click', (e) => {
            if (Modal.SHOWN === null) {
                return;
            }
            if (e.target === Modal.SHOWN.getNode()) {
                Modal.SHOWN.hide();
            }
        });
        window.addEventListener('resize', (_) => {
            if (Modal.SHOWN !== null) {
                if (Modal.SHOWN.shouldCenter())
                    Modal.SHOWN.center();
            }
        });
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
exports.Widget = Widget;
exports.Modal = Modal;
exports.OverlayModal = OverlayModal;