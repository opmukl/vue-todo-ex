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
    loadTodos(context) {
      api.getTodos().then(res => {
        context.commit('initTodos', res.data);
      });
    },
    // loadTodos({ commit, state }) {
    //   //loadTodos를 호출할때 api 목록을 가져오는 걸 호출 -> commit
    //   // commit('initTodos', api.todos);
    //   $.ajax({
    //     url: '/api/todos',
    //     type: 'GET',
    //     success: function(data) {
    //       // (??) 여기서 todos를 업데이트 시켜줘도 되나용
    //       state.todos = data;
    //     },
    //     error: function(error) {
    //       console.log(error);
    //     }
    //   });
    // },

    // todos 업데이트
    updateTodos({ commit }, todos) {
      api.updateTodos(todos);
      commit('initTodos', api.todos);
    },

    // todo list 추가
    addTodo({ commit }, newTodo) {
      // api.addTodo(newTodo);

      $.ajax({
        url: '/api/todos',
        type: 'GET',
        success: function(data) {
          // (??) 여기서 todos를 업데이트 시켜줘도 되나용
          state.todos = data;
        },
        error: function(error) {
          console.log(error);
        }
      });

      // commit('addTodo', newTodo)
      commit('initTodos', api.todos);
    },

    // todo 제거
    deleteTodo({ commit }, todoId) {
      if (!confirm('정말 삭제하시겠습니까??')) return;
      api.deleteTodo(todoId);
      commit('deleteTodo', todoId);
    },

    // 완료된 todos 제거
    deleteDoneTodos({ commit }) {
      api.deleteDoneTodos();
      commit('initTodos', api.todos);
    },

    // todo text 변경
    updateTodoText({ commit }, [todoId, editedText]) {
      api.updateTodoText(todoId, editedText);
      // (??) api에서 todo update되고 나서 mutation을 통해서 state변화가 필요한가?
      commit('updateTodoText', [todoId, editedText]);
    },

    // todo 완료상태
    updateDoneState({ commit }, todoId) {
      api.updateDoneState(todoId);
      commit('updateDoneState', todoId);
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
    }

    // addTodo(state, newTodo) {
    //   const maxList =
    //     state.todos.length > 0
    //       ? Math.max(...state.todos.map(todo => todo.id))
    //       : 0
    //   state.todos.push({
    //     text: newTodo,
    //     id: maxList + 1,
    //     done: false
    //   })
    // },

    // deleteTodo(state, todoId) {
    //   const selectedIdx = state.todos.findIndex(todo => todo.id === todoId)
    //   if (selectedIdx > -1) state.todos.splice(selectedIdx, 1)
    // },

    // deleteDoneTodos(state) {
    //   state.todos = state.todos.filter(todo => !todo.done)
    // },

    // updateTodoText(state, [todoId, editedText]) {
    //   const todo = state.todos.find(todo => todo.id === todoId)
    //   todo.text = editedText
    // },

    // updateDoneState(state, todoId) {
    //   const todo = state.todos.find(todo => todo.id === todoId)
    //   todo.done = !todo.done
    // }
  }
});
