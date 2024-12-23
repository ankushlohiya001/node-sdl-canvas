import { CommonEvent } from "./common_event";
import fs from "node:fs";
import { URL } from "node:url";
import { EventType } from "../types";

export class DropEvent extends CommonEvent {
  data: any;
  path: string;

  constructor(type?: any) {
    super(type);
    this.data = null;
    this.path = "";
  }

  static getCurrentDropEvent(sdlEvent: any, window: any) {
    const currentDropEvent = new DropEvent();
    currentDropEvent.setCommonData(sdlEvent, window);
    return currentDropEvent;
  }

  static initDropEvents(event: any, win: any) {
    const currentEvent = DropEvent.getCurrentDropEvent(event, win);
    if (event.type === EventType.DROPTEXT) {
      let addr = URL.parse(event.drop.file);
      const pathToFile = decodeURI(addr?.pathname || "");

      currentEvent.path = pathToFile;
      currentEvent.type = "dropbegin";
      currentEvent.dispatch();

      fs.readFile(pathToFile, (err, data) => {
        currentEvent.type = "drop";
        if (data) currentEvent.data = data;
        currentEvent.dispatch();
      });
    }
  }
}
