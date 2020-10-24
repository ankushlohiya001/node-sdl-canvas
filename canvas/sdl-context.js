"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = require("../image/image");
var SdlContext = /** @class */ (function () {
    function SdlContext(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    }
    Object.defineProperty(SdlContext.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "mozImageSmoothingEnabled", {
        get: function () {
            return this._mozImageSmoothingEnabled;
        },
        set: function (value) {
            this._mozImageSmoothingEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "msFillRule", {
        get: function () {
            return this._msFillRule;
        },
        set: function (value) {
            this._msFillRule = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "oImageSmoothingEnabled", {
        get: function () {
            return this._oImageSmoothingEnabled;
        },
        set: function (value) {
            this._oImageSmoothingEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "webkitImageSmoothingEnabled", {
        get: function () {
            return this._webkitImageSmoothingEnabled;
        },
        set: function (value) {
            this._webkitImageSmoothingEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
            this._ctx.direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = value;
            this._ctx.filter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "font", {
        get: function () {
            return this._font;
        },
        set: function (value) {
            this._font = value;
            this._ctx.font = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "globalAlpha", {
        get: function () {
            return this._globalAlpha;
        },
        set: function (value) {
            this._globalAlpha = value;
            this._ctx.globalAlpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "globalCompositeOperation", {
        get: function () {
            return this._globalCompositeOperation;
        },
        set: function (value) {
            this._globalCompositeOperation = value;
            this._ctx.globalCompositeOperation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "imageSmoothingEnabled", {
        get: function () {
            return this._imageSmoothingEnabled;
        },
        set: function (value) {
            this._imageSmoothingEnabled = value;
            this._ctx.imageSmoothingEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "imageSmoothingQuality", {
        get: function () {
            return this._imageSmoothingQuality;
        },
        set: function (value) {
            this._imageSmoothingQuality = value;
            this._ctx.imageSmoothingQuality = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "lineCap", {
        get: function () {
            return this._lineCap;
        },
        set: function (value) {
            this._lineCap = value;
            this._ctx.lineCap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "lineJoin", {
        get: function () {
            return this._lineJoin;
        },
        set: function (value) {
            this._lineJoin = value;
            this._ctx.lineJoin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "lineWidth", {
        get: function () {
            return this._lineWidth;
        },
        set: function (value) {
            this._lineWidth = value;
            this._ctx.lineWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "miterLimit", {
        get: function () {
            return this._miterLimit;
        },
        set: function (value) {
            this._miterLimit = value;
            this._ctx.miterLimit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "shadowBlur", {
        get: function () {
            return this._shadowBlur;
        },
        set: function (value) {
            this._shadowBlur = value;
            this._ctx.shadowBlur = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "shadowColor", {
        get: function () {
            return this._shadowColor;
        },
        set: function (value) {
            this._shadowColor = value;
            this._ctx.shadowColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "shadowOffsetX", {
        get: function () {
            return this._shadowOffsetX;
        },
        set: function (value) {
            this._shadowOffsetX = value;
            this._ctx.shadowOffsetX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "shadowOffsetY", {
        get: function () {
            return this._shadowOffsetY;
        },
        set: function (value) {
            this._shadowOffsetY = value;
            this._ctx.shadowOffsetY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "strokeStyle", {
        get: function () {
            return this._strokeStyle;
        },
        set: function (value) {
            this._strokeStyle = value;
            this._ctx.strokeStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "textAlign", {
        get: function () {
            return this._textAlign;
        },
        set: function (value) {
            this._textAlign = value;
            this._ctx.textAlign = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "textBaseline", {
        get: function () {
            return this._textBaseline;
        },
        set: function (value) {
            this._textBaseline = value;
            this._ctx.textBaseline = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "lineDashOffset", {
        get: function () {
            return this._lineDashOffset;
        },
        set: function (value) {
            this._lineDashOffset = value;
            this._ctx.lineDashOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlContext.prototype, "fillStyle", {
        get: function () {
            return this._fillStyle;
        },
        set: function (value) {
            this._fillStyle = value;
            this._ctx.fillStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    SdlContext.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
        this._ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    };
    SdlContext.prototype.arcTo = function (x1, y1, x2, y2, radius) {
        this._ctx.arcTo(x1, y1, x2, y2, radius);
    };
    SdlContext.prototype.beginPath = function () {
        this._ctx.beginPath();
    };
    SdlContext.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
        this._ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    };
    SdlContext.prototype.clearRect = function (x, y, w, h) {
        this._ctx.clearRect(x, y, w, h);
    };
    SdlContext.prototype.clip = function (fillRule) {
        return this._ctx.clip(fillRule);
    };
    SdlContext.prototype.closePath = function () {
        this._ctx.closePath();
    };
    SdlContext.prototype.createImageData = function (...args) {
        return this._ctx.createImageData(...args);
    };
    SdlContext.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        return this._ctx.createLinearGradient(x0,y0,x1,y1);
    };
    SdlContext.prototype.createPattern = function (...args) {
        return this._ctx.createPattern(...args);
    };
    SdlContext.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        return this._ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
    };
    SdlContext.prototype.drawFocusIfNeeded = function (element) {
        return this._ctx.drawFocusIfNeeded(element);
    };
    SdlContext.prototype.drawImage = function (image, dx, dy, dw, dh, dx2, dy2, dw2, dh2) {
        if (image instanceof image_1.Image) {
            image = image.imageImplementation;
        }
        this._ctx.drawImage(image, dx, dy, dw, dh, dx2, dy2, dw2, dh2);
    };
    SdlContext.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
        this._ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    };
    SdlContext.prototype.fill = function (fillRule) {
        return this._ctx.fill(fillRule);
    };
    SdlContext.prototype.fillRect = function (x, y, w, h) {
        this._ctx.fillRect(x, y, w, h);
    };
    SdlContext.prototype.fillText = function (text, x, y, maxWidth) {
        this._ctx.fillText(text, x, y, maxWidth);
    };
    SdlContext.prototype.getImageData = function (sx, sy, sw, sh) {
        return this._ctx.getImageData(sx, sy, sw, sh);
    };
    SdlContext.prototype.getLineDash = function () {
        return this._ctx.getLineDash();
    };
    SdlContext.prototype.getTransform = function () {
        return this._ctx.getTransform();
    };
    SdlContext.prototype.isPointInPath = function (x, y, fillRule) {
        return this._ctx.isPointInPath(x, y, fillRule);
    };
    SdlContext.prototype.isPointInStroke = function (x, y) {
        return this._ctx.isPointInStroke(x,y);
    };
    SdlContext.prototype.lineTo = function (x, y) {
        this._ctx.lineTo(x, y);
    };
    SdlContext.prototype.measureText = function (text) {
        return this._ctx.measureText(text);
    };
    SdlContext.prototype.moveTo = function (x, y) {
        this._ctx.moveTo(x, y);
    };
    SdlContext.prototype.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        this._ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    };
    SdlContext.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
        this._ctx.quadraticCurveTo(cpx, cpy, x, y);
    };
    SdlContext.prototype.rect = function (x, y, w, h) {
        this._ctx.rect(x, y, w, h);
    };
    SdlContext.prototype.resetTransform = function () {
        this._ctx.resetTransform();
    };
    SdlContext.prototype.restore = function () {
        this._ctx.restore();
    };
    SdlContext.prototype.rotate = function (angle) {
        this._ctx.rotate(angle);
    };
    SdlContext.prototype.save = function () {
        this._ctx.save();
    };
    SdlContext.prototype.scale = function (x, y) {
        this._ctx.scale(x, y);
    };
    // scrollPathIntoView(): void;
    SdlContext.prototype.scrollPathIntoView = function (path) {
        this._ctx.scrollPathIntoView(path);
    };
    SdlContext.prototype.setLineDash = function (segments) {
        this._ctx.setLineDash(segments);
    };
    SdlContext.prototype.setTransform = function (a, b, c, d, e, f) {
        this._ctx.setTransform(a, b, c, d, e, f);
    };
    SdlContext.prototype.stroke = function (path) {
        this._ctx.stroke(path);
    };
    SdlContext.prototype.strokeRect = function (x, y, w, h) {
        this._ctx.strokeRect(x, y, w, h);
    };
    SdlContext.prototype.strokeText = function (text, x, y, maxWidth) {
        this._ctx.strokeText(text, x, y, maxWidth);
    };
    SdlContext.prototype.transform = function (a, b, c, d, e, f) {
        this._ctx.transform(a, b, c, d, e, f);
    };
    SdlContext.prototype.translate = function (x, y) {
        this._ctx.translate(x, y);
    };
    return SdlContext;
}());
exports.SdlContext = SdlContext;
//# sourceMappingURL=sdl-context.js.map