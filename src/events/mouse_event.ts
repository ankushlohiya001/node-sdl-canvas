import { CommonEvent } from "./common_event";
import { EventType } from "../types";

export class MouseEvent extends CommonEvent {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  clientX: number;
  clientY: number;
  deltaX: number;
  deltaY: number;
  dblClick: boolean;
  which: any;
  downButtons: [boolean, boolean, boolean];

  constructor(type?: any) {
    super(type);
    this.altKey = false;
    this.ctrlKey = false;
    this.metaKey = false;
    this.shiftKey = false;
    this.clientX = 0;
    this.clientY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.dblClick = false;
    this.which = null;
    this.downButtons = [false, false, false];
  }

  static getCurrentMouseEvent(event: any, window: any) {
    const currentMouseEvent = new MouseEvent();
    currentMouseEvent.setCommonData(event, window);

    currentMouseEvent.deltaX = event.mouseEvent.dx;
    currentMouseEvent.deltaY = event.mouseEvent.dy;
    currentMouseEvent.clientX = event.mouseEvent.x; //  X coordinate, relative to window
    currentMouseEvent.clientY = event.mouseEvent.y; // Y coordinate, relative to window
    currentMouseEvent.ctrlKey = false;
    currentMouseEvent.shiftKey = false;
    currentMouseEvent.altKey = false;
    currentMouseEvent.metaKey = false;
    currentMouseEvent.dblClick = event.mouseEvent.clicks === 2;
    currentMouseEvent.downButtons[0] = event.mouseEvent.left;
    currentMouseEvent.downButtons[1] = event.mouseEvent.middle;
    currentMouseEvent.downButtons[2] = event.mouseEvent.right;
    return currentMouseEvent;
  }

  static initMouseEvents(event: any, win: any) {
    let currentEvent = MouseEvent.getCurrentMouseEvent(event, win);

    win._mouseButtonDown = currentEvent.downButtons.some((s) => !!s);
    if (win._keyDown) {
      currentEvent.altKey = win._lastKeyEvent.altKey;
      currentEvent.ctrlKey = win._lastKeyEvent.ctrlKey;
      currentEvent.shiftKey = win._lastKeyEvent.shiftKey;
      currentEvent.metaKey = win._lastKeyEvent.metaKey;
    }

    if (event.mouseEvent.type === EventType.MOUSEMOTION) {
      currentEvent.type = "mousemove";
      currentEvent.dispatch();

      if (win._mouseButtonDown) {
        currentEvent.type = "drag";
        currentEvent.dispatch();
      }
      //win._lastMouseEvent = currentEvent;
    } else if (event.mouseEvent.type === EventType.MOUSEWHEEL) {
      currentEvent.type = "wheel";
      currentEvent.dispatch();
    } else {
      if (win._mouseButtonDown) {
        currentEvent.type = "mousedown";
        currentEvent.dispatch();

        if (currentEvent.dblClick) {
          currentEvent.type = "dblclick";
          currentEvent.dispatch();
        }
      } else {
        currentEvent.type = "mouseup";
        currentEvent.dispatch();
        currentEvent.type = "click";
        currentEvent.dispatch();
      }
    }
    win._lastMouseEvent = currentEvent;
  }
}
