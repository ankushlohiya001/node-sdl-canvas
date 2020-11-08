const EventEmitter=require("events");
const sdl=require("./../sdl");
class ApplicationContext extends EventEmitter{
  static eventFilterFunction=null;
  constructor(){
    super();
    this.window=null;
    this.eventPoll=null;
    let isOk=this.initSDL(0x00000020);
    if(!isOk) return;
    this.initEvents();
    this.initEventWatcher();
    this.mainLoop=this.mainLoop.bind(this);
  }
  initSDL(sdlFlags){
    if(sdl.SDL_Init(sdlFlags)!==0){
      this.exit();
      return false;
    }
    return true;
  }
  initEvents(){
    this.on("SDL_EVENT",(event)=>{
      if(event.type===sdl.SDL_EventType.SDL_QUIT){
        this.exit();
      }
    });
    this.on('close',()=>{
      this.exit(0);
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
  }
  setWindow(win){
    this.window=win;
  }
  mainLoop(){
    if(!this.eventPoll){
      this.eventPoll=sdl.pollForEventsForever();
    }else{
      console.log("mainLoop can be called once!!");
    }
  }
  exit(exitCode){
    this.window.close();
    sdl.SDL_Quit();
    clearInterval(this.eventPoll);
    process.exit(exitCode);
  }
}

module.exports=ApplicationContext;