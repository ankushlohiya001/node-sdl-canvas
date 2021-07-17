const path = require("path");
const fs = require("fs");
const Window = require("./window/window");
const ApplicationContext = require("./app");
const appContext = new ApplicationContext();

const {
  createCanvas,
  loadImage,
  registerFont,
  createImageData
} = require("canvas");

const globalMethods = {
  mainLoop: ApplicationContext.mainLoop,

  createWindow(...params) {
    const window = new Window(...params);
    appContext.addWindow(window);
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