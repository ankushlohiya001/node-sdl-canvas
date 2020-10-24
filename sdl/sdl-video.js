"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var sdl_rect_1 = require("./sdl-rect");
var sdl_surface_1 = require("./sdl-surface");
var lib_loader_1 = require("./lib-loader");
var FFI = require('ffi-napi');
var ref = require('ref-napi');
var Struct = require('ref-struct-di')(ref);
var SDL = {};
//SDL_video.SDL_SetWindowMinimumSize(this.windowPtr, w, h);
//SDL_video.SDL_SetWindowResizable(this.windowPtr, value);
//SDL_video.SDL_SetWindowPosition(this.windowPtr, x, y);
// return SDL_video.SDL_GetWindowID(this.windowPtr);
function SDL_GetWindowID(windowPtr) {
    return SDL.SDL_GetWindowID(windowPtr);
}
exports.SDL_GetWindowID = SDL_GetWindowID;
function SDL_HideWindow(windowPtr) {
    SDL.SDL_HideWindow(windowPtr);
}
exports.SDL_HideWindow = SDL_HideWindow;
function SDL_ShowWindow(windowPtr) {
    SDL.SDL_ShowWindow(windowPtr);
}
exports.SDL_ShowWindow = SDL_ShowWindow;
function SDL_GetWindowBordersSize(windowPtr) {
    var top = ref.alloc('int');
    var left = ref.alloc('int');
    var bottom = ref.alloc('int');
    var right = ref.alloc('int');
    SDL.SDL_GetWindowBordersSize(windowPtr, top, left, bottom, right);
    return {
        top: top.deref(),
        right: right.deref(),
        bottom: bottom.deref(),
        left: left.deref(),
    };
}
exports.SDL_GetWindowBordersSize = SDL_GetWindowBordersSize;
function SDL_SetWindowBordered(windowPtr, border) {
    SDL.SDL_SetWindowBordered(windowPtr, border);
}
exports.SDL_SetWindowBordered = SDL_SetWindowBordered;
function SDL_GetWindowTitle(windowPtr) {
    return SDL.SDL_GetWindowTitle(windowPtr);
}
exports.SDL_GetWindowTitle = SDL_GetWindowTitle;
function SDL_SetWindowTitle(windowPtr, title) {
    SDL.SDL_SetWindowTitle(windowPtr, title);
}
exports.SDL_SetWindowTitle = SDL_SetWindowTitle;
function SDL_GetWindowPosition(windowPtr) {
    var x = ref.alloc('int');
    var y = ref.alloc('int');
    SDL.SDL_GetWindowPosition(windowPtr, x, y);
    return {
        x: x.deref(),
        y: y.deref()
    };
}
exports.SDL_GetWindowPosition = SDL_GetWindowPosition;
function SDL_SetWindowPosition(windowPtr, x, y) {
    SDL.SDL_SetWindowPosition(windowPtr, x, y);
}
exports.SDL_SetWindowPosition = SDL_SetWindowPosition;
function SDL_SetWindowResizable(windowPtr, bool) {
    SDL.SDL_SetWindowResizable(windowPtr, bool);
}
exports.SDL_SetWindowResizable = SDL_SetWindowResizable;
function SDL_GetWindowMaximumSize(windowPtr) {
    var w = ref.alloc('int');
    var h = ref.alloc('int');
    SDL.SDL_GetWindowMaximumSize(windowPtr, w, h);
    return {
        w: w.deref(),
        h: h.deref()
    };
}
exports.SDL_GetWindowMaximumSize = SDL_GetWindowMaximumSize;
function SDL_SetWindowMaximumSize(windowPtr, w, h) {
    SDL.SDL_SetWindowMaximumSize(windowPtr, w, h);
}
exports.SDL_SetWindowMaximumSize = SDL_SetWindowMaximumSize;
function SDL_GetWindowMinimumSize(windowPtr) {
    var w = ref.alloc('int');
    var h = ref.alloc('int');
    SDL.SDL_GetWindowMinimumSize(windowPtr, w, h);
    return {
        w: w.deref(),
        h: h.deref()
    };
}
exports.SDL_GetWindowMinimumSize = SDL_GetWindowMinimumSize;
function SDL_UpdateWindowSurface(windowPtr) {
    SDL.SDL_UpdateWindowSurface(windowPtr);
}
exports.SDL_UpdateWindowSurface = SDL_UpdateWindowSurface;
function SDL_SetWindowMinimumSize(windowPtr, w, h) {
    SDL.SDL_SetWindowMinimumSize(windowPtr, w, h);
}
exports.SDL_SetWindowMinimumSize = SDL_SetWindowMinimumSize;
function SDL_GetWindowSize(windowPtr) {
    var w = ref.alloc('int');
    var h = ref.alloc('int');
    SDL.SDL_GetWindowSize(windowPtr, w, h);
    return {
        w: w.deref(),
        h: h.deref()
    };
}
exports.SDL_GetWindowSize = SDL_GetWindowSize;
function SDL_SetWindowSize(windowPtr, w, h) {
    SDL.SDL_SetWindowSize(windowPtr, w, h);
}
exports.SDL_SetWindowSize = SDL_SetWindowSize;
function SDL_SetWindowFullscreen(windowPtr, mode) {
    SDL.SDL_SetWindowFullscreen(windowPtr, mode);
}
exports.SDL_SetWindowFullscreen = SDL_SetWindowFullscreen;
function SDL_GetWindowFlags(windowPtr) {
    return SDL.SDL_GetWindowFlags(windowPtr);
}
exports.SDL_GetWindowFlags = SDL_GetWindowFlags;
function SDL_MinimizeWindow(windowPtr) {
    SDL.SDL_MinimizeWindow(windowPtr);
}
exports.SDL_MinimizeWindow = SDL_MinimizeWindow;
function SDL_MaximizeWindow(windowPtr) {
    SDL.SDL_MaximizeWindow(windowPtr);
}
exports.SDL_MaximizeWindow = SDL_MaximizeWindow;
function SDL_SetWindowModalFor(windowPtr, parentWindowPtr) {
    SDL.SDL_SetWindowModalFor(windowPtr, parentWindowPtr);
}
exports.SDL_SetWindowModalFor = SDL_SetWindowModalFor;
function SDL_RestoreWindow(windowPtr) {
    SDL.SDL_RestoreWindow(windowPtr);
}
exports.SDL_RestoreWindow = SDL_RestoreWindow;
function SDL_DestroyWindow(windowPtr) {
    SDL.SDL_DestroyWindow(windowPtr);
}
exports.SDL_DestroyWindow = SDL_DestroyWindow;
function SDL_RaiseWindow(windowPtr) {
    SDL.SDL_RaiseWindow(windowPtr);
}
exports.SDL_RaiseWindow = SDL_RaiseWindow;
function SDL_SetWindowGrab(windowPtr, show) {
    SDL.SDL_SetWindowGrab(windowPtr, show);
}
exports.SDL_SetWindowGrab = SDL_SetWindowGrab;
function SDL_CreateWindow(title, x, y, w, h, flags) {
    return SDL.SDL_CreateWindow(title, x, y, w, h, flags);
}
exports.SDL_CreateWindow = SDL_CreateWindow;
var SDL_WindowFlags;
(function (SDL_WindowFlags) {
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_FULLSCREEN"] = 1] = "SDL_WINDOW_FULLSCREEN";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_OPENGL"] = 2] = "SDL_WINDOW_OPENGL";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_SHOWN"] = 4] = "SDL_WINDOW_SHOWN";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_HIDDEN"] = 8] = "SDL_WINDOW_HIDDEN";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_BORDERLESS"] = 16] = "SDL_WINDOW_BORDERLESS";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_RESIZABLE"] = 32] = "SDL_WINDOW_RESIZABLE";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_MINIMIZED"] = 64] = "SDL_WINDOW_MINIMIZED";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_MAXIMIZED"] = 128] = "SDL_WINDOW_MAXIMIZED";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_INPUT_GRABBED"] = 256] = "SDL_WINDOW_INPUT_GRABBED";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_INPUT_FOCUS"] = 512] = "SDL_WINDOW_INPUT_FOCUS";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_MOUSE_FOCUS"] = 1024] = "SDL_WINDOW_MOUSE_FOCUS";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_FULLSCREEN_DESKTOP"] = 4097] = "SDL_WINDOW_FULLSCREEN_DESKTOP";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_FOREIGN"] = 2048] = "SDL_WINDOW_FOREIGN";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_ALLOW_HIGHDPI"] = 8192] = "SDL_WINDOW_ALLOW_HIGHDPI";
    SDL_WindowFlags[SDL_WindowFlags["SDL_WINDOW_MOUSE_CAPTURE"] = 16384] = "SDL_WINDOW_MOUSE_CAPTURE";
})(SDL_WindowFlags = exports.SDL_WindowFlags || (exports.SDL_WindowFlags = {}));
var SDL_WindowEventID;
(function (SDL_WindowEventID) {
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_NONE"] = 0] = "SDL_WINDOWEVENT_NONE";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_SHOWN"] = 1] = "SDL_WINDOWEVENT_SHOWN";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_HIDDEN"] = 2] = "SDL_WINDOWEVENT_HIDDEN";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_EXPOSED"] = 3] = "SDL_WINDOWEVENT_EXPOSED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_MOVED"] = 4] = "SDL_WINDOWEVENT_MOVED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_RESIZED"] = 5] = "SDL_WINDOWEVENT_RESIZED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_SIZE_CHANGED"] = 6] = "SDL_WINDOWEVENT_SIZE_CHANGED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_MINIMIZED"] = 7] = "SDL_WINDOWEVENT_MINIMIZED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_MAXIMIZED"] = 8] = "SDL_WINDOWEVENT_MAXIMIZED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_RESTORED"] = 9] = "SDL_WINDOWEVENT_RESTORED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_ENTER"] = 10] = "SDL_WINDOWEVENT_ENTER";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_LEAVE"] = 11] = "SDL_WINDOWEVENT_LEAVE";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_FOCUS_GAINED"] = 12] = "SDL_WINDOWEVENT_FOCUS_GAINED";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_FOCUS_LOST"] = 13] = "SDL_WINDOWEVENT_FOCUS_LOST";
    SDL_WindowEventID[SDL_WindowEventID["SDL_WINDOWEVENT_CLOSE"] = 14] = "SDL_WINDOWEVENT_CLOSE";
})(SDL_WindowEventID = exports.SDL_WindowEventID || (exports.SDL_WindowEventID = {}));
exports.SDL_DisplayMode = Struct({
    format: types_1.Uint32,
    w: types_1.int32,
    h: types_1.int32,
    refresh_rate: types_1.int32,
    driverdata: types_1.voit_ptr,
});
exports.SDL_Window = types_1.voit;
exports.SDL_GLContext = types_1.voit_ptr;
exports.float = exports.float = ref.types.float;
exports.float_ptr = exports.float_ptr = ref.refType(exports.float);
exports.SDL_DisplayMode_ptr = exports.SDL_DisplayMode_ptr = ref.refType(exports.SDL_DisplayMode);
exports.SDL_Window_ptr = exports.SDL_Window_ptr = ref.refType(exports.SDL_Window);
exports.SDL_HitTest = exports.SDL_HitTest = FFI.Function(types_1.uint32, [exports.SDL_Window_ptr, sdl_rect_1.SDL_Point_ptr, types_1.voit_ptr]);
function SDL_GetWindowSurface(windowPtr) {
    return SDL.SDL_GetWindowSurface(windowPtr);
}
exports.SDL_GetWindowSurface = SDL_GetWindowSurface;
lib_loader_1.loadLibrary({
    SDL_GetNumVideoDrivers: [types_1.int32, []],
    SDL_GetVideoDriver: [types_1.string, [types_1.int32]],
    SDL_VideoInit: [types_1.int32, [types_1.string]],
    SDL_VideoQuit: [types_1.voit, []],
    SDL_GetCurrentVideoDriver: [types_1.string, []],
    SDL_GetNumVideoDisplays: [types_1.int32, []],
    SDL_GetDisplayName: [types_1.string, [types_1.int32]],
    SDL_GetDisplayBounds: [types_1.int32, [types_1.int32, sdl_rect_1.SDL_Rect_ptr]],
    SDL_GetDisplayDPI: [types_1.int32, [types_1.int32, exports.float_ptr, exports.float_ptr, exports.float_ptr]],
    SDL_GetNumDisplayModes: [types_1.int32, [types_1.int32]],
    SDL_GetDisplayMode: [types_1.int32, [types_1.int32, types_1.int32, exports.SDL_DisplayMode_ptr]],
    SDL_GetDesktopDisplayMode: [types_1.int32, [types_1.int32, exports.SDL_DisplayMode_ptr]],
    SDL_GetCurrentDisplayMode: [types_1.int32, [types_1.int32, exports.SDL_DisplayMode_ptr]],
    SDL_GetClosestDisplayMode: [exports.SDL_DisplayMode_ptr, [types_1.int32, exports.SDL_DisplayMode_ptr, exports.SDL_DisplayMode_ptr]],
    SDL_GetWindowDisplayIndex: [types_1.int32, [exports.SDL_Window_ptr]],
    SDL_SetWindowDisplayMode: [types_1.int32, [exports.SDL_Window_ptr, exports.SDL_DisplayMode_ptr]],
    SDL_GetWindowDisplayMode: [types_1.int32, [exports.SDL_Window_ptr, exports.SDL_DisplayMode_ptr]],
    SDL_GetWindowPixelFormat: [types_1.Uint32, [exports.SDL_Window_ptr]],
    SDL_CreateWindow: [exports.SDL_Window_ptr, [types_1.string, types_1.int32, types_1.int32, types_1.int32, types_1.int32, types_1.Uint32]],
    SDL_CreateWindowFrom: [exports.SDL_Window_ptr, [types_1.voit_ptr]],
    SDL_GetWindowID: [types_1.Uint32, [exports.SDL_Window_ptr]],
    SDL_GetWindowFromID: [exports.SDL_Window_ptr, [types_1.Uint32]],
    SDL_GetWindowFlags: [types_1.Uint32, [exports.SDL_Window_ptr]],
    SDL_SetWindowTitle: [types_1.voit, [exports.SDL_Window_ptr, types_1.string]],
    SDL_GetWindowTitle: [types_1.string, [exports.SDL_Window_ptr]],
    SDL_SetWindowIcon: [types_1.voit, [exports.SDL_Window_ptr, sdl_surface_1.SDL_Surface_ptr]],
    SDL_SetWindowData: [types_1.voit_ptr, [exports.SDL_Window_ptr, types_1.string, types_1.voit_ptr]],
    SDL_GetWindowData: [types_1.voit_ptr, [exports.SDL_Window_ptr, types_1.string]],
    SDL_SetWindowPosition: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32, types_1.int32]],
    SDL_GetWindowPosition: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_SetWindowSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32, types_1.int32]],
    SDL_GetWindowSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_SetWindowResizable: [types_1.voit, [exports.SDL_Window_ptr, types_1.uchar]],
    SDL_SetWindowMinimumSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32, types_1.int32]],
    SDL_GetWindowMinimumSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_SetWindowMaximumSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32, types_1.int32]],
    SDL_GetWindowMaximumSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_SetWindowBordered: [types_1.voit, [exports.SDL_Window_ptr, types_1.uint32]],
    SDL_ShowWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_HideWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_RaiseWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_MaximizeWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_MinimizeWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_RestoreWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_SetWindowFullscreen: [types_1.int32, [exports.SDL_Window_ptr, types_1.Uint32]],
    SDL_GetWindowSurface: [sdl_surface_1.SDL_Surface_ptr, [exports.SDL_Window_ptr]],
    SDL_UpdateWindowSurface: [types_1.int32, [exports.SDL_Window_ptr]],
    SDL_UpdateWindowSurfaceRects: [types_1.int32, [exports.SDL_Window_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.int32]],
    SDL_SetWindowGrab: [types_1.voit, [exports.SDL_Window_ptr, types_1.uint32]],
    SDL_GetWindowGrab: [types_1.uint32, [exports.SDL_Window_ptr]],
    SDL_GetGrabbedWindow: [exports.SDL_Window_ptr, []],
    SDL_SetWindowBrightness: [types_1.int32, [exports.SDL_Window_ptr, exports.float]],
    SDL_GetWindowBrightness: [exports.float, [exports.SDL_Window_ptr]],
    SDL_SetWindowGammaRamp: [types_1.int32, [exports.SDL_Window_ptr, types_1.Uint16_ptr, types_1.Uint16_ptr, types_1.Uint16_ptr]],
    SDL_GetWindowGammaRamp: [types_1.int32, [exports.SDL_Window_ptr, types_1.Uint16_ptr, types_1.Uint16_ptr, types_1.Uint16_ptr]],
    SDL_SetWindowHitTest: [types_1.int32, [exports.SDL_Window_ptr, exports.SDL_HitTest, types_1.voit_ptr]],
    SDL_DestroyWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_IsScreenSaverEnabled: [types_1.uint32, []],
    SDL_EnableScreenSaver: [types_1.voit, []],
    SDL_DisableScreenSaver: [types_1.voit, []],
    SDL_GL_LoadLibrary: [types_1.int32, [types_1.string]],
    SDL_GL_GetProcAddress: [types_1.voit_ptr, [types_1.string]],
    SDL_GL_UnloadLibrary: [types_1.voit, []],
    SDL_GL_ExtensionSupported: [types_1.uint32, [types_1.string]],
    SDL_GL_ResetAttributes: [types_1.voit, []],
    SDL_GL_SetAttribute: [types_1.int32, [types_1.uint32, types_1.int32]],
    SDL_GL_GetAttribute: [types_1.int32, [types_1.uint32, types_1.int32_ptr]],
    SDL_GL_CreateContext: [exports.SDL_GLContext, [exports.SDL_Window_ptr]],
    SDL_GL_MakeCurrent: [types_1.int32, [exports.SDL_Window_ptr, exports.SDL_GLContext]],
    SDL_GL_GetCurrentWindow: [exports.SDL_Window_ptr, []],
    SDL_GL_GetCurrentContext: [exports.SDL_GLContext, []],
    SDL_GL_GetDrawableSize: [types_1.voit, [exports.SDL_Window_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_GL_SetSwapInterval: [types_1.int32, [types_1.int32]],
    SDL_GL_GetSwapInterval: [types_1.int32, []],
    SDL_GL_SwapWindow: [types_1.voit, [exports.SDL_Window_ptr]],
    SDL_GL_DeleteContext: [types_1.voit, [exports.SDL_GLContext]],
}, SDL);
//# sourceMappingURL=sdl-video.js.map