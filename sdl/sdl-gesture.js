"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_touch_1 = require("./sdl-touch");
var lib_loader_1 = require("./lib-loader");
var sdl_rwops_1 = require("./sdl-rwops");
var types_1 = require("./types");
exports.SDL_GestureID = types_1.longlong;
var SDL = {};
lib_loader_1.loadLibrary({
    SDL_RecordGesture: [types_1.int32, [sdl_touch_1.SDL_TouchID]],
    SDL_SaveAllDollarTemplates: [types_1.int32, [sdl_rwops_1.SDL_RWops_ptr]],
    SDL_SaveDollarTemplate: [types_1.int32, [exports.SDL_GestureID, sdl_rwops_1.SDL_RWops_ptr]],
    SDL_LoadDollarTemplates: [types_1.int32, [sdl_touch_1.SDL_TouchID, sdl_rwops_1.SDL_RWops_ptr]],
}, SDL);
//# sourceMappingURL=sdl-gesture.js.map