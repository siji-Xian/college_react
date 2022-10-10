import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import api from '@/api';

export interface IndexModelState {
  name: string;
  token: string;
}

export interface IndexModelType {
  namespace: 'userLogin';
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
  namespace: 'userLogin',
  state: {
    name: '',
    token: '',
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
