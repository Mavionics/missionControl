import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store, auth } from "./store/store";
import {} from "./assets/customs.css";

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import "vue-resize/dist/vue-resize.css";
import VueResize from "vue-resize";
Vue.use(VueResize);

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
