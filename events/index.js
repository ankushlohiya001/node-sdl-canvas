const sdl = require("../sdl");
const keycode = require('keycode');
const keymod = sdl.SDL_Keymod;
const KMOD_KEYS = Object.keys(keymod);
const fs = require("fs");
const url = require("url");

class CommonEvent {
  constructor(type = null) {
    this.nativeEvent = null;
    this.type = type;
    this.target = null;
    this.timestamp = null;
  }

  setCommonData(sdlEvent, win) {
    this.nativeEvent = sdlEvent;
    this.target = win;
    this.timestamp = sdlEvent.window.timestamp;
  }

  dispatch() {
    if (this.target && this.type != "") {
      this.target.emit(this.type, this);
    }
  }
}

class KeyboardEvent extends CommonEvent {
  constructor(type) {
    super(type);
    this.key = null;
    this.keyCode = null;
    this.code = null;
    this.altKey = false;
    this.ctrlKey = false;
    this.metaKey = false;
    this.shiftKey = false;
    this.repeat = false;
    this.which = null;
  }

  static getKey(key) {
    const keyName = sdl.SDL_GetKeyName(key.keysym.sym);
    if (keyName.length === 1 && keyName.match(/[A-Z]/i)) {
      return keyName.toLowerCase();
    }
    switch (keyName) {
      case 'Space':
        return ' ';
      default:
        return keyName;
    }
  }

  static getKeyCode(key) {
    const codeName = sdl.SDL_GetScancodeName(key.keysym.scancode);
    if (codeName.length === 1 && codeName.match(/[A-Z]/i)) {
      return "Key" + codeName;
    } else if (codeName.length === 1 && codeName.match(/[0-9]/i)) {
      return "Digit" + codeName;
    } else {
      return codeName;
    }
  }

  static getCurrentKeyEvent(sdlEvent, window) {
    const currentKeyEvent = new KeyboardEvent();
    currentKeyEvent.setCommonData(sdlEvent, window);

    let isUpperCase = false;
    let key = sdlEvent.key;
    currentKeyEvent.key = KeyboardEvent.getKey(key);
    let normalizedKey = currentKeyEvent.key
      .toLowerCase()
      .trim()
      .replace('left ', '')
      .replace('right ', '')
      .trim();

    if (normalizedKey.length > 0) {
      currentKeyEvent.which = currentKeyEvent.keyCode = keycode(normalizedKey);
    } else {
      currentKeyEvent.which = currentKeyEvent.keyCode = keycode(currentKeyEvent.key);
    }

    currentKeyEvent.code = KeyboardEvent.getKeyCode(key);
    currentKeyEvent.repeat = !!key.repeat;

    for (let modName of KMOD_KEYS) {
      let keyModValue = keymod[modName];
      let mod = key.keysym.mod;

      let val = !!(keyModValue & mod);

      switch (modName) {
        case 'KMOD_LCTRL':
        case 'KMOD_RCTRL':
          if (!currentKeyEvent.ctrlKey) {
            currentKeyEvent.ctrlKey = val;
          }
          break;
        case 'KMOD_LSHIFT':
        case 'KMOD_RSHIFT':
          if (!currentKeyEvent.shiftKey) {
            currentKeyEvent.shiftKey = val;
          }
          break;
        case 'KMOD_RALT':
        case 'KMOD_LALT':
          if (!currentKeyEvent.altKey) {
            currentKeyEvent.altKey = val;
          }
          break;
        case 'KMOD_LGUI':
        case 'KMOD_RGUI':
          if (!currentKeyEvent.metaKey) {
            currentKeyEvent.metaKey = val;
          }
          break;
      }
    }
    return currentKeyEvent;
  }

}

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
    this.screenX = 0;
    this.screenY = 0;
    this.dblclick = false;
    this.which = null;
  }
  static getCurrentMouseEvent(sdlEvent, window) {
    const currentMouseEvent = new MouseEvent();
    currentMouseEvent.setCommonData(sdlEvent, window);

    var mouseButtonEvt = sdlEvent.button;
    var screen = sdl.SDL_GetGlobalMouseState();

    if (sdlEvent.type === sdl.SDL_EventType.SDL_MOUSEWHEEL) {
      currentMouseEvent.deltaX = sdlEvent.wheel.x;
      currentMouseEvent.deltaY = currentMouseEvent.delta = sdlEvent.wheel.y;
    }
    currentMouseEvent.screenX = screen.x;
    currentMouseEvent.screenY = screen.y;
    currentMouseEvent.clientX = sdlEvent.motion.x; //  X coordinate, relative to window
    currentMouseEvent.clientY = sdlEvent.motion.y; // Y coordinate, relative to window
    currentMouseEvent.ctrlKey = false;
    currentMouseEvent.shiftKey = false;
    currentMouseEvent.altKey = false;
    currentMouseEvent.metaKey = false;
    currentMouseEvent.dblClick = sdlEvent.button.clicks === 2;
    var key = sdlEvent.key;
    currentMouseEvent.which = currentMouseEvent.button = (mouseButtonEvt.button);
    return currentMouseEvent;
  }
}

