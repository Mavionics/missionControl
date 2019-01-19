/**
 * reference
 * https://github.com/weexteam/weex-hackernews/tree/master/src/store
 */

import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    user: null,
    activeType: 'posts',
    posts: [],
    vehicles: [],
    activeVehicle: null,
    logging_in: false,
    loadingPosts: false
  }
});

export default store;
