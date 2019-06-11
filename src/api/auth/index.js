import axios from 'axios';
const apiUrl = `/api/auth`;
// const getUserInfo = (uid, password) => {
//   console.log('getUserInfo');
//   return axios.get(apiUrl, {
//     params: {
//       uid: uid,
//       password: password
//     }
//   });
// };

// const isFinished = uid => {
//   return axios.get('/endpoint-for-is-finished', {
//     params: {
//       uid: uid
//     }
//   });
// };
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
      // const isFinishedPromise = await isFinished(uid);
      // const [userinfoResponse, isFinishedResponse] = await promised.all([
      //   getUserInfoPromise,
      //   isFinishedPromise
      // ]);
      // if (userinfoResponse.data.length === 0) return 'noAuth';
      // if (isFinishedResponse.data[0].CNT > 0) return 'done';
      return getUserInfoPromise;
    } catch (err) {
      console.log(uid, password);
      console.log(err);
    }
  }
}

export default new loginApi();
