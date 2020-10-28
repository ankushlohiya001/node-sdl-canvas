const sdl=require("./../sdl");
class SDLTexture{
  constructor(texturePtr){
    this.texturePtr=texturePtr;
    sdl.SDL_SetTextureBlendMode(this.texturePtr,sdl.SDL_BlendMode.SDL_BLENDMODE_BLEND);
    this.pixDepth=4;
    this.rect={x:0, y:0, w:0, h:0};
  }
  destroy(){
    sdl.SDL_DestroyTexture(this.texturePtr);
  }
  update(x, y, w, h, pixels){
    this.rect.x=x;
    this.rect.y=y;
    this.rect.w=w;
    this.rect.h=h;
    let pitch=w * this.pixDepth;
    sdl.SDL_UpdateTexture(this.texturePtr, this.rect, pixels, pitch);
  }
  // query(){
  //   return sdl.SDL_QueryTexture(this.texturePtr);
  // }
  static createTexture(renderer, w, h, access, format){
    if(access===undefined) access=2;
    format=format || null;
    let texturePtr = sdl.SDL_CreateTexture(renderer.rendererPtr, format, access, w, h);
    return new SDLTexture(texturePtr);
  }
  static createDynamicTexture(renderer, width, height){
    let format=SDLTexture.getARGBFormat();
    return SDLTexture.createTexture(renderer, width, height, sdl.SDL_TEXTUREACCESS_STREAMING, format);
  }
  static getARGBFormat() {
    let bpp = 32;
    let rmask = 0x00FF0000;
    let gmask = 0x0000FF00;
    let bmask = 0x000000FF;
    let amask = 0xFF000000;
    return sdl.SDL_MasksToPixelFormatEnum(bpp, rmask, gmask, bmask, amask);
  }
}

module.exports=SDLTexture;