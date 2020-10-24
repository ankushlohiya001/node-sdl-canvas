"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var ref = require('ref-napi');
var Struct = require('ref-struct-di')(ref);
var SDL = {};
exports.SDL_TouchID = types_1.longlong;
exports.SDL_FingerID = types_1.longlong;
exports.SDL_Finger = Struct({
    id: exports.SDL_FingerID,
    x: types_1.float,
    y: types_1.float,
    pressure: types_1.float,
});
exports.SDL_Finger_ptr = ref.refType(exports.SDL_Finger);
lib_loader_1.loadLibrary({
    SDL_GetNumTouchDevices: [types_1.int32, []],
    SDL_GetTouchDevice: [exports.SDL_TouchID, [types_1.int32]],
    SDL_GetNumTouchFingers: [types_1.int32, [exports.SDL_TouchID]],
    SDL_GetTouchFinger: [exports.SDL_Finger_ptr, [exports.SDL_TouchID, types_1.int32]],
}, SDL);
//# sourceMappingURL=sdl-touch.js.map