import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store, auth } from "./store/store";

import "./custom.scss";
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import "vue-resize/dist/vue-resize.css";
import VueResize from "vue-resize";
Vue.use(VueResize);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// handle page reloads. Needs to know auth state before creating router
let app;
auth.onAuthStateChanged(async user => {
  if (user) {
    await store.dispatch("login");
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
