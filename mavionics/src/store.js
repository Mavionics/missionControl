import Vue from 'vue'
import Vuex from 'vuex'
import {
  auth,
  usersCollection,
  vehiclesCollection, 
  mapsCollection
} from './firebaseConfig.js';
// import {
//   state
// } from 'fs';

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
  actions: {
    fetchUserProfile({      commit,      state    }) {
      usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      });
      
      vehiclesCollection.where("owner", "==", state.currentUser.uid).onSnapshot(querySnapshot => {
        state.vehicles = []
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          state.vehicles.push(doc.data());
        })
      }, err => {
        console.log(err)
      });

      mapsCollection.doc("cesium").get().then(
        res=>{
          commit('setCesiumKey', res.data().default)
      }, err => {
        console.log(err)
      });
    }
  },
  logout({commit, state}){
    auth.logout();
    commit('setUserProfile', null)
  }
})