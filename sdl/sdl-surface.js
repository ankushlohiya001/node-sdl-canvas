"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var sdl_pixels_1 = require("./sdl-pixels");
var sdl_rect_1 = require("./sdl-rect");
var FFI = require('ffi-napi');
var ref = require('ref-napi');
var Struct = require('ref-struct-di')(ref);
var SDL = {};
var SDL_Texture = types_1.voit;
var SDL_Texture_ptr = ref.refType(SDL_Texture);
var SDL_Renderer = types_1.voit;
var SDL_Renderer_ptr = ref.refType(SDL_Renderer);
exports.SDL_BlitMap_ptr = ref.refType(types_1.voit);
exports.SDL_Surface = Struct({
    flags: types_1.Uint32,
    format: sdl_pixels_1.SDL_PixelFormat_ptr,
    w: types_1.int32,
    h: types_1.int32,
    pitch: types_1.int32,
    pixels: types_1.voit_ptr,
    userdata: types_1.voit_ptr,
    locked: types_1.int32,
    lock_data: types_1.voit_ptr,
    clip_rect: sdl_rect_1.SDL_Rect,
    map: exports.SDL_BlitMap_ptr,
    refcount: types_1.int32,
});
exports.SDL_Surface_ptr = ref.refType(exports.SDL_Surface);
exports.SDL_blit = FFI.Function(types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]);
function SDL_CreateRGBSurfaceFrom(pixels, width, height, depth, pitch, Rmask, Gmask, Bmask, Amask) {
    return SDL.SDL_CreateRGBSurfaceFrom(pixels, width, height, depth, pitch, Rmask, Gmask, Bmask, Amask);
}
exports.SDL_CreateRGBSurfaceFrom = SDL_CreateRGBSurfaceFrom;
function SDL_CreateTextureFromSurface(rendererPtr, sdlSurfacePtr) {
    return SDL.SDL_CreateTextureFromSurface(rendererPtr, sdlSurfacePtr);
}
exports.SDL_CreateTextureFromSurface = SDL_CreateTextureFromSurface;
function SDL_FreeSurface(surfacePtr) {
    SDL.SDL_FreeSurface(surfacePtr);
}
exports.SDL_FreeSurface = SDL_FreeSurface;
lib_loader_1.loadLibrary({
    SDL_CreateTextureFromSurface: [SDL_Texture_ptr, [SDL_Renderer_ptr, exports.SDL_Surface_ptr]],
    SDL_CreateRGBSurface: [exports.SDL_Surface_ptr, [types_1.Uint32, types_1.int32, types_1.int32, types_1.int32, types_1.Uint32, types_1.Uint32, types_1.Uint32, types_1.Uint32]],
    SDL_CreateRGBSurfaceFrom: [exports.SDL_Surface_ptr, [types_1.voit_ptr, types_1.int32, types_1.int32, types_1.int32, types_1.int32, types_1.Uint32, types_1.Uint32, types_1.Uint32, types_1.Uint32]],
    SDL_FreeSurface: [types_1.voit, [exports.SDL_Surface_ptr]],
    SDL_SetSurfacePalette: [types_1.int32, [exports.SDL_Surface_ptr, sdl_pixels_1.SDL_Palette_ptr]],
    SDL_LockSurface: [types_1.int32, [exports.SDL_Surface_ptr]],
    SDL_UnlockSurface: [types_1.voit, [exports.SDL_Surface_ptr]],
    // SDL_LoadBMP_RW: [SDL_Surface_ptr, [SDL_RWops_ptr, int32]],
    // SDL_SaveBMP_RW: [int32, [SDL_Surface_ptr, SDL_RWops_ptr, int32]],
    SDL_SetSurfaceRLE: [types_1.int32, [exports.SDL_Surface_ptr, types_1.int32]],
    SDL_SetColorKey: [types_1.int32, [exports.SDL_Surface_ptr, types_1.int32, types_1.Uint32]],
    SDL_GetColorKey: [types_1.int32, [exports.SDL_Surface_ptr, types_1.Uint32_ptr]],
    SDL_SetSurfaceColorMod: [types_1.int32, [exports.SDL_Surface_ptr, types_1.Uint8, types_1.Uint8, types_1.Uint8]],
    SDL_GetSurfaceColorMod: [types_1.int32, [exports.SDL_Surface_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr]],
    SDL_SetSurfaceAlphaMod: [types_1.int32, [exports.SDL_Surface_ptr, types_1.Uint8]],
    SDL_GetSurfaceAlphaMod: [types_1.int32, [exports.SDL_Surface_ptr, types_1.Uint8_ptr]],
    SDL_SetSurfaceBlendMode: [types_1.int32, [exports.SDL_Surface_ptr, types_1.uint32]],
    SDL_GetSurfaceBlendMode: [types_1.int32, [exports.SDL_Surface_ptr, types_1.uint32_ptr]],
    SDL_SetClipRect: [types_1.uint32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_GetClipRect: [types_1.voit, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_ConvertSurface: [exports.SDL_Surface_ptr, [exports.SDL_Surface_ptr, sdl_pixels_1.SDL_PixelFormat_ptr, types_1.Uint32]],
    SDL_ConvertSurfaceFormat: [exports.SDL_Surface_ptr, [exports.SDL_Surface_ptr, types_1.Uint32, types_1.Uint32]],
    SDL_ConvertPixels: [types_1.int32, [types_1.int32, types_1.int32, types_1.Uint32, types_1.voit_ptr, types_1.int32, types_1.Uint32, types_1.voit_ptr, types_1.int32]],
    SDL_FillRect: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.Uint32]],
    SDL_FillRects: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.int32, types_1.Uint32]],
    SDL_UpperBlit: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_LowerBlit: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_SoftStretch: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_UpperBlitScaled: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_LowerBlitScaled: [types_1.int32, [exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr, exports.SDL_Surface_ptr, sdl_rect_1.SDL_Rect_ptr]],
}, SDL);
//# sourceMappingURL=sdl-surface.js.map