"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeCanvasImage = require('canvas').Image;
var Image = /** @class */ (function () {
    function Image() {
        this.image = new NodeCanvasImage();
    }
    Object.defineProperty(Image.prototype, "width", {
        get: function () {
            return this.image.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "height", {
        get: function () {
            return this.image.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "imageImplementation", {
        get: function () {
            return this.image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "onload", {
        get: function () {
            return this.image.onload;
        },
        set: function (onload) {
            this.image.onload = onload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "src", {
        get: function () {
            return this.image.src;
        },
        set: function (src) {
            this.image.src = src;
        },
        enumerable: true,
        configurable: true
    });
    return Image;
}());
exports.Image = Image;
exports.NodeCanvasImage=NodeCanvasImage;
//# sourceMappingURL=image.js.map