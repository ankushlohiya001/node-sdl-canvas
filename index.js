const path=require("path");
const sdlWindow=require("./sdl-window/window");
const {
  createCanvas,
  loadImage,
  registerFont,
  createImageData
}=require("canvas");
let created=false;
let globalMethods={
  createWindow(opts){
    opts=opts || sdlWindow.windowDefaults();
    if(created){
      console.log(`currently only single window allowed!!`);
      return;
    }
    created=true;
    return new sdlWindow(opts); 
  },
  mainLoop(){
    sdlWindow.mainLoop();
  },
  createCanvas(...pars){
    return createCanvas(...pars);
  },
  createImageData(...pars){
    return createImageData(...pars);
  },
  loadImage(...pars){
    return loadImage(...pars);
  },
  loadFont(src,family){
    family=family || path.basename(src).split(path.extname(src))[0];
    registerFont(src,{family});
  },
  saveAs(...pars){
    return sdlWindow.saveAs(...pars);
  }
};


module.exports=globalMethods;