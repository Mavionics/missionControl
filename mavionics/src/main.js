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

Vue.config.productionTip = false;

// handle page reloads. Needs to know auth state before creating router
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
