class PhySim {
  constructor(timeBase, initState) {
    let defaultState = {
      longitude: 14, // deg East positive
      latitude: 58, // deg North positive
      altitude: 340, // meters "above sea level" (WGS84)
      heading: 0 // Deg from North CW
    };
    this._state = { ...defaultState, ...initState };
    this._state.timestamp = timeBase; // Timestamp in ms
    this._state.speed = 20; // speed in m/s
  }

  // Step in seconds
  step(s) {
    this._state.timestamp += s * 1000;
    this._state.heading = (this._state.heading + 2 * s) % 360;
    const headingRad = PhySim.deg2rad(this._state.heading);
    this._state.longitude +=
      Math.sin(headingRad) * 0.00001 * this._state.speed * s;
    this._state.latitude +=
      Math.cos(headingRad) * 0.00001 * this._state.speed * s;
    this._state.altitude += 0.1 * this._state.speed * s;
  }
  getTime() {
    return this._state.timestamp;
  }
  getState() {
    return this._state;
  }

  static deg2rad(degValue) {
    return degValue * (Math.PI / 180);
  }
}

export default PhySim;
