import * as MobileRegisterApi from './service';

export default {
  namespace: 'MobileRegister',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(MobileRegisterApi.demo, {});
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
