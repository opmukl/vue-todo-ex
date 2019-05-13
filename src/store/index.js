import Vue from 'vue';
import Vuex from 'vuex';
import todos from './modules/todos/index';
import memos from './modules/memos/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    memos
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
