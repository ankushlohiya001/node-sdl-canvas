import { Audio as AudioCore } from "node-sdl";

enum AudioStatus {
  LOADED,
  PLAYING,
  PAUSED,
  STOPPED,
  ENDED,
}

interface AudioOptions {
  src: string;
  channel: number;
}

export class Audio {
  static create(opts: AudioOptions) {
    return new Audio(opts);
  }

  audioCore: AudioCore;
  status: AudioStatus;
  constructor(opts: AudioOptions) {
    this.audioCore = new AudioCore(opts.src, opts.channel);
    this.status = AudioStatus.LOADED;
  }

  play(loopCount: number) {
    if (this.status == AudioStatus.LOADED) {
      this.audioCore.play(loopCount);
      this.status = AudioStatus.PLAYING;
    } else {
      throw "Audio not loaded!!";
    }
  }

  increaseVolume(factor = 5) {
    if (this.audioCore.volume + factor <= 100) {
      this.audioCore.volume += factor;
    }
  }

  decreaseVolume(factor = 5) {
    if (this.audioCore.volume - factor >= 0) {
      this.audioCore.volume -= factor;
    }
  }

  pause() {
    if (this.status == AudioStatus.PLAYING) {
      this.audioCore.pause();
      this.status = AudioStatus.PAUSED;
    } else {
      throw "Audio not playing!!";
    }
  }

  resume() {
    if (this.status == AudioStatus.PAUSED) {
      this.audioCore.resume();
      this.status = AudioStatus.PLAYING;
    } else if (this.status == AudioStatus.ENDED) {
      throw "Audio playback ended!!";
    }
  }

  stop() {
    if (this.status != AudioStatus.STOPPED) {
      this.audioCore.stop();
      this.audioCore.destroy();
      this.status = AudioStatus.STOPPED;
    }
  }
}
