const {
  Canvas,
  registerFont,
} = require("canvas");
const fs = require("fs");
const path = require("path");
let createGL; //gl module to be loaded dynamically

class GCanvas extends Canvas {
  constructor(wid, hei, opt) {
    super(wid, hei, opt);
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
      set font(src) {
        const family = path.basename(src).split(path.extname(src))[0];
        registerFont(src, {
          family
        });
      }
    };
  }

  get width(){
    const gl = this.context3d;
    if(gl) return gl.drawingBufferWidth;
    return super.width;
  }

  set width(wid){
    const gl = this.context3d;
    if(gl){
      gl.resize(wid, gl.drawingBufferHeight);
      return;
    }
    super.width = wid;
  }

  get height(){
    const gl = this.context3d;
    if(gl) return gl.drawingBufferHeight;
    return super.height;
  }

  set height(hei){
    const gl = this.context3d;
    if(gl){
      gl.resize(gl.drawingBufferWidth, hei);
      return;
    }
    super.height = hei;
  }

  getContext(type) {
    switch (type.toLowerCase()) {
      case "3d":
      case "webgl":
      case "gl":
      case "experimental-webgl":
      case "opengl":
        if(this.context2d) return null;
        if (!createGL) createGL = require("gl");
        if (!this.context3d) {
          const window = this.window;
          if(!window){
            console.warn("this gl context can't be used for window, required pattern is, append to window first, then call getContext!!");
          }
          const gl = createGL(super.width, super.height, { window });
          gl.canvas = this;
          this.context3d = gl;
        }
        return this.context3d;
        break;
      default:
        if(this.context3d) return null;
        return super.getContext("2d");
    }
  }

  saveAs(name, after) {
    const out = fs.createWriteStream(`${name}`);
    const stream = this.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
      console.log(`drawing to file: ${name}`);
      if (typeof after == "function") after();
    });
  }
}


module.exports = GCanvas;
