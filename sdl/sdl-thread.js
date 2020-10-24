"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var lib_loader_1 = require("./lib-loader");
var FFI = require('ffi-napi');
var ref = require('ref-napi');
var ArrayType = require('ref-array-di')(ref);
var Struct = require('ref-struct-di')(ref);
var Union = require('ref-union-di')(ref);
var SDL = {};
var SDL_threadID = types_1.ulong;
var SDL_TLSID = types_1.uint32;
var SDL_ThreadFunction = FFI.Function(types_1.int32, [types_1.voit_ptr]);
function SDL_DetachThread(threadPtr) {
    return SDL.SDL_DetachThread(threadPtr);
}
exports.SDL_DetachThread = SDL_DetachThread;
function SDL_WaitThread(threadPtr) {
    return SDL.SDL_WaitThread(threadPtr, null);
}
exports.SDL_WaitThread = SDL_WaitThread;
function SDL_CreateThread(threadFunction, threadName, data) {
    return SDL.SDL_CreateThread(threadFunction, threadName, data);
}
exports.SDL_CreateThread = SDL_CreateThread;
function createThreadFunction(func) {
    return SDL_ThreadFunction.toPointer(func);
}
exports.createThreadFunction = createThreadFunction;
lib_loader_1.loadLibrary({
    SDL_CreateThread: [types_1.voit_ptr, [SDL_ThreadFunction, types_1.string, types_1.voit_ptr]],
    SDL_GetThreadName: [types_1.string, [types_1.voit_ptr]],
    SDL_ThreadID: [SDL_threadID, []],
    SDL_GetThreadID: [SDL_threadID, [types_1.voit_ptr]],
    SDL_SetThreadPriority: [types_1.int32, [types_1.uint32]],
    SDL_WaitThread: [types_1.voit, [types_1.voit_ptr, types_1.int32_ptr]],
    SDL_DetachThread: [types_1.voit, [types_1.voit_ptr]],
    SDL_TLSCreate: [SDL_TLSID, []],
    SDL_TLSGet: [types_1.voit_ptr, [SDL_TLSID]],
    SDL_TLSSet: [types_1.int32, [SDL_TLSID, types_1.voit_ptr, types_1.voit_ptr]],
}, SDL);
//# sourceMappingURL=sdl-thread.js.map