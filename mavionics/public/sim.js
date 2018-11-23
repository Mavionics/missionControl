class Sim {
  constructor(timeBase) {
    this.timestamp = timeBase;
  }
  step(ms) {
    this.timestamp += ms;
  }
  getState() {
    return { timestamp: this.timestamp }
  }
}