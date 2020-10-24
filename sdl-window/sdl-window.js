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
var application_context_1 = require("../app/application-context");
var events_1 = require("events");
var sdl_window_opts_1 = require("./sdl-window-opts");
var sdl_context_1 = require("../sdl-context");
var messagebox_1 = require("./messagebox");
var sdl_1 = require("../sdl");
var mouse_event_1 = require("../event/mouse-event");
var key_event_1 = require("../event/key-event");
var sdl_canvas_1 = require("../canvas/sdl-canvas");
var NodeCanvasImage = require('canvas').Image;
var createInternalCanvas = require('canvas').createCanvas;
var loadImage = require('canvas').loadImage;
var SdlWindow = /** @class */ (function (_super) {
    __extends(SdlWindow, _super);
    function SdlWindow(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this._hasMouseEnteredWindow = false;
        _this.init();
        _this.createCanvas();
        application_context_1.applicationContext.registerWindow(_this);
        setTimeout(function () {
            _this.emit('load');
        }, 100);
        return _this;
    }
    SdlWindow.prototype.disableFullScreen = function () {
        this.fullScreen = false;
    };
    SdlWindow.prototype.enableFullScreen = function () {
        this.fullScreen = true;
    };
    SdlWindow.prototype.addEventListener = function (type, listener, options) {
        switch (type) {
            case 'load':
            case 'DOMContentLoaded':
                this.on('load', listener);
                break;
            case 'dragstart':
                this.on('dropBegin', listener);
                break;
            case 'drop':
                this.on('drop', listener);
                break;
            case 'mouseleave':
            case 'mouseout':
                this.on('mouseleave', listener);
                break;
            case 'maximize':
                this.on(type, listener);
                break;
            case 'minimize':
                this.on(type, listener);
                break;
            case 'mouseenter':
            case 'mouseover':
                this.on('mouseenter', listener);
                break;
            case 'move':
                this.on(type, listener);
                break;
            case 'hide':
                this.on(type, listener);
                break;
            case 'show':
                this.on(type, listener);
                break;
            case 'resize':
                this.on(type, listener);
                break;
            case 'blur':
                this.on(type, listener);
                break;
            case 'focus':
                this.on(type, listener);
                break;
            case 'close':
                this.on(type, listener);
                break;
            case 'datachange':
                this.on('change', listener);
                break;
            case 'keyup':
                this.on(type, listener);
                break;
            case 'keydown':
                this.on(type, listener);
                break;
            case 'keypress':
                this.on(type, listener);
                break;
            case 'mousemove':
                this.on(type, listener);
                break;
            case 'mousedown':
                this.on(type, listener);
                break;
            case 'mouseup':
                this.on(type, listener);
                break;
            case 'mousewheel':
                this.on(type, listener);
                break;
            case 'click':
                this.on(type, listener);
                break;
        }
    };
    SdlWindow.prototype.alert = function (message) {
        messagebox_1.alert(message || '', this._windowPtr);
    };
    SdlWindow.prototype.blur = function () {
        this.emit('blur');
    };
    SdlWindow.prototype.focus = function () {
        this.emit('focus');
    };
    SdlWindow.prototype.cancelAnimationFrame = function (handle) {
        var _this = this;
        this.listeners('renderFrame').forEach(function (listener) {
            _this.off('renderFrame', listener);
        });
    };
    SdlWindow.prototype.confirm = function (message) {
        return messagebox_1.confirm(message, this._windowPtr);
    };
    SdlWindow.prototype.removeEventListener = function (type, listener, options) {
        switch (type) {
            case 'mouseleave':
            case 'mouseout':
                this.off('mouseleave', listener);
                break;
            case 'mouseenter':
            case 'mouseover':
                this.off('mouseenter', listener);
                break;
            case 'datachange':
                this.off('change', listener);
                break;
            default:
                this.off(type, listener);
                break;
        }
    };
    SdlWindow.prototype.requestAnimationFrame = function (callback) {
        this.once('renderFrame', callback);
        return Number.MAX_VALUE;
    };
    SdlWindow.prototype.setInterval = function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setInterval(handler, timeout, args);
    };
    SdlWindow.prototype.setTimeout = function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout(handler, timeout, args);
    };
    Object.defineProperty(SdlWindow.prototype, "canvasWidth", {
        get: function () {
            return this._context.width;
        },
        set: function (val) {
            var size = this._size;
            this._size = size = { w: val, h: size.h };
            this._internalCanvas.width = size.w;
        },
        enumerable: true,
        configurable: true
    });
    SdlWindow.prototype.configureCanvasSize = function (w, h) {
            this._internalCanvas.width = this._size.w;
            this._internalCanvas.height = this._size.h;
    };
    Object.defineProperty(SdlWindow.prototype, "canvasHeight", {
        get: function () {
            return this._context.height;
        },
        set: function (val) {
            var size = this._size;
            this._size = size = { w: size.w, h: val };
            this._internalCanvas.height = size.h;
        },
        enumerable: true,
        configurable: true
    });
    SdlWindow.prototype.getCanvas = function () {
        return this._canvas;
    };
    SdlWindow.prototype.renderFrame = function (ms) {
        this.emit('renderFrame', ms);
        var canvas = this._internalCanvas;
        var width = canvas.width, height = canvas.height;
        var size = this._size;
        var buffer = canvas.toBuffer('raw'); // ARGB32
        // console.time('renderFrame');
        this._context.renderFrame(buffer, width, height);
        // this._context.renderFrame(buffer, width, height);
        // console.timeEnd('renderFrame');
    };
    SdlWindow.prototype.init = function () {
        var sdlOpts = sdl_window_opts_1.getSdlWindowOptions(this.options);
        // Create the window, and store its pointer;
        this._windowPtr = sdl_1.SDL_CreateWindow(sdlOpts.title, sdlOpts.x, sdlOpts.y, sdlOpts.w, sdlOpts.h, sdlOpts.flags);
        // this.windowSurface = SDL_GetWindowSurface(this.windowPtr);
        // Create a SDL Context to handle the abstractions
        this._context = sdl_context_1.createSdlContext2D(this._windowPtr);
        // this._context = createSoftwareSdlContext2D(this._windowPtr);
        this.initSize();
        this.initContextSize();
        this.initEvents();
    };
    SdlWindow.prototype.initCanvasColors = function () {
        var ctx = this._internalCanvas.getContext('2d');
    };
    SdlWindow.prototype.initWindowEvents = function () {
        var _this = this;
        this.on('sdlEvent', function (event) {
            if (event.type === sdl_1.SDL_EventType.SDL_WINDOWEVENT) {
                var evt = event.window.event;
                if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_SHOWN) {
                    _this.emit('show');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_HIDDEN) {
                    _this.emit('hide');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_EXPOSED) {
                    // this.triggerWindowSizeChange();
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_MOVED) {
                    _this.emit('move', event.window.data1, event.window.data2);
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_RESIZED) {
                    _this.triggerWindowSizeChange(event.window.data1, event.window.data2);
                    _this.emit('resize', event.window.data1, event.window.data2);
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_SIZE_CHANGED) {
                    // this._change(event.window.data1, event.window.data2);
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_MINIMIZED) {
                    _this.emit('minimize');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_MAXIMIZED) {
                    _this.emit('maximize');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_RESTORED) {
                    _this.emit('restore');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_ENTER) {
                    _this._hasMouseEnteredWindow = true;
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_LEAVE) {
                    if (_this._lastMouseEvent) {
                        _this.emit('mouseleave', _this._lastMouseEvent);
                    }
                    _this._hasMouseEnteredWindow = false;
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_GAINED) {
                    _this.emit('focus');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_LOST) {
                    _this.emit('blur');
                }
                else if (evt === sdl_1.SDL_WindowEventID.SDL_WINDOWEVENT_CLOSE) {
                    _this.close();
                }
            }
        });
    };
    SdlWindow.prototype.initKeyEvents = function () {
        var _this = this;
        this.on('sdlEvent', function (event) {
            if (event.type === sdl_1.SDL_EventType.SDL_KEYDOWN) {
                var domEvent = key_event_1.getCurrentKeyEvent(event, _this);
                _this.emit('keydown', domEvent);
                _this._lastKeyboardEvent = domEvent;
            }
            else if (event.type === sdl_1.SDL_EventType.SDL_KEYUP) {
                var domEvent = key_event_1.getCurrentKeyEvent(event, _this);
                _this.emit('keyup', domEvent);
                _this._lastKeyboardEvent = null;
            }
            else if (event.type === sdl_1.SDL_EventType.SDL_TEXTINPUT) {
                var buf = Buffer.from(event.text.text);
                var str = buf.reinterpretUntilZeros(1).toString();
                var domEvent = key_event_1.getCurrentKeyEvent(event, _this);
                domEvent.key = str;
                domEvent.keyCode = domEvent.charCode = str.codePointAt(0);
                domEvent.ctrlKey = _this._lastKeyboardEvent.ctrlKey;
                domEvent.shiftKey = _this._lastKeyboardEvent.shiftKey;
                domEvent.altKey = _this._lastKeyboardEvent.altKey;
                domEvent.metaKey = _this._lastKeyboardEvent.metaKey;
                _this.emit('keypress', domEvent);
            }
        });
    };
    SdlWindow.prototype.initMouseEvents = function () {
        var _this = this;
        this.on('sdlEvent', function (event) {
            if (event.type === sdl_1.SDL_EventType.SDL_MOUSEMOTION) {
                var domEvent = mouse_event_1.getCurrentMouseEvent(event, _this);
                _this.decorateMouseEvent(domEvent);
                if (_this._hasMouseEnteredWindow) {
                    _this.emit('mouseenter', domEvent);
                    _this._hasMouseEnteredWindow = false;
                }
                _this.emit('mousemove', domEvent);
                _this._lastMouseEvent = domEvent;
            }
            else if (event.type === sdl_1.SDL_EventType.SDL_MOUSEBUTTONDOWN) {
                var domEvent = mouse_event_1.getCurrentMouseEvent(event, _this);
                _this.emit('mousedown', domEvent);
            }
            else if (event.type === sdl_1.SDL_EventType.SDL_MOUSEBUTTONUP) {
                var domEvent = mouse_event_1.getCurrentMouseEvent(event, _this);
                _this.emit('mouseup', domEvent);
                _this.emit('click', domEvent);
            }
        });
    };
    SdlWindow.prototype.decorateMouseEvent = function (event) {
        var castedEvent = event;
        if (this._lastKeyboardEvent) {
            castedEvent.altKey = this._lastKeyboardEvent.altKey;
            castedEvent.ctrlKey = this._lastKeyboardEvent.ctrlKey;
            castedEvent.shiftKey = this._lastKeyboardEvent.shiftKey;
            castedEvent.metaKey = this._lastKeyboardEvent.metaKey;
        }
    };
    SdlWindow.prototype.initEvents = function () {
        this.initWindowEvents();
        this.initMouseEvents();
        this.initKeyEvents();
    };
    SdlWindow.prototype.initContextSize = function () {
        var size = this._size;
        this._context.setSize(size.w, size.h);
    };
    SdlWindow.prototype.initSize = function () {
        this._size = sdl_1.SDL_GetWindowSize(this._windowPtr);
    };
    SdlWindow.prototype.triggerWindowSizeChange = function (w,h) {
        this._size={w,h};
        if (!this.options.scaleCanvasToWindowSize) {
            this.initContextSize();
        }
        var size = this._size;
        this.initCanvasSize(size);
        this.emit('change', size.w, size.h);
    };
    SdlWindow.prototype.grab = function () {
        sdl_1.SDL_SetWindowGrab(this._windowPtr, true);
    };
    SdlWindow.prototype.loose = function () {
        sdl_1.SDL_SetWindowGrab(this._windowPtr, false);
    };
    SdlWindow.prototype.focus = function () {
        sdl_1.SDL_RaiseWindow(this._windowPtr);
    };
    SdlWindow.prototype.close = function () {
        if (!this.options.closable) {
            return;
        }
        this.destroy();
    };
    SdlWindow.prototype.destroy = function () {
        // this.rendererPtr.destroy();
        // sdl_1.SDL_Renderer_
        // rendererPtr
        sdl_1.SDL_DestroyWindow(this._windowPtr);
        this.emit('_closed');
    };
    SdlWindow.prototype.restore = function () {
        sdl_1.SDL_RestoreWindow(this._windowPtr);
    };
    SdlWindow.prototype.center = function () {
        this.position = [0x2FFF0000, 0x2FFF0000];
    };
    SdlWindow.prototype.setModal = function (win) {
        if (win && win._windowPtr) {
            sdl_1.SDL_SetWindowModalFor(win._windowPtr, this._windowPtr);
        }
    };
    Object.defineProperty(SdlWindow.prototype, "maximize", {
        get: function () {
            /*tslint:disable*/
            return !!(sdl_1.SDL_GetWindowFlags(this._windowPtr) & sdl_1.SDL_WindowFlags.SDL_WINDOW_MAXIMIZED);
            /*tslint:enable*/
        },
        set: function (_maximized) {
            if (!!_maximized) {
                sdl_1.SDL_MaximizeWindow(this._windowPtr);
            }
            else if (this.maximize) {
                this.restore();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "minimize", {
        get: function () {
            /*tslint:disable*/
            return !!(sdl_1.SDL_GetWindowFlags(this._windowPtr) & sdl_1.SDL_WindowFlags.SDL_WINDOW_MINIMIZED);
            /*tslint:enable*/
        },
        set: function (_minimized) {
            if (!!_minimized) {
                sdl_1.SDL_MinimizeWindow(this._windowPtr);
            }
            else if (this.minimize) {
                this.restore();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "fullScreen", {
        get: function () {
            /*tslint:disable*/
            return !!(sdl_1.SDL_GetWindowFlags(this._windowPtr) & sdl_1.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN);
            /*tslint:enable*/
        },
        set: function (full) {
            if (full) {
                sdl_1.SDL_SetWindowFullscreen(this._windowPtr, sdl_1.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP);
            }
            else {
                sdl_1.SDL_SetWindowFullscreen(this._windowPtr, 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "bounds", {
        get: function () {
            var position = this.position;
            var size = this._size;
            return {
                x: position.x,
                y: position.y,
                w: size.w,
                h: size.h
            };
        },
        set: function (rect) {
            this.position = rect;
            this._size = rect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (val) {
            this._size = val;
            sdl_1.SDL_SetWindowSize(this._windowPtr, val.w, val.h);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "minimumSize", {
        get: function () {
            return sdl_1.SDL_GetWindowMinimumSize(this._windowPtr);
        },
        set: function (wh) {
            var size = this.minimumSize;
            var w = wh.w >= 0 ? wh.w : (wh[0] >= 0 ? wh[0] : size.w);
            var h = wh.h >= 0 ? wh.h : (wh[1] >= 0 ? wh[1] : size.h);
            sdl_1.SDL_SetWindowMinimumSize(this._windowPtr, w, h);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "maximumSize", {
        get: function () {
            return sdl_1.SDL_GetWindowMaximumSize(this._windowPtr);
        },
        set: function (wh) {
            var size = this.maximumSize;
            var w = wh.w >= 0 ? wh.w : (wh[0] >= 0 ? wh[0] : size.w);
            var h = wh.h >= 0 ? wh.h : (wh[1] >= 0 ? wh[1] : size.h);
            sdl_1.SDL_SetWindowMaximumSize(this._windowPtr, w, h);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "resizable", {
        get: function () {
            /*tslint:disable*/
            return !!(sdl_1.SDL_GetWindowFlags(this._windowPtr) & sdl_1.SDL_WindowFlags.SDL_WINDOW_RESIZABLE);
            /*tslint:enable*/
        },
        set: function (value) {
            sdl_1.SDL_SetWindowResizable(this._windowPtr, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "closable", {
        get: function () {
            return this.options.closable;
        },
        set: function (_closable) {
            this.options.closable = !!_closable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "position", {
        get: function () {
            return sdl_1.SDL_GetWindowPosition(this._windowPtr);
        },
        set: function (xy) {
            var position = this.position;
            var x = xy.x >= 0 ? xy.x : (xy[0] >= 0 ? xy[0] : position.x);
            var y = xy.y >= 0 ? xy.y : (xy[1] >= 0 ? xy[1] : position.y);
            sdl_1.SDL_SetWindowPosition(this._windowPtr, x, y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "title", {
        get: function () {
            return sdl_1.SDL_GetWindowTitle(this._windowPtr);
        },
        set: function (title) {
            sdl_1.SDL_SetWindowTitle(this._windowPtr, title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "border", {
        set: function (border) {
            sdl_1.SDL_SetWindowBordered(this._windowPtr, !!border);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "bordersSize", {
        get: function () {
            return sdl_1.SDL_GetWindowBordersSize(this._windowPtr);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "show", {
        get: function () {
            /*tslint:disable*/
            return !!(sdl_1.SDL_GetWindowFlags(this._windowPtr) & sdl_1.SDL_WindowFlags.SDL_WINDOW_SHOWN);
            /*tslint:enable*/
        },
        set: function (show) {
            if (show) {
                sdl_1.SDL_ShowWindow(this._windowPtr);
            }
            else {
                sdl_1.SDL_HideWindow(this._windowPtr);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "id", {
        get: function () {
            return sdl_1.SDL_GetWindowID(this._windowPtr);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "windowPtr", {
        get: function () {
            return this._windowPtr;
        },
        set: function (value) {
            this._windowPtr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "hasMouseEnteredWindow", {
        get: function () {
            return this._hasMouseEnteredWindow;
        },
        set: function (value) {
            this._hasMouseEnteredWindow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "lastMouseEvent", {
        get: function () {
            return this._lastMouseEvent;
        },
        set: function (value) {
            this._lastMouseEvent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "lastKeyboardEvent", {
        get: function () {
            return this._lastKeyboardEvent;
        },
        set: function (value) {
            this._lastKeyboardEvent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "internalCanvas", {
        get: function () {
            return this._internalCanvas;
        },
        set: function (value) {
            this._internalCanvas = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "Blob", {
        get: function () {
            return this._Blob;
        },
        set: function (value) {
            this._Blob = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onblur", {
        get: function () {
            return this._onblur;
        },
        set: function (value) {
            this._onblur = value;
            this.addEventListener('blur', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onclick", {
        get: function () {
            return this._onclick;
        },
        set: function (value) {
            this._onclick = value;
            this.addEventListener('click', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onclose", {
        get: function () {
            return this._onclose;
        },
        set: function (value) {
            this.addEventListener('close', value, false);
            this._onclose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "ondblclick", {
        get: function () {
            return this._ondblclick;
        },
        set: function (value) {
            this._ondblclick = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onfocus", {
        get: function () {
            return this._onfocus;
        },
        set: function (value) {
            this._onfocus = value;
            this.addEventListener('focus', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onkeydown", {
        get: function () {
            return this._onkeydown;
        },
        set: function (value) {
            this._onkeydown = value;
            this.addEventListener('keydown', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onkeypress", {
        get: function () {
            return this._onkeypress;
        },
        set: function (value) {
            this._onkeypress = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onkeyup", {
        get: function () {
            return this._onkeyup;
        },
        set: function (value) {
            this._onkeyup = value;
            this.addEventListener('keyup', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmousedown", {
        get: function () {
            return this._onmousedown;
        },
        set: function (value) {
            this._onmousedown = value;
            this.addEventListener('mousedown', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmouseenter", {
        get: function () {
            return this._onmouseenter;
        },
        set: function (value) {
            this._onmouseenter = value;
            this.addEventListener('mouseenter', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmouseleave", {
        get: function () {
            return this._onmouseleave;
        },
        set: function (value) {
            this._onmouseleave = value;
            this.addEventListener('mouseleave', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmousemove", {
        get: function () {
            return this._onmousemove;
        },
        set: function (value) {
            this._onmousemove = value;
            this.addEventListener('mousemove', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmouseout", {
        get: function () {
            return this._onmouseout;
        },
        set: function (value) {
            this._onmouseout = value;
            this.addEventListener('mouseout', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmouseover", {
        get: function () {
            return this._onmouseover;
        },
        set: function (value) {
            this._onmouseover = value;
            this.addEventListener('mouseover', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmouseup", {
        get: function () {
            return this._onmouseup;
        },
        set: function (value) {
            this.addEventListener('mouseup', value, false);
            this._onmouseup = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onmousewheel", {
        get: function () {
            return this._onmousewheel;
        },
        set: function (value) {
            this.addEventListener('mousewheel', value, false);
            this._onmousewheel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onresize", {
        get: function () {
            return this._onresize;
        },
        set: function (value) {
            this._onresize = value;
            this.addEventListener('resize', value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "onwheel", {
        get: function () {
            return this._onwheel;
        },
        set: function (ivalue) {
            this._onwheel = ivalue;
            this.addEventListener('wheel', ivalue, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        set: function (value) {
            this._canvas = value;
        },
        enumerable: true,
        configurable: true
    });
    SdlWindow.prototype.createImage = function (src) {
        return this.loadImage(src);
    };
    SdlWindow.prototype.loadImage = function (src) {
        if (src) {
            return loadImage(src);
        }
        else {
            return Promise.resolve(new NodeCanvasImage());
        }
    };
    SdlWindow.prototype.newCanvas = function (window, windowOptions) {
        if (windowOptions && window === undefined) {
            var opts = SdlWindow.windowDefaults();
            var wind = new SdlWindow(opts);
            return new sdl_canvas_1.SdlCanvas(wind);
        }
        else if (typeof window === 'string') {
            var opts = windowOptions || SdlWindow.windowDefaults();
            opts.title = window;
            var wind = new SdlWindow(opts);
            return new sdl_canvas_1.SdlCanvas(wind);
        }
        else {
            return new sdl_canvas_1.SdlCanvas(window);
        }
    };
    SdlWindow.prototype.createCanvas = function () {
        var size = this._size;
        this._internalCanvas = createInternalCanvas(size.w, size.h, 'image');
        this.initCanvasColors();
        this.initCanvasSize(size);
    };
    SdlWindow.prototype.initCanvasSize = function (size) {
            this.configureCanvasSize(size.w, size.h);
    };
    Object.defineProperty(SdlWindow.prototype, "closed", {
        get: function () {
            return this._closed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "devicePixelRatio", {
        get: function () {
            return this._devicePixelRatio;
        },
        set: function (value) {
            this._devicePixelRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "event", {
        get: function () {
            return this._event;
        },
        set: function (value) {
            this._event = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "outerHeight", {
        get: function () {
            return this._outerHeight;
        },
        set: function (value) {
            this._outerHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "outerWidth", {
        get: function () {
            return this._outerWidth;
        },
        set: function (value) {
            this._outerWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SdlWindow.prototype, "window", {
        get: function () {
            return this;
        },
        set: function (value) {
            this._window = value;
        },
        enumerable: true,
        configurable: true
    });
    SdlWindow.windowDefaults = function () {
        return sdl_window_opts_1.sdlWindowDefaults();
    };
    SdlWindow.alert = function (message) {
        messagebox_1.alert(message, null);
    };
    SdlWindow.confirm = function (message) {
        return messagebox_1.confirm(message, null);
    };
    return SdlWindow;
}(events_1.EventEmitter));
exports.SdlWindow = SdlWindow;
//# sourceMappingURL=sdl-window.js.map