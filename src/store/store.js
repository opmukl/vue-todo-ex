import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },

  actions: {
    // todos 초기화
    async loadTodos(context) {
      context.commit('initTodos', (await api.getTodos()).data);
    },

    // todos 업데이트
    updateTodoList({ commit }, todos) {
      Promise.all(todos.map(todo => api.deleteTodo(todo.id))).then(() => {
        Promise.all(
          todos.map(todo => api.addTodo({ text: todo.text, done: todo.done }))
        ).then(values => {
          commit('updateTodoList', values.map(value => value.data));
        });
      });
    },

    // todo list 추가
    addTodo(context, newTodo) {
      api
        .addTodo({
          text: newTodo,
          done: false
        })
        .then(res => {
          context.commit('addTodo', res.data);
        });
    },

    // todo 제거
    deleteTodo(context, id) {
      if (!confirm('정말 삭제하시겠습니까??')) return;
      api.deleteTodo(id).then(res => {
        context.commit('deleteTodo', id);
      });
    },

    // 완료된 todos 제거
    // deleteTodo({ dispatch }, id) {
    //   if (!confirm('정말 삭제하시겠습니까??')) return;
    //   $.ajax({
    //     url: `http://localhost:3001/api/todos/${id}`,
    //     type: 'DELETE',
    //     success: function() {
    //       dispatch('loadTodos');
    //     },
    //     error: function(error) {
    //       console.log(error);
    //     }
    //   });
    // },

    // todo 업데이트
    updateTodo(context, todo) {
      api.updateTodo(todo).then(res => {
        context.commit('updateTodo', res.data);
      });
    }
  },

  getters: {
    countHaveTodos: state => {
      return state.todos.filter(todo => !todo.done).length;
    }
  },

  // state의 값 변화는 mutation을 통해 실행될 것
  mutations: {
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
  }
});
