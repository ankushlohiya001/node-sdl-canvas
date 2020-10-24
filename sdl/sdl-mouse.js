"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_video_1 = require("./sdl-video");
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var sdl_surface_1 = require("./sdl-surface");
var ref = require('ref-napi');
var SDL = {};
var SDL_SystemCursor;
(function (SDL_SystemCursor) {
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_ARROW"] = 0] = "SDL_SYSTEM_CURSOR_ARROW";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_IBEAM"] = 1] = "SDL_SYSTEM_CURSOR_IBEAM";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_WAIT"] = 2] = "SDL_SYSTEM_CURSOR_WAIT";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_CROSSHAIR"] = 3] = "SDL_SYSTEM_CURSOR_CROSSHAIR";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_WAITARROW"] = 4] = "SDL_SYSTEM_CURSOR_WAITARROW";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_SIZENWSE"] = 5] = "SDL_SYSTEM_CURSOR_SIZENWSE";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_SIZENESW"] = 6] = "SDL_SYSTEM_CURSOR_SIZENESW";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_SIZEWE"] = 7] = "SDL_SYSTEM_CURSOR_SIZEWE";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_SIZENS"] = 8] = "SDL_SYSTEM_CURSOR_SIZENS";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_SIZEALL"] = 9] = "SDL_SYSTEM_CURSOR_SIZEALL";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_NO"] = 10] = "SDL_SYSTEM_CURSOR_NO";
    SDL_SystemCursor[SDL_SystemCursor["SDL_SYSTEM_CURSOR_HAND"] = 11] = "SDL_SYSTEM_CURSOR_HAND";
    SDL_SystemCursor[SDL_SystemCursor["SDL_NUM_SYSTEM_CURSORS"] = 12] = "SDL_NUM_SYSTEM_CURSORS";
})(SDL_SystemCursor = exports.SDL_SystemCursor || (exports.SDL_SystemCursor = {}));
var SDL_MouseWheelDirection;
(function (SDL_MouseWheelDirection) {
    SDL_MouseWheelDirection[SDL_MouseWheelDirection["SDL_MOUSEWHEEL_NORMAL"] = 0] = "SDL_MOUSEWHEEL_NORMAL";
    SDL_MouseWheelDirection[SDL_MouseWheelDirection["SDL_MOUSEWHEEL_FLIPPED"] = 1] = "SDL_MOUSEWHEEL_FLIPPED";
})(SDL_MouseWheelDirection = exports.SDL_MouseWheelDirection || (exports.SDL_MouseWheelDirection = {}));
exports.SDL_Cursor = types_1.voit;
exports.SDL_Cursor_ptr = ref.refType(exports.SDL_Cursor);
function SDL_GetGlobalMouseState() {
    var screenX = ref.alloc('int');
    var screenY = ref.alloc('int');
    SDL.SDL_GetGlobalMouseState(screenX, screenY);
    return {
        x: screenX.deref(),
        y: screenY.deref()
    };
}
exports.SDL_GetGlobalMouseState = SDL_GetGlobalMouseState;
lib_loader_1.loadLibrary({
    SDL_GetMouseFocus: [sdl_video_1.SDL_Window_ptr, []],
    SDL_GetMouseState: [types_1.Uint32, [types_1.int32_ptr, types_1.int32_ptr]],
    SDL_GetGlobalMouseState: [types_1.Uint32, [types_1.int32_ptr, types_1.int32_ptr]],
    SDL_GetRelativeMouseState: [types_1.Uint32, [types_1.int32_ptr, types_1.int32_ptr]],
    SDL_WarpMouseInWindow: [types_1.voit, [sdl_video_1.SDL_Window_ptr, types_1.int32, types_1.int32]],
    SDL_WarpMouseGlobal: [types_1.int32, [types_1.int32, types_1.int32]],
    SDL_SetRelativeMouseMode: [types_1.int32, [types_1.uint32]],
    SDL_CaptureMouse: [types_1.int32, [types_1.uint32]],
    SDL_GetRelativeMouseMode: [types_1.uint32, []],
    SDL_CreateCursor: [exports.SDL_Cursor_ptr, [types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.int32, types_1.int32, types_1.int32, types_1.int32]],
    SDL_CreateColorCursor: [exports.SDL_Cursor_ptr, [sdl_surface_1.SDL_Surface_ptr, types_1.int32, types_1.int32]],
    SDL_CreateSystemCursor: [exports.SDL_Cursor_ptr, [types_1.uint32]],
    SDL_SetCursor: [types_1.voit, [exports.SDL_Cursor_ptr]],
    SDL_GetCursor: [exports.SDL_Cursor_ptr, []],
    SDL_GetDefaultCursor: [exports.SDL_Cursor_ptr, []],
    SDL_FreeCursor: [types_1.voit, [exports.SDL_Cursor_ptr]],
    SDL_ShowCursor: [types_1.int32, [types_1.int32]],
}, SDL);
//# sourceMappingURL=sdl-mouse.js.map