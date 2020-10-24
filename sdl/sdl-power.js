"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var SDL = {};
var SDL_PowerState;
(function (SDL_PowerState) {
    SDL_PowerState[SDL_PowerState["SDL_POWERSTATE_UNKNOWN"] = 0] = "SDL_POWERSTATE_UNKNOWN";
    SDL_PowerState[SDL_PowerState["SDL_POWERSTATE_ON_BATTERY"] = 1] = "SDL_POWERSTATE_ON_BATTERY";
    SDL_PowerState[SDL_PowerState["SDL_POWERSTATE_NO_BATTERY"] = 2] = "SDL_POWERSTATE_NO_BATTERY";
    SDL_PowerState[SDL_PowerState["SDL_POWERSTATE_CHARGING"] = 3] = "SDL_POWERSTATE_CHARGING";
    SDL_PowerState[SDL_PowerState["SDL_POWERSTATE_CHARGED"] = 4] = "SDL_POWERSTATE_CHARGED";
})(SDL_PowerState = exports.SDL_PowerState || (exports.SDL_PowerState = {}));
lib_loader_1.loadLibrary({
    SDL_GetPowerInfo: [types_1.uint32, [types_1.int32_ptr, types_1.int32_ptr]]
}, SDL);
//# sourceMappingURL=sdl-power.js.map