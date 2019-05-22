import Vue from 'vue';
import api from '@/api/memos';

const state = {
  memos: []
};

const actions = {
  // 초기화
  async loadMemos({ commit }) {
    try {
      commit('initMemos', (await api.getMemos()).data);
    } catch (e) {
      alert(e);
    }
  },

  async addMemo({ commit }, newText) {
    try {
      const ramdomXPos = Math.floor(Math.random() * (3 - 0)) + 0;
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
    } catch (e) {
      alert(e);
    }
  },

  async deleteMemo({ commit }, id) {
    try {
      if (!confirm('정말 삭제하시겠습니까??')) return;
      await api.deleteMemo(id);
      commit('deleteMemo', id);
    } catch (e) {
      alert(e);
    }
  },

  async updateMemo({ commit }, memo) {
    try {
      commit('updateMemo', (await api.updateMemo(memo)).data);
    } catch (e) {
      alert(e);
    }
  },

  async switchStatic({ commit }, id) {
    try {
      let memo = (await api.getMemo(id)).data;
      memo.static = !memo.static;
      commit('updateMemo', (await api.updateMemo(memo)).data);
    } catch (e) {
      alert(e);
    }
  },

  async updateLayout({ commit }, memos) {
    try {
      await Promise.all(memos.map(memo => api.deleteMemo(memo.id)));
      const values = await Promise.all(memos.map(memo => api.addMemo(memo)));
      commit('initMemos', values.map(value => value.data));
    } catch (e) {
      alert(e);
    }
  }
};

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
  actions,
  mutations
};
