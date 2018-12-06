import * as HomeApi from './service';

export default {
  namespace: 'Home',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
        console.log('进入这里')
      let data = yield call(HomeApi.demo, {});
        console.log('Model',data)
        yield put({ type: 'save',
            payload: {
                topData: data,
            } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
