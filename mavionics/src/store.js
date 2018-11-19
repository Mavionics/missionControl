import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import * as log from 'loglevel';
import {
  auth,
  usersCollection,
  vehiclesCollection,
  mapsCollection
} from './firebaseConfig.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    cesiumKey: "",
    userProfile: {},
    vehicles: [],
    currentVehicle: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setCesiumKey(state, val) {
      state.cesiumKey = val
    },
    setActiveVehicle(state, val) {
      state.currentVehicle =  val
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
    loginE({ commit, dispatch }, {email, password}){
      auth.signInWithEmailAndPassword(email, password).then((authResult) => {
        commit("setCurrentUser", authResult.user)
        dispatch('login')})
    },
    login({ commit, state }) {
      // Try getting userdata
      usersCollection.doc(state.currentUser.uid).get().then(res => {
        if (res.exists) {
          commit('setUserProfile', res.data());
        }
        else {
          // Create user if not existing
          let userData = {
            name: state.currentUser.displayName,
            photo: "" //authResult.user.photourl || ""
          };
          usersCollection
          .doc(state.currentUser.uid)
          .set(userData).then(()=>{
            commit('setUserProfile', res.data());
          });
        }
      })
      .catch(err => {
        // eslint-disable-next-line
        log.error(err);
        // router.push("/home");
        return false;
      });
  
      vehiclesCollection.where("owner", "==", state.currentUser.uid).onSnapshot(querySnapshot => {
        state.vehicles = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          log.info(doc.id, " => ", doc.data());
          let avInfo = doc.data();
          avInfo.id = doc.id;
          state.vehicles.push(avInfo);
        })
      }, err => {
        log.error(err)
      });
  
      mapsCollection.doc("cesium").get().then(
        res => {
          commit('setCesiumKey', res.data().default)
        }, err => {
          log.error(err)
        })
        .then(()=>router.push("/controlroom"));
    },
    logout({ commit }) {
      auth.signOut().then(() => {
        commit('setUserProfile', null)
        commit('setCurrentUser', null)
      })
    },
    connectToVehicle({commit}, {avId}){
      vehiclesCollection.doc(avId).get().then(
        res => {
          commit('setActiveVehicle', res.data());
        }
      , err => {
        log.error(err)
      });
    }
  }
})