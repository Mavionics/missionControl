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
  loginE({ getters }, { email, password }) {
    if (getters.isAuthenticated) {
      auth.signInWithEmailAndPassword(email, password);
    }
  },
  async deleteUser({ getters }) {
    console.warn("Deleting current logged in user.");
    await vehicles
      .where("owner", "==", getters.getUid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    console.warn("User's Vehicles deleted.");

    await db
      .collection("users")
      .doc(getters.getUid)
      .delete();
    console.warn("User deleted.");

    await auth.currentUser.delete();
    console.warn("User account deleted.");
  },
  async login({ state, dispatch, getters }) {
    // Try getting userdata

    // open the DB channel
    await dispatch("user/openDBChannel");

    // usersCollection
    //   .doc(state.currentUser.uid)
    //   .get()
    //   .then(res => {
    //     if (res.exists) {
    //       commit("setUserProfile", res.data());
    //     } else {
    //       // Create user if not existing
    //       let userData = { name: state.currentUser.displayName, photo: "" }; //authResult.user.photourl || ""
    //       usersCollection
    //         .doc(state.currentUser.uid)
    //         .set(userData)
    //         .then(() => {
    //           commit("setUserProfile", res.data());
    //         });
    //     }
    //   })
    //   .then(() => router.push("/controlroom"))
    //   .catch(err => {
    //     // eslint-disable-next-line
    //     log.error(err);
    //     // router.push("/home");
    //     return false;
    //   });

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
    rtc.onStream = stream => commit("setVideoStream", stream);
    rtc.onMessage = data => {
      this.lastData = data;
      this.altitude = data.altitude;
      this.verticalSpeed = data.verticalSpeed;
      this.speed = data.speed;
      this.acceleration = data.acceleration;
      this.heading = data.heading;
      this.turnRate = data.turnRate;
      this.longitude = data.longitude;
      this.latitude = data.latitude;
      this.speed = data.speed;
    };
    rtc.connect().then(() => rtc.sendMessage("We are connected!"));

    return vehicles.doc(avId).onSnapshot(
      function(res) {
        commit("setActiveVehicle", { val: res.data(), ref: res.ref });
      },
      err => {
        log.error(err);
      }
    );
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
