const CommonEvent = require("./common_event");
const sdl = require("../sdl");
const fs = require("fs");
const url = require("url");

class DropEvent extends CommonEvent {
  constructor(type) {
    super(type);
    this.data = null;
    this.path = "";
  }

  static getCurrentDropEvent(sdlEvent, window) {
    const currentDropEvent = new DropEvent();
    currentDropEvent.setCommonData(sdlEvent, window);
    return currentDropEvent;
  }

  static initDropEvents(event, win) {
    const currentEvent = DropEvent.getCurrentDropEvent(event, win);
    if (event.type === sdl.SDL_EventType.SDL_DROPTEXT) {
      let addr = url.parse(event.drop.file);
      const pathToFile = decodeURI(addr.path);

      currentEvent.path = pathToFile;
      currentEvent.type = "dropbegin";
      currentEvent.dispatch();

      fs.readFile(pathToFile, (err, data) => {
        currentEvent.type = "drop";
        if (data) currentEvent.data = data;
        currentEvent.dispatch();
      });
    }
  }
}

module.exports = DropEvent;