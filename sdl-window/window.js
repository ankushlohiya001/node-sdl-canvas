const sdl=require("./../sdl");
const EventEmitter=require("events");
const fs=require("fs");
const createSDLContext=require("./../sdl-context");
const windowOpts=require("./options");
let appContext=require("./../config/app-context");
const event=require("./../event");
const createCanvas=require("canvas").createCanvas;

const keyEvent=event.getCurrentKeyEvent;
const mouseEvent=event.getCurrentMouseEvent;
const initWindowEvent=event.getCurrentWindowEvent;
appContext=new appContext();
class SDLWindow extends EventEmitter{
  constructor(options){
    super();
    this.options=options;
    this._hasMouseEnteredWindow=false;
    this._canvas={};
    this.init();
    appContext.setWindow(this);
    setTimeout(()=>{
      this.emit("load");
    },100);
  }
  get size(){
    return this._size;
  }
  set size(size){
    let {w, h}=size;
    sdl.SDL_SetWindowSize(this.windowPtr, w, h);
    this.updateWindowSize(w, h);
  }
  get canvas(){
    return this._canvas;
  }
  set canvas(can){
    this._canvas=can;
    let {w,h}=this.size;
    // this.size={w:can.width, h:can.height};
    if(can.width>w || can.height>h){
      console.warn('resizing canvas due to overflowed size!!');
      this.updateCanvasSize(w,h);
    }
  }
  init(){
    const sdlOpts=windowOpts.getWindowOpts(this.options);
    this.windowPtr=sdl.SDL_CreateWindow(sdlOpts.title, sdlOpts.x, sdlOpts.y, sdlOpts.w, sdlOpts.h, sdlOpts.flags);
    this.context=createSDLContext(this.windowPtr);
  
    this.updateWindowSize(sdlOpts.w, sdlOpts.h);
    this.initEvents();
  }
  initEvents(){
    initWindowEvent(this);
    this.initMouseEvents();
    this.initKeyEvents();
  }
  initKeyEvents(){
    this.on("SDL_EVENT",(event)=>{
      if(event.type===sdl.SDL_EventType.SDL_KEYDOWN){
        let domEve=keyEvent(event,this);
        this.emit("keydown",domEve);
        this.lastKeyboardEvent=domEve;
      }
      else if(event.this===sdl.SDL_EventType.SDL_KEYUP){
        let domEve=keyEvent(event,this);
        this.emit("keyup",domEve);
        this.lastKeyboardEvent=null;
      }
      else if(event.this===sdl.SDL_EventType.SDL_TEXTINPUT){
        let buffer=Buffer.from(event.text.text);
        let str = buffer.reinterpretUntilZeros(1).toString();
        let domEve=keyEvent(event,this);
        domEve.key = str;
        domEve.keyCode = domEve.charCode = str.codePointAt(0);
        domEve.ctrlKey = this.lastKeyboardEvent.ctrlKey;
        domEve.shiftKey = this.lastKeyboardEvent.shiftKey;
        domEve.altKey = this.lastKeyboardEvent.altKey;
        domEve.metaKey = this.lastKeyboardEvent.metaKey;
        this.emit('keypress', domEve);
      }
    });
  }
  initMouseEvents(){
    this.on('SDL_EVENT', (event)=>{
    if (event.type === sdl.SDL_EventType.SDL_MOUSEMOTION) {
      let domEvent = mouseEvent(event, this);
      
      if (this.lastKeyboardEvent) {
        event.altKey = this.lastKeyboardEvent.altKey;
        event.ctrlKey = this.lastKeyboardEvent.ctrlKey;
        event.shiftKey = this.lastKeyboardEvent.shiftKey;
        event.metaKey = this.lastKeyboardEvent.metaKey;
      }

      if (this._hasMouseEnteredWindow) {
        this.emit('mouseenter', domEvent);
        this.emit('mouseover', domEvent);
        this._hasMouseEnteredWindow = false;
      } 
      this.emit('mousemove', domEvent);
      this.lastMouseEvent = domEvent;
    }
    else if (event.type === sdl.SDL_EventType.SDL_MOUSEBUTTONDOWN) {
      let domEvent = mouseEvent(event, this);
      this.emit('mousedown', domEvent);
    }
    else if (event.type === sdl.SDL_EventType.SDL_MOUSEBUTTONUP) {
      let domEvent = mouseEvent(event, this);
      this.emit('mouseup', domEvent);
      this.emit('click', domEvent);
    }
  });
  }
  updateCanvasSize(w, h){
    this.canvas.width=w;
    this.canvas.height=h;
  }
  updateWindowSize(w, h){
    this._size={w, h};
    this.context.size={w, h};
    this.updateCanvasSize(w, h);
    this.emit('change', w, h);
  }
  render(){
    let canvas=this.canvas;
    if(!canvas){
      console.log("add canvas first!!");
      return;
    }
    let width=canvas.width,
        height=canvas.height;
    const buffer=canvas.toBuffer("raw");
    // setTimeout(()=>{
      this.context.renderFrame(buffer, width, height);
    // },10);
  }
  static saveAs(canvas, name){
    const out = fs.createWriteStream(`${name}`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () =>  console.log(`drawing to file: ${name}`));
  }
  saveAs(name="node-sdl-canvas"){
    if(!this.canvas){
      console.log("add canvas first!!");
      return;
    }
    SDLWindow.saveAs(this.canvas,name);
  }
  ///////////////////////
  ///// misc
  grab(will){
    sdl.SDL_SetWindowGrab(this.windowPt, !!will);
  }
  showCursor(will){
    sdl.SDL_ShowCursor(!!will);
  }
  focus(){
    sdl.SDL_RaiseWindow(this.windowPtr);
  }
  restore(){
    sdl.SDL_RestoreWindow(this.windowPtr);
  }
  destroy(){
    sdl.SDL_DestroyWindow(this.windowPtr);
    this.windowPtr=null;
  }
  close(){
    if(!this.options.closable){return;}
    this.destroy();
  }
  center(){
    this.position=[0x2FFF0000, 0x2FFF0000];
  }
  fullscreen(full=null){
    if(full===null) return !!(sdl.SDL_GetWindowFlags(this.windowPtr) & sdl.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN);
    if(!!full){
      sdl.SDL_SetWindowFullscreen(this.windowPtr, sdl.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP);
    }else{
      sdl.SDL_SetWindowFullscreen(this.windowPtr, 0);
    }
  }
  minimize(mini=null){
    if(mini===null) return !!(sdl.SDL_GetWindowFlags(this.windowPtr) & sdl.SDL_WindowFlags.SDL_WINDOW_MINIMIZED);
    if(!!mini){
      sdl.SDL_MinimizeWindow(this.windowPtr, sdl.SDL_WindowFlags.SDL_WINDOW_MINIMIZED);
    }else{
      this.restore();
    }
  }
  maximize(mini=null){
    if(mini===null) return !!(sdl.SDL_GetWindowFlags(this.windowPtr) & sdl.SDL_WindowFlags.SDL_WINDOW_MAXIMIZED);
    if(!!mini){
      sdl.SDL_MaximizeWindow(this.windowPtr, sdl.SDL_WindowFlags.SDL_WINDOW_MAXIMIZED);
    }else{
      this.restore();
    }
  }
  /////////////////////////
  //// misc getter setter
  get resizable(){
    return !!(sdl.SDL_GetWindowFlags(this.windowPtr) & sdl.SDL_WindowFlags.SDL_WINDOW_RESIZABLE);
  }
  set resizable(value){
    sdl.SDL_SetWindowResizable(this.windowPtr, !!value);
  }
  get closabale(){
    return this.options.closabale;
  }
  set closabale(able){
    this.options.closabale=!!able;
  }
  get position(){
    return sdl.SDL_GetWindowPosition(this.windowPtr);
  }
  set position(pos){
    let position = this.position;
    let x = pos.x >= 0 ? pos.x : (pos[0] >= 0 ? pos[0] : position.x);
    let y = pos.y >= 0 ? pos.y : (pos[1] >= 0 ? pos[1] : position.y);
    sdl.SDL_SetWindowPosition(this.windowPtr, x, y);
  }
  get title(){
    return sdl.SDL_GetWindowTitle(this.windowPtr);
  }
  set title(title="p5nodejs"){
    sdl.SDL_SetWindowTitle(this.windowPtr, title);
  }
  get show(){
    return !!(sdl.SDL_GetWindowFlags(this.windowPtr) & sdl.SDL_WindowFlags.SDL_WINDOW_SHOWN);
  }
  set show(show){
    if(!!show){
      sdl.SDL_ShowWindow(this.windowPtr);
    }else{
      sdl.SDL_HideWindow(this.windowPtr);
    }
  }
  set border(border){
    sdl.SDL_SetWindowBordered(this.windowPtr, !!border);
  }
  static mainLoop(){
    appContext.mainLoop();
  }
  static windowDefaults(){
    return windowOpts.windowOpts();
  }
}

module.exports=SDLWindow;