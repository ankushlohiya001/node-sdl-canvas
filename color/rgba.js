"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseRgba = require('color-rgba');
var Rgba = /** @class */ (function () {
    function Rgba() {
    }
    Rgba.prototype.clone = function () {
        var color = new Rgba();
        color.r = this.r;
        color.g = this.g;
        color.b = this.b;
        color.a = this.a;
        return color;
    };
    Rgba.createWhite = function () {
        var color = new Rgba();
        color.r = 255;
        color.g = 255;
        color.b = 255;
        color.a = 255;
        return color;
    };
    Rgba.createBlack = function () {
        var color = new Rgba();
        color.r = 0;
        color.g = 0;
        color.b = 0;
        color.a = 255;
        return color;
    };
    Rgba.parse = function (rgb) {
        var color = new Rgba();
        if (typeof rgb === 'number') {
            /*tslint:disable*/
            var color_1 = new Rgba();
            color_1.r = (rgb >> 16) & 0xFF;
            color_1.g = (rgb >> 8) & 0xFF;
            color_1.b = rgb & 0xFF;
            color_1.a = 255;
            /*tslint:enable*/
        }
        else if (typeof rgb === 'string') {
            if (Rgba._HexRE.test(rgb)) {
                var hex = rgb.replace('#', '').trim();
                var num = parseInt(hex, 16);
                /*tslint:disable*/
                color.r = (num >> 16) & 0xFF;
                color.g = (num >> 8) & 0xFF;
                color.b = num & 0xFF;
                color.a = 255;
                /*tslint:enable*/
            }
            else {
                var list = parseRgba(rgb);
                color.r = list[0];
                color.g = list[1];
                color.b = list[2];
                color.a = list[3] * 255;
            }
        }
        return color;
    };
    Rgba._HexRE = /[0-9A-Fa-f]+/;
    return Rgba;
}());
exports.Rgba = Rgba;
//# sourceMappingURL=rgba.js.map