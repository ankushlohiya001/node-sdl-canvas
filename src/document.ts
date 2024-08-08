import { implement } from "./eventer";
import { GCanvas } from "./canvas";
import { Image } from "canvas";
import { Window } from "./window";
import { App } from "./app";

interface Opts {
  width: number
  height: number
  src?: string
}

export class Document {
  static createMap: Record<string, any> = {
    canvas(opt: Opts) {
      return new GCanvas(opt.width, opt.height, opt);
    },

    image(opt: Opts) {
      const img = new Image()
      img.src = opt.src || ""
      img.width = opt.width
      img.height = opt.height
      return img;
    },

    window(opt: Opts) {
      return App.createWindow(opt)
    },
  };
  window: Window | null;

  constructor() {
    this.window = null;
    implement(this);
  }

  createElement(elem: string, opt?: Opts) {
    const create = Document.createMap[elem];
    if (!create) throw `element type "${elem}" not available..`;
    // opt.width = opt?.width || 640;
    // opt.height = opt?.height || 640;
    return create(opt);
  }

  addEventListener(eve: string, cb: (event: any) => void) {
    this.window?.on(eve, cb);
  }

  removeEventListener(eve: string, cb: (event: any) => void) {
    this.window?.off(eve, cb);
  }

  dispatchEvent(eve: any) {
    switch (typeof eve) {
      case "string":
        this.window?.emit(eve);
        break;
      case "object":
        this.window?.emit(eve.type);
    }
  }

  appendChild(can: GCanvas, win: Window) {
    win = win || this.window;
    if (can) {
      switch (can.constructor) {
        case GCanvas:
          win.canvasList.add(can);
          can.window = win.id;
      }
    }
  }

  removeChild(can: GCanvas, win: Window) {
    win = win || this.window;
    win.canvasList.delete(can);
  }
}
