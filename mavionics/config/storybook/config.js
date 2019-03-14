/* eslint-disable import/no-extraneous-dependencies */
import { withOptions } from "@storybook/addon-options";
import { themes } from "@storybook/components";
import { addDecorator, configure } from "@storybook/vue";

// Install Buefy for styles
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

const req = require.context("../../tests/stories", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withOptions({
    name: "My Storybook",
    theme: themes.normal
  })
);

configure(loadStories, module);
