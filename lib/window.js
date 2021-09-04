const types = require("./types");
const sdl = require("./binding");
const EventEmitter = require("events");
const createCanvas = require("canvas").createCanvas;

class Window extends sdl.Window {
  static POS_CENTER = 0x2FFF0000;

  static windowList = {};

  static getFlags(resizable) {
    let flags = 0;
    flags |= types.WindowFlag.WINDOW_OPENGL;
    flags |= resizable ? types.WindowFlag.WINDOW_RESIZABLE : 0;
    flags |= types.WindowFlag.WINDOW_SHOWN;
    // flags |= types.WindowFlag.WINDOW_ALLOW_HIGHDPI;
    return flags;
  }

  constructor(
    title = "node-sdl-dev",
    wid = 1280,
    hei = 720,
    resizable = false) {

    super(0x2FFF0000, 0x2FFF0000, wid, hei, title, Window.getFlags(resizable));

    Window.windowList[this.id] = this;

    this._closable = true;

    // Object.defineProperty(this, "displayPixelRatio", {
    //   value: 1.0
    // });

    // this._devicePixelRatio = 1.0;
    this._glContextCreated = false;


    this.texture = null;
    this.renderer = null;
    this._canvas = null;

    this._lastWindowEvent = null;
    this._lastMouseEvent = null;
    this._lastKeyEvent = null;
    this._keyDown = false;
    this._mouseButtonDown = false;

    this.init(wid, hei);
    setTimeout(() => {
      this.emit("load");
    }, 100);
  }

  ///// event emitter setup

  on(eve, cb) {
    this.eventEmitter.on(eve, cb);
  }

  emit(eve, data) {
    this.eventEmitter.emit(eve, data);
  }

  /////////////////////////////
  /////// init window, context
  /////////////
  init(wid, hei) {
    this.renderer = new sdl.Renderer(this);
    this.texture = new sdl.Texture(this.renderer, wid, hei);
    this._canvas = createCanvas(wid, hei);

    this.eventEmitter = new EventEmitter();
  }

  //////////////////////////////////////
  ////// rendering from current canvas, pixel buffer is renderered into texture...
  //////////////////////////

  async render() {
    const data = await this._canvas.toBuffer("raw");

    if (this._glContextCreated) {
      const size = this.size;
      await sdl.gl.DrawPixels(size.w, size.h, sdl.gl.BGRA, sdl.gl.UNSIGNED_INT_8_8_8_8_REV, data);
      await super.swap();
      return;
    }

    await this.texture.update(data);
    await this.renderer.render(this.texture);
  }

  ///////////////////////
  ///// window location on screen
  ////////////////////

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

  /////////////////////////////
  ////// size handling
  ///////////////////////

  // set devicePixelRatio(ratio) {
  //   this._devicePixelRatio = ratio;
  //   const [wid, hei] = this.size;
  //   this.updateCanvasSize(wid, hei);
  //   this.updateTextureSize(wid, hei);
  // }

  // get devicePixelRatio() {
  //   return this._devicePixelRatio;
  // }
  get size() {
    return super.size;
  }

  set size(size) {
    const lsize = this.size;
    if (lsize.w === size.w && lsize.h === size.h) return;

    if (typeof this.beforeResize == "function") this.beforeResize();

    super.size = size;
    this.updateContextSize();
  }

  updateContextSize() {
    if (typeof this.beforeResize == "function") this.beforeResize();
    let size = this.size;
    if (this._glContextCreated) this.updateGLSize(size.w, size.h);
    else this.updateTextureSize(size.w, size.h);
    this.updateCanvasSize(size.w, size.h);
  }

  updateTextureSize(wid, hei) {
    this.texture.destroy();
    this.texture = new sdl.Texture(this.renderer, wid, hei);
    // this.context.pixelRatio = this.devicePixelRatio;
  }

  updateGLSize(wid, hei) {
    sdl.gl.Viewport(0, 0, wid, hei);
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

  /////////////////////////////////
  //////// window states and actions
  //////////////////

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

  /////////////////////////////
  //// gl things
  //////////////////////////////

  createGLContext() {
    if (this._glContextCreated) return;
    this._glContextCreated = true;
    super.createGLContext();
    return sdl.gl;
  }

  getGLContext() {
    if (this._glContextCreated) return sdl.gl;
    return this.createGLContext();
  }

  deleteGLContext() {
    super.deleteGLContext();
    this._glContextCreated = false;
  }

  ///////////////////
  ////////canvas

  setCanvas(can) {
    this._canvas = can;
    this.size = {
      w: can.width,
      h: can.height
    };
  }

  getCanvas() {
    return this._canvas;
  }

  updateCanvasSize(wid, hei) {
    this._canvas.width = wid;
    this._canvas.height = hei;
  }


  ///////////////////////////////
  ////////

  exit() {
    if (!this.closable) {
      return false;
    }
    const id = this.id; // required storing as destroying window cause id loss
    this.texture.destroy();
    this.renderer.destroy();
    super.deleteGLContext();
    super.destroy();

    delete Window.windowList[id];
    this.emit("close");
    return true;
  }

  ///////////// /////
  //// pop-up windows

  // alert(message) {
  //   return createPopup("alert", message, this.ref);
  // }

  // confirm(message) {
  //   return createPopup("confirm", message, this.ref);
  // }
}

module.exports = Window;