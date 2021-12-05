const EventEmitter = require("events");
const sdl = require("./binding");
const InitFlag = require("./types").InitFlag;
const eventWatcher = require("./events");

class ApplicationContext extends EventEmitter {
  static loopId = null;
  static mainLoop(delayMs = 17) {
    if (ApplicationContext.loopId) return;
    (function loop() {
      eventWatcher.pollEvent();
      ApplicationContext.loopId = setTimeout(loop, delayMs);
    })();
  }

  constructor(windowList) {
    super();
    this.windowList = windowList;
    if (sdl.init(InitFlag.VIDEO) !== 0) {
      console.log("->Unable to initalise SDL");
      this.exit();
      return;
    }

    // handle interrupt signal ( Ctrl + C )
    // destroy all window, then exits

    process.on("SIGINT", () => {
      for (let [id, win] in this.windowList) {
        win.close();
      }
    });

    console.log("->Success of initalised SDL");
  }

  exit() {
    if (this.windowList.size > 0) return;
    clearTimeout(ApplicationContext.loopId);
    sdl.quit();
    console.log("->Success to exit SDL");
    process.exit(0);
  }
}

module.exports = ApplicationContext;
