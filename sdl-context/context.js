const Texture=require("./texture");
class SDLContext{
  constructor(renderer){
    this.renderer=renderer;
    this.x=0;
    this.y=0;
    this.color={
      r:255,
      g:255,
      b:255,
      a:255
    };
    this.texture=null;
    this.srcRect={x:0,y:0,w:0,h:0};
    this.destRect={x:0,y:0,w:0,h:0};
  }
  // setBgColor(color={}){
  //   this.color={r:color.r, g:color.g, b:color.b, a:color.a};
  // }
  renderFrame(pixels, width, height){
    if(!this.texture) return;
    this.updateRGBA();
    this.clear();
    width = (this.width < width) ? this.width : width;
    height = (this.height < height) ? this.height : height;
    this.texture.update(0,0, width, height, pixels);
    this.srcRect.x = 0;
    this.srcRect.y = 0;
    this.srcRect.w = width;
    this.srcRect.h = height;
    this.destRect.x = this.x;
    this.destRect.y = this.y;
    this.destRect.w = width;
    this.destRect.h = height;
    this.renderer.copy(this.texture, this.srcRect, this.destRect);
    this.update();
  }
  destroy(){
    this.renderer.destroy();
    this.renderer=null;
  }
  clear(){
    this.renderer.clear();
  }
  update(){
    this.renderer.present();
  }
  set size(size){
    if(this.texture){
      this.texture.destroy();
      this.texture=null;
    }
    this.renderer.size=size;
    this.width=size.w;
    this.height=size.h;
    this.texture=Texture.createDynamicTexture(this.renderer,this.width,this.height);
  }
  get size(){
    return this.renderer.size;
  }
  updateRGBA(){
    this.renderer.color=this.color;
  }
}

module.exports=SDLContext;