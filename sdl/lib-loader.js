"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ffi = require('ffi-napi');
var SDL_LIBS_PATH = __dirname;
function loadLibrary(module, moduleExports) {
    var moduleLibrary = getLibraryPath();
    ffi.Library(moduleLibrary, module, moduleExports);
}
exports.loadLibrary = loadLibrary;
function getLibraryPath() {
    switch (process.platform) {
        case 'darwin':
            return getOSXLibraryPath();
        case 'win32':
            return getWindowsLibraryPath();
        case 'linux':
            return getLinuxLibraryPath();
        default:
            throw new ReferenceError("Unsupported pattform: " + process.platform);
    }
}
function getWindowsLibraryPath() {
    var dir = SDL_LIBS_PATH;
    var arch = process.arch;
    var libName = 'SDL2';
    return dir + "/libs/windows/" + arch + "/" + libName + ".dll";
}
function getOSXLibraryPath() {
    var dir = SDL_LIBS_PATH;
    var arch = process.arch;
    var libName = 'libSDL2';
    var version = '2.0';
    return dir + "/libs/osx/" + arch + "/" + libName + "-" + version + ".dylib";
}
function getLinuxLibraryPath() {
    var dir = SDL_LIBS_PATH;
    var arch = process.arch;
    var libName = 'libSDL2';
    return dir + "/libs/linux/" + arch + "/" + libName + ".so";
}
//# sourceMappingURL=lib-loader.js.map
