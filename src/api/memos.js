import axios from 'axios';
const apiUrl = `/api/memos`;

class TodosApi {
  constructor() {}

  getMemos() {
    return axios.get(apiUrl);
  }

  addMemo(newText) {
    return axios.post(apiUrl, newText);
  }

  deleteMemo(id) {
    return axios.delete(`${apiUrl}/${id}`);
  }

  updateMemo(memo) {
    return axios.patch(`${apiUrl}/${memo.id}`, memo);
  }
}

export default new TodosApi();
