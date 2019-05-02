import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },

  actions: {
    // todos 초기화
    loadTodos({ commit }) {
      //loadTodos를 호출할때 api 목록을 가져오는 걸 호출 -> commit
      $.ajax({
        url: 'http://localhost:3001/api/todos',
        type: 'GET',
        success: function(data) {
          commit('initTodos', data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    },

    // todos 업데이트
    updateTodos({ commit }, todos) {
      // api.updateTodos(todos);
      // commit('initTodos', api.todos);
    },

    // todo list 추가
    addTodo({ dispatch }, newTodo) {
      $.ajax({
        url: 'http://localhost:3001/api/todos',
        type: 'POST',
        contentType: 'application/json;charset=utf8', //내가 보내는 data 값의 contentType설정
        data: JSON.stringify({
          text: newTodo,
          done: false
        }),
        success: function(data) {
          console.log(data);
          dispatch('loadTodos')
        },
        error: function(error) {
          console.log(error);
        }
      });
    },

    // todo 제거
    deleteTodo({ dispatch }, id) {
      if (!confirm('정말 삭제하시겠습니까??')) return;
      $.ajax({
        url: `http://localhost:3001/api/todos/${id}`,
        type: 'DELETE',
        success: function() {
          dispatch('loadTodos')
        },
        error: function(error) {
          console.log(error);
        }
      });
    },

    // 완료된 todos 제거
    deleteDoneTodos({ commit }) {
      // api.deleteDoneTodos();
      // commit('initTodos', api.todos);
      // json server에서 기능을 제공하는게 없는듯...
    },

    // todo 상태변경
    updateTodo({ dispatch }, todo) {
      // put: 전체를 업데이트
      // patch: 일부만 업데이트
      $.ajax({
        url: `http://localhost:3001/api/todos/${todo.id}`,
        type: 'PATCH',
        contentType: 'application/json;charset=utf8',
        data: JSON.stringify(todo),
        success: function() {
          dispatch('loadTodos')
        },
        error: function(error) {
          console.log(error);
        }
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
