import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import api from '@/api';

export interface IndexModelState {
  brandId: number;
  id: number;
}

export interface IndexModelType {
  namespace: 'brandInfo';
  state: IndexModelState;
  // effects: {
  //   login: Effect;
  // };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  // subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'brandInfo',
  state: {
    brandId: 357,
    id: 1,
  },
  // effects: {
  //   *login({ payload }, { call, put }) {
  // 		yield put({
  // 			type:'index',
  // 			payload:{
  // 				name:'poo'
  // 			}
  // 		})
  //   },
  // },
  reducers: {
    save(state, action) {
      // console.log(action)
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/') {
  //         dispatch({
  //           type: 'query',
  //         });
  //       }
  //     });
  //   },
  // },
};

export default IndexModel;
