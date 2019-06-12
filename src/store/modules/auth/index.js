import api from '@/api/auth';
import authStore from '@/store/modules/auth';

const state = {
  authenticatedUserId: '',
  userAuth: false
};

const getters = {};

const actions = {
  async login({ commit }, { uid, password }) {
    commit('LOGIN', [uid, await api.login(uid, password)]);
  },

  async logout({ commit }, authenticatedUserId) {
    // console.log(authenticatedUserId);
    await api.logout(authenticatedUserId);
    // commit('LOGOUT');
  }
};

const mutations = {
  LOGIN(state, [uid, authStatus]) {
    state.authenticatedUserId = uid;
    state.userAuth = authStatus;
    console.log(state.userAuth);
  },

  LOGOUT(state) {
    state.authenticatedUserId = '';
    state.userAuth = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
