import { CommonEvent } from "./common_event";
import { EventType, KeyMod } from "../types";
import keycode from "keycode";

export class KeyboardEvent extends CommonEvent {
  key: string | null;
  keyCode: number | null;
  code: string | null;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  repeat: boolean;
  which: any;

  constructor(type?: any) {
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

  static getKey(keyName: string): string {
    if (keyName.length === 1 && keyName.match(/[A-Z]/i)) {
      return keyName.toLowerCase();
    }
    switch (keyName) {
      case "Space":
        return " ";
      default:
        return keyName;
    }
  }

  static getKeyCode(codeName: string): string {
    if (codeName.length === 1 && codeName.match(/[A-Z]/i)) {
      return "Key" + codeName;
    } else if (codeName.length === 1 && codeName.match(/[0-9]/i)) {
      return "Digit" + codeName;
    } else {
      return codeName;
    }
  }

  static getCurrentKeyEvent(event: any, window: any) {
    const currentKeyEvent = new KeyboardEvent();
    currentKeyEvent.setCommonData(event, window);

    let isUpperCase = false;
    currentKeyEvent.key = KeyboardEvent.getKey(event.keyboardEvent.keyName);
    let normalizedKey = currentKeyEvent.key
      .toLowerCase()
      .trim()
      .replace("left ", "")
      .replace("right ", "")
      .trim();

    if (normalizedKey.length > 0) {
      currentKeyEvent.which = currentKeyEvent.keyCode = keycode(normalizedKey);
    } else {
      currentKeyEvent.which = currentKeyEvent.keyCode = keycode(
        currentKeyEvent.key,
      );
    }

    currentKeyEvent.code = KeyboardEvent.getKeyCode(
      event.keyboardEvent.codeName,
    );
    // currentKeyEvent.repeat = !!key.repeat;

    for (let modName in KeyMod) {
      let keyModValue = KeyMod[modName];
      // let mod = key.keysym.mod;
      let mod = 3; //TODO: check for key

      let val = !!(keyModValue & mod);

      switch (keyModValue) {
        case KeyMod.LCTRL:
        case KeyMod.RCTRL:
          if (!currentKeyEvent.ctrlKey) {
            currentKeyEvent.ctrlKey = val;
          }
          break;
        case KeyMod.LSHIFT:
        case KeyMod.RSHIFT:
          if (!currentKeyEvent.shiftKey) {
            currentKeyEvent.shiftKey = val;
          }
          break;
        case KeyMod.RALT:
        case KeyMod.LALT:
          if (!currentKeyEvent.altKey) {
            currentKeyEvent.altKey = val;
          }
          break;
        case KeyMod.LGUI:
        case KeyMod.RGUI:
          if (!currentKeyEvent.metaKey) {
            currentKeyEvent.metaKey = val;
          }
          break;
      }
    }
    return currentKeyEvent;
  }

  static initKeyboardEvents(event: any, win: any) {
    const currentEvent = KeyboardEvent.getCurrentKeyEvent(event, win);

    if (event.keyboardEvent.type === EventType.KEYDOWN) {
      currentEvent.type = "keydown";
      currentEvent.dispatch();

      if (!win._keyDown) {
        currentEvent.type = "keypress";
        currentEvent.dispatch();

        if (currentEvent.key?.length === 1) {
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
