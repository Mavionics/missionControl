class PhySim {
  constructor(timeBase, initState) {
    let defaultState = { longitude: 14, latitude: 54 };
    this._state = { ...defaultState, ...initState };
    this._state.timestamp = timeBase; // Timestamp in ms
    this.speed = 20; // speed in m/s
  }
  // Step in seconds
  step(s) {
    this._state.timestamp += s * 1000;
    this._state.longitude += 0.0000001 * this.speed * s;
  }
  getTime() {
    return this._state.timestamp;
  }
  getState() {
    return this._state;
  }
}

export default PhySim;
