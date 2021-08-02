const types = require("./types");
const sdl = require("./binding");
const EventEmitter = require("events");
const createCanvas = require("canvas").createCanvas;
// const createPopup = require("./popup");
// const setCursor = require("./cursor");


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
    title = "node-sdl-canvas",
    wid = 1280,
    hei = 720,
    resizable = false) {

    super(0x2FFF0000, 0x2FFF0000, wid, hei, title);

    Window.windowList[this.id] = this;

    this._minimized = false;
    this._maximized = false;
    this._focused = true;
    this._restored = true;
    this._shown = true;
    this._fullscreen = false;
    this._cursorShown = true;
    this._closable = true;

    // Object.defineProperty(this, "displayPixelRatio", {
    //   value: 1.0
    // });

    // this._devicePixelRatio = 1.0;
    this._canvas = null;

    this.glContextPtr = null;

    this.texture = null;
    this.renderer = null;

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

    this.eventEmitter = new EventEmitter();
    // const watcher = new sdl.EventWatcher();
    // this.context = createSDLContext(ref);

    // this.updateTextureSize(size[0], size[1]);
  }

  //////////////////////////////////////
  ////// rendering from current canvas, pixel buffer is renderered into texture...
  //////////////////////////

  render() {
    let canvas = this.canvas;
    if (!canvas) {
      console.log("add canvas first!!");
      return;
    }

    const buffer = canvas.toBuffer("raw");

    this.texture.update(buffer);
    this.renderer.render(this.texture);
  }

  ///////////////////////
  ///// window location on screen
  ////////////////////

  get position() {
    return super.position;
  }

  set position(pos) {
    const arr = new Int8Array(2);
    arr[0] = pos[0];
    arr[1] = pos[1];
    super.position = arr;
  }

  moveTo(px, py) {
    this.position = [px, py];
  }

  moveBy(dx, dy) {
    let [px, py] = this.position;
    this.position = [px + dx, py + dy];
  }

  centerWindow() {
    this.position = [Window.POS_CENTER, Window.POS_CENTER];
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
    const [lwid, lhei] = this.size;
    if (lwid === wid && lhei === hei) return;

    const arr = new Int8Array(2);
    arr[0] = wid;
    arr[1] = hei;

    if (typeof this.beforeResize == "function") this.beforeResize();

    super.size = arr;
    this.updateTextureSize(wid, hei);
    if (this.canvas) this.updateCanvasSize(wid, hei);
  }

  updateTextureSize(wid, hei) {
    this.texture.destroy();
    this.texture = new sdl.Texture(this.renderer, wid, hei);
    // this.context.pixelRatio = this.devicePixelRatio;
  }

  resizeTo(wid, hei) {
    this.updateWindowsize(wid, hei);
  }

  resizeBy(dw, dh) {
    const size = this.size;
    this.updateWindowsize(size[0] + dw, size[1] + dh);
  }

  get width() {
    return this.size[0];
  }

  set width(wid) {
    const hei = this.size[1];
    this.size = [wid, hei];
  }

  get height() {
    return this.size[1];
  }

  set height(hei) {
    const wid = this.size[0];
    this.size = [wid, hei];
  }


  /////////////////////////////////
  //////// window states and actions
  //////////////////

  // get resizable() {
  //   return this._resizable;
  // }

  // set resizable(able) {
  //   able = !!able;
  //   this._resizable = able;
  //   sdl.SDL_SetWindowResizable(this.ref, able);
  // }

  get closable() {
    return this._closable;
  }

  set closable(able) {
    this._closable = !!able;
  }

  isMinimized() {
    return this._minimized;
  }

  isMaximized() {
    return this._maximized;
  }

  // focus() {
  //   sdl.SDL_RaiseWindow(this.ref);
  // }

  // isFocused() {
  //   return this._focused;
  // }

  // restore() {
  //   sdl.SDL_RestoreWindow(this.ref);
  // }


  // isShown() {
  //   return this._shown;
  // }

  // fullscreen() {
  //   sdl.SDL_SetWindowFullscreen(this.ref, types.WindowFlag.WINDOW_FULLSCREEN_DESKTOP);
  // }

  // isFullScreen() {
  //   return !!(sdl.SDL_GetWindowFlags(this.ref) & types.WindowFlag.WINDOW_FULLSCREEN_DESKTOP);
  // }

  // set cursor(cursor) {
  //   setCursor(cursor);
  // }

  // set cursorHidden(will) {
  //   will = !will;
  //   this._cursorShown = will;
  //   sdl.SDL_ShowCursor(will);
  // }

  // get cursorHidden() {
  //   return !this._cursorShown;
  // }

  /////////////////////////////
  //// gl things
  //////////////////////////////

  // initGLContext() {
  //   if (this.glContextPtr) return;
  //   this.glContextPtr = sdl.SDL_GL_CreateContext(this.ref);
  // }

  // deleteGLContext() {
  //   if (this.glContextPtr) {
  //     sdl.SDL_GL_DeleteContext(this.glContextPtr);
  //     this.glContextPtr = null;
  //   }
  // }

  //////////////////////////////
  ////// canvas related stuffs
  //////////////////

  get canvas() {
    return this._canvas;
  }

  set canvas(can) {
    this._canvas = can;
    // const [wid, hei] = this.size;
    // this.updateCanvasSize(wid, hei);
  }

  updateCanvasSize(w, h) {
    const ratio = this.devicePixelRatio || 1;
    this.canvas.width = w * ratio;
    this.canvas.height = h * ratio;
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
    this.destroy();

    delete Window.windowList[id];
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