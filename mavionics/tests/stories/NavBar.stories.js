import { storiesOf } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import Navbar from "../../src/components/Navbar.vue";

storiesOf("Navbar", module)
  .addDecorator(StoryRouter())
  .add("Normal not logged in", () => ({
    components: { Navbar },
    template: "<Navbar :show-brand=true style='background: blue'/>"
  }))
  .add("No brand not logged in", () => ({
    components: { Navbar },
    template: "<Navbar :show-brand=false style='background: blue'/>"
  }))
  .add("Normal logged in", () => ({
    components: { Navbar },
    template: '<Navbar :isAuthenticated=true :currentUser="currentUser" style="background: blue"/>',
    data() {
      return { currentUser: { name: "Henrik" } };
    }
  }))
  .add("No brand logged in", () => ({
    components: { Navbar },
    template: "<Navbar :isAuthenticated=true :show-brand=false style='background: blue'/>",
    data() {
      return { currentUser: { name: "Henrik" } };
    }
  }));
