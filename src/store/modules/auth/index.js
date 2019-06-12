import api from '@/api/auth';

const state = {
  authedUserId: '',
  userAuth: false
};

const getters = {};

const actions = {
  async login({ commit }, { uid, password }) {
    let loginResponse = await api.login(uid, password);
    commit('LOGIN', [uid, loginResponse]);
  },

  logout({ commit }) {
    commit('LOGOUT');
  }
};

const mutations = {
  LOGIN(state, [uid, authStatus]) {
    state.authedUserId = uid;
    state.userAuth = authStatus;
    console.log(state.userAuth);
  },

  LOGOUT(state) {
    state.authedUserId = '';
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
