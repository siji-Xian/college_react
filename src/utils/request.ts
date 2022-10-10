import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from 'umi';
import getDvaApp from 'dva';
import IndexModel from '@/models/requestUrl';

let data: any = getDvaApp().model(IndexModel);
let requestUrl = data.state.url;

const request = extend({
  prefix: requestUrl,
  suffix: '',
  timeout: 60000,
  headers: {},
  params: {
    // 所有请求默认带上 token 参数
  },
  errorHandler: function (error) {
    /* 异常处理 */
  },
});

request.interceptors.request.use(
  (url, options) => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    let headers;
    if (token && userInfo) {
      headers = {
        Authorization: token,
        account: JSON.parse(userInfo).account,
      };
    }
    return {
      url,
      options: { ...options, headers, interceptors: true },
      // options: { ...options,headers, interceptors: true },
    };
  },
  { global: true },
);
const clearLogin = () => {
  // message.error('登陆超时，请重新登陆');
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('branch');
  localStorage.removeItem('dateTime');
  history.replace('/login');
};
request.interceptors.response.use(async (response, options) => {
  const data = await response.clone().json();
  let dateTimes = Date.parse(new Date().toString());
  const dateTime = +(window.localStorage.getItem('dateTime') || 0);
  if (data.err_code === 2) {
    clearLogin();
  }
  // console.log(data)

  if (dateTime != 0) {
    if (dateTimes - dateTime < 7200000) {
      if (data.err_code === 0) {
        localStorage.setItem('dateTime', dateTimes.toString());
      }
    } else {
      if (!data.data.token) {
        clearLogin();
      }
    }
  } else {
    localStorage.setItem('dateTime', dateTimes.toString());
  }
  return response;
});

export default request;
