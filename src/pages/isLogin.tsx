import React, { useEffect } from 'react';
import { connect } from 'dva';
const { Redirect } = require('dva').router;

const index = (props: any) => {
  let isLogin = window.localStorage.getItem('token') ? true : false;
  return isLogin ? (
    <Redirect to="/repository/introduce" />
  ) : (
    <div>{props.children}</div>
  );
  // isLogin? <Redirect to="/chooseBrand" />:<div>{props.children}</div>
};
const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(index);