class WindowEvent extends CommonEvent {
  constructor(type) {
    super(type);
    this.data = null;
  }
  static getCurrentWindowEvent(sdlEvent, window) {
    const currentWindowEvent = new WindowEvent();
    currentWindowEvent.setCommonData(sdlEvent, window);
    currentWindowEvent.data = [sdlEvent.window.data1, sdlEvent.window.data2];
    return currentWindowEvent;
  }
}

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
}

function initWindowEvents(event, win) {
  const currentEvent = WindowEvent.getCurrentWindowEvent(event, win);
  switch (event.window.event) {
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_SHOWN:
      currentEvent.type = "show";
      win._shown = true;
      win._minimized = false;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_HIDDEN:
      currentEvent.type = "hide";
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MOVED:
      currentEvent.type = "move";
      win._position = currentEvent.data;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_SIZE_CHANGED:
      currentEvent.type = "sizechange";
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_RESIZED:
      currentEvent.type = "resize";
      if (currentEvent.data) {
        win.size = currentEvent.data;
      }
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MINIMIZED:
      currentEvent.type = "minimize";
      win._minimized = true;
      win._shown = false;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MAXIMIZED:
      currentEvent.type = "maximize";
      win._maximized = true;
      this._restored = false;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_RESTORED:
      currentEvent.type = "restore";
      win._maximized = false;
      win._restored = true;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_GAINED:
      currentEvent.type = "focus";
      win._focused = true;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_LOST:
      currentEvent.type = "blur";
      win._focused = false;
      break;
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_CLOSE:
      currentEvent.type = "close";
      win.exit();
      break;

      /////////////////
      //////mouse events ////////////////////////////////////////////////////////
      //////////////

    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_ENTER:
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
    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_LEAVE:
      {
        let altCurrentEvent = win._lastMouseEvent;
        if (!altCurrentEvent) {
          altCurrentEvent = MouseEvent.getCurrentMouseEvent(event);
        }
        altCurrentEvent.type = "mouseleave";
        altCurrentEvent.dispatch();
      }
      return;
  };

  currentEvent.dispatch();
}


function initDropEvents(event, win) {
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


function initKeyboardEvents(event, win) {
  const currentEvent = KeyboardEvent.getCurrentKeyEvent(event, win);

  if (event.type === sdl.SDL_EventType.SDL_KEYDOWN) {
    currentEvent.type = "keydown";
    currentEvent.dispatch();

    if (!win._keyDown) {
      currentEvent.type = "keypress";
      currentEvent.dispatch();

      if (currentEvent.key.length === 1) {
        currentEvent.type = "keyinput";
        currentEvent.dispatch();
      }
    }
    win._keyDown = true;
    win._lastKeyEvent = currentEvent;

  } else if (event.type === sdl.SDL_EventType.SDL_KEYUP) {
    currentEvent.type = "keyup";
    currentEvent.dispatch();
    win._keyDown = false;
    win._lastKeyEvent = currentEvent;
  }
}

function initMouseEvents(event, win) {
  let currentEvent = MouseEvent.getCurrentMouseEvent(event, win);

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

  } else if (event.type === sdl.SDL_EventType.SDL_MOUSEBUTTONDOWN) {
    currentEvent.type = "mousedown";
    currentEvent.dispatch();

    if (currentEvent.dblClick) {
      currentEvent.type = "dblclick";
      currentEvent.dispatch();
    }
    win._mouseButtonDown = true;

  } else if (event.type === sdl.SDL_EventType.SDL_MOUSEBUTTONUP) {
    currentEvent.type = "mouseup";
    currentEvent.dispatch();
    currentEvent.type = "click";
    currentEvent.dispatch();
    win._mouseButtonDown = false;

  } else if (event.type === sdl.SDL_EventType.SDL_MOUSEWHEEL) {
    currentEvent.type = "wheel";
    currentEvent.dispatch();
  }
}

let eventFilterFunction;

function setupEventWatcher(windows) {
  let lastEventWindowId;
  eventFilterFunction = sdl.createEventFilterFunction(
    (data, event) => {
      event = event.deref();
      const type = event.type;
      let winId = event.window.windowID;
      let win = windows[winId];

      if (!win) {
        winId = lastEventWindowId;
        win = windows[winId];
      }

      if (type == 512) {
        initWindowEvents(event, win);
      } else if (type >= 768 && type <= 771) {
        initKeyboardEvents(event, win);
      } else if (type >= 1024 && type <= 1027) {
        initMouseEvents(event, win);
      } else if (type >= 4096 && type <= 4099) {
        initDropEvents(event, win);
      }
      lastEventWindowId = winId;
    });
  sdl.SDL_AddEventWatch(eventFilterFunction, null);
}

module.exports = setupEventWatcher;