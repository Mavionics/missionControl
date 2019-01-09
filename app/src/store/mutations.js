export function SET_POSTS (state, { posts}) {
  state.loadingPosts = false;
  state.posts = posts;
}

export function SET_VEHICLE (state, vehicle) {
  state.vehicles.push(vehicle);
}

export function CLEAR_VEHICLES (state, vehicle) {
  state.vehicles = []
}

export function FETCHING_LISTS (state) {
  state.loadingPosts = true;
}

export function LOGGING_IN (state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL (state, user) {
  state.user = user;
  state.logging_in = false;
}