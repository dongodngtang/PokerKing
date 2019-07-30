import * as PwdFoundApi from './service';

export default {
  namespace: 'PwdFound',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(PwdFoundApi.demo, {});
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
