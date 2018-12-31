import { fetchPosts } from './fetch';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()

// firebase collections
const vehiclesCollection = db.collection('vehicles')

// ensure data for rendering given list type
export function FETCH_LIST_DATA ({ commit, dispatch }, { type }) {
  commit('FETCHING_LISTS');
  return fetchPosts(type)
    .then(posts => {
      return commit('SET_POSTS', { posts })
    });
}

export function FETCH_VEHICLES ({ commit, dispatch }, user) {
    vehiclesCollection.where("owner", "==", user.uid).onSnapshot(querySnapshot => {
      commit('CLEAR_VEHICLES')
      querySnapshot.forEach(doc => {
        //log.info(doc.id, " => ", doc.data());
        let vehicle = doc.data();
        vehicle.id = doc.id;
        commit('SET_VEHICLE', vehicle)
      })
    }, err => {
      //log.error(err)
    });
}

export function LOGIN ({ commit, state}, {userObj, navigate}) {
  commit('LOGGING_IN', true)
  return auth.signInWithEmailAndPassword(userObj.email, userObj.password)
  .then((authResult) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', authResult.user)
      navigate('Home');
    }, 1000)
  })
}

export function AUTOLOGIN ({ commit, state}, {navigate}) {
if(auth.currentUser != null){
      commit('LOGIN_SUCCESFULL', auth.currentUser);
      navigate('Home');
    }
}

export function LOGOUT ({ commit, state}, callback) {
  return new Promise((resolve, reject) => {
      AsyncStorage.removeItem('email').then(() => {
        callback();
        resolve();
      })
  })
}