import axios from 'axios';
const apiUrl = `api/memos/`;

class TodosApi {
  constructor() {}

  getMemos() {
    return axios.get(apiUrl + `?static=false`);
  }

  getMemo(id) {
    return axios.get(apiUrl + `${id}`);
  }

  getStaticMemos() {
    return axios.get(apiUrl + `?static=true`);
    //api를 한번만 호출해서 filter를 걸어서 static/!static 인지를 판단해
  }

  addMemo(newText) {
    return axios.post(apiUrl, newText);
  }

  deleteMemo(id) {
    return axios.delete(apiUrl + `${id}`);
  }

  updateMemo(memo) {
    return axios.patch(apiUrl + `${memo.id}`, memo);
  }
}

export default new TodosApi();
