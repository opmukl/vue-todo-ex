import Vue from 'vue';
import api from '@/api/memos';

const state = {
  memos: [],
  popup: {
    id: '',
    text: '',
    isActive: false
  }
};

const actions = {
  // todos 초기화
  async loadMemos({ commit }) {
    commit('initMemos', (await api.getMemos()).data);
  },

  async addMemo({ commit }, newText) {
    console.log(newText);
    commit(
      'addMemo',
      (await api.addMemo({
        text: newText
      })).data
    );
  },

  async updateMemo({ commit }, text) {
    console.log(text);
    // commit('updateMemo', (await api.getMemos()).data);
  },

  async updateLayout(newLayout) {
    console.log(newLayout);
  },

  openMemo({ commit }, { id, text }) {
    // console.log(text)
    this.popup.isActive = true;
    this.popup.text = text;
    this.updateMemo(text);
  },
  closeMemo() {
    this.popup.isActive = false;
    this.popup.text = '';
  }
};
const getters = {};

const mutations = {
  initMemos(state, memos) {
    state.memos = memos;
    console.log(memos);
  },
  addMemo(state, newText) {
    state.memos.push(newText);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
