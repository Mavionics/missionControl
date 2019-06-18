import { storiesOf } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import Loader from "../../src/components/Loader.vue";

storiesOf("Loader", module)
  .addDecorator(StoryRouter())
  .add("Normal", () => ({
    components: { Loader },
    template: "<Loader/>"
  }));
