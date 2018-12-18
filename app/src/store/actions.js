import { fetchPosts } from './fetch';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()

// ensure data for rendering given list type
export function FETCH_LIST_DATA ({ commit, dispatch }, { type }) {
  commit('FETCHING_LISTS');
  return fetchPosts(type)
    .then(posts => {
      return commit('SET_POSTS', { posts })
    });
}

export function LOGIN ({ commit, state}, {userObj, navigate}) {
  commit('LOGGING_IN', true)
  return auth.signInWithEmailAndPassword(userObj.email, userObj.password)
  .then((authResult) => {
    setTimeout(() => {
      commit('LOGIN_SUCCESFULL', {userObj})
      AsyncStorage.setItem('email', userObj.email)
      navigate('Home');
      resolve();
    }, 1000)
  })
}

export function SET_USER({commit, state}, {userObj}) {
  return commit('LOGIN_SUCCESFULL', {userObj})
}

export function LOGOUT ({ commit, state}, callback) {
  return new Promise((resolve, reject) => {
      AsyncStorage.removeItem('email').then(() => {
        callback();
        resolve();
      })
  })
}