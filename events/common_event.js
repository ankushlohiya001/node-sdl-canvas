class CommonEvent {
  constructor(type = null) {
    this.nativeEvent = null;
    this.type = type;
    this.target = null;
    this.timestamp = null;
  }

  setCommonData(sdlEvent, win) {
    this.nativeEvent = sdlEvent;
    this.target = win;
    this.timestamp = sdlEvent.window.timestamp;
  }

  dispatch() {
    const target = this.target;
    const type = this.type;
    if (target && type != null) {
      target.emit(this.type, this);
    }
  }
}

module.exports = CommonEvent;