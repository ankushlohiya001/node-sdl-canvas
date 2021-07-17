const sdl = require("./../sdl");
const EventEmitter = require("events");
const createSDLContext = require("./../context2d");
const createCanvas = require("canvas").createCanvas;
const createPopup = require("./popup");
const setCursor = require("./cursor");


class Window extends EventEmitter {

  static POS_CENTER = 0x2FFF0000;

  static getFlags(resizable) {
    let flags = 0;
    flags |= sdl.SDL_WindowFlags.SDL_WINDOW_OPENGL;
    flags |= resizable ? sdl.SDL_WindowFlags.SDL_WINDOW_RESIZABLE : 0;
    flags |= sdl.SDL_WindowFlags.SDL_WINDOW_SHOWN;
    // flags |= sdl.SDL_WindowFlags.SDL_WINDOW_ALLOW_HIGHDPI;
    return flags;
  }

  constructor(
    title = "node-sdl-canvas",
    wid = 1280,
    hei = 720,
    resizable = false) {

    super();
    this._title = title;
    this._position = [0x2FFF0000, 0x2FFF0000];
    this._size = [wid, hei];
    this._resizable = resizable;
    this._borderLess = false;
    this._closable = true;
    this._minimized = false;
    this._maximized = false;
    this._focused = true;
    this._restored = true;
    this._shown = true;
    this._grab = false;
    this._fullscreen = false;
    this._cursorShown = true;
    this._waitingForEvents = false;

    Object.defineProperty(this, "displayPixelRatio", {
      value: 1.0
    });

    this._devicePixelRatio = 1.0;
    this._canvas = null;

    this._id = null;
    this.windowPtr = null;
    this.glContextPtr = null;

    this.context = null;
    this.appContext = null;

    this._lastMouseEvent = null;
    this._lastKeyEvent = null;
    this._keyDown = false;
    this._mouseButtonDown = false;

    this.init();
    setTimeout(() => {
      this.emit("load");
    }, 100);
  }

  get id() {
    return this._id;
  }

  on(eveName, eveFun) {
    super.on(eveName, async(eve) => {
      await eveFun(eve);
    });
  }

  /////////////////////////////
  /////// init window, context
  /////////////
  init() {
    const pos = this.position;
    const size = this.size;
    const flags = Window.getFlags(this.resizable);
    const windowPtr = sdl.SDL_CreateWindow(this.title, pos[0], pos[1], size[0], size[1], flags);
    this.windowPtr = windowPtr;
    this._id = sdl.SDL_GetWindowID(windowPtr);
    this.context = createSDLContext(windowPtr);

    this.updateContextSize(size[0], size[1]);
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
    let width = canvas.width,
      height = canvas.height;
    const buffer = canvas.toBuffer("raw");
    this.context.renderFrame(buffer, width, height);
  }

  ///////////////////////
  ///// window location on screen
  ////////////////////

  get position() {
    const px = this._position[0];
    const py = this._position[1];
    return [px, py];
  }

