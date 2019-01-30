import Vue from "vue";
import Vuex from "vuex";
import { actions, auth } from "@/store/actions.js";
import createEasyFirestore from "vuex-easy-firestore";

const userModule = {
  firestorePath: "/users/{userId}",
  firestoreRefType: "doc",
  moduleName: "user",
  statePropName: "data",
  namespaced: true // automatically added
  // you can also add your own state/getters/mutations/actions
};

const easyFirestore = createEasyFirestore(userModule, { logging: true });

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [easyFirestore],
  state: {
    avRef: null,
    cesiumKey: null,
    vehicles: [],
    currentVehicle: null,
    isLoggedIn: false
  },
  mutations: {
    setCesiumKey(state, val) {
      state.cesiumKey = val;
    },
    setActiveVehicle(state, { val, ref }) {
      state.currentVehicle = val;
      state.avRef = ref;
    }
  },
  getters: {
    getUserName(state) {
      return state.user.data ? state.user.data.name : "";
    },
    getUid(state) {
      return state.user.data ? state.user.data.id : null;
    },
    currentUser(state) {
      return state.user.data;
    },
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
    getActiveVehicle(state) {
      return state.currentVehicle;
    }
  },
  actions: actions,
  debug: process.env.NODE_ENV !== "production"
});

export { store, auth };
