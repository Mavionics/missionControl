import { storiesOf } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import Layout from "../../src/components/Layout.vue";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const storeNLI = new Vuex.Store({
  getters: {
    currentUser: function() {}
  }
});

export const storeLI = new Vuex.Store({
  getters: {
    currentUser: function() {
      return { name: "Test Testerson" };
    }
  }
});

storiesOf("Layout", module)
  .addDecorator(StoryRouter())
  .add("Normal not logged in", () => ({
    components: { Layout },
    template:
      '<Layout><div class="container"><h1>This is a page</h1></div></Layout>',
    store: storeNLI
  }))

  .add("Normal logged in", () => ({
    components: { Layout },
    template:
      '<Layout><div class="container"><h1>This is a page</h1></div></Layout>',
    store: storeLI
  }))

  .add("Large logo logged in", () => ({
    components: { Layout },
    template:
      '<Layout :large-logo=true><div class="container"><h1>This is a page</h1></div></Layout>',
    store: storeLI
  }));
