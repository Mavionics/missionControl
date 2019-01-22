import { storiesOf } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import Cockpit from "../../src/views/Cockpit.vue";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const storeLI = new Vuex.Store({
  state: {
    avRef: null,
    avId: null
  },
  getters: {
    currentUser: function() {
      return { name: "Test Testerson" };
    }
  },
  actions: {
    connectToVehicle({ state }, avId) {
      state.avId = avId;
    }
  }
});

storiesOf("Cockpit", module)
  .addDecorator(StoryRouter())
  .add("No data", () => ({
    components: { Cockpit },
    template: "<Cockpit/>",
    store: storeLI
  }))
  .add("Some data", () => ({
    components: { Cockpit },
    template: "<Cockpit/>",
    store: storeLI,
    data() {
      return { speed: 20 };
    }
  }))
  .add("All data", () => ({
    components: { Cockpit },
    template: "<Cockpit/>",
    store: storeLI,
    data() {
      return { speed: 20, heading: 156, altiude: 1985 };
    }
  }));
