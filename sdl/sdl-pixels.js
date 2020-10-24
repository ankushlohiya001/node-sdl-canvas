"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var ref = require('ref-napi');
var ArrayType = require('ref-array-di')(ref);
var Struct = require('ref-struct-di')(ref);
var SDL = {};
function SDL_MasksToPixelFormatEnum(bpp, rmask, gmask, bmask, amask) {
    return SDL.SDL_MasksToPixelFormatEnum(bpp, rmask, gmask, bmask, amask);
}
exports.SDL_MasksToPixelFormatEnum = SDL_MasksToPixelFormatEnum;
var SDL_pixels_emum;
(function (SDL_pixels_emum) {
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_UNKNOWN"] = 0] = "SDL_PIXELTYPE_UNKNOWN";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_INDEX1"] = 1] = "SDL_PIXELTYPE_INDEX1";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_INDEX4"] = 2] = "SDL_PIXELTYPE_INDEX4";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_INDEX8"] = 3] = "SDL_PIXELTYPE_INDEX8";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_PACKED8"] = 4] = "SDL_PIXELTYPE_PACKED8";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_PACKED16"] = 5] = "SDL_PIXELTYPE_PACKED16";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_PACKED32"] = 6] = "SDL_PIXELTYPE_PACKED32";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_ARRAYU8"] = 7] = "SDL_PIXELTYPE_ARRAYU8";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_ARRAYU16"] = 8] = "SDL_PIXELTYPE_ARRAYU16";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_ARRAYU32"] = 9] = "SDL_PIXELTYPE_ARRAYU32";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_ARRAYF16"] = 10] = "SDL_PIXELTYPE_ARRAYF16";
    SDL_pixels_emum[SDL_pixels_emum["SDL_PIXELTYPE_ARRAYF32"] = 11] = "SDL_PIXELTYPE_ARRAYF32";
})(SDL_pixels_emum || (SDL_pixels_emum = {}));
exports.SDL_Color = Struct({
    r: types_1.Uint8,
    g: types_1.Uint8,
    b: types_1.Uint8,
    a: types_1.Uint8,
});
exports.SDL_Color_ptr = ref.refType(exports.SDL_Color);
exports.SDL_Palette = Struct({
    ncolors: types_1.int32,
    colors: exports.SDL_Color_ptr,
    version: types_1.Uint32,
    refcount: types_1.int32,
});
exports.SDL_Palette_ptr = ref.refType(exports.SDL_Palette);
exports.SDL_PixelFormat_FI_padding_arr = ArrayType(types_1.Uint8, 2);
exports.SDL_PixelFormat = Struct({
    format: types_1.Uint32,
    palette: exports.SDL_Palette_ptr,
    BitsPerPixel: types_1.Uint8,
    BytesPerPixel: types_1.Uint8,
    padding: exports.SDL_PixelFormat_FI_padding_arr,
    Rmask: types_1.Uint32,
    Gmask: types_1.Uint32,
    Bmask: types_1.Uint32,
    Amask: types_1.Uint32,
    Rloss: types_1.Uint8,
    Gloss: types_1.Uint8,
    Bloss: types_1.Uint8,
    Aloss: types_1.Uint8,
    Rshift: types_1.Uint8,
    Gshift: types_1.Uint8,
    Bshift: types_1.Uint8,
    Ashift: types_1.Uint8,
    refcount: types_1.int32,
    next: types_1.voit_ptr,
});
exports.SDL_PixelFormat_ptr = ref.refType(exports.SDL_PixelFormat);
lib_loader_1.loadLibrary({
    SDL_GetPixelFormatName: [types_1.string, [types_1.Uint32]],
    SDL_PixelFormatEnumToMasks: [types_1.uint32, [types_1.Uint32, types_1.int32_ptr, types_1.Uint32_ptr, types_1.Uint32_ptr, types_1.Uint32_ptr, types_1.Uint32_ptr]],
    SDL_MasksToPixelFormatEnum: [types_1.Uint32, [types_1.int32, types_1.Uint32, types_1.Uint32, types_1.Uint32, types_1.Uint32]],
    SDL_AllocFormat: [exports.SDL_PixelFormat_ptr, [types_1.Uint32]],
    SDL_FreeFormat: [types_1.voit, [exports.SDL_PixelFormat_ptr]],
    SDL_AllocPalette: [exports.SDL_Palette_ptr, [types_1.int32]],
    SDL_SetPixelFormatPalette: [types_1.int32, [exports.SDL_PixelFormat_ptr, exports.SDL_Palette_ptr]],
    SDL_SetPaletteColors: [types_1.int32, [exports.SDL_Palette_ptr, exports.SDL_Color_ptr, types_1.int32, types_1.int32]],
    SDL_FreePalette: [types_1.voit, [exports.SDL_Palette_ptr]],
    SDL_MapRGB: [types_1.Uint32, [exports.SDL_PixelFormat_ptr, types_1.Uint8, types_1.Uint8, types_1.Uint8]],
    SDL_MapRGBA: [types_1.Uint32, [exports.SDL_PixelFormat_ptr, types_1.Uint8, types_1.Uint8, types_1.Uint8, types_1.Uint8]],
    SDL_GetRGB: [types_1.voit, [types_1.Uint32, exports.SDL_PixelFormat_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr]],
    SDL_GetRGBA: [types_1.voit, [types_1.Uint32, exports.SDL_PixelFormat_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr, types_1.Uint8_ptr]],
    SDL_CalculateGammaRamp: [types_1.voit, [types_1.float, types_1.Uint16_ptr]]
}, SDL);
//# sourceMappingURL=sdl-pixels.js.map