import api from '@/api/auth';
import authStore from '@/store/modules/auth';

const state = {
  authenticatedUserId: '',
  userAuth: false
};

const getters = {};

const actions = {
  async login({ commit }, { uid, password }) {
    const response = await api.login(uid, password);
    alert(response.data.message);
    commit('LOGIN', [uid, response.data.result]);
  },

  async logout({ commit }) {
    // console.log(authenticatedUserId);
    const response = await api.logout();
    alert(response.data.message);
    commit('LOGOUT');
  }
};

const mutations = {
  LOGIN(state, [uid, authStatus]) {
    state.authenticatedUserId = uid;
    state.userAuth = authStatus;
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
