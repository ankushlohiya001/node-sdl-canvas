import { Canvas, CanvasRenderingContext2D, registerFont } from "canvas";
import fs from "node:fs";
import path from "node:path";
let createGL: boolean; //gl module to be loaded dynamically

export class GCanvas {
  posX: number;
  posY: number;
  window: any;
  canvas: Canvas;
  context3d: any;
  context2d: CanvasRenderingContext2D | null;
  style: any;

  constructor(wid: number, hei: number, opt: Record<string, any>) {
    this.canvas = new Canvas(wid, hei);
    this.posX = opt.x || 0;
    this.posY = opt.y || 0;
    this.window = opt.window;
    this.context3d = null;
    this.context2d = null;

    const canvas = this;
    this.style = {
      get width() {
        return canvas.width;
      },
      set width(w) {
        canvas.width = w;
      },
      get height() {
        return canvas.height;
      },
      set height(h) {
        canvas.height = h;
      },
      set font(src: string) {
        const family = path.basename(src).split(path.extname(src))[0];
        registerFont(src, {
          family,
        });
      },
    };
  }

  get width(): number {
    const gl = this.context3d;
    if (gl) return gl.drawingBufferWidth;
    return this.canvas.width;
  }

  set width(wid) {
    const gl = this.context3d;
    if (gl) {
      gl.resize(wid, gl.drawingBufferHeight);
      return;
    }
    this.canvas.width = wid;
  }

  get height() {
    const gl = this.context3d;
    if (gl) return gl.drawingBufferHeight;
    return this.canvas.height;
  }

  set height(hei) {
    const gl = this.context3d;
    if (gl) {
      gl.resize(gl.drawingBufferWidth, hei);
      return;
    }
    this.canvas.height = hei;
  }

  getContext(type: string) {
    switch (type.toLowerCase()) {
      case "3d":
      case "webgl":
      case "gl":
      case "experimental-webgl":
      // case "opengl":
      //   if (this.context2d) return null;
      //   if (!createGL) createGL = require("gl");
      //   if (!this.context3d) {
      //     const window = this.window;
      //     if (!window) {
      //       console.warn(
      //         "this gl context can't be used for window, required pattern is, append to window first, then call getContext!!",
      //       );
      //     }
      //     const gl = createGL(super.width, super.height, { window });
      //     gl.canvas = this;
      //     this.context3d = gl;
      //   }
      //   return this.context3d;
      //   break;
      default:
        if (this.context3d) return null;
        return this.canvas.getContext("2d");
    }
  }

  getPixelData() {
    return this.canvas.toBuffer("raw");
  }

  saveAs(name: string, after: () => void) {
    const out = fs.createWriteStream(`${name}`);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log(`drawing to file: ${name}`);
      if (typeof after == "function") after();
    });
  }
}
