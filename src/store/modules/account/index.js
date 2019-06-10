import api from '@/api/account';
import * as types from './type';

const state = {
  uid: '',
  errorState: '',
  isAuth: false
};

const actions = {
  async login(store, { uid, password }) {
    let loginResponse = await api.login(uid, password);
    processResponse(store, loginResponse);
    return store.getters.getIsAuth; // 로그인 결과를 리턴한다
  }
};

const getters = {
  getUid: state => state.uid,
  getErrorState: state => state.errorState,
  getIsAuth: state => state.isAuth
};

const mutations = {
  [types.UID](state, uid) {
    state.uid = uid;
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState;
  },
  [types.IS_AUTH](state, isAuth) {
    state.isAuth = isAuth;
  }
};

let setUID = ({ commit }, data) => {
  commit(UID, data);
};

let setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data);
};

let setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data);
};

let processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'Wrong ID or Password');
      setIsAuth(store, false);
      break;
    case 'done':
      setErrorState(store, 'No period');
      setIsAuth(store, false);
      break;
    default:
      setUID(store, loginResponse.UID);
      setErrorState(store, '');
      setIsAuth(store, true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
