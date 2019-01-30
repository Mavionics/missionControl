<template>
  <div class>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "@/store/store.js";

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(auth);

export default {
  name: "Login",
  mounted: () => {
    var config = {
      signInSuccessUrl: "/controlroom",
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
        signInSuccessWithAuthResult: authResult => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          // second parameter available for redirectUrl

          // Actual login handled by aut.onAuthStateChanged
          return true;
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