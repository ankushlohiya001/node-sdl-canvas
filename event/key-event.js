"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_1 = require("../sdl");
var keycode = require('keycode');
var keymod = sdl_1.SDL_Keymod;
var KMOD_KEYS = Object.keys(keymod);
var currentKeyEvent = {};
function getCurrentKeyEvent(sdlEvent, window) {
    currentKeyEvent.preventDefault = function () { return window.preventDefault(currentKeyEvent); };
    currentKeyEvent.stopImmediatePropagation = function () { return window.stopImmediatePropagation(currentKeyEvent); };
    currentKeyEvent.stopPropagation = function () { return window.stopPropagation(currentKeyEvent); };
    var key = sdlEvent.key;
    currentKeyEvent.key = getKey(key);
    var normalizedKey = currentKeyEvent.key
        .toLowerCase()
        .trim()
        .replace('left ', '')
        .replace('right ', '')
        .trim();
    if (normalizedKey.length > 0) {
        currentKeyEvent.which = currentKeyEvent.keyCode = currentKeyEvent.charCode = keycode(normalizedKey);
    }
    else {
        currentKeyEvent.which = currentKeyEvent.keyCode = currentKeyEvent.charCode = keycode(currentKeyEvent.key);
    }
    currentKeyEvent.code = getKeyCode(key);
    currentKeyEvent.repeat = !!key.repeat;
    currentKeyEvent.ctrlKey = false;
    currentKeyEvent.shiftKey = false;
    currentKeyEvent.altKey = false;
    currentKeyEvent.metaKey = false;
    KMOD_KEYS.forEach(function (modName) {
        var keyModValue = keymod[modName];
        var mod = key.keysym.mod;
        /*tslint:disable*/
        var val = !!(keyModValue & mod);
        /*tslint:enable*/
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
    });
    return currentKeyEvent;
}
exports.getCurrentKeyEvent = getCurrentKeyEvent;
function getKeyCode(key) {
    var codeName = sdl_1.SDL_GetScancodeName(key.keysym.scancode);
    if (codeName.length === 1 && codeName.match(/[A-Z]/i)) {
        return "Key" + codeName;
    }
    else if (codeName.length === 1 && codeName.match(/[0-9]/i)) {
        return "Digit" + codeName;
    }
    else {
        return codeName;
    }
}
function getKey(key) {
    var keyName = sdl_1.SDL_GetKeyName(key.keysym.sym);
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
//# sourceMappingURL=key-event.js.map