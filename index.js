const path=require("path");
const sdlWindow=require("./sdl-window/window");
const appContext=require("./config/app-context");
const {
  createCanvas,
  Image,
  registerFont
}=require("canvas");

let globalMethods={
  createWindow(opts){
    opts=opts || sdlWindow.windowDefaults();
    return new sdlWindow(opts); 
  },
  mainLoop(){
    sdlWindow.mainLoop();
  },
  createCanvas(...par){
    return createCanvas(...par);
  },
  loadImage(src){
    let tmpImage=new Image();
    tmpImage.src=src;
    return src;
  },
  loadFont(src,family){
    family=family || path.basename(src).split(path.extname(src))[0];
    registerFont(src,{family});
  }
};


module.exports=globalMethods;