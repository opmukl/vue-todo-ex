import axios from 'axios';

class TodosApi {
  constructor() {}

  getTodos() {
    return axios.get('/api/todos');
  }

  addTodo(newTodo) {
    //일반적으로 add api 호출해서 시간을 같이 담아서 반환
    return axios.post('/api/todos', newTodo);
  }

  deleteTodo(id) {
    return axios.delete(`/api/todos/${id}`);
  }

  updateTodo(todo) {
    return axios.patch(`/api/todos/${todo.id}`, todo);
  }

  updateTodoList(todos) {
    return axios.put(`/api/todos/${todo.id}`, todos);
  }
}

export default new TodosApi();
