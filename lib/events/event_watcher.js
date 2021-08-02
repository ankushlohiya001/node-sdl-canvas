const sdl = require("../sdl");

class EventWatcher{
  constructor(){
    this.__filterFunction = function(){};
    this.lastEventWindowId = null;
    this.windows = null;
    this.event = new sdl.SDL_Event();
  }

  setFilterFunction(fun){
    if(typeof fun == "function"){
      this.__filterFunction = fun;
    }
  }

  setWindowList(list){
    this.windows = list; //list refers to obj in which window object are stroed by id as key;
  }

  fullfilled(){
    return this.__filterFunction && this.windows;
  }

  eventPolling(){
    const event = this.event;
    
    while(sdl.SDL_PollEvent(event.ref())){
      if(this.fullfilled()){
        let winId = event.window.windowID;
        let win = this.windows[winId];
        if (!win) {
          winId = this.lastEventWindowId;
          win = this.windows[winId];
        }
      
        this.__filterFunction(event, win);
        this.lastEventWindowId = winId;
      }
    }

  }

}

module.exports = EventWatcher;