const CommonEvent = require("./common_event");
const MouseEvent = require("./mouse_event");
const types = require("../types");


class WindowEvent extends CommonEvent {
  constructor(type) {
    super(type);
    this.clientX = 0;
    this.clientY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.data = null;
  }
  static getCurrentWindowEvent(event, window) {
    const currentWindowEvent = new WindowEvent();
    currentWindowEvent.setCommonData(event, window);

    const px = event.windowEvent.x,
      py = event.windowEvent.y;
    currentWindowEvent.clientX = px;
    currentWindowEvent.clientY = py;

    let lpx = 0,
      lpy = 0;
    if (!!window._lastWindowEvent) {
      lpx = px - window._lastWindowEvent.clientX;
      lpy = py - window._lastWindowEvent.clientY;
    }

    currentWindowEvent.deltaX = lpx;
    currentWindowEvent.deltaY = lpy;
    return currentWindowEvent;
  }

  static initWindowEvents(event, win) {
    const currentEvent = WindowEvent.getCurrentWindowEvent(event, win);
    switch (event.windowEvent.event) {
      case types.WindowEvent.SHOWN:
        currentEvent.type = "show";
        win._shown = true;
        win._minimized = false;
        break;
      case types.WindowEvent.HIDDEN:
        currentEvent.type = "hide";
        break;
      case types.WindowEvent.MOVED:
        currentEvent.type = "move";
        break;
      case types.WindowEvent.SIZE_CHANGED:
        currentEvent.type = "sizechange";
        break;
      case types.WindowEvent.RESIZED:
        currentEvent.type = "resize";
        break;
      case types.WindowEvent.MINIMIZED:
        currentEvent.type = "minimize";
        win._minimized = true;
        win._shown = false;
        break;
      case types.WindowEvent.MAXIMIZED:
        currentEvent.type = "maximize";
        win._maximized = true;
        this._restored = false;
        break;
      case types.WindowEvent.RESTORED:
        currentEvent.type = "restore";
        win._maximized = false;
        win._restored = true;
        break;
      case types.WindowEvent.FOCUS_GAINED:
        currentEvent.type = "focus";
        win._focused = true;
        break;
      case types.WindowEvent.FOCUS_LOST:
        currentEvent.type = "blur";
        win._focused = false;
        break;
      case types.WindowEvent.CLOSE:
        currentEvent.type = "close";
        win.close();
        break;

        /////////////////
        //////mouse events ////////////////////////////////////////////////////////
        //////////////

      case types.WindowEvent.ENTER:
        {
          let altCurrentEvent = win._lastMouseEvent;
          if (!altCurrentEvent) {
            altCurrentEvent = MouseEvent.getCurrentMouseEvent(event);
          }
          altCurrentEvent.type = "mouseenter";
          altCurrentEvent.dispatch();
          altCurrentEvent.type = "mouseover";
          altCurrentEvent.dispatch();
        }
        return;
      case types.WindowEvent.LEAVE:
        {
          let altCurrentEvent = win._lastMouseEvent;
          if (!altCurrentEvent) {
            altCurrentEvent = MouseEvent.getCurrentMouseEvent(event);
          }
          altCurrentEvent.type = "mouseleave";
          win._mouseButtonDown = false;
          altCurrentEvent.dispatch();
        }
        return;
    };
    win._lastWindowEvent = currentEvent;
    currentEvent.dispatch();
  }
}

module.exports = WindowEvent;
