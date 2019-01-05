class PhySim {
  constructor(timeBase, initState) {
    this._timestamp = timeBase; // Timestamp in ms
    let defaultState = { longitude: 54, latitude: 14 };
    this._state = { ...defaultState, ...initState };
    this.speed = 20; // speed in m/s
  }
  // Step in seconds
  step(s) {
    this._timestamp += s * 1000;
    this._state.longitude += 0.0000001 * this.speed * s;
  }
  getTime() {
    return this._timestamp;
  }
  getState() {
    return this._state;
  }
}

export default PhySim;
