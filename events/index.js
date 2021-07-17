const EventType = require("../sdl").SDL_EventType;
const WindowEvent = require("./window_event");
const MouseEvent = require("./mouse_event");
const KeyboardEvent = require("./keyboard_event");
const DropEvent = require("./drop_event");
const EventWatcher = require("./event_watcher");

const eventWatcher = new EventWatcher();

eventWatcher.setFilterFunction(function(event, win){
  
  switch(event.type){
    case EventType.SDL_WINDOWEVENT:
      WindowEvent.initWindowEvents(event, win);
      break;
    case EventType.SDL_KEYDOWN:
    case EventType.SDL_KEYUP:
      KeyboardEvent.initKeyboardEvents(event, win);
      break;
    case EventType.SDL_MOUSEMOTION:
    case EventType.SDL_MOUSEBUTTONDOWN:
    case EventType.SDL_MOUSEBUTTONUP:
    case EventType.SDL_MOUSEWHEEL:
      MouseEvent.initMouseEvents(event, win);
      break;
    case EventType.SDL_DROPFILE:
    case EventType.SDL_DROPTEXT:
    case EventType.SDL_DROPBEGIN:
    case EventType.SDL_DROPCOMPLETE:
      DropEvent.initDropEvents(event, win);
      break;
  }
});

module.exports = eventWatcher;
