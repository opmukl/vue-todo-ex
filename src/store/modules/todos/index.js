import Vue from 'vue';
import api from '@/api/todos';

const state = {
  todos: []
};

const actions = {
  // todos 초기화
  async loadTodos({ commit }) {
    try {
      console.log('loadTodos');
      commit('initTodos', (await api.getTodos()).data);
    } catch (e) {
      alert(e);
    }
  },

  // todo 추가
  async addTodo({ commit }, newTodo) {
    try {
      commit(
        'addTodo',
        (await api.addTodo({
          text: newTodo,
          done: false
        })).data
      );
    } catch (e) {
      alert(e);
    }
  },

  // todo 제거
  async deleteTodo({ commit }, id) {
    try {
      if (!confirm('정말 삭제하시겠습니까??')) return;
      await api.deleteTodo(id);
      commit('deleteTodo', id);
    } catch (e) {
      alert(e);
    }
  },

  // 완료된 todos 제거
  async deleteDoneTodos() {
    console.log('dddd');
  },

  // todo 업데이트
  async updateTodo({ dispatch }, todo) {
    try {
      await api.updateTodo(todo);
      dispatch('loadTodos');
      // (await api.updateTodo(todo)).data;
      // commit('updateTodo', (await api.updateTodo(todo)).data);
    } catch (e) {
      alert(e);
    }
  },

  async toggleDoneState({ commit }, id) {
    try {
      commit('toggleDoneState', (await api.toggleDoneState(todo)).data);
    } catch (e) {
      alert(e);
    }
  },

  // todo list 업데이트
  async updateTodoList({ commit }, todos) {
    try {
      await Promise.all(todos.map(todo => api.deleteTodo(todo.id)));
      const values = await Promise.all(
        todos.map(todo => api.addTodo({ text: todo.text, done: todo.done }))
      );
      commit('initTodos', values.map(value => value.data));
    } catch (e) {
      alert(e);
    }
  }
};
const getters = {
  countHaveTodos: state => {
    return state.todos.filter(todo => !todo.done).length;
  }
};

const mutations = {
  initTodos(state, todos) {
    state.todos = todos;
  },

  addTodo(state, newTodo) {
    state.todos.push(newTodo);
  },

  deleteTodo(state, id) {
    const selectedIdx = state.todos.findIndex(todo => todo.id === id);
    if (selectedIdx > -1) state.todos.splice(selectedIdx, 1);
  },

  updateTodo(state, todo) {
    const selectedIdx = state.todos.findIndex(t => t.id === todo.id);
    Vue.set(state.todos, selectedIdx, todo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
