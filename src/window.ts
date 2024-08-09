import { WindowFlag, Cursor as CursorType } from "./types";
import * as types from "./types";

import { Window as SdlWindow } from "node-sdl";
import { implement as implementEvents } from "./eventer";

import EventEmitter from "events";
import { setupEventWatcher } from "./events/mod";

import { performance } from "perf_hooks";

export interface WindowOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  title?: string,
  type?: any;
  fullscreen?: boolean;
  hidden?: boolean;
  skipTaskbar?: boolean;
  alwaysTop?: boolean;
  maximized?: boolean;
  mousegrabbed?: boolean;
  borderless?: boolean;
  resizable?: boolean;
  opengl?: boolean;
}

type Position = { x: number, y: number } | [number, number]
type Size = { w: number, h: number }

export class Window {
  static list = new Map<number, Window>(); // stroing all window by their IDs
  id: number;
  private _closable: boolean;
  private _opengl: boolean;
  private _fps: number;
  private _closed: boolean;
  private _lastPerformance: number;
  private _deltaTime: number;
  canvasList: Set<any>;
  eventEmitter: EventEmitter<[never]>;
  sdlWindow: SdlWindow;

  static create(app: any, opts: WindowOptions): Window {
    const window = new Window(opts);
    const winId = window.id; // required storing as destroying window cause id loss
    Window.list.set(winId, window);

    if (Window.list.size == 1) {
      const eventWatcher = setupEventWatcher(Window.list);
      app.mainLoop(eventWatcher);
    }

    window.on("exit", () => {
      Window.list.delete(winId);
      app.exit();
    });
    return window;
  }

  static getFlags(options: WindowOptions): number {
    // get sdl flags from options

    let flags = 0;
    flags |= options.opengl ? WindowFlag.OPENGL : 0; // flag required to support 3d rendering
    flags |= options.resizable ? WindowFlag.RESIZABLE : 0;
    flags |= options.borderless ? WindowFlag.BORDERLESS : 0;
    flags |= options.mousegrabbed ? WindowFlag.MOUSE_CAPTURE : 0;
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

  static POS_CENTER = 0x2fff0000;
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
      fps: 30,
    };

    //overriding default options from parameter options
    Object.assign(options, opt);

    // native sdl window
    this.sdlWindow = new SdlWindow(
      options.x,
      options.y,
      options.width,
      options.height,
      options.title,
      Window.getFlags(options),
    );
    this.id = this.sdlWindow.id;
    this._closable = options.closable; //this option is handled manually
    this._opengl = options.opengl; // required for 3d render support
    this._fps = options.fps;

    this._closed = false;

    this._lastPerformance = performance.now();
    this._deltaTime = 0;

    this.canvasList = new Set(); // list of canvas to render

    implementEvents(this)
    this.eventEmitter = new EventEmitter();
  }

  render() {
    let cleared = false;
    for (let canvas of this.canvasList) {
      if (!canvas.context3d) {
        if (!cleared) {
          this.sdlWindow.clearSurface();
          cleared = true;
        }
        const pixelData = canvas.getPixelData();
        this.sdlWindow.updateSurface(
          pixelData,
          canvas.posX,
          canvas.posY,
          canvas.width,
          canvas.height,
        );
      } else {
        canvas.context3d.swap();
      }
    }
    if (cleared) this.sdlWindow.render();
  }

  on(eve: string, cb: any): EventEmitter {
    return this.eventEmitter.on(eve, cb);
  }

  off(eve: string, cb: any): EventEmitter {
    return this.eventEmitter.off(eve, cb);
  }

  emit(eve: string, cb?: any): boolean {
    return this.eventEmitter.emit(eve, cb);
  }

  addEventListener(eve: string, cb: any): EventEmitter {
    return this.eventEmitter.on(eve, cb);
  }

  removeEventListener(eve: string, cb: any): EventEmitter {
    return this.eventEmitter.off(eve, cb);
  }

  dispatchEvent(eve: string | { type: any }) {
    switch (typeof eve) {
      case "string":
        this.eventEmitter.emit(eve);
        break;
      case "object":
        this.eventEmitter.emit(eve.type);
    }
  }

  get position(): Position {
    return this.sdlWindow.position;
  }

  set position(pos: Position) {
    this.sdlWindow.position = pos;
  }

  moveTo(x: number, y: number) {
    this.position = {
      x,
      y,
    };
  }

  moveBy(dx: number, dy: number) {
    let { x, y } = this.position as { x: number; y: number }; // forcing
    this.position = [x + dx, y + dy];
  }

  centerWindow() {
    this.position = {
      x: Window.POS_CENTER,
      y: Window.POS_CENTER,
    };
  }

  get size(): Size {
    return this.sdlWindow.size;
  }

  set size(size: Size) {
    const lsize = this.size;
    if (lsize.w === size.w && lsize.h === size.h) return;
    this.sdlWindow.size = size;
  }

  resizeTo(w: number, h: number) {
    this.size = {
      w,
      h,
    };
  }

  resizeBy(dw: number, dh: number) {
    const size = this.size;
    this.size = {
      w: size.w + dw,
      h: size.h + dh,
    };
  }

  get width(): number {
    return this.size.w;
  }

  set width(wid: number) {
    const hei = this.size.h;
    this.size = {
      w: wid,
      h: hei,
    };
  }

  get innerWidth(): number {
    return this.size.w;
  }

  set innerWidth(wid: number) {
    this.width = wid;
  }

  get height(): number {
    return this.size.h;
  }

  set height(hei: number) {
    const wid = this.size.w;
    this.size = {
      w: wid,
      h: hei,
    };
  }

  get innerHeight(): number {
    return this.size.h;
  }

  set innerHeight(hei: number) {
    this.height = hei;
  }

  get closable(): boolean {
    return this._closable;
  }

  set closable(able: boolean) {
    this._closable = able;
  }

  set cursor(cur: string) {
    this.sdlWindow.cursor = CursorType[cur.toUpperCase()];
  }

  get cursor(): string {
    return this.sdlWindow.cursor;
  }

  get framerate(): number {
    return 1000 / this._deltaTime;
  }

  set framerate(fps: number) {
    if (fps < 1) return;
    this._fps = fps;
  }

  cancelAnimationFrame(ref: any) {
    clearTimeout(ref);
  }

  requestAnimationFrame(cb: (performance: number) => Promise<any>) {
    if (this._closed) return;
    const crnt = performance.now();
    this._deltaTime = crnt - this._lastPerformance;
    this._lastPerformance = crnt;

    const timeConsumed = performance.now() - crnt;
    let delayForNext = 1000 / this._fps - timeConsumed;
    delayForNext = delayForNext < 0 ? Window.EPSILON : delayForNext;

    return setTimeout(async () => {
      await cb(crnt);
    }, Math.ceil(delayForNext));
  }

  close(): boolean {
    if (!this.closable) {
      return false;
    }
    this.sdlWindow.destroy();
    this._closed = true;
    this.emit("exit"); // exit event for closing app context to fully exit program.
    return true;
  }
}

for (let type in types) {
  // @ts-ignore
  Window.prototype[type] = types[type];
}
