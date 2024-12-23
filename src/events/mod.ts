import { EventType } from "../types";
import { WindowEvent } from "./window_event";
import { MouseEvent } from "./mouse_event";
import { KeyboardEvent } from "./keyboard_event";
// const DropEvent = require("./drop_event");
import { EventWatcher } from "node-sdl";
import { Window } from "../window";

function eventHandler(
  eventWatcher: EventWatcher,
  eventType: number,
  window: Window,
) {
  switch (eventType) {
    case EventType.WINDOWEVENT:
      WindowEvent.initWindowEvents(eventWatcher, window);
      break;
    case EventType.KEYDOWN:
    case EventType.KEYUP:
      KeyboardEvent.initKeyboardEvents(eventWatcher, window);
      break;
    case EventType.MOUSEMOTION:
    case EventType.MOUSEBUTTONDOWN:
    case EventType.MOUSEBUTTONUP:
    case EventType.MOUSEWHEEL:
      MouseEvent.initMouseEvents(eventWatcher, window);
      break;
    // case EventType.DROPFILE:
    // case EventType.DROPTEXT:
    // case EventType.DROPBEGIN:
    // case EventType.DROPCOMPLETE:
    //   DropEvent.initDropEvents(eventWatcher.getWindowEvent);
    // break;
    case EventType.QUIT:
      //win.close();
      break;
  }
}

export function setupEventWatcher(
  windowList: Map<number, Window>,
): EventWatcher {
  const eventWatcher = new EventWatcher();

  eventWatcher.setCallback((eventType: number, winId: number) => {
    let window = windowList.get(winId);

    if (!window) return;

    eventHandler(eventWatcher, eventType, window);
  });
  return eventWatcher;
}
