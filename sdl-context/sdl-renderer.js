"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_texture_1 = require("./sdl-texture");
var rgba_1 = require("../color/rgba");
var sdl_1 = require("../sdl");
var SdlRenderer = /** @class */ (function () {
    function SdlRenderer(_rendererPtr) {
        this._rendererPtr = _rendererPtr;
        this._color = rgba_1.Rgba.createWhite();
        this._size = sdl_1.SDL_RenderGetLogicalSize(this._rendererPtr);
    }
    SdlRenderer.prototype.destroy = function () {
        sdl_1.SDL_DestroyRenderer(this._rendererPtr);
    };
    SdlRenderer.prototype.clear = function () {
        sdl_1.SDL_RenderClear(this._rendererPtr);
    };
    SdlRenderer.prototype.copy = function (tt, src, dest) {
        sdl_1.SDL_RenderCopy(this._rendererPtr, tt._texturePtr, src, dest);
    };
    SdlRenderer.prototype.present = function () {
        sdl_1.SDL_RenderPresent(this._rendererPtr);
    };
    SdlRenderer.prototype.createTexture = function (w, h, access, format) {
        if (access === void 0) { access = 2; }
        return sdl_texture_1.SdlTexture.createTexture(this.rendererPtr, w, h, access, format);
    };
    Object.defineProperty(SdlRenderer.prototype, "color", {
        get: function () {
            // SDL_GetRenderDrawColor(this._rendererPtr, this._color);
            return this._color;
        },
        set: function (rgba) {
            this._color = rgba;
            sdl_1.SDL_SetRenderDrawColor(this._rendererPtr, rgba.r, rgba.g, rgba.b, rgba.a);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlRenderer.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            this._size = size;
            sdl_1.SDL_RenderSetLogicalSize(this._rendererPtr, size.w, size.h);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlRenderer.prototype, "target", {
        get: function () {
            var texturePtr = sdl_1.SDL_GetRenderTarget(this._rendererPtr);
            return new sdl_texture_1.SdlTexture(texturePtr);
        },
        set: function (texture) {
            if (texture === null) {
                sdl_1.SDL_SetRenderTarget(this._rendererPtr, null);
            }
            else {
                sdl_1.SDL_SetRenderTarget(this._rendererPtr, texture._texturePtr);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlRenderer.prototype, "rendererPtr", {
        get: function () {
            return this._rendererPtr;
        },
        enumerable: true,
        configurable: true
    });
    SdlRenderer.createRenderer = function (windowPtr, driver) {
        /*tslint:disable*/
        var renderPtr = sdl_1.SDL_CreateRenderer(windowPtr, driver, sdl_1.SDL_RendererFlags.SDL_RENDERER_ACCELERATED | sdl_1.SDL_RendererFlags.SDL_RENDERER_PRESENTVSYNC);
        /*tslint:enable*/
        return new SdlRenderer(renderPtr);
    };
    SdlRenderer.createSoftwareRenderer = function (windowPtr, surfacePtr) {
        var renderPtr = sdl_1.SDL_CreateSoftwareRenderer(surfacePtr);
        return new SdlRenderer(renderPtr);
    };
    return SdlRenderer;
}());
exports.SdlRenderer = SdlRenderer;
//# sourceMappingURL=sdl-renderer.js.map