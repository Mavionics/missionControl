/**
 * reference
 * https://github.com/weexteam/weex-hackernews/tree/master/src/store
 */

import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import { getEmptyState } from './state';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,

  state: getEmptyState()
});

export default store;
