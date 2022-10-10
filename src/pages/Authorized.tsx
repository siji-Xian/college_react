import React, { useEffect } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
const { Redirect } = require('dva').router;

const AuthRouter = (props: any) => {
  let dateTimes = Date.parse(new Date().toString());
  let isLogin = window.localStorage.getItem('token') ? true : false;
  const dateTime = +(window.localStorage.getItem('dateTime') || 0);
  useEffect(() => {
    // 7200000 两小时
    if (dateTime) {
      if (dateTimes - dateTime >= 7200000) {
        localStorage.removeItem('token');
        // message.error('登录超时，请重新登录！');
      }
    } else {
      localStorage.removeItem('token');
    }
    if (!isLogin) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('branch');
      localStorage.removeItem('dateTime');
    }
  }, [dateTimes, isLogin]);
  return isLogin ? <div>{props.children}</div> : <Redirect to="/" />;
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(AuthRouter);
