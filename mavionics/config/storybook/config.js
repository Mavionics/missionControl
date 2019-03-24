/* eslint-disable import/no-extraneous-dependencies */
// Install Buefy for styles
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

import "vue-resize/dist/vue-resize.css";
import VueResize from "vue-resize";
Vue.use(VueResize);
import { configure } from "@storybook/vue";

const req = require.context("../../tests/stories", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
