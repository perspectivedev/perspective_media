


class Widget {
  constructor(type, clazz = '') {
    if (type === '--wrap--') {
      this._node = clazz;
      return;
    }
    this._node = document.createElement(type);
    if (typeof clazz === 'object') {
      const options = clazz;
      if(options.id){
        this.setAttr('id', options.id);
      }
      if(options.clazz){
        this.setClasses(options.clazz);
      }
    } else if (typeof clazz === 'string') {
      this.setClasses(clazz);
    }
  }
  setClasses(classes) {
    if (typeof classes === 'string' && classes !== '') {
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
      } else if (typeof child === 'string') {
        this._node.append(child);
      } else {
        throw new Error('Unhandled Child Type');
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
      throw new Error('Unhandled Child Type');
    }
    return this;
  }

  on(type, handler) {
    this._node.addEventListener(type, handler);
    return this;
  }
  static div(clazz = '') {
    return new Widget('div', clazz);
  }
}


class Modal extends Widget {
  static SHOWN = null;

  constructor(clazz) {
    super('div', clazz);
    this._visible = false;
  }

  getHandler() {
    return this._handler;
  }

  isVisible() {
    return this._visible;
  }

  show(handler) {
    if (this._visible || Modal.SHOWN !== null) {
      return false;
    }
    this._visible = true;
    Modal.SHOWN = this;
    document.body.appendChild(super.getNode());
    this._handler = handler;
    return true;
  }

  hide() {
    if (!this._visible) {
      return false;
    }
    document.body.removeChild(super.getNode());
    this._visible = false;
    Modal.SHOWN = null;
    return true;
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
  }
}
Modal.hookWindow();

exports.Widget = Widget;
exports.Modal = Modal;