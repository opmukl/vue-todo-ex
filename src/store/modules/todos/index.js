import Vue from 'vue';
import api from '@/api/todos';

const state = {
  todos: []
};

const actions = {
  // todos 초기화
  async loadTodos({ commit }) {
    commit('initTodos', (await api.getTodos()).data);
  },

  // todo 추가
  async addTodo({ commit }, newTodo) {
    // api에서...!
    commit(
      'addTodo',
      (await api.addTodo({
        text: newTodo,
        done: false
      })).data
    );
  },

  // todo 제거
  async deleteTodo({ commit }, id) {
    if (!confirm('정말 삭제하시겠습니까??')) return;
    await api.deleteTodo(id);
    commit('deleteTodo', id);
  },

  // 완료된 todos 제거
  async deleteDoneTodos() {
    console.log('dddd');
    //index 나 id 값으로 done값이 true인 것들 체크해서 배열에 담기
    // .map 돌려서 deleteTodo
    // console.log(state.totos);
    // state.totos.map(todo => {
    //   console.log(todo);
    // });
  },

  // todo 업데이트
  async updateTodo({ commit }, todo) {
    commit('updateTodo', (await api.updateTodo(todo)).data);
  },

  // todo list 업데이트
  async updateTodoList({ commit }, todos) {
    await Promise.all(todos.map(todo => api.deleteTodo(todo.id)));
    const values = await Promise.all(
      todos.map(todo => api.addTodo({ text: todo.text, done: todo.done }))
    );
    commit('updateTodoList', values.map(value => value.data));
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
  },

  updateTodoList(state, todos) {
    state.todos = todos;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
