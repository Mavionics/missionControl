export function SET_VEHICLE (state, vehicle) {
  state.vehicles.push(vehicle);
}

export function SET_ACTIVE_VEHICLE (state, vehicle) {
  state.activeVehicle = vehicle;
}

export function CLEAR_VEHICLES (state, vehicle) {
  state.vehicles = []
}

export function LOGGING_IN (state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL (state, user) {
  state.user = user;
  state.logging_in = false;
}

export function SET_POSITION (state, position) {
  state.position = position;
}

export function SET_PERMISSION_STATUS (state, permissionStatus) {
  state.permissionStatus = permissionStatus;
}

export function AND_PERMISSION_STATUS (state, permissionStatus) {
  state.permissionStatus = state.permissionStatus && permissionStatus;
}

export function UPDATE_VEHICLE_POSITION(state, position){
  state.activeVehicle.position = position;
}

export function UPDATE_VEHICLE_TIMESTAMP(state, timestamp){
  state.activeVehicle.timestamp = timestamp;
}

export function SET_ACTIVE_VEHICLE_REF(state, activeVehicleRef){
  state.activeVehicleRef = activeVehicleRef;
}

export function SET_STATE(state, newState){
  state = newState;
}