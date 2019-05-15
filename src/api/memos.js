import axios from 'axios';

class TodosApi {
  constructor() {}

  getMemos() {
    return axios.get('/api/memos');
  }

  addMemo(newText) {
    return axios.post('/api/memos', newText);
  }

  // deleteTodo(id) {
  //   return axios.delete(`/api/todos/${id}`);
  // }

  // updateTodo(todo) {
  //   return axios.patch(`/api/todos/${todo.id}`, todo);
  // }

  // updateTodoList(todos) {
  //   return axios.put(`/api/todos/${todo.id}`, todos);
  // }
}

export default new TodosApi();
