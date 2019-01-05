class PhySim {
  constructor(timeBase) {
    this.timestamp = timeBase;
  }
  step(ms) {
    this.timestamp += ms;
  }
  getState() {
    return { timestamp: this.timestamp };
  }
}

export default PhySim;
