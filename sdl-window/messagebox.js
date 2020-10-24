"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdl_1 = require("../sdl");
function confirm(message, windowPtr) {
    if (windowPtr === void 0) { windowPtr = null; }
    var buttons = [
        {
            type: 'cancel',
            text: 'Cancel'
        },
        {
            type: 'yes',
            text: 'OK'
        }
    ];
    var numberOfButtons = buttons.length;
    var buttonData = sdl_1.SDL_Create_MessageBoxButtonData(buttons);
    var buttonIndex = sdl_1.SDL_ShowMessageBox('info', '', message, buttonData, numberOfButtons, windowPtr);
    return buttonIndex === 1;
}
exports.confirm = confirm;
function alert(message, windowPtr) {
    if (windowPtr === void 0) { windowPtr = null; }
    var buttons = [{
            type: 'yes',
            text: 'OK'
        }];
    var numberOfButtons = buttons.length;
    var buttonData = sdl_1.SDL_Create_MessageBoxButtonData(buttons);
    sdl_1.SDL_ShowMessageBox('info', '', message, buttonData, numberOfButtons, windowPtr);
}
exports.alert = alert;
//# sourceMappingURL=messagebox.js.map