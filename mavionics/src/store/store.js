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
        altitude: null, // The altitude in meters above the mean sea level. MSL = WGS84 Geoid height?
        verticalSpeed: null, // The altitude change rate in meters per second
        speed: null, // The ground speed in meters per second
        acceleration: null, // The rate of change of ground speed in meters per second^2
        heading: null, // The heading as degrees clockwise from North (True North)
        turnRate: null,
        longitude: null, // The longitude as a decimal number
        latitude: null, // The latitude as a decimal number
        accuracy: null, //	The accuracy of position
        altitudeAccuracy: null //	The altitude accuracy of position
      },
      timestamp: null // The date / time of the response(returned if available)
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
      Vue.set(state.currentVehicle, "state", data);
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
