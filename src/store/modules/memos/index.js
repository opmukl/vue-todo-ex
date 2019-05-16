import Vue from 'vue';
import api from '@/api/memos';

const state = {
  memos: []
};

const actions = {
  // todos 초기화
  async loadMemos({ commit }) {
    commit('initMemos', (await api.getMemos()).data);
  },

  async addMemo({ commit }, newText) {
    console.log(newText.length);
    // commit(
    //   'addMemo',
    //   (await api.addMemo({
    //     x: 0,
    //     y: 0,
    //     w: 2,
    //     h: 1,
    //     i: state.memos.length,
    //     text: newText
    //   })).data
    // );
  },

  async updateMemo({ commit }, memo) {
    // console.log(memo);
    commit('updateMemo', (await api.updateMemo(memo)).data);
  },

  async updateLayout(newLayout) {
    console.log(newLayout);
  }
};
const getters = {};

const mutations = {
  initMemos(state, memos) {
    state.memos = memos;
    console.log(memos);
  },
  addMemo(state, newText) {
    console.log(Math.max(state.memos));
    state.memos.push(newText);
  },
  updateMemo(state, memo) {
    const selectedIdx = state.memos.findIndex(m => m.id === memo.id);
    Vue.set(state.memos, selectedIdx, memo);

    // console.log(state);
    // console.log(memo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
