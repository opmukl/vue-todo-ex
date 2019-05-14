import Vue from 'vue';
import api from '@/api/memos';

const state = {
  memos: []
};

const actions = {
  // todos 초기화
  async loadMemos({ commit }) {
    commit('initMemos', (await api.getMemos()).data);
  }
};
const getters = {};

const mutations = {
  initMemos(state, memos) {
    state.memos = memos;
    console.log('sss');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
