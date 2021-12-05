const implementEves = require("./eventer");
const GCanvas = require("./canvas");
const Image = require("canvas").Image;
const Window = require("./window");
const ApplicationContext = require("./app");

class Document {
  static appContext = null;

  static createMap = {
    canvas(opt = {}){
      return new GCanvas(opt.width, opt.height, opt);
    },

    image(opt){
      return new Image(opt);
    },

    window(opt){
      if(!Document.appContext){
        Document.appContext = new ApplicationContext(Window.windowList);
        ApplicationContext.mainLoop();
      }
      const window = new Window(opt);
      window.on("exit", ()=>{
        Document.appContext.exit();
      });
      return window;
    }
  }

  constructor(w, h) {
    this.window = null;
    implementEves(this);
  }

  createElement(elem, opt = {}) {
    const create = Document.createMap[elem];
    if(!create) throw `element type "${elem}" not available..`;
    opt.width = opt.width || 640;
    opt.height = opt.height || 640;
    return create(opt);
  }

  addEventListener(eve, cb) {
    this.window.on(eve, cb);
  }

  removeEventListener(eve, cb) {
    this.window.off(eve, cb);
  }

  dispatchEvent(eve) {
    switch (typeof eve) {
      case "string":
        this.window.emit(eve);
        break;
      case "object":
        this.window.emit(eve.type);
    }
  }

  appendChild(can, win) {
    win = win || this.window;
    if(can){
      switch(can.constructor){
        case GCanvas:
          win.canvasList.add(can);
          can.window = win.ref;
      }
    }
  }

  removeChild(can, win) {
    win = win || this.window;
    win.canvasList.delete(can);
  }
}

module.exports = Document;
