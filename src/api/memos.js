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

  updateMemo(memo) {
    return axios.patch(`/api/memos/${memo.id}`, memo);
  }

  // updateTodoList(todos) {
  //   return axios.put(`/api/todos/${todo.id}`, todos);
  // }
}

export default new TodosApi();
