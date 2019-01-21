import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
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

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const vehiclesCollection = db.collection("vehicles");
const mapsCollection = db.collection("maps");

let fetchingKeys = false;

let sim;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    avRef: null,
    currentUser: null,
    cesiumKey: null,
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
    setActiveVehicle(state, { val, ref }) {
      state.currentVehicle = val;
      state.avRef = ref;
    }
  },
  getters: {
    getUserName(state) {
      return state.currentUser ? state.currentUser.displayName : "";
    },
    currentUser(state) {
      return state.currentUser;
    },
    isAuthenticated(state) {
      return state.currentUser != null;
    }
  },
  actions: {
    loginE({ commit, state, dispatch }, { email, password }) {
      if (state.currentUser == null) {
        auth.signInWithEmailAndPassword(email, password).then(authResult => {
          commit("setCurrentUser", authResult.user);
          dispatch("login");
        });
      }
    },
    async deleteUser({ commit, state, dispatch }) {
      console.warn("Deleting current logged in user.");
      await vehiclesCollection
        .where("owner", "==", state.currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
      console.warn("User's Vehicles deleted.");

      await usersCollection.doc(state.currentUser.uid).delete();
      console.warn("User deleted.");

      await auth.currentUser.delete();
      console.warn("User account deleted.");
    },
    login({ commit, state, dispatch }) {
      // Try getting userdata
      usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          if (res.exists) {
            commit("setUserProfile", res.data());
          } else {
            // Create user if not existing
            let userData = { name: state.currentUser.displayName, photo: "" }; //authResult.user.photourl || ""
            usersCollection
              .doc(state.currentUser.uid)
              .set(userData)
              .then(() => {
                commit("setUserProfile", res.data());
              });
          }
        })
        .then(() => router.push("/controlroom"))
        .catch(err => {
          // eslint-disable-next-line
          log.error(err);
          // router.push("/home");
          return false;
        });

      state.vehicles = [];
      vehiclesCollection.where("owner", "==", state.currentUser.uid).onSnapshot(
        querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              let avInfo = change.doc.data();
              avInfo.id = change.doc.id;
              state.vehicles.push(avInfo);
            } else if (change.type === "removed") {
              state.vehicles = state.vehicles.filter(
                item => (item.id = change.doc.id)
              );
            } else if (change.type === "modified") {
              let dbItem = change.doc.data();
              let lcItem = state.vehicles.find(i => (i.id = change.doc.id));
              for (var prop in dbItem) {
                lcItem[prop] = dbItem[prop];
              }
            }
          });
        },
        err => {
          log.error(err);
        }
      );
    },
    logout({ commit }) {
      auth.signOut().then(() => {
        commit("setUserProfile", null);
        commit("setCurrentUser", null);
      });
    },
    getMapKeys({ commit, state }) {
      if (state.cesiumKey != null) return;
      if (fetchingKeys) return;
      fetchingKeys = true;
      return mapsCollection
        .doc("cesium")
        .get()
        .then(
          res => {
            commit("setCesiumKey", res.data().default);
            fetchingKeys = false;
          },
          err => {
            log.error(err);
          }
        );
    },
    connectToVehicle({ commit }, { avId }) {
      return vehiclesCollection
        .doc(avId)
        .get()
        .then(
          res => {
            commit("setActiveVehicle", {
              val: res.data(),
              ref: vehiclesCollection.doc(avId)
            });
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
