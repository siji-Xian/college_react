import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Select, message, Avatar, Input } from 'antd';
import { history, Link } from 'umi';
// import LeftDom from './brandData'
import './index.less';

import img from '../../static/image/INLY.png';

const { Option } = Select;
const { SubMenu } = Menu;

const onSearch = (e: any) => {
  if (!e) return;
  history.push({
    pathname: '/searchResult',
    query: {
      search: e,
    },
  });
};

const Index = () => {
  const [isKaoShi, setIsKaoShi] = useState<boolean>(true);
  const [isCheck, setCheCk] = useState<boolean>(true);
  const [current, setCurrent] = useState<string>('/examine/index');

  const [exitLogin, setExitLogin] = useState<boolean>(false);
  const { Search } = Input;

  useEffect(() => {
    setCurrent(history.location.pathname);
    if (history.location.pathname === '/chooseBrand') {
      setCheCk(() => false);
    } else {
      setCheCk(() => true);
    }
    let patUrl = true;
    let exit = false;
    if (
      history.location.pathname === '/examine/index' ||
      history.location.pathname === '/examine/examinationPaper' ||
      history.location.pathname === '/examine/resultsList/resultsListPaper' ||
      history.location.pathname === '/examine/resultsList'
    ) {
      patUrl = false;
    } else {
      patUrl = true;
    }
    setIsKaoShi(patUrl);

    if (history.location.pathname === '/examine/examinationPaper') {
      exit = true;
    } else {
      exit = false;
    }
    setExitLogin(() => exit);
  }, [history.location.pathname]);

  const outLog = () => {
    if (exitLogin) {
      message.error('考试途中不可退出登录');
      return;
    }
    history.replace('/');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('branch');
    localStorage.removeItem('dateTime');
  };
  const changePassword = () => {
    console.log('修改密码');
    history.push('/changeInfo');
  };
  const titleLeft = localStorage.getItem('branch');
  const titleRight = localStorage.getItem('userInfo');
  const dataInfo = localStorage.getItem('dataInfo');

  let titleLeftData;
  let titleRightData;
  let titleLeftDataInfo;
  if (titleLeft) {
    titleLeftData = JSON.parse(titleLeft || '');
  }
  if (titleRight) {
    titleRightData = JSON.parse(titleRight || '');
  }
  if (dataInfo) {
    titleLeftDataInfo = JSON.parse(dataInfo || '');
  }
  const goHome = () => {
    history.replace('/customAnalysis');
  };
  const examine = () => {
    history.push('/examine/index');
  };
  const resultsList = () => {
    history.push('/examine/resultsList');
  };

  const menu = (
    <Menu>
      {/* <Menu.Item key='mm' onClick={changePassword}>修改密码</Menu.Item> */}
      {/* <Menu.Item key='home' onClick={goHome}>返回首页</Menu.Item> */}
      <Menu.Item key="user" onClick={changePassword}>
        个人中心
      </Menu.Item>
      <Menu.Item key="id" onClick={outLog}>
        退出登陆
      </Menu.Item>
    </Menu>
  );
  const examineMenu = (
    <Menu>
      {/* <Menu.Item key='mm' onClick={changePassword}>修改密码</Menu.Item> */}
      <Menu.Item key="examine" onClick={examine}>
        考试列表
      </Menu.Item>
      <Menu.Item key="resultsList" onClick={resultsList}>
        我的成绩
      </Menu.Item>
    </Menu>
  );

  //截取字符串返回最后两位字符
  const getLastTwo = (str: string) => {
    return str?.substring(str?.length - 2, str.length) || '';
  };

  return (
    <div className="titleBar">
      <div></div>
      <div style={{ display: 'flex' }}>
        <Search
          placeholder="请输入搜索关键词"
          allowClear
          onSearch={onSearch}
          style={{ width: 200, marginRight: '20px' }}
        />
        <Dropdown overlay={menu}>
          <div className="titleBarRight">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {getLastTwo(titleRightData?.username)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Index;
