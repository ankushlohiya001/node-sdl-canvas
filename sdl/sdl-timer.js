"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var SDL = {};
exports.SDL_QUERY = -1;
// export const SDL_IGNORE = 0;
// export const SDL_DISABLE = 0;
exports.SDL_ENABLE = 1;
function SDL_GetTicks() {
    return SDL.SDL_GetTicks();
}
exports.SDL_GetTicks = SDL_GetTicks;
function SDL_Delay(ms) {
    SDL.SDL_Delay(ms);
}
exports.SDL_Delay = SDL_Delay;
lib_loader_1.loadLibrary({
    SDL_GetTicks: [types_1.int32, []],
    SDL_Delay: [types_1.voit, [types_1.Uint32]],
}, SDL);
//# sourceMappingURL=sdl-timer.js.map