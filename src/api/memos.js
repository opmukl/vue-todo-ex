import axios from 'axios';

class TodosApi {
  constructor() {}

  getMemos() {
    return axios.get('/api/memos');
  }

  getMemo(id) {
    return axios.get(`/api/memos/${id}`);
  }

  getFixedMemos() {
    //api를 한번만 호출해서 filter를 걸어서 static/!static 인지를 판단해
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
