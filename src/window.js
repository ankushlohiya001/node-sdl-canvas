const SdlWindow = require("node-sdl");
const implementEves = require("./eventer");

class Window extends SdlWindow {
  constructor(...params) {
    super(...params);
    implementEves(this.eventEmitter);
  }
}

module.exports = Window;
