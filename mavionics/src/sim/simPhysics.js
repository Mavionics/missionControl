class PhySim {
  constructor(timeBase, initState) {
    let defaultState = { longitude: 14, latitude: 58 };
    this._state = { ...defaultState, ...initState };
    this._state.timestamp = timeBase; // Timestamp in ms
    this._state.speed = 20; // speed in m/s
  }
  // Step in seconds
  step(s) {
    this._state.timestamp += s * 1000;
    this._state.longitude += 0.00001 * this._state.speed * s;
  }
  getTime() {
    return this._state.timestamp;
  }
  getState() {
    return this._state;
  }
}

export default PhySim;
