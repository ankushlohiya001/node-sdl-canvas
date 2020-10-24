"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rgba_1 = require("../color/rgba");
var sdl_texture_1 = require("./sdl-texture");
var sdl_1 = require("../sdl");
var SdlContext2d = /** @class */ (function () {
    function SdlContext2d(renderer) {
        this.renderer = renderer;
        this.x = 0;
        this.y = 0;
        this.textureFormat = sdl_texture_1.SdlTexture.getARGBFormat();
        this.color = rgba_1.Rgba.createWhite();
        this.texture = null;
        this.srcRect = { x: 0, y: 0, w: 0, h: 0 };
        this.destRect = { x: 0, y: 0, w: 0, h: 0 };
    }
    SdlContext2d.prototype.renderFrame = function (pixels, pixelWidth, pixelHeight) {
        if (this.texture) {
            this.setRgba(this.color);
            this.clear();
            //
            // pixels are in the ARGB32 format
            //
            this.texture.update(0, 0, pixelWidth, pixelHeight, pixels);
            pixelWidth = this.width < pixelWidth ? this.width : pixelWidth;
            pixelHeight = (this.height < pixelHeight) ? this.height : pixelHeight;
            this.srcRect.x = 0;
            this.srcRect.y = 0;
            this.srcRect.w = pixelWidth;
            this.srcRect.h = pixelHeight;
            this.destRect.x = this.x;
            this.destRect.y = this.y;
            this.destRect.w = pixelWidth;
            this.destRect.h = pixelHeight;
            this.renderer.copy(this.texture, this.srcRect, this.destRect);
            this.update();
        }
    };
    SdlContext2d.prototype.destroy = function () {
        this.renderer.destroy();
        this.renderer = null;
    };
    SdlContext2d.prototype.clear = function () {
        this.renderer.clear();
    };
    SdlContext2d.prototype.update = function () {
        this.renderer.present();
    };
    SdlContext2d.prototype.setSize = function (w, h) {
        if (this.texture) {
            this.texture.destroy();
            this.texture = null;
        }
        this.renderer.size = { w: w, h: h };
        this.width = w;
        this.height = h;
        this.texture = this.createDynamicTexture(this.textureFormat);
    };
    SdlContext2d.prototype.getSize = function () {
        return this.renderer.size;
    };
    SdlContext2d.prototype.setRgba = function (rgba) {
        /*tslint:disable*/
        this.color = rgba;
        this.renderer.color = rgba;
        /*tslint:enable*/
    };
    SdlContext2d.prototype.createDynamicTexture = function (format) {
        // const size = this.getSize();
        return this.renderer.createTexture(this.width, this.height, sdl_1.SDL_TEXTUREACCESS_STREAMING, format);
    };
    SdlContext2d.prototype.createStaticTexture = function (format) {
        // const size = this.getSize();
        return this.renderer.createTexture(this.width, this.height, sdl_1.SDL_TEXTUREACCESS_STATIC, format);
    };
    SdlContext2d.prototype.createRendererTexture = function () {
        // const size = this.getSize();
        return this.renderer.createTexture(this.width, this.height, sdl_1.SDL_TEXTUREACCESS_TARGET);
    };
    return SdlContext2d;
}());
exports.SdlContext2d = SdlContext2d;
//# sourceMappingURL=sdl-context-2d.js.map