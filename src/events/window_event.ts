import { CommonEvent } from "./common_event";
import { MouseEvent } from "./mouse_event";
import { WindowEvent as WinEvent } from "../types";

export class WindowEvent extends CommonEvent {
  clientX: number;
  clientY: number;
  deltaX: number;
  deltaY: number;
  data: any;
  _restored: boolean | undefined;

  constructor(type?: any) {
    super(type);
    this.clientX = 0;
    this.clientY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.data = null;
  }
  static getCurrentWindowEvent(event: any, window: any) {
    const currentWindowEvent = new WindowEvent();
    currentWindowEvent.setCommonData(event, window);

    const px = event.windowEvent.x,
      py = event.windowEvent.y;
    currentWindowEvent.clientX = px;
    currentWindowEvent.clientY = py;

    let lpx = 0,
      lpy = 0;
    if (!!window._lastWindowEvent) {
      lpx = px - window._lastWindowEvent.clientX;
      lpy = py - window._lastWindowEvent.clientY;
    }

    currentWindowEvent.deltaX = lpx;
    currentWindowEvent.deltaY = lpy;
    return currentWindowEvent;
  }

  static initWindowEvents(event: any, win: any) {
    const currentEvent = WindowEvent.getCurrentWindowEvent(event, win);
    switch (event.windowEvent.event) {
      case WinEvent.SHOWN:
        currentEvent.type = "show";
        win._shown = true;
        win._minimized = false;
        break;
      case WinEvent.HIDDEN:
        currentEvent.type = "hide";
        break;
      case WinEvent.MOVED:
        currentEvent.type = "move";
        break;
      case WinEvent.SIZE_CHANGED:
        currentEvent.type = "sizechange";
        break;
      case WinEvent.RESIZED:
        currentEvent.type = "resize";
        break;
      case WinEvent.MINIMIZED:
        currentEvent.type = "minimize";
        win._minimized = true;
        win._shown = false;
        break;
      case WinEvent.MAXIMIZED:
        currentEvent.type = "maximize";
        win._maximized = true;
        win._restored = false;
        break;
      case WinEvent.RESTORED:
        currentEvent.type = "restore";
        win._maximized = false;
        win._restored = true;
        break;
      case WinEvent.FOCUS_GAINED:
        currentEvent.type = "focus";
        win._focused = true;
        break;
      case WinEvent.FOCUS_LOST:
        currentEvent.type = "blur";
        win._focused = false;
        break;
      case WinEvent.CLOSE:
        currentEvent.type = "close";
        win.close();
        break;

      /////////////////
      //////mouse events ////////////////////////////////////////////////////////
      //////////////

      case WinEvent.ENTER:
        {
          let altCurrentEvent = win._lastMouseEvent;
          if (!altCurrentEvent) {
            altCurrentEvent = MouseEvent.getCurrentMouseEvent(event, win);
          }
          altCurrentEvent.type = "mouseenter";
          altCurrentEvent.dispatch();
          altCurrentEvent.type = "mouseover";
          altCurrentEvent.dispatch();
        }
        return;
      case WinEvent.LEAVE:
        {
          let altCurrentEvent = win._lastMouseEvent;
          if (!altCurrentEvent) {
            altCurrentEvent = MouseEvent.getCurrentMouseEvent(event, win);
          }
          altCurrentEvent.type = "mouseleave";
          win._mouseButtonDown = false;
          altCurrentEvent.dispatch();
        }
        return;
    }
    win._lastWindowEvent = currentEvent;
    currentEvent.dispatch();
  }
}
