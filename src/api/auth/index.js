import axios from 'axios';
const apiUrl = `/api/auth`;

class loginApi {
  constructor() {}

  // getUserInfo(uid, password) {
  //   return axios.post(`${apiUrl}/login`, {
  //     uid,
  //     password
  //   });
  // }

  async login(uid, password) {
    try {
      return await axios.post(`${apiUrl}/login`, {
        uid,
        password
      });
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    return axios.get(`${apiUrl}/logout`);
  }
}

export default new loginApi();
