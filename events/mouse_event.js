const CommonEvent = require("./common_event");
const sdl = require("../sdl");

class MouseEvent extends CommonEvent {
  constructor(type) {
    super(type);
    this.altKey = false;
    this.ctrlKey = false;
    this.metaKey = false;
    this.shiftKey = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.dblclick = false;
    this.which = null;
    this.downButtons = [false, false, false];
  }

  static getCurrentMouseEvent(sdlEvent, window) {
    const currentMouseEvent = new MouseEvent();
    currentMouseEvent.setCommonData(sdlEvent, window);

    var mouseButtonEvt = sdlEvent.button;
    const state = sdl.SDL_GetMouseState();
    const bitMask = state.bitMask;
    if (sdlEvent.type === sdl.SDL_EventType.SDL_MOUSEWHEEL) {
      currentMouseEvent.deltaX = sdlEvent.wheel.x;
      currentMouseEvent.deltaY = currentMouseEvent.delta = sdlEvent.wheel.y;
    }
    currentMouseEvent.clientX = state.x; //  X coordinate, relative to window
    currentMouseEvent.clientY = state.y; // Y coordinate, relative to window
    currentMouseEvent.ctrlKey = false;
    currentMouseEvent.shiftKey = false;
    currentMouseEvent.altKey = false;
    currentMouseEvent.metaKey = false;
    currentMouseEvent.dblClick = sdlEvent.button.clicks === 2;
    currentMouseEvent.downButtons[0] = !!(bitMask & sdl.SDL_BUTTON(sdl.SDL_BUTTON_LEFT));
    currentMouseEvent.downButtons[1] = !!(bitMask & sdl.SDL_BUTTON(sdl.SDL_BUTTON_MIDDLE));
    currentMouseEvent.downButtons[2] = !!(bitMask & sdl.SDL_BUTTON(sdl.SDL_BUTTON_RIGHT));
    var key = sdlEvent.key;
    currentMouseEvent.which = currentMouseEvent.button = (mouseButtonEvt.button);
    return currentMouseEvent;
  }

  static initMouseEvents(event, win) {
    let currentEvent = MouseEvent.getCurrentMouseEvent(event, win);

    win._mouseButtonDown = currentEvent.downButtons.some(s => !!s);
    if (win._keyDown) {
      currentEvent.altKey = win._lastKeyEvent.altKey;
      currentEvent.ctrlKey = win._lastKeyEvent.ctrlKey;
      currentEvent.shiftKey = win._lastKeyEvent.shiftKey;
      currentEvent.metaKey = win._lastKeyEvent.metaKey;
    }

    if (event.type === sdl.SDL_EventType.SDL_MOUSEMOTION) {
      currentEvent.type = "mousemove";
      currentEvent.dispatch();

      if (win._mouseButtonDown) {
        currentEvent.type = "drag";
        currentEvent.dispatch();
      }
      win._lastMouseEvent = currentEvent;

    } else if (event.type === sdl.SDL_EventType.SDL_MOUSEWHEEL) {
      currentEvent.type = "wheel";
      currentEvent.dispatch();

    } else {
      if (win._mouseButtonDown) {
        currentEvent.type = "mousedown";
        currentEvent.dispatch();

        if (currentEvent.dblClick) {
          currentEvent.type = "dblclick";
          currentEvent.dispatch();
        }

      } else {
        currentEvent.type = "mouseup";
        currentEvent.dispatch();
        currentEvent.type = "click";
        currentEvent.dispatch();

      }
    }
  }
}

module.exports = MouseEvent;