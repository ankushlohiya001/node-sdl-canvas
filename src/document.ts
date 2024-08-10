import { implement } from "./eventer";
import { GCanvas } from "./canvas";
import { Image } from "canvas";
import { Window, WindowOptions } from "./window";
import { App } from "./app";
import { Audio, AudioOptions } from "./audio";

interface Opts {
  width: number
  height: number
}

interface ImageOpts extends Opts {
  src: string
}

export class Document {
  static createMap: Record<string, any> = {
    canvas(opt: Opts) {
      return new GCanvas(opt.width, opt.height, opt);
    },

    image(opt: ImageOpts): Image {
      const img = new Image()
      img.src = opt.src
      img.width = opt.width
      img.height = opt.height
      return img;
    },

    window(opt: WindowOptions): Window {
      return App.createWindow(opt)
    },

    audio(opt: AudioOptions): Audio {
      return Audio.create(opt)
    }
  };
  window: Window | null;

  constructor() {
    this.window = null;
    implement(this);
  }

  createElement(elem: "window", opt: Opts): Window
  createElement(elem: "canvas", opt: Opts): GCanvas
  createElement(elem: "image", opt: Opts): Image
  createElement(elem: "audio", opt: AudioOptions): Audio
  createElement(elem: string, opt: any) {
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

  appendChild(can: GCanvas, win: Window | null = null) {
    win = win || this.window;
    if (can) {
      switch (can.constructor) {
        case GCanvas:
          win?.canvasList.add(can);
          can.window = win?.id;
      }
    }
  }

  removeChild(can: GCanvas, win: Window | null = null) {
    win = win || this.window;
    win?.canvasList.delete(can);
  }
}