  set position(pos) {
    this._position = [pos[0], pos[1]];
    sdl.SDL_SetWindowPosition(this.windowPtr, pos[0], pos[1]);
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

  set devicePixelRatio(ratio) {
    this._devicePixelRatio = ratio;
    const [wid, hei] = this.size;
    this.updateCanvasSize(wid, hei);
    this.updateContextSize(wid, hei);
  }

  get devicePixelRatio() {
    return this._devicePixelRatio;
  }

  get size() {
    const wid = this._size[0];
    const hei = this._size[1];
    return [wid, hei];
  }

  set size(size) {
    const wid = size[0];
    const hei = size[1];
    this._size = [wid, hei];
    if (typeof this.beforeResize == "function") this.beforeResize();
    this.updateContextSize(wid, hei);
    if (this.canvas) this.updateCanvasSize(wid, hei);
  }

  updateContextSize(wid, hei) {
    this.context.pixelRatio = this.devicePixelRatio;
    this.context.size = [wid, hei];
  }

  updateWindowsize(wid, hei) {
    const [lwid, lhei] = this.size;
    wid = Math.floor(wid);
    hei = Math.floor(hei);
    if (lwid === wid && lhei === hei) return;
    sdl.SDL_SetWindowSize(this.windowPtr, wid, hei);
    this.size = [wid, hei];
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
  get title() {
    return this._title;
  }

  set title(title = "node-sdl-canvas") {
    this._title = title;
    sdl.SDL_SetWindowTitle(this.windowPtr, title);
  }

  get resizable() {
    return this._resizable;
  }

  set resizable(able) {
    able = !!able;
    this._resizable = able;
    sdl.SDL_SetWindowResizable(this.windowPtr, able);
  }

  get closable() {
    return this._closable;
  }

  set closable(able) {
    this._closable = !!able;
  }

  minimize() {
    sdl.SDL_MinimizeWindow(this.windowPtr, sdl.SDL_WindowFlags.SDL_WINDOW_MINIMIZED);
  }

  isMinimized() {
    return this._minimized;
  }

  maximize() {
    sdl.SDL_MaximizeWindow(this.windowPtr, sdl.SDL_WindowFlags.SDL_WINDOW_MAXIMIZED);
  }

  isMaximized() {
    return this._maximized;
  }

  focus() {
    sdl.SDL_RaiseWindow(this.windowPtr);
  }

  isFocused() {
    return this._focused;
  }

  restore() {
    sdl.SDL_RestoreWindow(this.windowPtr);
  }

  show() {
    sdl.SDL_ShowWindow(this.windowPtr);
  }

  hide() {
    sdl.SDL_HideWindow(this.windowPtr);
  }

  isShown() {
    return this._shown;
  }

  fullscreen() {
    sdl.SDL_SetWindowFullscreen(this.windowPtr, sdl.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP);
  }

  isFullScreen() {
    return !!(sdl.SDL_GetWindowFlags(this.windowPtr) & sdl.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP);
  }

  set grab(will) {
    will = !!will;
    this._grab = will;
    sdl.SDL_SetWindowGrab(this.windowPtr, will);
  }

  get grab() {
    return this._grab;
  }

  set border(border) {
    sdl.SDL_SetWindowBordered(this.windowPtr, !!border);
  }

  set cursor(cursor) {
    setCursor(cursor);
  }

  set cursorHidden(will) {
    will = !will;
    this._cursorShown = will;
    sdl.SDL_ShowCursor(will);
  }

  get cursorHidden() {
    return !this._cursorShown;
  }

  /////////////////////////////
  //// gl things
  //////////////////////////////

  initGLContext() {
    if (this.glContextPtr) return;
    this.glContextPtr = sdl.SDL_GL_CreateContext(this.windowPtr);
  }

  deleteGLContext() {
    if (this.glContextPtr) {
      sdl.SDL_GL_DeleteContext(this.glContextPtr);
      this.glContextPtr = null;
    }
  }

  //////////////////////////////
  ////// canvas related stuffs
  //////////////////

  get canvas() {
    return this._canvas;
  }

  set canvas(can) {
    this._canvas = can;
    const [wid, hei] = this.size;
    this.updateCanvasSize(wid, hei);
  }

  updateCanvasSize(w, h) {
    const ratio = this.devicePixelRatio;
    this.canvas.width = w * ratio;
    this.canvas.height = h * ratio;
  }

  ///////////////////////////////
  ////////

  destroy() {
    this.deleteGLContext();
    sdl.SDL_DestroyWindow(this.windowPtr);
    this.windowPtr = null;
  }

  get isDestroyed() {
    return this.windowPtr === null;
  }

  exit() {
    if (!this.closable) {
      return false;
    }
    this.destroy();
    /////// temprary fix for blacking window after other window closes.
    /// we just preserving context, hence renderer.
    /// the downside is memory is still allocated.

    // this.context.destroy();
    if (this.appContext) this.appContext.exit(this.id);
    return true;
  }

  ///////////// /////
  //// pop-up windows

  alert(message) {
    return createPopup("alert", message, this.windowPtr);
  }

  confirm(message) {
    return createPopup("confirm", message, this.windowPtr);
  }
}

module.exports = Window;