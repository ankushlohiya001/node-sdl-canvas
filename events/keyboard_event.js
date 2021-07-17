const CommonEvent = require("./common_event");
const sdl = require("../sdl");
const keycode = require('keycode');
const keymod = sdl.SDL_Keymod;
const KMOD_KEYS = Object.keys(keymod);

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

  static initKeyboardEvents(event, win) {
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

    } else {
      currentEvent.type = "keyup";
      currentEvent.dispatch();
      win._keyDown = false;
      win._lastKeyEvent = currentEvent;
    }
  }
}

module.exports = KeyboardEvent;