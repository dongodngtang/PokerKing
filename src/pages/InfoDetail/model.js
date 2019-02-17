import * as infoDetailApi from './service';

export default {
  namespace: 'InfoDetail',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(infoDetailApi.demo, {});
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
