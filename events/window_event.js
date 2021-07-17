const CommonEvent = require("./common_event");
const MouseEvent = require("./mouse_event");
const sdl = require("../sdl");

class WindowEvent extends CommonEvent {
  constructor(type) {
    super(type);
    this.data = null;
  }
  static getCurrentWindowEvent(sdlEvent, window) {
    const currentWindowEvent = new WindowEvent();
    currentWindowEvent.setCommonData(sdlEvent, window);
    currentWindowEvent.data = [sdlEvent.window.data1, sdlEvent.window.data2];
    return currentWindowEvent;
  }

  static initWindowEvents(event, win) {
	  const currentEvent = WindowEvent.getCurrentWindowEvent(event, win);
	  switch (event.window.event) {
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_SHOWN:
	      currentEvent.type = "show";
	      win._shown = true;
	      win._minimized = false;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_HIDDEN:
	      currentEvent.type = "hide";
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MOVED:
	      currentEvent.type = "move";
	      win._position = currentEvent.data;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_SIZE_CHANGED:
	      currentEvent.type = "sizechange";
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_RESIZED:
	      currentEvent.type = "resize";
	      if (currentEvent.data) {
	        win.size = currentEvent.data;
	      }
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MINIMIZED:
	      currentEvent.type = "minimize";
	      win._minimized = true;
	      win._shown = false;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_MAXIMIZED:
	      currentEvent.type = "maximize";
	      win._maximized = true;
	      this._restored = false;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_RESTORED:
	      currentEvent.type = "restore";
	      win._maximized = false;
	      win._restored = true;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_GAINED:
	      currentEvent.type = "focus";
	      win._focused = true;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_LOST:
	      currentEvent.type = "blur";
	      win._focused = false;
	      break;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_CLOSE:
	      currentEvent.type = "close";
	      win.exit();
	      break;

	      /////////////////
	      //////mouse events ////////////////////////////////////////////////////////
	      //////////////

	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_ENTER:
	      {
	        let altCurrentEvent = win._lastMouseEvent;
	        if (!altCurrentEvent) {
	          altCurrentEvent = MouseEvent.getCurrentMouseEvent(event);
	        }
	        altCurrentEvent.type = "mouseenter";
	        altCurrentEvent.dispatch();
	        altCurrentEvent.type = "mouseover";
	        altCurrentEvent.dispatch();
	      }
	      return;
	    case sdl.SDL_WindowEventID.SDL_WINDOWEVENT_LEAVE:
	      {
	        let altCurrentEvent = win._lastMouseEvent;
	        if (!altCurrentEvent) {
	          altCurrentEvent = MouseEvent.getCurrentMouseEvent(event);
	        }
	        altCurrentEvent.type = "mouseleave";
	        altCurrentEvent.dispatch();
	      }
	      return;
	  };

	  currentEvent.dispatch();
	}
}

module.exports = WindowEvent;