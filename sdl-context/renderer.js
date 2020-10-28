const sdl=require("./../sdl");
const Texture=require("./texture");

class SDLRenderer{
  constructor(rendererPtr){
    this.rendererPtr=rendererPtr;
    this._color={
      r:255,
      g:255,
      b:255,
      a:255
    };
    this._size=sdl.SDL_RenderGetLogicalSize(this.rendererPtr);
  }
  get color(){
    return this._color;
  }
  set color(colorObj){
    this._color=colorObj;
    sdl.SDL_SetRenderDrawColor(this.rendererPtr, colorObj.r, colorObj.g, colorObj.b, colorObj.a);
  }
  get size(){
    return this._size;
  }
  set size(size){
    this._size=size;
    sdl.SDL_RenderSetLogicalSize(this.rendererPtr, size.w, size.h);
  }
  get target(){
    let texturePtr=sdl.SDL_GetRenderTarget(this.rendererPtr);
    return new Texture(texturePtr);
  }
  set target(texture){
    sdl.SDL_SetRenderTarget(this.rendererPtr,texture.texturePtr);
  }
  destroy(){
     sdl.SDL_DestroyRenderer(this.rendererPtr);
  }
  clear(){
    sdl.SDL_RenderClear(this.rendererPtr);
  }
  copy(texture, srcRect, destRect){
    sdl.SDL_RenderCopy(this.rendererPtr, texture.texturePtr, srcRect, destRect);
  }
  present(){
    sdl.SDL_RenderPresent(this.rendererPtr);
  }
  static createRenderer(windowPtr){
    let renderPtr = sdl.SDL_CreateRenderer(windowPtr, -1, sdl.SDL_RendererFlags.SDL_RENDERER_ACCELERATED | sdl.SDL_RendererFlags.SDL_RENDERER_PRESENTVSYNC);
    return new SDLRenderer(renderPtr);
  }
}

module.exports=SDLRenderer;