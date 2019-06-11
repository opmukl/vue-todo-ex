import api from '@/api/auth';
import * as types from './type';

const state = {
  accessToken: null
};

const getters = {};

const actions = {
  // async login({ commit }, { uid, password }) {
  //   console.log('auth index.js actions 안이다 여긴');
  //   let loginResponse = await api.login(uid, password);
  //   commit('LOGIN', loginResponse);
  //   // processResponse(store, loginResponse);
  //   // return store.getters.getIsAuth; // 로그인 결과를 리턴한다
  // },
  // logout({ commit }) {
  //   commit('LOGOUT');
  // }
};

const mutations = {
  LOGIN(state, { accessToken }) {
    state.accessToken = accessToken;
  },
  LOGOUT(state) {
    state.accessToken = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
