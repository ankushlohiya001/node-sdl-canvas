"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_1 = require("../sdl");
function sdlWindowDefaults() {
    var opts = {};
    opts.title = '';
    opts.width = 640;
    opts.height = 480;
    opts.x = 0x2FFF0000;
    opts.y = 0x2FFF0000;
    opts.closable = true;
    opts.fullscreen = false;
    opts.show = true;
    opts.resizable = true;
    opts.borderless = false;
    opts.minimized = false;
    opts.allowHighDPI = false;
    opts.grabInputFocus = false;
    return opts;
}
exports.sdlWindowDefaults = sdlWindowDefaults;
function getSdlWindowOptions(options) {
    if (options === null || options === undefined) {
        options = {};
    }
    var defaults = sdlWindowDefaults();
    var opts = __assign({}, defaults, options);
    /*tslint:disable*/
    var flags = 0;
    flags |= sdl_1.SDL_WindowFlags.SDL_WINDOW_OPENGL;
    flags |= opts.fullscreen ? sdl_1.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP : 0;
    flags |= opts.show ? sdl_1.SDL_WindowFlags.SDL_WINDOW_SHOWN : sdl_1.SDL_WindowFlags.SDL_WINDOW_HIDDEN;
    flags |= opts.resizable ? sdl_1.SDL_WindowFlags.SDL_WINDOW_RESIZABLE : 0;
    flags |= opts.borderless ? sdl_1.SDL_WindowFlags.SDL_WINDOW_BORDERLESS : 0;
    flags |= opts.minimized ? sdl_1.SDL_WindowFlags.SDL_WINDOW_MINIMIZED : 0;
    flags |= opts.maximized ? sdl_1.SDL_WindowFlags.SDL_WINDOW_MAXIMIZED : 0;
    flags |= opts.allowHighDPI ? sdl_1.SDL_WindowFlags.SDL_WINDOW_ALLOW_HIGHDPI : 0;
    // flags |= opts.mouseCapture ? SDL_WindowFlags.SDL_WINDOW_MOUSE_CAPTURE : 0;
    flags |= opts.grabInputFocus ? sdl_1.SDL_WindowFlags.SDL_WINDOW_INPUT_GRABBED : 0;
    /*tslint:enable*/
    var title = opts.title;
    var x = opts.x;
    var y = opts.y;
    var w = opts.width;
    var h = opts.height;
    return { x: x, y: y, w: w, h: h, flags: flags, title: title };
}
exports.getSdlWindowOptions = getSdlWindowOptions;
//# sourceMappingURL=sdl-window-opts.js.map