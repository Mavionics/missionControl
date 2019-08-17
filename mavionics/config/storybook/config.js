/* eslint-disable import/no-extraneous-dependencies */

import Vue from "vue";
import "../../src/custom.scss";

// Install bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import "vue-resize/dist/vue-resize.css";
import VueResize from "vue-resize";
Vue.use(VueResize);

// Install FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { configure } from "@storybook/vue";

const req = require.context("../../tests/stories", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
