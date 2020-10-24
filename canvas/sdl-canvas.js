"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_context_1 = require("./sdl-context");
var SdlCanvas = /** @class */ (function () {
    function SdlCanvas(window) {
        this.window = window;
        var sdlWindow = window;
        this._style = {};
        this._canvas = sdlWindow.internalCanvas;
        this._nativeCtx = new sdl_context_1.SdlContext(this._canvas);
        sdlWindow.canvas = this;
    }
    Object.defineProperty(SdlCanvas.prototype, "height", {
        get: function () {
            return this._canvas.height;
        },
        set: function (value) {
            this.window.windowImplementation().canvasHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlCanvas.prototype, "width", {
        get: function () {
            return this._canvas.width;
        },
        set: function (value) {
            this.window.windowImplementation().canvasWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    SdlCanvas.prototype.getContext = function (contextId, contextAttributes) {
        if (contextId === '2d') {
            // return this.
            return this._nativeCtx;
        }
        return undefined;
    };
  
    return SdlCanvas;
}());
exports.SdlCanvas = SdlCanvas;
//# sourceMappingURL=sdl-canvas.js.map