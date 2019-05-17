import axios from 'axios';

class TodosApi {
  constructor() {}

  getMemos() {
    return axios.get('/api/memos');
  }

  addMemo(newText) {
    return axios.post('/api/memos', newText);
  }

  deleteMemo(id) {
    return axios.delete(`/api/memos/${id}`);
  }

  updateMemo(memo) {
    return axios.patch(`/api/memos/${memo.id}`, memo);
  }
}

export default new TodosApi();
