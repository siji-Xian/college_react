import { useState, useRef } from 'react';
import {
  Upload,
  Button,
  Input,
  Space,
  Form,
  Select,
  Descriptions,
  Avatar,
  message,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import api from '@/api/index';
import './index.less';
const { Dragger } = Upload;
const { Option } = Select;

export default function IndexPage() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const userInfo = localStorage.getItem('userInfo');
  let userInfoData: any;
  if (userInfo) {
    userInfoData = JSON.parse(userInfo || '');
  }
  const [codeIntervalDate, setCodeIntervalDate] = useState(60);
  const [getCodeButtomStatus, setGetCodeButtomStatus] = useState(false);

  const loginFormRef: any = useRef(null);
  const findPasswordFormRef: any = useRef(null);
  let codeInterval: any;
  let codeTime: any;
  //修改密码
  const onFindPassword = (values: any) => {
    setConfirmLoading(true);
    let data = {
      email: userInfoData?.email,
      password: values?.newPassword,
      code: values?.code,
    };

    api.findPassword({ data: { ...data }, requestType: 'form' }).then((res) => {
      if (res?.err_code === 0) {
        message.success('修改成功！');
        setVisible(false);
        setConfirmLoading(false);
        localStorage.setItem('userPassword', values?.newPassword);
      } else {
        message.error(res?.msg);
      }
    });
  };

  //验证邮箱格式
  function checkEmail(email: any) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(email);
  }

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
      email: userInfoData?.email,
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
        setGetCodeButtomStatus(false);
        message.error(res?.msg);
      }
    });
  };
  const getLastTwo = (str: string) => {
    return str?.substring(str?.length - 2, str.length) || '';
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    findPasswordFormRef?.current?.submit();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="changeInfo">
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* <div>
          <span className='ant-descriptions-title'>个人中心</span>
        </div> */}
        {/* <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {getLastTwo(userInfoData?.username)}
        </Avatar> */}
        <div style={{ fontWeight: 'bold' }}>Hi,{userInfoData?.username}</div>
        <Descriptions
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="用户名">
            {userInfoData?.username}
          </Descriptions.Item>
          <Descriptions.Item label="性别">
            {userInfoData?.sex === 1
              ? '男'
              : userInfoData?.sex === 2
              ? '女'
              : '未知'}
          </Descriptions.Item>
          <Descriptions.Item label="账号">
            {userInfoData?.account}
          </Descriptions.Item>
          <Descriptions.Item label="密码">
            <span>*******</span>
            <Button type="link" size="small" onClick={showModal}>
              修改密码
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {userInfoData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="账户类别">
            {userInfoData?.is_superuser ? '超级管理员' : '普通用户'}
          </Descriptions.Item>
        </Descriptions>
      </Space>

      <Modal
        title="修改密码"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        destroyOnClose
        onCancel={handleCancel}
      >
        <div className="from">
          <Form
            name="normal_find_password"
            className="login-form"
            onFinish={onFindPassword}
            preserve={false}
            ref={findPasswordFormRef}
          >
            <Form.Item
              name="newPassword"
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
          </Form>
        </div>
      </Modal>
    </div>
  );
}
