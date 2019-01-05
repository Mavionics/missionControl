import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import moduleRTC from "@/store/modules/webrtc";
import * as log from "loglevel";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import SimController from "@/sim/simController";

// Initialize Firebase
var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const vehiclesCollection = db.collection("vehicles");
const mapsCollection = db.collection("maps");
const callsCollection = db.collection("calls");

let sim;

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    rtc: moduleRTC
  },
  state: {
    currentUser: null,
    cesiumKey: "",
    userProfile: {},
    vehicles: [],
    currentVehicle: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCesiumKey(state, val) {
      state.cesiumKey = val;
    },
    setActiveVehicle(state, val) {
      state.currentVehicle = val;
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    isAuthenticated(state) {
      return state.currentUser != null;
    }
  },
  actions: {
    loginE({ commit, dispatch }, { email, password }) {
      auth.signInWithEmailAndPassword(email, password).then(authResult => {
        commit("setCurrentUser", authResult.user);
        dispatch("login");
      });
    },
    login({ commit, state }) {
      // Try getting userdata
      usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          if (res.exists) {
            commit("setUserProfile", res.data());
          } else {
            // Create user if not existing
            let userData = {
              name: state.currentUser.displayName,
              photo: "" //authResult.user.photourl || ""
            };
            usersCollection
              .doc(state.currentUser.uid)
              .set(userData)
              .then(() => {
                commit("setUserProfile", res.data());
              });
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          log.error(err);
          // router.push("/home");
          return false;
        });

      vehiclesCollection.where("owner", "==", state.currentUser.uid).onSnapshot(
        querySnapshot => {
          state.vehicles = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            log.info(doc.id, " => ", doc.data());
            let avInfo = doc.data();
            avInfo.id = doc.id;
            state.vehicles.push(avInfo);
          });
        },
        err => {
          log.error(err);
        }
      );

      mapsCollection
        .doc("cesium")
        .get()
        .then(
          res => {
            commit("setCesiumKey", res.data().default);
          },
          err => {
            log.error(err);
          }
        )
        .then(() => router.push("/controlroom"));
    },
    logout({ commit }) {
      auth.signOut().then(() => {
        commit("setUserProfile", null);
        commit("setCurrentUser", null);
      });
    },
    connectToVehicle({ commit, state }, { avId, sdp }) {
      callsCollection.add({
        vehicleId: avId,
        userId: state.currentUser.uid,
        timestamp: 45, //firebase.firestore.timestamp.now,
        status: "Init",
        gdSDP: JSON.stringify(sdp)
      });
      vehiclesCollection
        .doc(avId)
        .get()
        .then(
          res => {
            commit("setActiveVehicle", res.data());
          },
          err => {
            log.error(err);
          }
        );
    },
    addVehicle({ commit, state }, { name, description, isSim }) {
      vehiclesCollection.add({
        name: name,
        description: description,
        isSim: isSim,
        owner: state.currentUser.uid
      });
    },
    startSimulation({ commit, state }, { avId }) {
      // eslint-disable-next-line no-console
      console.log("Starting simulation of " + avId);
      sim = new SimController(vehiclesCollection.doc(avId));
      sim.start();
    },
    stopSimulation({ commit, state }, { avId }) {
      // eslint-disable-next-line no-console
      console.log("Stoping simulation of " + avId);
      sim.stop();
    }
  }
});

export { store, auth };
