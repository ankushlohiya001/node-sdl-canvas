const EventEmitter = require("events");
const sdl = require("./sdl");
const eventWatcher= require("./events");

class ApplicationContext extends EventEmitter {
  static loopId = null;
  static mainLoop() {
    if (ApplicationContext.loopId) return;
    (function loop() {
      eventWatcher.eventPolling();
      ApplicationContext.loopId = setTimeout(loop, 17);
    })();
  }

  constructor() {
    super();
    this.windows = {
      count: 0
    };
    this.initSDL(0x00000020);
  }

  initSDL(sdlFlags) {
    if (sdl.SDL_Init(sdlFlags) !== 0) {
      console.log("->Unable to initalise SDL");
      this.exit();
      return;
    }
    console.log("->Success of initalised SDL");
  }

  addWindow(win) {
    this.windows[win.id] = win;
    this.windows.count++;
    win.appContext = this;
    if (this.windows.count === 1) {
      eventWatcher.setWindowList(this.windows);
    }
  }

  exit(id) {
    delete this.windows[id];
    this.windows.count--;
    if (this.windows.count > 0) return;
    clearTimeout(ApplicationContext.loopId);
    sdl.SDL_Quit();
    console.log("->Success to exit SDL");
    process.exit(0);
  }
}

module.exports = ApplicationContext;