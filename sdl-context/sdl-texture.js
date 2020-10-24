"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_1 = require("../sdl");
var SdlTexture = /** @class */ (function () {
    function SdlTexture(_texturePtr) {
        this._texturePtr = _texturePtr;
        sdl_1.SDL_SetTextureBlendMode(this._texturePtr, sdl_1.SDL_BlendMode.SDL_BLENDMODE_BLEND);
        this.rect = { x: 0, y: 0, w: 0, h: 0 };
    }
    SdlTexture.prototype.destroy = function () {
        sdl_1.SDL_DestroyTexture(this._texturePtr);
    };
    SdlTexture.prototype.update = function (x, y, width, height, pixels) {
        var depth = 4;
        var pitch = depth * width;
        this.rect.x = x;
        this.rect.y = y;
        this.rect.w = width;
        this.rect.h = height;
        sdl_1.SDL_UpdateTexture(this._texturePtr, this.rect, pixels, pitch);
    };
    SdlTexture.prototype.query = function () {
        return sdl_1.SDL_QueryTexture(this._texturePtr);
    };
    Object.defineProperty(SdlTexture.prototype, "texturePtr", {
        get: function () {
            return this._texturePtr;
        },
        enumerable: true,
        configurable: true
    });
    SdlTexture.createTexture = function (rendererPtr, w, h, access, format) {
        if (access === void 0) { access = 2; }
        format = format !== undefined ? format : null;
        var texturePtr = sdl_1.SDL_CreateTexture(rendererPtr, format, access, w, h);
        return new SdlTexture(texturePtr);
    };
    SdlTexture.createARGBSurface = function (pixels, width, height) {
        var rmask = 0x00FF0000;
        var gmask = 0x0000FF00;
        var bmask = 0x000000FF;
        var amask = 0xFF000000;
        var depth = 32;
        var pitch = 4 * width;
        var surfacePtr = sdl_1.SDL_CreateRGBSurfaceFrom(pixels, width, height, depth, pitch, rmask, gmask, bmask, amask);
        return surfacePtr;
    };
    SdlTexture.createARGBTexture = function (pixels, width, height, rendererPtr) {
        var rmask = 0x00FF0000;
        var gmask = 0x0000FF00;
        var bmask = 0x000000FF;
        var amask = 0xFF000000;
        var depth = 32;
        var pitch = 4 * width;
        var surfacePtr = sdl_1.SDL_CreateRGBSurfaceFrom(pixels, width, height, depth, pitch, rmask, gmask, bmask, amask);
        var texturePtr = sdl_1.SDL_CreateTextureFromSurface(rendererPtr, surfacePtr);
        sdl_1.SDL_FreeSurface(surfacePtr);
        return new SdlTexture(texturePtr);
    };
    SdlTexture.getARGBFormat = function () {
        var bpp = 32;
        var rmask = 0x00FF0000;
        var gmask = 0x0000FF00;
        var bmask = 0x000000FF;
        var amask = 0xFF000000;
        /*
             SDL_PIXELFORMAT_ARGB8888
            (Rmask == 0x00FF0000 && Gmask == 0x0000FF00 && Bmask == 0x000000FF && Amask == 0xFF000000)
         */
        var format = sdl_1.SDL_MasksToPixelFormatEnum(bpp, rmask, gmask, bmask, amask);
        return format;
    };
    return SdlTexture;
}());
exports.SdlTexture = SdlTexture;
//# sourceMappingURL=sdl-texture.js.map