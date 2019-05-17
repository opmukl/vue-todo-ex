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

  getTime() {
    const d = new Data();
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDay();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const currentTime = `${year}년 ${month}월 ${date}일 ${hour}시 ${minutes}분`;
    return currentTime;
  }

  // updateTodoList(todos) {
  //   return axios.put(`/api/todos/${todo.id}`, todos);
  // }
}

export default new TodosApi();
