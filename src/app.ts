import SDL from "node-sdl";
import { InitFlag } from "./types";

import { Window, WindowOptions } from "./window";
import { Audio, AudioOptions } from "./audio";

const Status = {
  Loaded: 0x10,
  Idle: 0x11,
  Started: 0x12,
  Stopped: 0x13,
};

export class App {
  static status = Status.Loaded;

  static mainLoop(eventWatcher: any, delayMs = 17) {
    if (App.status == Status.Started) {
      console.log("->Main Loop already active!!");
    } else if (App.status != Status.Idle) {
      App.initSDL();
    }
    App.status = Status.Started;
    (function loop() {
      if (App.status == Status.Stopped) return;
      eventWatcher.pollEvent();
      setTimeout(loop, delayMs);
    })();
  }

  static initSDL() {
    if (SDL.init(InitFlag.VIDEO | InitFlag.AUDIO) !== 0) {
      console.log("->Unable to initalise SDL");
      App.status = Status.Stopped;
      App.exit();
      return;
    } else {
      App.status = Status.Idle;
      console.log("->Success of initalised SDL");
    }

    // handle interrupt signal ( Ctrl + C )
    // destroy all window, then exits
    process.on("SIGINT", () => {
      for (let win of Window.list.values()) {
        win.close();
      }
    });
  }

  static exit() {
    if (App.status == Status.Stopped) {
      console.log("->Unable, already exited!!");
    } else if (Window.list.size == 0) {
      App.status = Status.Stopped;
      SDL.quit();
      console.log("->Success to exit SDL");
    }
  }

  static createWindow(opts: WindowOptions): Window {
    return Window.create(App, opts);
  }

  static createAudio(opts: AudioOptions): Audio {
    return Audio.create(opts);
  }
}
