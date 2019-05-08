import axios from 'axios';

class TodosApi {
  constructor() {}

  getTodos() {
    return axios.get('/api/todos');
  }

  addTodo(newTodo) {
    return axios.post('/api/todos', newTodo);
  }

  deleteTodo(id) {
    return axios.delete(`/api/todos/${id}`);
  }

  updateTodo(todo) {
    return axios.patch(`/api/todos/${todo.id}`, todo);
  }
}

export default new TodosApi();
