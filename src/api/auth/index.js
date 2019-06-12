import axios from 'axios';
const apiUrl = `/api/auth`;

class loginApi {
  constructor() {}

  getUserInfo(uid, password) {
    return axios.post(`${apiUrl}/login`, {
      uid,
      password
    });
  }

  async login(uid, password) {
    try {
      const getUserInfoPromise = await this.getUserInfo(uid, password);
      console.log(getUserInfoPromise);
      return getUserInfoPromise.data.result;
    } catch (err) {
      console.log(err);
    }
  }

  logout(authenticatedUserId) {
    return axios.post(`${apiUrl}/logout`, authenticatedUserId);
  }
}

export default new loginApi();
