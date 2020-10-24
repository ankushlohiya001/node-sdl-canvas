"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_thread_1 = require("../sdl/sdl-thread");
exports.threadFunctions = {};
function runThread(threadName, procedure) {
    var func = exports.threadFunctions[threadName] = sdl_thread_1.createThreadFunction(function () {
        procedure();
        return 0;
    });
    return sdl_thread_1.SDL_CreateThread(func, threadName, null);
}
var Thread = /** @class */ (function () {
    function Thread(name, runnable) {
        this.name = name;
        this.runnable = runnable;
        this.threadPtr = null;
    }
    Thread.prototype.start = function () {
        var _this = this;
        if (this.threadPtr === null) {
            this.threadPtr = runThread(this.name, function () { return _this.runnable(); });
        }
    };
    Thread.prototype.stop = function () {
        if (this.threadPtr !== null) {
            sdl_thread_1.SDL_DetachThread(this.threadPtr);
            this.threadPtr = null;
        }
    };
    return Thread;
}());
exports.Thread = Thread;
//# sourceMappingURL=thread.js.map