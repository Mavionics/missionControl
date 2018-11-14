import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// Install Vue plugins.
Vue.use(Buefy)
Vue.use(Vuex)

const req = require.context('../tests/stories', true, /\.stories\.js$/)

function loadStories() {
  // Load a stories in test/stories folder
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);