import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";
import StoryRouter from "storybook-vue-router";
import Cockpit from "../../src/views/Cockpit.vue";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const speedKnobOptions = {
  range: true,
  min: 0,
  max: 250,
  step: 1
};
export const storeLI = new Vuex.Store({
  state: {
    currentVehicle: {
      state: {
        speed: number("speed", 20.1, speedKnobOptions),
        heading: 156,
        altitude: 1985
      }
    }
  },
  getters: {
    currentUser: function() {
      return { name: "Test Testerson" };
    },
    getActiveVehicle(state) {
      return state.currentVehicle;
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
