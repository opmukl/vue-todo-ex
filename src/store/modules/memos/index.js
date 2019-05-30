import Vue from 'vue';
import api from '@/api/memos';

const state = {
  memosAll: [],
  memos: [],
  staticMemos: []
};

const actions = {
  // 메모 불러오기
  async loadMemos({ commit }) {
    try {
      // const memoList = (await api.getMemos()).data;
      // const staticMemoList = (await api.getStaticMemos()).data;
      // Promise.all([memoList, staticMemoList]).then(values => {
      //   // console.log(values[0]);
      //   // console.log(values[1]);
      //   commit('initMemos', values[0]);
      //   commit('initStaticMemos', values[1]);
      // });
      console.log((await api.getMemos()).data);
      commit('initMemos', (await api.getMemos()).data);
    } catch (e) {
      alert(e);
    }
  },

  async addMemo({ dispatch }, newText) {
    try {
      const ramdomXPos = Math.floor(Math.random() * (3 - 0)) + 0;
      await api.addMemo({
        x: ramdomXPos,
        y: 3,
        w: 1,
        h: 3,
        i: state.memos.length,
        text: newText,
        static: false,
        date: new Date()
      });
      dispatch('loadMemos');
    } catch (e) {
      alert(e);
    }
  },

  async deleteMemo({ dispatch }, id) {
    try {
      if (!confirm('정말 삭제하시겠습니까??')) return;
      await api.deleteMemo(id);
      dispatch('loadMemos');
    } catch (e) {
      alert(e);
    }
  },

  async updateMemo({ dispatch }, memo) {
    try {
      (await api.updateMemo(memo)).data;
      dispatch('loadMemos');
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

const getters = {
  memos: state => {
    return state.memosAll.filter(memo => !memo.static);
  },
  staticMemos: state => {
    return state.memosAll.filter(memo => memo.static);
  }
};

const mutations = {
  initMemos(state, memos) {
    state.memosAll = memos;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
