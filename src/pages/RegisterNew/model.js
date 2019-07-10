import * as RegisterNewApi from './service';

export default {
  namespace: 'RegisterNew',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(RegisterNewApi.demo, {});
      if (statusCode === 200) {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
