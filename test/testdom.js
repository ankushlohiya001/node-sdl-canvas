const JSDOM = require("jsdom").JSDOM;
const window = (new JSDOM("<html></html>")).window;

class SDLWindow extends window.Window {
  constructor() {
    super();
  }
  render() {
    console.log("pacman");
  }
}

console.log(new SDLWindow);