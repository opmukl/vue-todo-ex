import api from '@/api/auth';

const state = {
  authedUserId: '',
  userAuth: false
};

const getters = {};

const actions = {
  async login({ commit }, { uid, password }) {
    let loginResponse = await api.login(uid, password);

    console.log(loginResponse);
    commit('SETAUTHSTATUS', [uid, loginResponse]);
    // commit('LOGIN', loginResponse);

    // processResponse(store, loginResponse);
    // return store.getters.getIsAuth; // 로그인 결과를 리턴한다
  },
  logout({ commit }) {
    commit('LOGOUT');
  }
};

const mutations = {
  SETAUTHSTATUS(state, [uid, authStatus]) {
    state.authedUserId = uid;
    state.userAuth = authStatus;
    console.log(state.userAuth);
  },

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
