"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_loader_1 = require("./lib-loader");
var types_1 = require("./types");
var ref = require('ref-napi');
var Struct = require('ref-struct-di')(ref);
var Union = require('ref-union-di')(ref);
var SDL = {};
exports.Mem_SDL_Rwops = Struct({
    base: types_1.Uint8_ptr,
    here: types_1.Uint8_ptr,
    stop: types_1.Uint8_ptr,
});
exports.Unknown_SDL_Rwops = Struct({
    data1: types_1.voit_ptr,
    data2: types_1.voit_ptr,
});
exports.SDL_RWops_U_SDL_rwops_h_3164 = Union({
    mem: exports.Mem_SDL_Rwops,
    unknown: exports.Unknown_SDL_Rwops
});
exports.SDL_RWops = Struct({
    size: types_1.voit_ptr,
    seek: types_1.voit_ptr,
    read: types_1.voit_ptr,
    write: types_1.voit_ptr,
    close: types_1.voit_ptr,
    type: types_1.Uint32,
    hidden: exports.SDL_RWops_U_SDL_rwops_h_3164,
});
exports.SDL_RWops_ptr = ref.refType(exports.SDL_RWops);
lib_loader_1.loadLibrary({
    SDL_RWFromFile: [exports.SDL_RWops_ptr, [types_1.string, types_1.string]],
    SDL_RWFromFP: [exports.SDL_RWops_ptr, [types_1.voit_ptr, types_1.uint32]],
    SDL_RWFromMem: [exports.SDL_RWops_ptr, [types_1.voit_ptr, types_1.int32]],
    SDL_RWFromConstMem: [exports.SDL_RWops_ptr, [types_1.voit_ptr, types_1.int32]],
    SDL_AllocRW: [exports.SDL_RWops_ptr, []],
    SDL_FreeRW: [types_1.voit, [exports.SDL_RWops_ptr]],
    SDL_ReadU8: [types_1.Uint8, [exports.SDL_RWops_ptr]],
    SDL_ReadLE16: [types_1.Uint16, [exports.SDL_RWops_ptr]],
    SDL_ReadBE16: [types_1.Uint16, [exports.SDL_RWops_ptr]],
    SDL_ReadLE32: [types_1.Uint32, [exports.SDL_RWops_ptr]],
    SDL_ReadBE32: [types_1.Uint32, [exports.SDL_RWops_ptr]],
    SDL_ReadLE64: [types_1.Uint64, [exports.SDL_RWops_ptr]],
    SDL_ReadBE64: [types_1.Uint64, [exports.SDL_RWops_ptr]],
    SDL_WriteU8: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint8]],
    SDL_WriteLE16: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint16]],
    SDL_WriteBE16: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint16]],
    SDL_WriteLE32: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint32]],
    SDL_WriteBE32: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint32]],
    SDL_WriteLE64: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint64]],
    SDL_WriteBE64: [types_1.size_t, [exports.SDL_RWops_ptr, types_1.Uint64]],
}, SDL);
//# sourceMappingURL=sdl-rwops.js.map