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
    vehicles: []
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
      // create user obj
      usersCollection
      .doc(state.currentUser.uid)
      .set({
        name: state.currentUser.displayName,
        photo: "" //authResult.user.photourl || ""
      })
      .then(() => {
        usersCollection.doc(state.currentUser.uid).get().then(res => {
          commit('setUserProfile', res.data())
        }).catch(err => {
          log.error(err)
        });
  
        vehiclesCollection.where("owner", "==", state.currentUser.uid).onSnapshot(querySnapshot => {
          state.vehicles = []
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            log.info(doc.id, " => ", doc.data());
            state.vehicles.push(doc.data());
          })
        }, err => {
          log.error(err)
        });
  
        mapsCollection.doc("cesium").get().then(
          res => {
            commit('setCesiumKey', res.data().default)
          }, err => {
            log.error(err)
          });

        router.push("/controlroom");
      })
      .catch(err => {
        // eslint-disable-next-line
        log.error(err);
        // router.push("/home");
        return false;
      });
    },
    logout({ commit }) {
      auth.signOut().then(() => {
        commit('setUserProfile', null)
        commit('setCurrentUser', null)
      })
    }
  }
})