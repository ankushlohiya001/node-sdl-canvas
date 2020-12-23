const EventEmitter=require("events");
const sdl=require("./../sdl");
class ApplicationContext extends EventEmitter{
  static eventFilterFunction=null;
  constructor(){
    super();
    this.window=null;
    this.eventPoll=null;
    this.initSDL(0x00000020);
    this.initCloseEvent();
    this.initEventWatcher();
    this.mainLoop=this.mainLoop.bind(this);
  }
  initSDL(sdlFlags){
    if(sdl.SDL_Init(sdlFlags)!==0){
      console.log("->Unable to initalise SDL");
      this.exit();
    }
    console.log("->Success of initalised SDL");
  }
  initCloseEvent(){
    this.on("SDL_EVENT",(event)=>{
      if(event.type===sdl.SDL_EventType.SDL_QUIT){
        this.exit();
      }
    });
  }
  initEventWatcher(){
    ApplicationContext.eventFilterFunction=sdl.createEventFilterFunction(
      (data,event)=>{
        event=event.deref();
        if (event.type >= sdl.SDL_EventType.SDL_WINDOWEVENT && event.type <= sdl.SDL_EventType.SDL_MOUSEWHEEL){
          let win=this.window;
          if(win){
            win.emit("SDL_EVENT",event);
          }
        }else{
          this.emit("SDL_EVENT",event);
        }
      });
    sdl.SDL_AddEventWatch(ApplicationContext.eventFilterFunction, null);
    console.log("->Success to initalise SDL Event Watcher");
  }
  setWindow(win){
    this.window=win;
  }
  mainLoop(){
    if(!this.eventPoll){
      this.eventPoll=sdl.pollForEventsForever();
      console.log("->Success to initalise main loop");
    }else{
      console.log("->mainLoop can be called once!!");
    }
  }
  exit(exitCode){
    const closed=this.window._close();
    if(!closed) return;
    this.window.emit("exit");
    sdl.SDL_Quit();
    clearTimeout(this.eventPoll);
    console.log("->Success to exit SDL");
    process.exit(exitCode);
  }
}

module.exports=ApplicationContext;