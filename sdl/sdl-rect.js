"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var ref = require('ref-napi');
var Struct = require('ref-struct-di')(ref);
exports.SDL_Point = exports.SDL_Point = Struct({
    x: types_1.int32,
    y: types_1.int32,
});
exports.SDL_Rect = Struct({
    x: types_1.int32,
    y: types_1.int32,
    w: types_1.int32,
    h: types_1.int32,
});
exports.SDL_Rect_ptr = ref.refType(exports.SDL_Rect);
exports.SDL_Point_ptr = ref.refType(exports.SDL_Point);
function createSDL_RectPtr(rect) {
    return exports.SDL_Rect(arraylike2obj(rect, 'x,y,w,h')).ref();
}
exports.createSDL_RectPtr = createSDL_RectPtr;
function arraylike2obj(obj, keys) {
    if (obj === void 0) { obj = {}; }
    if (keys === void 0) { keys = ''; }
    keys = keys.split(',');
    var ret = {};
    keys.forEach(function (value, index) {
        value = value.trim();
        ret[value] = (value in obj) ? obj[value] : (obj[index] || 0);
    });
    return ret;
}
//# sourceMappingURL=sdl-rect.js.map