import axios from 'axios';
const apiUrl = `/api/todos`;

class TodosApi {
  constructor() {}

  getTodos() {
    return axios.get(apiUrl);
  }

  addTodo(newTodo) {
    return axios.post(apiUrl, newTodo);
  }

  deleteTodo(id) {
    return axios.delete(`${apiUrl}/${id}`);
  }

  deleteDoneTodos() {
    return axios.put(apiUrl);
  }

  updateTodo(todo) {
    return axios.patch(`${apiUrl}/${todo.id}`, todo);
  }

  updateTodoList(todos) {
    return axios.put(apiUrl, todos);
  }
}

export default new TodosApi();
