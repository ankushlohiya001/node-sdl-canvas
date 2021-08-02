const path = require("path");
const fs = require("fs");
const Window = require("./lib/window");
const ApplicationContext = require("./app");
let appContext;

const {
  createCanvas,
  loadImage,
  registerFont,
  createImageData
} = require("canvas");

const globalMethods = {
  init() {
    if (!appContext) appContext = new ApplicationContext();
  },

  mainLoop(delayMs) {
    if (!appContext) throw "call init() to initialise SDL";
    ApplicationContext.mainLoop(delayMs);
  },

  createWindow(...params) {
    if (!appContext) throw "call init() to initialise SDL, which is required for window.";
    const window = new Window(...params);
    window.on("close", () => {
      appContext.exit();
    });
    return window;
  },

  createCanvas(...pars) {
    return createCanvas(...pars);
  },

  createImageData(...pars) {
    return createImageData(...pars);
  },

  loadImage(...pars) {
    return loadImage(...pars);
  },

  loadFont(src, family) {
    family = family || path.basename(src).split(path.extname(src))[0];
    registerFont(src, {
      family
    });
  },

  saveAs(canvas, name, after) {
    const out = fs.createWriteStream(`${name}`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
      console.log(`drawing to file: ${name}`);
      if (typeof after == "function") after();
    });
  }
};

module.exports = globalMethods;