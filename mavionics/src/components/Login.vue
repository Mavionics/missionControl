<template>
    <div class="">
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
    </div>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {auth} from "../firebaseConfig.js";
import store from "../store.js";

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(auth);

export default {
  name: "Login",
  data() {
    return {
      name: "John Silver"
    };
  },
  mounted: () => {
    var config = {
      // signInSuccessUrl: "controlroom",
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          // second parameter available for redirectUrl
          
          store.commit("setCurrentUser", authResult.user);
          store.dispatch("login")
          

          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        }
      }
    };
    ui.start("#firebaseui-auth-container", config);
  }
};
</script>