import { storiesOf } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import Navbar from "../../src/components/Navbar.vue";

storiesOf("Navbar", module)
  .addDecorator(StoryRouter())
  .add("Normal not logged in", () => ({
    components: { Navbar },
    template: "<Navbar :show-brand=true />"
  }))
  .add("No brand not logged in", () => ({
    components: { Navbar },
    template: "<Navbar :show-brand=false />"
  }))
  .add("Normal logged in", () => ({
    components: { Navbar },
    template: '<Navbar :currentUser="currentUser" />',
    data() {
      return { currentUser: { name: "Henrik" } };
    }
  }));
