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
    const ramdomXPos = Math.floor(Math.random() * (3 - 0)) + 0;
    console.log(ramdomXPos);
    commit(
      'addMemo',
      (await api.addMemo({
        x: ramdomXPos,
        y: 3,
        w: 1,
        h: 3,
        i: state.memos.length,
        text: newText,
        date: new Date()
      })).data
    );
  },

  async deleteMemo({ commit }, id) {
    if (!confirm('정말 삭제하시겠습니까??')) return;
    await api.deleteMemo(id);
    commit('deleteMemo', id);
  },

  async updateMemo({ commit }, memo) {
    // console.log(memo);
    commit('updateMemo', (await api.updateMemo(memo)).data);
  },

  async switchStatic({ commit }, memo) {
    // console.log(memo);
    // const test = { ...memo, static: !memo.static };
    // console.log(test);
    commit(
      'updateMemo',
      (await api.updateMemo({ ...memo, static: !memo.static })).data
    );
  },

  async updateLayout({ commit }, memos) {
    await Promise.all(memos.map(memo => api.deleteMemo(memo.id)));
    const values = await Promise.all(memos.map(memo => api.addMemo(memo)));
    commit('initMemos', values.map(value => value.data));
  }
};
const getters = {};

const mutations = {
  initMemos(state, memos) {
    state.memos = memos;
  },

  addMemo(state, newText) {
    state.memos.push(newText);
  },

  deleteMemo(state, id) {
    const selectedIdx = state.memos.findIndex(memo => memo.id === id);
    if (selectedIdx > -1) state.memos.splice(selectedIdx, 1);
  },

  updateMemo(state, memo) {
    const selectedIdx = state.memos.findIndex(m => m.id === memo.id);
    Vue.set(state.memos, selectedIdx, memo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
