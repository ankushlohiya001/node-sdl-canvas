class CommonEvent {
  constructor(type = null) {
    this.nativeEvent = null;
    this.type = type;
    this.target = null;
    this.timestamp = null;
  }

  setCommonData(event, win) {
    this.nativeEvent = event;
    this.target = win;
    this.timestamp = event.windowEvent.timestamp;
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