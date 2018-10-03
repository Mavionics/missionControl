import firebase from 'firebase'
import 'firebase/firestore'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_kVeuLIVb4gRSpbt60qml04oTgXd9lg4",
    authDomain: "mavionics-a142a.firebaseapp.com",
    databaseURL: "https://mavionics-a142a.firebaseio.com",
    projectId: "mavionics-a142a",
    storageBucket: "mavionics-a142a.appspot.com",
    messagingSenderId: "539361306649"
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const vehiclesCollection = db.collection('vehicles')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    vehiclesCollection
}