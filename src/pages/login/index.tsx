import React, { useEffect, useState, useRef } from 'react';
import { Form, Checkbox, Input, Button, Select, message, Row, Col } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { history, Helmet, Link } from 'umi';
import { connect } from 'dva';

import './index.less';
import 'antd/dist/antd.less';
import api from '@/api';

const { Option } = Select;

function Login(props: any) {
  let LOGO = require('@/static/image/INLY.png');
  const [elmentStatus, setElmentStatus] = useState('login');
  const [userName, setUserName] = useState('');
  const [getCodeButtomStatus, setGetCodeButtomStatus] = useState(false);
  const [codeIntervalDate, setCodeIntervalDate] = useState(60);
  const findPasswordFormRef: any = useRef(null);
  const loginFormRef: any = useRef(null);
  const [loadings, setLoadings] = useState(false);

  let codeTime: any;
  let codeInterval: any;
  const userAccount = localStorage.getItem('userAccount');
  const userPassword = localStorage.getItem('userPassword');
  //清除定时器
  useEffect(() => {
    // console.log(loginFormRef.current);
    return () => {
      clearTimeout(codeTime);
      clearInterval(codeInterval);
    };
  }, []);

  //验证邮箱格式
  function checkEmail(email: any) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(email);
  }

  //切换登录和注册
  const changeElment = (type: string) => {
    if (type !== 'forget' && findPasswordFormRef) {
      //重置表单'
      findPasswordFormRef?.current?.resetFields();
    }
    setElmentStatus(type);
  };
  //获取用户邮箱
  const userNameChange = (e: any) => {
    setUserName(() => e.target.value);
  };
  //触发登录
  const onFinish = (values: any) => {
    setLoadings(true);
    let data = {
      account: values?.account + '@yinlimedia.com',
      password: values?.password,
    };
    api.login({ data: { ...data }, requestType: 'form' }).then((res) => {
      let datas = res?.data;
      if (res?.err_code === 0) {
        setLoadings(false);
        message.success(res?.msg);
        history.replace('@/repository/introduce');
        localStorage.setItem('token', datas?.token);
        localStorage.setItem('userInfo', JSON.stringify(datas?.user));
        props.dispatch({
          type: 'userLogin/save',
          payload: {
            name: datas?.user,
            token: datas?.token,
            userInfo: datas?.user,
          },
        });
        if (values?.remember) {
          localStorage.setItem('userAccount', values?.account);
          localStorage.setItem('userPassword', values?.password);
        } else {
          localStorage.removeItem('userAccount');
          localStorage.removeItem('userPassword');
        }
      } else {
        setLoadings(false);
        message.error(res?.msg);
      }
    });
  };

  //触发注册
  const onFinishReg = (values: any) => {
    let data = {
      email: values?.user + '@yinlimedia.com',
      telephone: values?.telephone,
      password: values?.mima,
      sex: values?.sex,
      username: values?.username,
      code: values?.code,
    };

    api.register({ data: { ...data }, requestType: 'form' }).then((res) => {
      if (res?.err_code === 0) {
        // message.success('注册成功！');
        let datas = {
          account: values?.user + '@yinlimedia.com',
          password: values?.mima,
        };
        api.login({ data: { ...datas }, requestType: 'form' }).then((res) => {
          let datas = res?.data;
          if (res?.err_code === 0) {
            message.success(res?.msg);
            history.replace('@/repository/introduce');
            // history.replace('@/chooseBrand')
            localStorage.setItem('token', datas?.token);
            localStorage.setItem('userInfo', JSON.stringify(datas?.user));
            props.dispatch({
              type: 'userLogin/save',
              payload: {
                name: datas?.user,
                token: datas?.token,
                userInfo: datas?.user,
              },
            });
          } else {
            message.error(res?.msg);
          }
        });
      } else {
        message.error(res?.msg);
      }
    });
  };

  const checkedChange = (e: any) => {
    // console.log(e);
  };

  //修改密码
  const onFindPassword = (values: any) => {
    let data = {
      email: values?.user + '@yinlimedia.com',
      password: values?.mima,
      code: values?.code,
    };
    api.findPassword({ data: { ...data }, requestType: 'form' }).then((res) => {
      if (res?.err_code === 0) {
        message.success('修改成功！');
        setElmentStatus('login');
        loginFormRef?.current?.setFieldsValue({
          account: values?.user,
          password: values?.mima,
        });
      } else {
        message.error(res?.msg);
      }
    });
  };

  //邮箱验证码
  const getCode = (types: number) => {
    let dates = 60;
    setCodeIntervalDate(() => dates);
    codeInterval = setInterval(() => {
      setCodeIntervalDate((p) => (p = p - 1));
    }, 1000);

    codeTime = setTimeout(() => {
      setGetCodeButtomStatus(false);
      clearTimeout(codeTime);
      clearInterval(codeInterval);
    }, 60000);

    let data = {
      email: userName + '@yinlimedia.com',
      types,
    };
    if (!checkEmail(data.email)) {
      message.error('邮箱格式不正确！');
      return;
    }

    setGetCodeButtomStatus(true);
    api.sendEmailCode(data).then((res: any) => {
      if (res?.err_code === 0) {
        message.success('邮箱验证码发送成功！');
      } else {
        message.error(res?.msg);
        setGetCodeButtomStatus(false);
      }
    });
  };
  //登录
  const LoginElement = () => (
    <div className="from">
      <div className="title">
        <span>登录。</span>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: userAccount,
          account: userAccount,
          password: userPassword,
        }}
        onFinish={onFinish}
        ref={loginFormRef}
      >
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入邮箱!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            addonAfter="@yinlimedia.com"
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="登录密码"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox onChange={checkedChange}>记住密码</Checkbox>
        </Form.Item>
        <Form.Item>
          <div className="form-button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loadings}
            >
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
      <div className="addUser">
        <span className="link" onClick={() => changeElment('register')}>
          注册账号
        </span>
        <span className="link" onClick={() => changeElment('forget')}>
          忘记密码？
        </span>
      </div>
    </div>
  );

  //注册
  const RegisterElement = () => (
    <div className="from">
      <div className="title">
        <span>注册。</span>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinishReg}
      >
        <Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="username"
                noStyle
                rules={[{ required: true, message: '请输入姓名/昵称!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={'姓名/昵称'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sex" noStyle>
                <Select placeholder="性别">
                  <Option value="1">男</Option>
                  <Option value="2">女</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入姓名/昵称"
          /> */}
        </Form.Item>
        <Form.Item
          name="user"
          rules={[{ required: true, message: '请输入邮箱!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            addonAfter="@yinlimedia.com"
            onChange={(e: any) => userNameChange(e)}
            placeholder="请输入邮箱"
          />
        </Form.Item>

        <Form.Item
          name="telephone"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="请输入手机号"
          />
        </Form.Item>
        <Form.Item
          name="mima"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            maxLength={16}
            autoComplete="new-password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
          name="Confirm Password"
          dependencies={['mima']}
          rules={[
            {
              required: true,
              message: '请再次输入密码！',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('mima') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致！'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            maxLength={16}
            placeholder="确认密码"
          />
        </Form.Item>
        <Form.Item
          extra={
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span>前往，</span>
              <a
                target="_blank"
                href="http://mail.yinlimedia.com/webmail/webmail.php"
              >
                引力邮箱
              </a>
            </div>
          }
        >
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item
                name="code"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button onClick={() => getCode(1)} disabled={getCodeButtomStatus}>
                {getCodeButtomStatus
                  ? `已发送(${codeIntervalDate})`
                  : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <div className="form-button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              注册
            </Button>
          </div>
        </Form.Item>
      </Form>
      <div className="addUser">
        <span className="link" onClick={() => changeElment('forget')}>
          忘记密码？
        </span>
        <span>
          <span>已有账号，</span>
          <span className="link" onClick={() => changeElment('login')}>
            立即登录
          </span>
        </span>
      </div>
    </div>
  );

  //找回密码
  const FindPasswordElement = () => {
    return (
      <div className="from">
        <div className="title">
          <span>重置密码。</span>
        </div>
        <Form
          name="normal_find_password"
          className="login-form"
          onFinish={onFindPassword}
          ref={findPasswordFormRef}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              onChange={(e: any) => userNameChange(e)}
              addonAfter="@yinlimedia.com"
              placeholder="请输入邮箱"
            />
          </Form.Item>
          <Form.Item
            name="mima"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              maxLength={16}
              placeholder="请输入新密码"
            />
          </Form.Item>
          {/* 获取验证码 */}
          <Form.Item
            extra={
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span>前往，</span>
                <a
                  target="_blank"
                  href="http://mail.yinlimedia.com/webmail/webmail.php"
                >
                  引力邮箱
                </a>
              </div>
            }
          >
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item
                  name="code"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button
                  onClick={() => getCode(2)}
                  disabled={getCodeButtomStatus}
                >
                  {getCodeButtomStatus
                    ? `已发送(${codeIntervalDate})`
                    : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <div className="form-button">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                确定
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className="addUser">
          <span className="link" onClick={() => changeElment('register')}>
            注册账号
          </span>
          <span>
            <span>已有账号，</span>
            <span className="link" onClick={() => changeElment('login')}>
              立即登录
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="login">
      <div style={{ paddingLeft: '40px' }}>
        <img src={LOGO} alt="" style={{ width: '100px' }} />
      </div>
      {elmentStatus === 'login'
        ? LoginElement()
        : elmentStatus === 'register'
        ? RegisterElement()
        : FindPasswordElement()}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(Login);
