import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/index';
import todos from './modules/todos/index';
import memos from './modules/memos/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    todos,
    memos
  },
  state: {
    authedUid: 'null',
    isLogined: false
  },
  getters: {},
  mutations: {},
  actions: {}
});
