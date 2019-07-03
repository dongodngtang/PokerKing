import * as MinePageApi from './service';

export default {
  namespace: 'MinePage',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { statusCode, data } = yield call(MinePageApi.demo, {});
      if (statusCode === 200) {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
      * setProfile(_,{call,put}){

          yield put({type:'save',payload:{
                  profile:_.params
              }})

      },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
