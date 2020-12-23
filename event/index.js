let sdl = require("../sdl");
let keycode = require('keycode');
var sdl_mouse_1 = require("../sdl/sdl-mouse");
let keymod = sdl.SDL_Keymod;
let KMOD_KEYS = Object.keys(keymod);
let currentKeyEvent = {};
function getCurrentKeyEvent(sdlEvent, window) {
    let key = sdlEvent.key;
    currentKeyEvent.key = getKey(key);
    let normalizedKey = currentKeyEvent.key
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
        let keyModValue = keymod[modName];
        let mod = key.keysym.mod;
        /*tslint:disable*/
        let val = !!(keyModValue & mod);
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
function getKeyCode(key) {
    let codeName = sdl.SDL_GetScancodeName(key.keysym.scancode);
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
    let keyName = sdl.SDL_GetKeyName(key.keysym.sym);
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

var currentMouseEvent = {};
function getCurrentMouseEvent(sdlEvent, window) {
    var mouseButtonEvt = sdlEvent.button;
    var screen = sdl_mouse_1.SDL_GetGlobalMouseState();
    // const button = sdlEvent.button.button;
    if(sdlEvent.type === sdl.SDL_EventType.SDL_MOUSEWHEEL){
      currentMouseEvent.deltaX = sdlEvent.wheel.x;
      currentMouseEvent.deltaY = sdlEvent.wheel.y;
    }
    currentMouseEvent.screenX = screen.x;
    currentMouseEvent.screenY = screen.y;
    currentMouseEvent.clientX = sdlEvent.motion.x; //  X coordinate, relative to window
    currentMouseEvent.clientY = sdlEvent.motion.y; // Y coordinate, relative to window
    currentMouseEvent.pageX = sdlEvent.motion.x;
    currentMouseEvent.pageY = sdlEvent.motion.y;
    currentMouseEvent.relatedTarget = window.canvas;
    currentMouseEvent.ctrlKey = false;
    currentMouseEvent.shiftKey = false;
    currentMouseEvent.altKey = false;
    currentMouseEvent.metaKey = false;
    var key = sdlEvent.key;
    currentMouseEvent.which = currentMouseEvent.button = (mouseButtonEvt.button);
    return currentMouseEvent;
}

function getCurrentWindowEvent(win){
  win.on("SDL_EVENT", function(event){
    let eve=[];
    switch(event.window.event){
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_SHOWN: eve=["show"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_HIDDEN: eve=["hide"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MOVED: eve=["move",event.window.data1,event.window.data2];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_RESIZED:{
        win.updateWindowSize(event.window.data1,event.window.data2);
        eve=["resize",event.window.data1,event.window.data2];
      }
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MINIMIZED: eve=["minimize"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MAXIMIZED: eve=["maximize"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_RESTORED: eve=["restore"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_ENTER:{
        win.emit("mouseenter", win.lastMouseEvent);
        eve=["mouseover", win.lastMouseEvent];
      };
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_LEAVE: eve=["mouseleave", win.lastMouseEvent];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_GAINED: eve=["focus"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_LOST: eve=["blur"];
      break;
      case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_CLOSE: eve=["close"];
      break;
    };
    if(eve.length>0) win.emit.apply(win, eve);
  });
}


module.exports={
    getCurrentKeyEvent,
    getCurrentMouseEvent,
    getCurrentWindowEvent
}