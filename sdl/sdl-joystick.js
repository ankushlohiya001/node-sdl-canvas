"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var ref = require('ref-napi');
var ArrayType = require('ref-array-di')(ref);
var Struct = require('ref-struct-di')(ref);
var SDL = {};
var SDL_JoystickPowerLevel;
(function (SDL_JoystickPowerLevel) {
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_UNKNOWN"] = -1] = "SDL_JOYSTICK_POWER_UNKNOWN";
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_EMPTY"] = 0] = "SDL_JOYSTICK_POWER_EMPTY";
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_LOW"] = 1] = "SDL_JOYSTICK_POWER_LOW";
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_MEDIUM"] = 2] = "SDL_JOYSTICK_POWER_MEDIUM";
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_FULL"] = 3] = "SDL_JOYSTICK_POWER_FULL";
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_WIRED"] = 4] = "SDL_JOYSTICK_POWER_WIRED";
    SDL_JoystickPowerLevel[SDL_JoystickPowerLevel["SDL_JOYSTICK_POWER_MAX"] = 5] = "SDL_JOYSTICK_POWER_MAX";
})(SDL_JoystickPowerLevel = exports.SDL_JoystickPowerLevel || (exports.SDL_JoystickPowerLevel = {}));
exports.SDL_Joystick = types_1.voit;
exports.SDL_JoystickGUID = Struct({
    data: ArrayType(types_1.Uint8, 16),
});
exports.SDL_JoystickID = types_1.int32;
exports.SDL_Joystick_ptr = ref.refType(exports.SDL_Joystick);
lib_loader_1.loadLibrary({
    SDL_NumJoysticks: [types_1.int32, []],
    SDL_JoystickNameForIndex: [types_1.string, [types_1.int32]],
    SDL_JoystickOpen: [exports.SDL_Joystick_ptr, [types_1.int32]],
    SDL_JoystickFromInstanceID: [exports.SDL_Joystick_ptr, [exports.SDL_JoystickID]],
    SDL_JoystickName: [types_1.string, [exports.SDL_Joystick_ptr]],
    SDL_JoystickGetDeviceGUID: [exports.SDL_JoystickGUID, [types_1.int32]],
    SDL_JoystickGetGUID: [exports.SDL_JoystickGUID, [exports.SDL_Joystick_ptr]],
    SDL_JoystickGetGUIDString: [types_1.voit, [exports.SDL_JoystickGUID, types_1.string, types_1.int32]],
    SDL_JoystickGetGUIDFromString: [exports.SDL_JoystickGUID, [types_1.string]],
    SDL_JoystickGetAttached: [types_1.uint32, [exports.SDL_Joystick_ptr]],
    SDL_JoystickInstanceID: [exports.SDL_JoystickID, [exports.SDL_Joystick_ptr]],
    SDL_JoystickNumAxes: [types_1.int32, [exports.SDL_Joystick_ptr]],
    SDL_JoystickNumBalls: [types_1.int32, [exports.SDL_Joystick_ptr]],
    SDL_JoystickNumHats: [types_1.int32, [exports.SDL_Joystick_ptr]],
    SDL_JoystickNumButtons: [types_1.int32, [exports.SDL_Joystick_ptr]],
    SDL_JoystickUpdate: [types_1.voit, []],
    SDL_JoystickEventState: [types_1.int32, [types_1.int32]],
    SDL_JoystickGetAxis: [types_1.Sint16, [exports.SDL_Joystick_ptr, types_1.int32]],
    SDL_JoystickGetHat: [types_1.Uint8, [exports.SDL_Joystick_ptr, types_1.int32]],
    SDL_JoystickGetBall: [types_1.int32, [exports.SDL_Joystick_ptr, types_1.int32, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_JoystickGetButton: [types_1.Uint8, [exports.SDL_Joystick_ptr, types_1.int32]],
    SDL_JoystickClose: [types_1.voit, [exports.SDL_Joystick_ptr]],
    SDL_JoystickCurrentPowerLevel: [types_1.int32, [exports.SDL_Joystick_ptr]],
}, SDL);
//# sourceMappingURL=sdl-joystick.js.map