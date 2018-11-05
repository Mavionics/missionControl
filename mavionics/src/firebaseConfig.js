import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain:process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}

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
const mapsCollection = db.collection('maps')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    vehiclesCollection,
    mapsCollection
}