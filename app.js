const windowList = require("./lib/window").windowList;
const EventEmitter = require("events");
const sdl = require("./lib/binding");
const InitFlag = require("./lib/types").InitFlag;
const eventWatcher = require("./lib/events");

class ApplicationContext extends EventEmitter {
  static loopId = null;
  static mainLoop(delayMs = 17) {
    if (ApplicationContext.loopId) return;
    (function loop() {
      eventWatcher.pollEvent();
      ApplicationContext.loopId = setTimeout(loop, delayMs);
    })();
  }

  constructor() {
    super();
    if (sdl.init(InitFlag.VIDEO) !== 0) {
      console.log("->Unable to initalise SDL");
      this.exit();
      return;
    }
    console.log("->Success of initalised SDL");
  }

  exit() {
    if (Object.keys(windowList).length > 0) return;
    clearTimeout(ApplicationContext.loopId);
    sdl.quit();
    console.log("->Success to exit SDL");
    process.exit(0);
  }
}

module.exports = ApplicationContext;