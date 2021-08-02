const windowList = require("../window").windowList;
const EventType = require("../types").EventType;
const WindowEvent = require("./window_event");
const MouseEvent = require("./mouse_event");
const KeyboardEvent = require("./keyboard_event");
// const DropEvent = require("./drop_event");
const EventWatcher = require("../binding").EventWatcher;

const eventWatcher = new EventWatcher();

let lastEventWindowId;

eventWatcher.setCallback(function(eventType, winId) {

  let win = windowList[winId];

  if (!win) {
    winId = lastEventWindowId;
    win = windowList[winId];
  }

  switch (eventType) {
    case EventType.WINDOWEVENT:
      WindowEvent.initWindowEvents(eventWatcher, win);
      break;
    case EventType.KEYDOWN:
    case EventType.KEYUP:
      KeyboardEvent.initKeyboardEvents(eventWatcher, win);
      break;
    case EventType.MOUSEMOTION:
    case EventType.MOUSEBUTTONDOWN:
    case EventType.MOUSEBUTTONUP:
    case EventType.MOUSEWHEEL:
      MouseEvent.initMouseEvents(eventWatcher, win);
      break;
      // case EventType.DROPFILE:
      // case EventType.DROPTEXT:
      // case EventType.DROPBEGIN:
      // case EventType.DROPCOMPLETE:
      //   DropEvent.initDropEvents(eventWatcher.getWindowEvent);
      break;
    case EventType.QUIT:
      win.exit();
      win.emit("close");
      break;
  }
  lastEventWindowId = winId;

});

module.exports = eventWatcher;