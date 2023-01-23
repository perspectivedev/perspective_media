

class Entry {

  constructor(parent, name) {
    this._parent = parent;
    this._name = name;
  }

  getPathName() {
    throw new Error('Override Required');
  }

  getPath() {
    if (this._parent === null) {
      return '/' + this.getPathName();
    }
    return this._parent.getPath() + this.getPathName();
  }

  getName() {
    return this._name;
  }
}

// -- /root/item/file.js

class FileEntry extends Entry {
  constructor(parent, name) {
    super(parent, name);
  }

  getPathName() {
    return super.getName();
  }

}

class FolderEntry extends Entry {

  constructor(parent, name) {
    super(parent, name);
    this._files = [];
  }

  addFile(name) {
    const file = new FileEntry(this, name);
    this._files.push(file);
    return file;
  }

  addFolder(name) {
    const folder = new FolderEntry(this, name);
    this._files.push(folder);
    return folder;
  }

  getPathName() {
    return super.getName() + '/';
  }

  getFiles() {
    return this._files;
  }
}

const root = new FolderEntry(null, 'Root');

root.addFile('Yaya.js');
const testingFolder = root.addFolder('Testing');

const lower = testingFolder.addFile('lower.js');


function dumpFiles(folder, prefix = '-') {
  console.log(`${prefix} ${folder.getName()} Files: ${folder.getFiles().length}`);
  for (const file of folder.getFiles()) {
    if (file instanceof FolderEntry) {
      dumpFiles(file, prefix + '-');
    } else {
      console.log(`${prefix}- File: ${file.getName()}`);
    }
  }
}

dumpFiles(root);