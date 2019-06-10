import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account/index';
import todos from './modules/todos/index';
import memos from './modules/memos/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    todos,
    memos
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
