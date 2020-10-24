"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_rect_1 = require("./sdl-rect");
var lib_loader_1 = require("./lib-loader");
var types_1 = require("./types");
var sdl_surface_1 = require("./sdl-surface");
var sdl_video_1 = require("./sdl-video");
var FFI = require('ffi-napi');
var ref = require('ref-napi');
var ArrayType = require('ref-array-di')(ref);
var Struct = require('ref-struct-di')(ref);
var Union = require('ref-union-di')(ref);
var SDL = {};
var SDL_RendererFlags;
(function (SDL_RendererFlags) {
    SDL_RendererFlags[SDL_RendererFlags["SDL_RENDERER_SOFTWARE"] = 1] = "SDL_RENDERER_SOFTWARE";
    SDL_RendererFlags[SDL_RendererFlags["SDL_RENDERER_ACCELERATED"] = 2] = "SDL_RENDERER_ACCELERATED";
    SDL_RendererFlags[SDL_RendererFlags["SDL_RENDERER_PRESENTVSYNC"] = 4] = "SDL_RENDERER_PRESENTVSYNC";
    SDL_RendererFlags[SDL_RendererFlags["SDL_RENDERER_TARGETTEXTURE"] = 8] = "SDL_RENDERER_TARGETTEXTURE";
})(SDL_RendererFlags = exports.SDL_RendererFlags || (exports.SDL_RendererFlags = {}));
var SDL_BlendMode;
(function (SDL_BlendMode) {
    SDL_BlendMode[SDL_BlendMode["SDL_BLENDMODE_NONE"] = 0] = "SDL_BLENDMODE_NONE";
    SDL_BlendMode[SDL_BlendMode["SDL_BLENDMODE_BLEND"] = 1] = "SDL_BLENDMODE_BLEND";
    SDL_BlendMode[SDL_BlendMode["SDL_BLENDMODE_ADD"] = 2] = "SDL_BLENDMODE_ADD";
    SDL_BlendMode[SDL_BlendMode["SDL_BLENDMODE_MOD"] = 4] = "SDL_BLENDMODE_MOD";
})(SDL_BlendMode = exports.SDL_BlendMode || (exports.SDL_BlendMode = {}));
exports.SDL_TEXTUREACCESS_STATIC = 0x0;
exports.SDL_TEXTUREACCESS_STREAMING = 0x1;
exports.SDL_TEXTUREACCESS_TARGET = 0x2;
// SDL_SetTextureBlendMode( mTexture, blending );
function SDL_SetTextureBlendMode(texture, blendMode) {
    return SDL.SDL_SetTextureBlendMode(texture, blendMode);
}
exports.SDL_SetTextureBlendMode = SDL_SetTextureBlendMode;
function SDL_CreateSoftwareRenderer(surfacePtr) {
    return SDL.SDL_CreateSoftwareRenderer(surfacePtr);
}
exports.SDL_CreateSoftwareRenderer = SDL_CreateSoftwareRenderer;
function SDL_RenderCopy(rendererPtr, texturePtr, src, dest) {
    if (src) {
        src = sdl_rect_1.createSDL_RectPtr(src);
    }
    if (dest) {
        dest = sdl_rect_1.createSDL_RectPtr(dest);
    }
    return SDL.SDL_RenderCopy(rendererPtr, texturePtr, src, dest);
}
exports.SDL_RenderCopy = SDL_RenderCopy;
function SDL_CreateRenderer(windowPtr, driver, flags) {
    var renderPtr = SDL.SDL_CreateRenderer(windowPtr, driver, flags);
    return renderPtr;
}
exports.SDL_CreateRenderer = SDL_CreateRenderer;
function SDL_SetRenderTarget(rendererPtr, texturePtr) {
    return SDL.SDL_SetRenderTarget(rendererPtr, texturePtr);
}
exports.SDL_SetRenderTarget = SDL_SetRenderTarget;
function SDL_GetRenderTarget(rendererPtr) {
    return SDL.SDL_GetRenderTarget(rendererPtr);
}
exports.SDL_GetRenderTarget = SDL_GetRenderTarget;
function SDL_GetRenderDrawColor(rendererPtr, rgba) {
    var r = ref.alloc('uint8');
    var g = ref.alloc('uint8');
    var b = ref.alloc('uint8');
    var a = ref.alloc('uint8');
    SDL.SDL_GetRenderDrawColor(rendererPtr, r, g, b, a);
    rgba.r = r.deref();
    rgba.g = g.deref();
    rgba.b = b.deref();
    rgba.a = a.deref();
    return rgba;
}
exports.SDL_GetRenderDrawColor = SDL_GetRenderDrawColor;
function SDL_SetRenderDrawColor(rendererPtr, r, g, b, a) {
    return SDL.SDL_SetRenderDrawColor(rendererPtr, r, g, b, a);
}
exports.SDL_SetRenderDrawColor = SDL_SetRenderDrawColor;
function SDL_RenderPresent(rendererPtr) {
    SDL.SDL_RenderPresent(rendererPtr);
}
exports.SDL_RenderPresent = SDL_RenderPresent;
function SDL_DestroyRenderer(rendererPtr) {
    SDL.SDL_DestroyRenderer(rendererPtr);
}
exports.SDL_DestroyRenderer = SDL_DestroyRenderer;
function SDL_RenderClear(rendererPtr) {
    return SDL.SDL_RenderClear(rendererPtr);
}
exports.SDL_RenderClear = SDL_RenderClear;
function SDL_DestroyTexture(texturePtr) {
    return SDL.SDL_DestroyTexture(texturePtr);
}
exports.SDL_DestroyTexture = SDL_DestroyTexture;
function SDL_RenderGetLogicalSize(rendererPtr) {
    var w = ref.alloc('int');
    var h = ref.alloc('int');
    SDL.SDL_RenderGetLogicalSize(rendererPtr, w, h);
    return { w: w.deref(), h: h.deref() };
}
exports.SDL_RenderGetLogicalSize = SDL_RenderGetLogicalSize;
function SDL_GetRendererOutputSize(rendererPtr) {
    var w = ref.alloc('int');
    var h = ref.alloc('int');
    SDL.SDL_GetRendererOutputSize(rendererPtr, w, h);
    return { w: w.deref(), h: h.deref() };
}
exports.SDL_GetRendererOutputSize = SDL_GetRendererOutputSize;
function SDL_RenderGetIntegerScale(rendererPtr) {
    return !!SDL.SDL_RenderGetIntegerScale(rendererPtr);
}
exports.SDL_RenderGetIntegerScale = SDL_RenderGetIntegerScale;
function SDL_RenderGetScale(renderPtr) {
    var x = ref.alloc('float');
    var y = ref.alloc('float');
    SDL.SDL_RenderGetScale(renderPtr, x, y);
    return { x: x.deref(), y: y.deref() };
}
exports.SDL_RenderGetScale = SDL_RenderGetScale;
function SDL_RenderSetScale(renderPtr, x, y) {
    return SDL.SDL_RenderSetScale(renderPtr, x, y);
}
exports.SDL_RenderSetScale = SDL_RenderSetScale;
function SDL_RenderSetLogicalSize(renderPtr, w, h) {
    return SDL.SDL_RenderSetLogicalSize(renderPtr, w, h);
}
exports.SDL_RenderSetLogicalSize = SDL_RenderSetLogicalSize;
function SDL_UpdateTexture(texturePtr, rect, pixels, pitch) {
    var rectPtr = (rect) ? sdl_rect_1.createSDL_RectPtr(rect) : null;
    return SDL.SDL_UpdateTexture(texturePtr, rectPtr, pixels, pitch);
}
exports.SDL_UpdateTexture = SDL_UpdateTexture;
function SDL_QueryTexture(texturePtr) {
    var format = ref.alloc('uint32');
    var access = ref.alloc('int');
    var w = ref.alloc('int');
    var h = ref.alloc('int');
    SDL.SDL_QueryTexture(texturePtr, format, access, w, h);
    return {
        format: format.deref(),
        access: access.deref(),
        x: 0,
        y: 0,
        w: w.deref(),
        h: h.deref()
    };
}
exports.SDL_QueryTexture = SDL_QueryTexture;
function SDL_CreateTexture(rendererPtr, format, access, w, h) {
    return SDL.SDL_CreateTexture(rendererPtr, format, +access, +w, +h);
}
exports.SDL_CreateTexture = SDL_CreateTexture;
exports.SDL_RendererInfo = Struct({
    name: types_1.string,
    flags: types_1.Uint32,
    num_texture_formats: types_1.Uint32,
    texture_formats: ArrayType(types_1.Uint32, 16),
    max_texture_width: types_1.int32,
    max_texture_height: types_1.int32,
});
exports.SDL_Renderer = types_1.voit;
exports.SDL_Texture = types_1.voit;
exports.SDL_RendererInfo_ptr = ref.refType(exports.SDL_RendererInfo);
exports.SDL_Window_ptr_ptr = ref.refType(sdl_video_1.SDL_Window_ptr);
exports.SDL_Renderer_ptr = ref.refType(exports.SDL_Renderer);
exports.SDL_Renderer_ptr_ptr = ref.refType(exports.SDL_Renderer_ptr);
exports.SDL_Texture_ptr = ref.refType(exports.SDL_Texture);
lib_loader_1.loadLibrary({
    SDL_GetNumRenderDrivers: [types_1.int32, []],
    SDL_GetRenderDriverInfo: [types_1.int32, [types_1.int32, exports.SDL_RendererInfo_ptr]],
    SDL_CreateWindowAndRenderer: [types_1.int32, [types_1.int32, types_1.int32, types_1.Uint32, exports.SDL_Window_ptr_ptr, exports.SDL_Renderer_ptr_ptr]],
    SDL_CreateRenderer: [exports.SDL_Renderer_ptr, [sdl_video_1.SDL_Window_ptr, types_1.int32, types_1.Uint32]],
    SDL_CreateSoftwareRenderer: [exports.SDL_Renderer_ptr, [sdl_surface_1.SDL_Surface_ptr]],
    SDL_GetRenderer: [exports.SDL_Renderer_ptr, [sdl_video_1.SDL_Window_ptr]],
    SDL_GetRendererInfo: [types_1.int32, [exports.SDL_Renderer_ptr, exports.SDL_RendererInfo_ptr]],
    SDL_RenderGetIntegerScale: [types_1.bool, [exports.SDL_Renderer_ptr]],
    SDL_GetRendererOutputSize: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_CreateTexture: [exports.SDL_Texture_ptr, [exports.SDL_Renderer_ptr, types_1.Uint32, types_1.int32, types_1.int32, types_1.int32]],
    SDL_CreateTextureFromSurface: [exports.SDL_Texture_ptr, [exports.SDL_Renderer_ptr, sdl_surface_1.SDL_Surface_ptr]],
    SDL_QueryTexture: [types_1.int32, [exports.SDL_Texture_ptr, types_1.Uint32_ptr, types_1.int32_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_SetTextureColorMod: [types_1.int32, [exports.SDL_Texture_ptr, types_1.Uint8, types_1.Uint8, types_1.Uint8]],
    SDL_GetTextureColorMod: [types_1.int32, [exports.SDL_Texture_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr]],
    SDL_SetTextureAlphaMod: [types_1.int32, [exports.SDL_Texture_ptr, types_1.Uint8]],
    SDL_GetTextureAlphaMod: [types_1.int32, [exports.SDL_Texture_ptr, types_1.Uint8_ptr]],
    SDL_SetTextureBlendMode: [types_1.int32, [exports.SDL_Texture_ptr, types_1.uint32]],
    SDL_GetTextureBlendMode: [types_1.int32, [exports.SDL_Texture_ptr, types_1.uint32_ptr]],
    SDL_UpdateTexture: [types_1.int32, [exports.SDL_Texture_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.voit_ptr, types_1.int32]],
    SDL_UpdateYUVTexture: [types_1.int32, [exports.SDL_Texture_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.Uint8_ptr, types_1.int32, types_1.Uint8_ptr, types_1.int32, types_1.Uint8_ptr, types_1.int32]],
    SDL_LockTexture: [types_1.int32, [exports.SDL_Texture_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.voit_ptr_ptr, types_1.int32_ptr]],
    SDL_UnlockTexture: [types_1.voit, [exports.SDL_Texture_ptr]],
    SDL_RenderTargetSupported: [types_1.uint32, [exports.SDL_Renderer_ptr]],
    SDL_SetRenderTarget: [types_1.int32, [exports.SDL_Renderer_ptr, exports.SDL_Texture_ptr]],
    SDL_GetRenderTarget: [exports.SDL_Texture_ptr, [exports.SDL_Renderer_ptr]],
    SDL_RenderSetLogicalSize: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.int32, types_1.int32]],
    SDL_RenderGetLogicalSize: [types_1.voit, [exports.SDL_Renderer_ptr, types_1.int32_ptr, types_1.int32_ptr]],
    SDL_RenderSetViewport: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderGetViewport: [types_1.voit, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderSetClipRect: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderGetClipRect: [types_1.voit, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderIsClipEnabled: [types_1.uint32, [exports.SDL_Renderer_ptr]],
    SDL_RenderSetScale: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.float, types_1.float]],
    SDL_RenderGetScale: [types_1.voit, [exports.SDL_Renderer_ptr, types_1.float_ptr, types_1.float_ptr]],
    SDL_SetRenderDrawColor: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.Uint8, types_1.Uint8, types_1.Uint8, types_1.Uint8]],
    SDL_GetRenderDrawColor: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr]],
    SDL_SetRenderDrawBlendMode: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.uint32]],
    SDL_GetRenderDrawBlendMode: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.uint32_ptr]],
    SDL_RenderClear: [types_1.int32, [exports.SDL_Renderer_ptr]],
    SDL_RenderDrawPoint: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.int32, types_1.int32]],
    SDL_RenderDrawPoints: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Point_ptr, types_1.int32]],
    SDL_RenderDrawLine: [types_1.int32, [exports.SDL_Renderer_ptr, types_1.int32, types_1.int32, types_1.int32, types_1.int32]],
    SDL_RenderDrawLines: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Point_ptr, types_1.int32]],
    SDL_RenderDrawRect: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderDrawRects: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.int32]],
    SDL_RenderFillRect: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderFillRects: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.int32]],
    SDL_RenderCopy: [types_1.int32, [exports.SDL_Renderer_ptr, exports.SDL_Texture_ptr, sdl_rect_1.SDL_Rect_ptr, sdl_rect_1.SDL_Rect_ptr]],
    SDL_RenderCopyEx: [types_1.int32, [exports.SDL_Renderer_ptr, exports.SDL_Texture_ptr, sdl_rect_1.SDL_Rect_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.double, sdl_rect_1.SDL_Point_ptr, types_1.uint32]],
    SDL_RenderReadPixels: [types_1.int32, [exports.SDL_Renderer_ptr, sdl_rect_1.SDL_Rect_ptr, types_1.Uint32, types_1.voit_ptr, types_1.int32]],
    SDL_RenderPresent: [types_1.voit, [exports.SDL_Renderer_ptr]],
    SDL_DestroyTexture: [types_1.voit, [exports.SDL_Texture_ptr]],
    SDL_DestroyRenderer: [types_1.voit, [exports.SDL_Renderer_ptr]],
    SDL_GL_BindTexture: [types_1.int32, [exports.SDL_Texture_ptr, types_1.float_ptr, types_1.float_ptr]],
    SDL_GL_UnbindTexture: [types_1.int32, [exports.SDL_Texture_ptr]],
}, SDL);
//# sourceMappingURL=sdl-render.js.map