"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var SDL = {};
exports.SDL_QUERY = -1;
// export const SDL_IGNORE = 0;
// export const SDL_DISABLE = 0;
exports.SDL_ENABLE = 1;
function SDL_Init(flags) {
    return SDL.SDL_Init(flags);
}
exports.SDL_Init = SDL_Init;
function SDL_Quit() {
    SDL.SDL_Quit();
}
exports.SDL_Quit = SDL_Quit;
lib_loader_1.loadLibrary({
    SDL_Init: [types_1.int32, [types_1.Uint32]],
    SDL_InitSubSystem: [types_1.int32, [types_1.Uint32]],
    SDL_QuitSubSystem: [types_1.voit, [types_1.Uint32]],
    SDL_WasInit: [types_1.Uint32, [types_1.Uint32]],
    SDL_Delay: [types_1.voit, [types_1.Uint32]],
    SDL_Quit: [types_1.voit, []]
}, SDL);
//# sourceMappingURL=sdl.js.map
