const moduleRTC = {
  state: { remote: "inside" },
  mutations: {},
  actions: {
    connect({ commit, state }, { av }) {
      alert("Connecting to " + state.remote + av);
    }
  },
  getters: {
    isConnected(state) {
      return true;
    }
  }
};

export default moduleRTC;
