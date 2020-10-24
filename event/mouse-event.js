"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_mouse_1 = require("../sdl/sdl-mouse");
var currentMouseEvent = {};
function getCurrentMouseEvent(sdlEvent, window) {
    currentMouseEvent.preventDefault = function () { return window.preventDefault(currentMouseEvent); };
    currentMouseEvent.stopImmediatePropagation = function () { return window.stopImmediatePropagation(currentMouseEvent); };
    currentMouseEvent.stopPropagation = function () { return window.stopPropagation(currentMouseEvent); };
    var mouseButtonEvt = sdlEvent.button;
    var screen = sdl_mouse_1.SDL_GetGlobalMouseState();
    // const button = sdlEvent.button.button;
    currentMouseEvent.screenX = screen.x;
    currentMouseEvent.screenY = screen.y;
    currentMouseEvent.offsetX = sdlEvent.motion.x - window.canvasX;
    currentMouseEvent.offsetY = sdlEvent.motion.y - window.canvasX;
    currentMouseEvent.clientX = sdlEvent.motion.x; //  X coordinate, relative to window
    currentMouseEvent.clientY = sdlEvent.motion.y; // Y coordinate, relative to window
    currentMouseEvent.pageX = sdlEvent.motion.x;
    currentMouseEvent.pageY = sdlEvent.motion.y;
    currentMouseEvent.relatedTarget = window.getCanvas();
    currentMouseEvent.ctrlKey = false;
    currentMouseEvent.shiftKey = false;
    currentMouseEvent.altKey = false;
    currentMouseEvent.metaKey = false;
    var key = sdlEvent.key;
    currentMouseEvent.which = currentMouseEvent.button = (mouseButtonEvt.button);
    return currentMouseEvent;
}
exports.getCurrentMouseEvent = getCurrentMouseEvent;
//# sourceMappingURL=mouse-event.js.map