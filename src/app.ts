import TitleLefts from '@/components/pageTitle';
// import { createLogger } from 'redux-logger';
import { message } from 'antd';

// export async function getInitialState() {
//     const fetchXXX = ()=>{
//         return {
//             title:'name'
//         }
//     }
//     const data = await fetchXXX();
//     return data;
// }
export const dva = {
  config: {
    // onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};

export const layout = {
  logout: () => {}, // do something
  rightRender: () => {
    return TitleLefts();
  },
};
