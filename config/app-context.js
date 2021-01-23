const EventEmitter=require("events");
const sdl=require("./../sdl");
class ApplicationContext extends EventEmitter{
  static eventFilterFunction=null;
  constructor(){
    super();
    this.window=null;
    this.eventPoll=null;
    this.initSDL(0x00000020);
    // this.initCloseEvent();
    this.initEventWatcher();
  }
  initSDL(sdlFlags){
    if(sdl.SDL_Init(sdlFlags)!==0){
      console.log("->Unable to initalise SDL");
      this.exit();
      return;
    }
    console.log("->Success of initalised SDL");
  }
  // initCloseEvent(){
  //   this.on("SDL_EVENT",(event)=>{
  //     if(event.type===sdl.SDL_EventType.SDL_QUIT){
  //       this.exit();
  //     }
  //   });
  // }

  initEventWatcher(){
    ApplicationContext.eventFilterFunction=sdl.createEventFilterFunction(
      (data,event)=>{
        event=event.deref();
        if (event.type >= sdl.SDL_EventType.SDL_WINDOWEVENT && event.type <= sdl.SDL_EventType.SDL_MOUSEWHEEL){
          let win=this.window;
          if(win){
            win.emit("SDL_EVENT",event);
          }
        }
      });
    sdl.SDL_AddEventWatch(ApplicationContext.eventFilterFunction, null);
    sdl.pollForEventsForever();
    console.log("->Success to initalise SDL Event Watcher");
  }
  
  setWindow(win){
    this.window=win;
  }
  exit(exitCode){
    sdl.SDL_Quit();
    clearTimeout(this.eventPoll);
    console.log("->Success to exit SDL");
    process.exit(exitCode);
  }
}

module.exports=ApplicationContext;