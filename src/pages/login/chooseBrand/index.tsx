import React, { useEffect, useState } from 'react';
import { Form, Input, message, Popconfirm, Space, Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history, Helmet } from 'umi';
import { connect } from 'dva';

import './index.less';
import api from '@/api';

const { Meta } = Card;

function Index(props: any) {
  const [visible, setVisible] = useState(false);

  const [brandList, setBrandList] = useState<any>();

  const getlist = () => {
    api.getPlatformList().then((res: any) => {
      if (res?.err_code === 0) {
        setBrandList(res.data);
      }
    });
  };

  useEffect(() => {
    getlist();
  }, []);

  const showPopconfirm = (v: any) => {
    // setVisible(true);
    if (v.name === '巨量云图') {
      message.info('暂未开放！');
      return;
    }
    history.replace('/customAnalysis');
    props.dispatch({
      type: 'dataInfo/save',
      payload: {
        ...v,
      },
    });
    localStorage.setItem('dataInfo', JSON.stringify(v));
  };

  const handleOk = () => {
    // setVisible(false);
    props.dispatch({
      type: 'brandData/save',
      payload: {
        name: 'Marubi/丸美集团',
        cookie: '123456789',
      },
    });
    localStorage.setItem('brandCookie', '123456789');
    localStorage.setItem('brandName', 'Marubi/丸美集团');
    history.replace('/customAnalysis');
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const getCookie = (e: any) => {
    // console.log(e.target.value);
  };
  const box = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '245px' }}>
        <span style={{ minWidth: '50px' }}>--</span>
        <Input style={{ flex: '1' }} onChange={getCookie}></Input>
      </div>
    );
  };
  return (
    <div className="chooseBrand">
      <Space size={14}>
        {brandList?.map((v: any) => {
          return (
            <Card
              key={v.id}
              style={{ width: 300 }}
              actions={[
                <span onClick={() => showPopconfirm(v)}>进入系统</span>,
              ]}
            >
              <Meta
                style={{ height: 100 }}
                avatar={
                  <Avatar
                    shape="square"
                    src="https://joeschmoe.io/api/v1/random"
                  />
                }
                title={v?.name}
                description={v?.name}
              />
            </Card>
          );
        })}
      </Space>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { name } = state.dataInfo;
  return {
    name,
  };
};

export default connect(mapStateToProps)(Index);
