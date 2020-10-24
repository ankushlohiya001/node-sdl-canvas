"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_renderer_1 = require("./sdl-renderer");
var sdl_context_2d_1 = require("./sdl-context-2d");
var sdl_1 = require("../sdl");
function createSdlContext2D(windowPtr) {
    var renderer = sdl_renderer_1.SdlRenderer.createRenderer(windowPtr, -1);
    return new sdl_context_2d_1.SdlContext2d(renderer);
}
exports.createSdlContext2D = createSdlContext2D;
function createSoftwareSdlContext2D(windowPtr) {
    var surfacePtr = sdl_1.SDL_GetWindowSurface(windowPtr);
    var renderer = sdl_renderer_1.SdlRenderer.createSoftwareRenderer(windowPtr, surfacePtr);
    return new sdl_context_2d_1.SdlContext2d(renderer);
}
exports.createSoftwareSdlContext2D = createSoftwareSdlContext2D;
//# sourceMappingURL=index.js.map