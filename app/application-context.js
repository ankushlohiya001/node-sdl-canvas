"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("events");
var sdl_1 = require("../sdl");
var FPS = 60;
// const globalAppHolder: any = {
//     filter: (data: any, event: any) => {
//     }
// };
var globalEventFilterFunction = null;
var f = null;
var ApplicationContext = /** @class */ (function (_super) {
    __extends(ApplicationContext, _super);
    function ApplicationContext() {
        var _this = _super.call(this) || this;
        _this.windows = {};
        var sdlFlags = 0x00000020;
        if (sdl_1.SDL_Init(sdlFlags) !== 0) {
            _this.quit();
            return _this;
        }
        _this.initEvents();
        _this.initEventWatcher();
        sdl_1.pollForEventsForever();
        return _this;
    }
    ApplicationContext.prototype.initEventWatcher = function () {
        var _this = this;
        globalEventFilterFunction = sdl_1.createEventFilterFunction(function (data, event) {
            event = event.deref();
            if (event.type >= sdl_1.SDL_EventType.SDL_WINDOWEVENT && event.type <= sdl_1.SDL_EventType.SDL_MOUSEWHEEL) {
                var windowId = event.window.windowID;
                var win = _this.windows[windowId];
                if (win) {
                    win.emit('sdlEvent', event);
                }
            }
            else {
                _this.emit('sdlEvent', event);
            }
        });
        sdl_1.SDL_AddEventWatch(globalEventFilterFunction, null);
    };
    ApplicationContext.prototype.emitToWindows = function (event) {
        var _this = this;
        Object.keys(this.windows).forEach(function (key) {
            var window = _this.windows[key];
            window.emit('sdlEvent', event);
        });
    };
    ApplicationContext.prototype.initEvents = function () {
        var _this = this;
        this.on('sdlEvent', function (event) {
            if (event.type === sdl_1.SDL_EventType.SDL_QUIT) {
                _this.quit();
            }
        });
        this.on('beforeQuit', function () {
            /*tslint:disable*/
            for (var key in _this.windows) {
                /*tslint:enable*/
                var window_1 = _this.windows[key];
                window_1.destroy();
            }
        });
    };
    ApplicationContext.prototype.renderFrame = function () {
        let ms=Date.now();
        this.emit('renderFrame', ms);
        /*tslint:disable*/
        for (var key in this.windows) {
            var window_2 = this.windows[key];
            window_2.renderFrame(ms);
        }
        /*tslint:enable*/
    };
    ApplicationContext.prototype.cancelAnimationFrame = function (request) {
        var _this = this;
        this.listeners('renderFrame').forEach(function (listener) {
            _this.off('renderFrame', listener);
        });
    };
    ApplicationContext.prototype.requestAnimationFrame = function (callback) {
        this.once('renderFrame', callback);
        return Number.MAX_VALUE;
    };
    ApplicationContext.prototype.startRenderingFramesUsingTimeouts = function () {
        var _this = this;
        var lastRenderedTime = new Date().getTime();
        var targetRefreshRate = 1000 / FPS;
        var update;
        update = function () {
            var currentTime = new Date().getTime();
            _this.renderFrame(currentTime);
            var timeToRender = currentTime - lastRenderedTime;
            var timeoutValue = Math.max(targetRefreshRate - timeToRender, 0);
            lastRenderedTime = currentTime;
            // console.log(timeoutValue);
            setTimeout(update, timeoutValue);
        };
        setImmediate(update);
    };
    ApplicationContext.prototype.getWindows = function () {
        return this.windows;
    };
    ApplicationContext.prototype.registerWindow = function (window) {
        this.windows[window.id] = window;
    };
    ApplicationContext.prototype.quit = function () {
        this.exit();
    };
    ApplicationContext.prototype.exit = function (exitCode) {
        if (exitCode === void 0) { exitCode = 0; }
        sdl_1.SDL_Quit();
        process.exit(exitCode);
    };
    return ApplicationContext;
}(EventEmitter));
exports.ApplicationContext = ApplicationContext;
exports.applicationContext = new ApplicationContext();
//# sourceMappingURL=application-context.js.map