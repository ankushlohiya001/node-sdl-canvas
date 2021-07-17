let SDLRenderer = require("./renderer");
let SDLContext = require("./context");

module.exports = function(windowPtr) {
  let renderer = SDLRenderer.createRenderer(windowPtr);
  return new SDLContext(renderer);
};