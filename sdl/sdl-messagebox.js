"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_loader_1 = require("./lib-loader");
var types_1 = require("./types");
var sdl_video_1 = require("./sdl-video");
var ref = require('ref-napi');
var ArrayType = require('ref-array-di')(ref);
var Struct = require('ref-struct-di')(ref);
var SDL = {};
function SDL_Create_MessageBoxButtonData(buttons) {
    var num = buttons.length;
    var size = exports.SDL_MessageBoxButtonData.size;
    var buttonData = Buffer.alloc(num * size);
    buttonData.type = exports.SDL_MessageBoxButtonData;
    buttons.forEach(function (button, index) {
        var type = button.type;
        var flags = 0;
        if (type === 'yes') {
            flags = SDL_MessageBoxButtonFlags.SDL_MESSAGEBOX_BUTTON_RETURNKEY_DEFAULT;
        }
        else if (type = 'cancel') {
            flags = SDL_MessageBoxButtonFlags.SDL_MESSAGEBOX_BUTTON_ESCAPEKEY_DEFAULT;
        }
        ref.set(buttonData, index * size, new exports.SDL_MessageBoxButtonData({
            flags: flags,
            buttonid: index,
            text: (button.text || '')
        }));
    });
    return buttonData;
}
exports.SDL_Create_MessageBoxButtonData = SDL_Create_MessageBoxButtonData;
function Create_SDL_MessageBoxData(title, message, flags, buttons, numbuttons, windowPtr) {
    if (windowPtr === void 0) { windowPtr = null; }
    var messageBoxData = new exports.SDL_MessageBoxData({
        flags: flags,
        window: windowPtr,
        title: title,
        message: message,
        numbuttons: numbuttons,
        buttons: buttons,
        colorScheme: null
    });
    return messageBoxData.ref();
}
function SDL_ShowMessageBox(type, title, message, buttons, numberOfButtons, windowPtr) {
    if (windowPtr === void 0) { windowPtr = null; }
    var messageFlags;
    var id = ref.alloc('int');
    if (type === 'error') {
        messageFlags = SDL_MessageBoxFlags.SDL_MESSAGEBOX_ERROR;
    }
    else if (type === 'warning') {
        messageFlags = SDL_MessageBoxFlags.SDL_MESSAGEBOX_WARNING;
    }
    else {
        messageFlags = SDL_MessageBoxFlags.SDL_MESSAGEBOX_INFORMATION;
    }
    var messageBoxDataPtr = Create_SDL_MessageBoxData(title, message, messageFlags, buttons, numberOfButtons, windowPtr);
    SDL.SDL_ShowMessageBox(messageBoxDataPtr, id);
    id = id.deref();
    return id;
}
exports.SDL_ShowMessageBox = SDL_ShowMessageBox;
var SDL_MessageBoxFlags;
(function (SDL_MessageBoxFlags) {
    SDL_MessageBoxFlags[SDL_MessageBoxFlags["SDL_MESSAGEBOX_ERROR"] = 16] = "SDL_MESSAGEBOX_ERROR";
    SDL_MessageBoxFlags[SDL_MessageBoxFlags["SDL_MESSAGEBOX_WARNING"] = 32] = "SDL_MESSAGEBOX_WARNING";
    SDL_MessageBoxFlags[SDL_MessageBoxFlags["SDL_MESSAGEBOX_INFORMATION"] = 64] = "SDL_MESSAGEBOX_INFORMATION";
})(SDL_MessageBoxFlags = exports.SDL_MessageBoxFlags || (exports.SDL_MessageBoxFlags = {}));
var SDL_MessageBoxButtonFlags;
(function (SDL_MessageBoxButtonFlags) {
    SDL_MessageBoxButtonFlags[SDL_MessageBoxButtonFlags["SDL_MESSAGEBOX_BUTTON_RETURNKEY_DEFAULT"] = 1] = "SDL_MESSAGEBOX_BUTTON_RETURNKEY_DEFAULT";
    SDL_MessageBoxButtonFlags[SDL_MessageBoxButtonFlags["SDL_MESSAGEBOX_BUTTON_ESCAPEKEY_DEFAULT"] = 2] = "SDL_MESSAGEBOX_BUTTON_ESCAPEKEY_DEFAULT";
})(SDL_MessageBoxButtonFlags = exports.SDL_MessageBoxButtonFlags || (exports.SDL_MessageBoxButtonFlags = {}));
var SDL_MessageBoxColorType;
(function (SDL_MessageBoxColorType) {
    SDL_MessageBoxColorType[SDL_MessageBoxColorType["SDL_MESSAGEBOX_COLOR_BACKGROUND"] = 0] = "SDL_MESSAGEBOX_COLOR_BACKGROUND";
    SDL_MessageBoxColorType[SDL_MessageBoxColorType["SDL_MESSAGEBOX_COLOR_TEXT"] = 1] = "SDL_MESSAGEBOX_COLOR_TEXT";
    SDL_MessageBoxColorType[SDL_MessageBoxColorType["SDL_MESSAGEBOX_COLOR_BUTTON_BORDER"] = 2] = "SDL_MESSAGEBOX_COLOR_BUTTON_BORDER";
    SDL_MessageBoxColorType[SDL_MessageBoxColorType["SDL_MESSAGEBOX_COLOR_BUTTON_BACKGROUND"] = 3] = "SDL_MESSAGEBOX_COLOR_BUTTON_BACKGROUND";
    SDL_MessageBoxColorType[SDL_MessageBoxColorType["SDL_MESSAGEBOX_COLOR_BUTTON_SELECTED"] = 4] = "SDL_MESSAGEBOX_COLOR_BUTTON_SELECTED";
    SDL_MessageBoxColorType[SDL_MessageBoxColorType["SDL_MESSAGEBOX_COLOR_MAX"] = 5] = "SDL_MESSAGEBOX_COLOR_MAX";
})(SDL_MessageBoxColorType = exports.SDL_MessageBoxColorType || (exports.SDL_MessageBoxColorType = {}));
exports.c__SA_SDL_MessageBoxButtonData = Struct({
    flags: types_1.Uint32,
    buttonid: types_1.int32,
    text: types_1.string,
});
exports.SDL_MessageBoxButtonData = exports.c__SA_SDL_MessageBoxButtonData;
exports.SDL_MessageBoxColor = Struct({
    r: types_1.Uint8,
    g: types_1.Uint8,
    b: types_1.Uint8,
});
exports.SDL_MessageBoxColorScheme_FI_colors_arr = ArrayType(exports.SDL_MessageBoxColor, 5);
exports.SDL_MessageBoxColorScheme = exports.c__SA_SDL_MessageBoxColorScheme = Struct({
    colors: exports.SDL_MessageBoxColorScheme_FI_colors_arr,
});
exports.SDL_MessageBoxButtonData_ptr = ref.refType(exports.SDL_MessageBoxButtonData);
exports.SDL_MessageBoxColorScheme_ptr = ref.refType(exports.SDL_MessageBoxColorScheme);
exports.c__SA_SDL_MessageBoxData = Struct({
    flags: types_1.Uint32,
    window: sdl_video_1.SDL_Window_ptr,
    title: types_1.string,
    message: types_1.string,
    numbuttons: types_1.int32,
    buttons: exports.SDL_MessageBoxButtonData_ptr,
    colorScheme: exports.SDL_MessageBoxColorScheme_ptr,
});
exports.SDL_MessageBoxData = exports.SDL_MessageBoxData = exports.c__SA_SDL_MessageBoxData;
exports.SDL_MessageBoxData_ptr = exports.SDL_MessageBoxData_ptr = ref.refType(exports.SDL_MessageBoxData);
lib_loader_1.loadLibrary({
    SDL_ShowMessageBox: [types_1.int32, [exports.SDL_MessageBoxData_ptr, types_1.int32_ptr]],
    SDL_ShowSimpleMessageBox: [types_1.int32, [types_1.Uint32, types_1.string, types_1.string, sdl_video_1.SDL_Window_ptr]],
}, SDL);
//# sourceMappingURL=sdl-messagebox.js.map