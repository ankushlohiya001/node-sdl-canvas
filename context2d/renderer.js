const sdl = require("./../sdl");
const Texture = require("./texture");

class SDLRenderer {
  constructor(rendererPtr) {
    this.rendererPtr = rendererPtr;
    this._size = [0, 0];
  }

  get size() {
    return this._size;
  }

  set size(size) {
    this._size = [size[0], size[1]];
    sdl.SDL_RenderSetLogicalSize(this.rendererPtr, size[0], size[1]);
  }

  get target() {
    return sdl.SDL_GetRenderTarget(this.rendererPtr);
  }

  set target(texturePtr) {
    sdl.SDL_SetRenderTarget(this.rendererPtr, texturePtr);
  }

  destroy() {
    sdl.SDL_DestroyRenderer(this.rendererPtr);
  }

  clear() {
    sdl.SDL_SetRenderDrawColor(this.rendererPtr, 0, 0, 0, 255);
    sdl.SDL_RenderClear(this.rendererPtr);
  }

  copy(texture, srcRect, destRect) {
    sdl.SDL_RenderCopy(this.rendererPtr, texture.texturePtr, srcRect, destRect);
  }

  present() {
    sdl.SDL_RenderPresent(this.rendererPtr);
  }

  static createRenderer(windowPtr) {
    let renderPtr = sdl.SDL_CreateRenderer(windowPtr, -1, sdl.SDL_RendererFlags.SDL_RENDERER_ACCELERATED | sdl.SDL_RendererFlags.SDL_RENDERER_PRESENTVSYNC);
    return new SDLRenderer(renderPtr);
  }
}

module.exports = SDLRenderer;