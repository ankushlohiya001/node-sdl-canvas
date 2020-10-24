"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_loader_1 = require("./lib-loader");
var types_1 = require("./types");
var sdl_gesture_1 = require("./sdl-gesture");
var sdl_touch_1 = require("./sdl-touch");
var sdl_joystick_1 = require("./sdl-joystick");
var sdl_keyboard_1 = require("./sdl-keyboard");
var FFI = require('ffi-napi');
var ref = require('ref-napi');
var ArrayType = require('ref-array-di')(ref);
var Struct = require('ref-struct-di')(ref);
var Union = require('ref-union-di')(ref);
var SDL = {};
var SDL_EventType;
(function (SDL_EventType) {
    SDL_EventType[SDL_EventType["SDL_FIRSTEVENT"] = 0] = "SDL_FIRSTEVENT";
    SDL_EventType[SDL_EventType["SDL_QUIT"] = 256] = "SDL_QUIT";
    SDL_EventType[SDL_EventType["SDL_APP_TERMINATING"] = 257] = "SDL_APP_TERMINATING";
    SDL_EventType[SDL_EventType["SDL_APP_LOWMEMORY"] = 258] = "SDL_APP_LOWMEMORY";
    SDL_EventType[SDL_EventType["SDL_APP_WILLENTERBACKGROUND"] = 259] = "SDL_APP_WILLENTERBACKGROUND";
    SDL_EventType[SDL_EventType["SDL_APP_DIDENTERBACKGROUND"] = 260] = "SDL_APP_DIDENTERBACKGROUND";
    SDL_EventType[SDL_EventType["SDL_APP_WILLENTERFOREGROUND"] = 261] = "SDL_APP_WILLENTERFOREGROUND";
    SDL_EventType[SDL_EventType["SDL_APP_DIDENTERFOREGROUND"] = 262] = "SDL_APP_DIDENTERFOREGROUND";
    SDL_EventType[SDL_EventType["SDL_WINDOWEVENT"] = 512] = "SDL_WINDOWEVENT";
    SDL_EventType[SDL_EventType["SDL_SYSWMEVENT"] = 513] = "SDL_SYSWMEVENT";
    SDL_EventType[SDL_EventType["SDL_KEYDOWN"] = 768] = "SDL_KEYDOWN";
    SDL_EventType[SDL_EventType["SDL_KEYUP"] = 769] = "SDL_KEYUP";
    SDL_EventType[SDL_EventType["SDL_TEXTEDITING"] = 770] = "SDL_TEXTEDITING";
    SDL_EventType[SDL_EventType["SDL_TEXTINPUT"] = 771] = "SDL_TEXTINPUT";
    SDL_EventType[SDL_EventType["SDL_KEYMAPCHANGED"] = 772] = "SDL_KEYMAPCHANGED";
    SDL_EventType[SDL_EventType["SDL_MOUSEMOTION"] = 1024] = "SDL_MOUSEMOTION";
    SDL_EventType[SDL_EventType["SDL_MOUSEBUTTONDOWN"] = 1025] = "SDL_MOUSEBUTTONDOWN";
    SDL_EventType[SDL_EventType["SDL_MOUSEBUTTONUP"] = 1026] = "SDL_MOUSEBUTTONUP";
    SDL_EventType[SDL_EventType["SDL_MOUSEWHEEL"] = 1027] = "SDL_MOUSEWHEEL";
    SDL_EventType[SDL_EventType["SDL_JOYAXISMOTION"] = 1536] = "SDL_JOYAXISMOTION";
    SDL_EventType[SDL_EventType["SDL_JOYBALLMOTION"] = 1537] = "SDL_JOYBALLMOTION";
    SDL_EventType[SDL_EventType["SDL_JOYHATMOTION"] = 1538] = "SDL_JOYHATMOTION";
    SDL_EventType[SDL_EventType["SDL_JOYBUTTONDOWN"] = 1539] = "SDL_JOYBUTTONDOWN";
    SDL_EventType[SDL_EventType["SDL_JOYBUTTONUP"] = 1540] = "SDL_JOYBUTTONUP";
    SDL_EventType[SDL_EventType["SDL_JOYDEVICEADDED"] = 1541] = "SDL_JOYDEVICEADDED";
    SDL_EventType[SDL_EventType["SDL_JOYDEVICEREMOVED"] = 1542] = "SDL_JOYDEVICEREMOVED";
    SDL_EventType[SDL_EventType["SDL_CONTROLLERAXISMOTION"] = 1616] = "SDL_CONTROLLERAXISMOTION";
    SDL_EventType[SDL_EventType["SDL_CONTROLLERBUTTONDOWN"] = 1617] = "SDL_CONTROLLERBUTTONDOWN";
    SDL_EventType[SDL_EventType["SDL_CONTROLLERBUTTONUP"] = 1618] = "SDL_CONTROLLERBUTTONUP";
    SDL_EventType[SDL_EventType["SDL_CONTROLLERDEVICEADDED"] = 1619] = "SDL_CONTROLLERDEVICEADDED";
    SDL_EventType[SDL_EventType["SDL_CONTROLLERDEVICEREMOVED"] = 1620] = "SDL_CONTROLLERDEVICEREMOVED";
    SDL_EventType[SDL_EventType["SDL_CONTROLLERDEVICEREMAPPED"] = 1621] = "SDL_CONTROLLERDEVICEREMAPPED";
    SDL_EventType[SDL_EventType["SDL_FINGERDOWN"] = 1792] = "SDL_FINGERDOWN";
    SDL_EventType[SDL_EventType["SDL_FINGERUP"] = 1793] = "SDL_FINGERUP";
    SDL_EventType[SDL_EventType["SDL_FINGERMOTION"] = 1794] = "SDL_FINGERMOTION";
    SDL_EventType[SDL_EventType["SDL_DOLLARGESTURE"] = 2048] = "SDL_DOLLARGESTURE";
    SDL_EventType[SDL_EventType["SDL_DOLLARRECORD"] = 2049] = "SDL_DOLLARRECORD";
    SDL_EventType[SDL_EventType["SDL_MULTIGESTURE"] = 2050] = "SDL_MULTIGESTURE";
    SDL_EventType[SDL_EventType["SDL_CLIPBOARDUPDATE"] = 2304] = "SDL_CLIPBOARDUPDATE";
    SDL_EventType[SDL_EventType["SDL_DROPFILE"] = 4096] = "SDL_DROPFILE";
    SDL_EventType[SDL_EventType["SDL_DROPTEXT"] = 4097] = "SDL_DROPTEXT";
    SDL_EventType[SDL_EventType["SDL_DROPBEGIN"] = 4098] = "SDL_DROPBEGIN";
    SDL_EventType[SDL_EventType["SDL_DROPCOMPLETE"] = 4099] = "SDL_DROPCOMPLETE";
    SDL_EventType[SDL_EventType["SDL_AUDIODEVICEADDED"] = 4352] = "SDL_AUDIODEVICEADDED";
    SDL_EventType[SDL_EventType["SDL_AUDIODEVICEREMOVED"] = 4353] = "SDL_AUDIODEVICEREMOVED";
    SDL_EventType[SDL_EventType["SDL_RENDER_TARGETS_RESET"] = 8192] = "SDL_RENDER_TARGETS_RESET";
    SDL_EventType[SDL_EventType["SDL_RENDER_DEVICE_RESET"] = 8193] = "SDL_RENDER_DEVICE_RESET";
    SDL_EventType[SDL_EventType["SDL_USEREVENT"] = 32768] = "SDL_USEREVENT";
    SDL_EventType[SDL_EventType["SDL_LASTEVENT"] = 65535] = "SDL_LASTEVENT";
})(SDL_EventType = exports.SDL_EventType || (exports.SDL_EventType = {}));
function createSDLEvent() {
    return ref.alloc(exports.SDL_Event);
}
exports.createSDLEvent = createSDLEvent;
function pollForEventsForever() {
    function forever() {
        SDL.SDL_PollEvent(null);
        // setTimeout(forever, 10);
    }
    setInterval(forever, 10);
}
exports.pollForEventsForever = pollForEventsForever;
function SDL_PumpEvents() {
    return SDL.SDL_PumpEvents();
}
exports.SDL_PumpEvents = SDL_PumpEvents;
function SDL_PollEvent(sdlEvent) {
    return SDL.SDL_PollEvent(sdlEvent);
}
exports.SDL_PollEvent = SDL_PollEvent;
function createEventFilterFunction(filter) {
    return exports.SDL_EventFilter.toPointer(filter);
}
exports.createEventFilterFunction = createEventFilterFunction;
// SDL_events.SDL_AddEventWatch(globals.filter, null);
function SDL_AddEventWatch(filterFunctionPtr, dataPtr) {
    SDL.SDL_AddEventWatch(filterFunctionPtr, dataPtr);
}
exports.SDL_AddEventWatch = SDL_AddEventWatch;
function SDL_EventState(flag, value) {
    return SDL.SDL_EventState(flag, value);
}
exports.SDL_EventState = SDL_EventState;
var SDL_eventaction;
(function (SDL_eventaction) {
    SDL_eventaction[SDL_eventaction["SDL_ADDEVEN"] = 0] = "SDL_ADDEVEN";
    SDL_eventaction[SDL_eventaction["SDL_PEEKEVENT"] = 1] = "SDL_PEEKEVENT";
    SDL_eventaction[SDL_eventaction["SDL_GETEVENT"] = 2] = "SDL_GETEVENT";
})(SDL_eventaction = exports.SDL_eventaction || (exports.SDL_eventaction = {}));
exports.SDL_CommonEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32
});
exports.SDL_WindowEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    event: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8,
    padding3: types_1.Uint8,
    data1: types_1.Sint32,
    data2: types_1.Sint32
});
exports.SDL_KeyboardEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    state: types_1.Uint8,
    repeat: types_1.Uint8,
    padding2: types_1.Uint8,
    padding3: types_1.Uint8,
    keysym: sdl_keyboard_1.SDL_Keysym
});
exports.SDL_TextEditingEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    text: ArrayType(types_1.char, 32),
    start: types_1.Sint32,
    length: types_1.Sint32
});
exports.SDL_TextInputEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    text: ArrayType(types_1.char, 32)
});
exports.SDL_MouseMotionEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    which: types_1.Uint32,
    state: types_1.Uint32,
    x: types_1.Sint32,
    y: types_1.Sint32,
    xrel: types_1.Sint32,
    yrel: types_1.Sint32
});
exports.SDL_MouseButtonEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    which: types_1.Uint32,
    button: types_1.Uint8,
    state: types_1.Uint8,
    clicks: types_1.Uint8,
    padding1: types_1.Uint8,
    x: types_1.Sint32,
    y: types_1.Sint32
});
exports.SDL_MouseWheelEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    which: types_1.Uint32,
    x: types_1.Sint32,
    y: types_1.Sint32,
    direction: types_1.Uint32
});
exports.SDL_JoyAxisEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: sdl_joystick_1.SDL_JoystickID,
    axis: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8,
    padding3: types_1.Uint8,
    value: types_1.Sint16,
    padding4: types_1.Uint16
});
exports.SDL_JoyBallEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: sdl_joystick_1.SDL_JoystickID,
    ball: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8,
    padding3: types_1.Uint8,
    xrel: types_1.Sint16,
    yrel: types_1.Sint16
});
exports.SDL_JoyHatEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: sdl_joystick_1.SDL_JoystickID,
    hat: types_1.Uint8,
    value: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8
});
exports.SDL_JoyButtonEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: sdl_joystick_1.SDL_JoystickID,
    button: types_1.Uint8,
    state: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8
});
exports.SDL_JoyDeviceEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: types_1.Sint32
});
exports.SDL_ControllerAxisEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: sdl_joystick_1.SDL_JoystickID,
    axis: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8,
    padding3: types_1.Uint8,
    value: types_1.Sint16,
    padding4: types_1.Uint16
});
exports.SDL_ControllerButtonEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: sdl_joystick_1.SDL_JoystickID,
    button: types_1.Uint8,
    state: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8,
});
exports.SDL_ControllerDeviceEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: types_1.Sint32,
});
exports.SDL_AudioDeviceEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    which: types_1.Uint32,
    iscapture: types_1.Uint8,
    padding1: types_1.Uint8,
    padding2: types_1.Uint8,
    padding3: types_1.Uint8,
});
exports.SDL_TouchFingerEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    touchId: sdl_touch_1.SDL_TouchID,
    fingerId: sdl_touch_1.SDL_FingerID,
    x: types_1.float,
    y: types_1.float,
    dx: types_1.float,
    dy: types_1.float,
    pressure: types_1.float,
});
exports.SDL_MultiGestureEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    touchId: sdl_touch_1.SDL_TouchID,
    dTheta: types_1.float,
    dDist: types_1.float,
    x: types_1.float,
    y: types_1.float,
    numFingers: types_1.Uint16,
    padding: types_1.Uint16,
});
exports.SDL_DollarGestureEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    touchId: sdl_touch_1.SDL_TouchID,
    gestureId: sdl_gesture_1.SDL_GestureID,
    numFingers: types_1.Uint32,
    error: types_1.float,
    x: types_1.float,
    y: types_1.float,
});
exports.SDL_DropEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    file: types_1.string,
});
exports.SDL_QuitEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
});
exports.SDL_OSEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
});
exports.SDL_UserEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    windowID: types_1.Uint32,
    code: types_1.Sint32,
    data1: types_1.voit_ptr,
    data2: types_1.voit_ptr
});
exports.SDL_SysWMmsg = types_1.voit;
exports.SDL_SysWMmsg_ptr = ref.refType(exports.SDL_SysWMmsg);
exports.SDL_SysWMEvent = Struct({
    type: types_1.Uint32,
    timestamp: types_1.Uint32,
    msg: exports.SDL_SysWMmsg_ptr,
});
exports.c__U_SDL_Event_FI_padding_arr = ArrayType(types_1.Uint8, 56);
exports.SDL_Event = Union({
    type: types_1.Uint32,
    common: exports.SDL_CommonEvent,
    window: exports.SDL_WindowEvent,
    key: exports.SDL_KeyboardEvent,
    edit: exports.SDL_TextEditingEvent,
    text: exports.SDL_TextInputEvent,
    motion: exports.SDL_MouseMotionEvent,
    button: exports.SDL_MouseButtonEvent,
    wheel: exports.SDL_MouseWheelEvent,
    jaxis: exports.SDL_JoyAxisEvent,
    jball: exports.SDL_JoyBallEvent,
    jhat: exports.SDL_JoyHatEvent,
    jbutton: exports.SDL_JoyButtonEvent,
    jdevice: exports.SDL_JoyDeviceEvent,
    caxis: exports.SDL_ControllerAxisEvent,
    cbutton: exports.SDL_ControllerButtonEvent,
    cdevice: exports.SDL_ControllerDeviceEvent,
    adevice: exports.SDL_AudioDeviceEvent,
    quit: exports.SDL_QuitEvent,
    user: exports.SDL_UserEvent,
    syswm: exports.SDL_SysWMEvent,
    tfinger: exports.SDL_TouchFingerEvent,
    mgesture: exports.SDL_MultiGestureEvent,
    dgesture: exports.SDL_DollarGestureEvent,
    drop: exports.SDL_DropEvent,
    padding: exports.c__U_SDL_Event_FI_padding_arr,
});
exports.SDL_Event_ptr = ref.refType(exports.SDL_Event);
exports.SDL_EventFilter = FFI.Function(types_1.int32, [types_1.voit_ptr, exports.SDL_Event_ptr]);
exports.SDL_EventFilter_ptr = ref.refType(exports.SDL_EventFilter);
lib_loader_1.loadLibrary({
    SDL_PumpEvents: [types_1.voit, []],
    SDL_PeepEvents: [types_1.int32, [exports.SDL_Event_ptr, types_1.int32, types_1.uint32, types_1.Uint32, types_1.Uint32]],
    SDL_HasEvent: [types_1.uint32, [types_1.Uint32]],
    SDL_HasEvents: [types_1.uint32, [types_1.Uint32, types_1.Uint32]],
    SDL_FlushEvent: [types_1.voit, [types_1.Uint32]],
    SDL_FlushEvents: [types_1.voit, [types_1.Uint32, types_1.Uint32]],
    SDL_PollEvent: [types_1.int32, [exports.SDL_Event_ptr]],
    SDL_WaitEvent: [types_1.int32, [exports.SDL_Event_ptr]],
    SDL_WaitEventTimeout: [types_1.int32, [exports.SDL_Event_ptr, types_1.int32]],
    SDL_PushEvent: [types_1.int32, [exports.SDL_Event_ptr]],
    SDL_SetEventFilter: [types_1.voit, [exports.SDL_EventFilter, types_1.voit_ptr]],
    SDL_GetEventFilter: [types_1.uint32, [exports.SDL_EventFilter_ptr, types_1.voit_ptr_ptr]],
    SDL_AddEventWatch: [types_1.voit, [exports.SDL_EventFilter, types_1.voit_ptr]],
    SDL_DelEventWatch: [types_1.voit, [exports.SDL_EventFilter, types_1.voit_ptr]],
    SDL_FilterEvents: [types_1.voit, [exports.SDL_EventFilter, types_1.voit_ptr]],
    SDL_EventState: [types_1.Uint8, [types_1.Uint32, types_1.int32]],
    SDL_RegisterEvents: [types_1.Uint32, [types_1.int32]],
}, SDL);
//# sourceMappingURL=sdl-events.js.map