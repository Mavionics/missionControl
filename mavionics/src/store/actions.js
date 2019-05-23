import router from "../router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import SimController from "@/sim/simController";
import RtcModule from "@/modules/RtcModule";
import * as log from "loglevel";

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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();

const vehicles = db.collection("vehicles");

let sim;
let rtc;
let fetchingKeys = false;

var actions = {
  async loginE({ getters }, { email, password }) {
    // if (!getters.isAuthenticated) {
    await auth.signInWithEmailAndPassword(email, password);
    // router.push("/controlroom)");
    // }
  },
  async deleteUser({ getters }) {
    await vehicles
      .where("owner", "==", getters.getUid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });

    await db
      .collection("users")
      .doc(getters.getUid)
      .delete();

    await auth.currentUser.delete();
  },
  async login({ state, dispatch, getters }) {
    // Try getting userdata
    console.warn("User login.");

    // open the DB channel
    await dispatch("user/openDBChannel");

    state.vehicles = [];
    await vehicles.where("owner", "==", getters.getUid).onSnapshot(
      querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            let avInfo = change.doc.data();
            avInfo.id = change.doc.id;
            state.vehicles.push(avInfo);
          } else if (change.type === "removed") {
            let idx = state.vehicles.findIndex(i => i.id == change.doc.id);
            state.vehicles.splice(idx, 1);
          } else if (change.type === "modified") {
            let dbItem = change.doc.data();
            let idx = state.vehicles.findIndex(i => i.id == change.doc.id);
            let lcItem = state.vehicles[idx];
            this._vm.$set(state.vehicles, idx, Object.assign(lcItem, dbItem));
          }
        });
      },
      err => {
        log.error(err);
      }
    );
    state.isLoggedIn = true;
  },
  logout({ dispatch, state }) {
    if (!state.isLoggedIn) return;
    auth.signOut().then(() => {
      dispatch("user/closeDBChannel", {
        clearModule: true
      }).then(() => (state.isLoggedIn = false));
    });
  },
  getMapKeys({ commit, state }) {
    if (state.cesiumKey != null) return;
    if (fetchingKeys) return;
    fetchingKeys = true;
    return db
      .collection("maps")
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
    let rtc = new RtcModule(vehicles.doc(avId), false);
    rtc.onStream = stream => {
      console.debug("RtcModule onStream callback");
      commit("setVideoStream", stream);
    };
    rtc.onMessage = data => {
      console.debug("RtcModule onMessage");
      commit("mergeVehicleData", { data });
    };
    rtc.connect().then(() => rtc.sendMessage("We are connected!"));
  },
  addVehicle({ getters }, { name, description, isSim }) {
    vehicles.add({
      name: name,
      description: description,
      isSim: isSim,
      owner: getters.getUid
    });
  },
  startSimulation(_, { avId }) {
    // eslint-disable-next-line no-console
    console.log("Starting simulation of " + avId);
    sim = new SimController(vehicles.doc(avId));
    sim.start();
  },
  stopSimulation(_, { avId }) {
    // eslint-disable-next-line no-console
    console.log("Stoping simulation of " + avId);
    sim.stop();
  }
};

export { actions, auth };
