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

  isFinished(uid) {
    return axios.get(apiUrl, {
      params: {
        uid: uid
      }
    });
  }

  async login(uid, password) {
    try {
      const getUserInfoPromise = await this.getUserInfo(uid, password);
      console.log(getUserInfoPromise);
      // const isFinishedPromise = await isFinished(uid);
      // const [userinfoResponse, isFinishedResponse] = await promised.all([
      //   getUserInfoPromise,
      //   isFinishedPromise
      // ]);
      // if (userinfoResponse.data.length === 0) return 'noAuth';
      // if (isFinishedResponse.data[0].CNT > 0) return 'done';
      return getUserInfoPromise.data.result;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new loginApi();
