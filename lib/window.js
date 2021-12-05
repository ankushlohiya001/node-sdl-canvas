const types = require("./types");
const WindowFlag = types.WindowFlag;
const sdl = require("./binding");
const EventEmitter = require("events");
const implementEves = require("./eventer");
const performance = require("perf_hooks").performance;

class Window extends sdl.Window {
  static windowList = new Map(); // stroing all window by their IDs

  static getFlags(options) {
    // get sdl flags from options

    let flags = 0;
    flags |= options.opengl ? WindowFlag.OPENGL : 0; // flag required to support 3d rendering
    flags |= options.resizable ? WindowFlag.RESIZABLE : 0;
    flags |= options.borderless ? WindowFlag.BORDERLESS : 0;
    flags |= options.mousegrabbed ? WindowFlag.MOUSE_GRABBED : 0;
    flags |= options.maximized ? WindowFlag.MAXIMIZED : 0;
    flags |= options.alwaysTop ? WindowFlag.ALWAYS_ON_TOP : 0;
    flags |= options.skipTaskbar ? WindowFlag.SKIP_TASKBAR : 0;
    flags |= options.hidden ? WindowFlag.HIDDEN : WindowFlag.SHOWN;
    flags |= options.fullscreen ? WindowFlag.FULLSCREEN_DESKTOP : 0;

    let typeFlag = 0;
    switch (options.type) {
      case "utility":
        typeFlag = WindowFlag.UTILITY;
        break;
      case "tooltip":
        typeFlag = WindowFlag.TOOLTIP;
        break;
      case "popup":
        typeFlag = WindowFlag.POPUP_MENU;
        break;
    }

    flags |= typeFlag;
    return flags;
  }

  static POS_CENTER = 0x2FFF0000;
  static EPSILON = 5;

  constructor(opt = {}) {
    const options = {
      x: Window.POS_CENTER, // <-center pos flag 
      y: Window.POS_CENTER, // <-'
      width: 1280,
      height: 720,
      title: "node-sdl-canvas",
      resizable: false,
      closable: true,
      borderless: false,
      hidden: false,
      opengl: false,
      fps: 30
    };

    //overriding default options from parameter options
    Object.assign(options, opt);

    // native sdl window
    super(options.x, options.y, options.width, options.height, options.title, Window.getFlags(options));
    this._closable = options.closable; //this option is handled manually
    this._opengl = options.opengl; // required for 3d render support
    this._fps = options.fps;

    this._lastPerformance = performance.now();
    this._loop = null;
    this._deltaTime = 0;

    this.canvasList = new Set(); // list of canvas to render

    Window.windowList.set(this.id, this);

    this.eventEmitter = new EventEmitter();
    implementEves(this);
  }

  render() {
    let cleared = false;
    for (let canvas of this.canvasList) {
      if (!canvas.context3d) {
        if (!cleared) {
          super.clearSurface();
          cleared = true;
        }
        const pixelData = canvas.toBuffer("raw");
        super.updateSurface(pixelData, canvas.posX, canvas.posY, canvas.width, canvas.height);
      } else {
        canvas.context3d.swap();
      }
    }
    if (cleared) super.render();
  }

  on(eve, cb) {
    return this.eventEmitter.on(eve, cb);
  }

  off(eve, cb) {
    return this.eventEmitter.off(eve, cb);
  }

  emit(eve, cb) {
    return this.eventEmitter.emit(eve, cb);
  }

  addEventListener(eve, cb) {
    return this.eventEmitter.on(eve, cb);
  }

  removeEventListener(eve, cb) {
    return this.eventEmitter.off(eve, cb);
  }

  dispatchEvent(eve) {
    switch (typeof eve) {
      case "string":
        this.eventEmitter.emit(eve);
        break;
      case "object":
        this.eventEmitter.emit(eve.type);
    }
  }

  get position() {
    return super.position;
  }

  set position(pos) {
    super.position = pos;
  }

  moveTo(x, y) {
    this.position = {
      x,
      y
    };
  }

  moveBy(dx, dy) {
    let {
      x,
      y
    } = this.position;
    this.position = [x + dx, y + dy];
  }

  centerWindow() {
    this.position = {
      x: Window.POS_CENTER,
      y: Window.POS_CENTER
    };
  }

  get size() {
    return super.size;
  }

  set size(size) {
    const lsize = this.size;
    if (lsize.w === size.w && lsize.h === size.h) return;
    super.size = size;
  }

  resizeTo(w, h) {
    this.size = {
      w,
      h
    };
  }

  resizeBy(dw, dh) {
    const size = this.size;
    this.size = {
      w: size.w + dw,
      h: size.h + dh
    };
  }

  get width() {
    return this.size.w;
  }

  set width(wid) {
    const hei = this.size.h;
    this.size = {
      w: wid,
      h: hei
    };
  }

  get innerWidth() {
    return this.size.w;
  }

  set innerWidth(wid) {
    this.width = wid;
  }

  get height() {
    return this.size.h;
  }

  set height(hei) {
    const wid = this.size.w;
    this.size = {
      w: wid,
      h: hei
    };
  }

  get innerHeight() {
    return this.size.h;
  }

  set innerHeight(hei) {
    this.height = hei;
  }

  get closable() {
    return this._closable;
  }

  set closable(able) {
    this._closable = !!able;
  }

  set cursor(cur = "") {
    super.cursor = types.Cursor[cur.toUpperCase()];
  }

  get cursor() {
    return super.cursor;
  }

  get framerate() {
    return 1000 / this._deltaTime;
  }

  set framerate(fps) {
    if (fps < 1) return;
    this._fps = fps;
  }

  cancelAnimationFrame(ref) {
    clearTimeout(ref);
  }

  requestAnimationFrame(cb) {
    const crnt = performance.now();
    this._deltaTime = crnt - this._lastPerformance;
    this._lastPerformance = crnt;

    const timeConsumed = performance.now() - crnt;
    let delayForNext = 1000 / this._fps - timeConsumed;
    delayForNext = delayForNext < 0 ? Window.EPSILON : delayForNext;

    const window = this;

    return setTimeout(async() => {
      await cb(crnt);
    }, Math.ceil(delayForNext));
  }

  close() {
    if (!this.closable) {
      return false;
    }
    const id = this.id; // required storing as destroying window cause id loss
    super.destroy();

    Window.windowList.delete(id);

    this.emit("exit"); // exit event for closing app context to fully exit program.
    return true;
  }

}

for (let type in types) {
  Window.prototype[type] = types[type];
}

module.exports = Window;
