import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import StoryRouter from "storybook-vue-router";
import Cockpit from "../../src/views/Cockpit.vue";
import Vue from "vue";
import Vuex from "vuex";
import TestKeys from "../../tests/testkey";

Vue.use(Vuex);

export const storeLI = new Vuex.Store({
  state: {
    currentVehicle: {
      state: {
        speed: 20.1,
        heading: 156,
        altitude: 1985,
        longitude: 34,
        latitude: 18
      }
    },
    cesiumKey: TestKeys.CesiumKey
  },
  getters: {
    currentUser: function() {
      return { name: "Test Testerson" };
    },
    getActiveVehicle(state) {
      return state.currentVehicle;
    },
    cesiumKey(state) {
      return state.cesiumKey;
    }
  },
  actions: {
    connectToVehicle({ state }, avId) {
      state.avId = avId;
    },
    getMapKeys() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve("");
        }, 700);
      });
    }
  }
});

storiesOf("Cockpit", module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs)
  .add("No data", () => ({
    components: { Cockpit },
    template: "<Cockpit/>",
    store: storeLI
  }))
  .add("Some data", () => ({
    components: { Cockpit },
    template: "<Cockpit/>",
    store: storeLI
  }))
  .add("All data", () => ({
    components: { Cockpit },
    template: "<Cockpit/>",
    store: storeLI
  }));
