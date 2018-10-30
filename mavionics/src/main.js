import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebaseConfig.js';
import {  } from "./assets/customs.css";

Vue.config.productionTip = false

// handle page reloads
let app 
auth.onAuthStateChanged(() => {
      if (!app) {
        app = new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app');
      }})