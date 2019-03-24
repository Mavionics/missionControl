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
    cesiumKey: null,
    vehicles: [],
    currentVehicle: {
      state: {
        altitude: null,
        verticalSpeed: null,
        speed: null,
        acceleration: null,
        heading: null,
        turnRate: null,
        longitude: null,
        latitude: null
      }
    },
    lastData: "",
    isLoggedIn: false,
    videoStream: null
  },
  mutations: {
    setCesiumKey(state, val) {
      state.cesiumKey = val;
    },
    setVideoStream(state, stream) {
      console.warn("VideoURL set ", stream);
      state.videoStream = stream;
    },
    mergeVehicleData(state, { data, source }) {
      if (source) {
        // TODO: Handle DB or RTC source
      }
      state.currentVehicle.altitude = data.altitude;
      state.currentVehicle.verticalSpeed = data.verticalSpeed;
      state.currentVehicle.speed = data.speed;
      state.currentVehicle.acceleration = data.acceleration;
      state.currentVehicle.heading = data.heading;
      state.currentVehicle.turnRate = data.turnRate;
      state.currentVehicle.longitude = data.longitude;
      state.currentVehicle.latitude = data.latitude;
      state.lastData = data;
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
