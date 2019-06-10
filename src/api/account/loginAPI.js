import axios from 'axios';

const getUserInfo = (uid, password) => {
  return axios.get('/endpoint-for-get-user-info', {
    params: {
      uid: uid,
      password: password
    }
  });
};

const isFinished = uid => {
  return axios.get('/endpoint-for-is-finished', {
    params: {
      uid: uid
    }
  });
};

export default {
  async login(uid, password) {
    try {
      const getUserInfoPromise = await getUserInfo(uid, password);
      const isFinishedPromise = await isFinished(uid);
      const [userinfoResponse, isFinishedResponse] = await promised.all([
        getUserInfoPromise,
        isFinishedPromise
      ]);
      if (userinfoResponse.data.length === 0) return 'noAuth';
      if (isFinishedResponse.data[0].CNT > 0) return 'done';
      return userinfoResponse;
    } catch (err) {
      alert(err);
    }
  }
};
