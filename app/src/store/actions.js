import firebase from 'react-native-firebase';
import {PermissionNotifier} from '../components/permissions'

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

export function FETCH_VEHICLES (
  { commit, dispatch }, 
  {user, navigate}) {
    vehiclesCollection.where("owner", "==", user.uid).onSnapshot(querySnapshot => {
      commit('CLEAR_VEHICLES')
      querySnapshot.forEach(doc => {
        let vehicle = doc.data();
        vehicle.id = doc.id;
        vehicle.navigate = navigate
        commit('SET_VEHICLE', vehicle)
      })
    }, err => {
      console.warn(err)
    });
}

export function SET_ACTIVE_VEHICLE (
  { commit, dispatch },
  vehicle) {
    commit('SET_ACTIVE_VEHICLE', vehicle)
}

export function SET_POSITION (
  { commit, dispatch },
  position) {
    console.log("action.js, SET_POSITION, latitude: " + position.coords.latitude + " longitude: " + position.coords.longitude)
    commit('SET_POSITION', position)
}

export function REQUEST_ALL_PERMISSIONS (
  { commit, dispatch }) {
    commit('SET_PERMISSION_STATUS', true);
    PermissionNotifier.requestCameraPermission()
    .then((status)=>{
      commit('AND_PERMISSION_STATUS', status)
      PermissionNotifier.requestCoarseLocationPermission()
      .then((status)=>{
        commit('AND_PERMISSION_STATUS', status)
        PermissionNotifier.requestFineLocationPermission()
        .then((status)=>{
          commit('AND_PERMISSION_STATUS', status)
          PermissionNotifier.requestRecordAudioPermission()
          .then((status)=>{
            commit('AND_PERMISSION_STATUS', status)
            PermissionNotifier.requestStoragePermission()
          })
        })
      })
    })
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
