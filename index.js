"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path=require("path");
var sdl_window_1 = require("./sdl-window/sdl-window");
var application_context_1 = require("./app/application-context");
var sdl_canvas_1 = require("./canvas/sdl-canvas");
var {Image,registerFont}=require("canvas");
function loadImage(src){
  let pk=new Image();
  pk.src=src;
  return pk;
}
exports.loadImage=loadImage;
function loadFont(src,family){
  family=family || path.basename(src).split(path.extname(src))[0];
  registerFont(src,{family});
}
exports.loadFont=loadFont;
function createWindow(options) {
    var opts = options || sdl_window_1.SdlWindow.windowDefaults();
    var sdlWindow = new sdl_window_1.SdlWindow(opts);
    // sdlWindow.canvas = new sdl_canvas_1.SdlCanvas(sdlWindow);
    sdlWindow.canvas = sdlWindow._internalCanvas;
    return sdlWindow;
}
exports.createWindow = createWindow;
function alert(message) {
    sdl_window_1.SdlWindow.alert(message);
}
exports.alert = alert;
function confirm(message) {
    return sdl_window_1.SdlWindow.confirm(message);
}
exports.confirm = confirm;
function requestAnimationFrame(callback) {
    return application_context_1.applicationContext.requestAnimationFrame(callback);
}
exports.requestAnimationFrame = requestAnimationFrame;
function cancelAnimationFrame(request) {
    application_context_1.applicationContext.cancelAnimationFrame(request);
}
exports.cancelAnimationFrame = cancelAnimationFrame;
function renderFrame() {
    application_context_1.applicationContext.renderFrame();
}
exports.renderFrame = renderFrame;
//# sourceMappingURL=index.js.map