import React, { useEffect, useState, useRef, FC } from 'react';
import { Select, Button, Tabs, Space, Spin, message } from 'antd';
import { WaterMark } from '@ant-design/pro-layout';

import ExportJsonExcel from 'js-export-excel';

import api from '@/api';

import { connect } from 'dva';
import useWindowSize from '@/components/windowsHeight';

import './index.less';

interface Props {
  title: string;
  content: string;
  date: string;
}

const { Option } = Select;
const Index: FC<Props> = (props: any) => {
  const { title, content, date, brandInfo } = props;
  const { brandId } = brandInfo;
  const [spinning, setSpinning] = useState<boolean>(false);
  const [dates, setDates] = useState<string>('');

  const getDataSave = () => {
    setSpinning(true);
    api
      .getAoeoIndex({
        data: { brand_id: brandId.toString() },
        requestType: 'json',
      })
      .then((res: any) => {
        if (res?.err_code === 0) {
          setDates(res.data);
          setSpinning(false);
        }
      });
  };

  const getAoeoSave = () => {
    setSpinning(true);
    api
      .getAoeoSave({
        data: { brand_id: brandId.toString() },
        requestType: 'json',
      })
      .then((res: any) => {
        if (res?.err_code === 0) {
          setSpinning(false);
          message.success(res.msg);
        }
      });
  };

  useEffect(() => {
    getDataSave();
  }, [brandId]);

  const getDataExport = () => {
    if (dates !== '' && dates !== '暂时无该品牌相关日报数据') {
      api.getAoeoExport().then((res: any) => {
        if (res?.err_code == 0) {
          message.success('正在导出日报文件！');
          window.open(res.data);
        } else {
          message.error(res.msg);
        }
      });
    }
  };

  return (
    <Spin spinning={spinning}>
      <div className="itemWaper">
        <div className="itemWaperLeft">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13671"
            width="22"
            height="22"
          >
            <path
              d="M488.8 523.9L200.9 376.1c-13.7-5.5-20.3-21.1-14.8-34.8 2.7-6.8 8.1-12.1 14.8-14.8l284.7-147.8c11.6-6.1 25.4-6.1 37 0l289.8 147.8c13.7 5.5 20.3 21.1 14.8 34.8-2.7 6.8-8.1 12.1-14.8 14.8L527.2 523.9a40.8 40.8 0 0 1-38.4 0z"
              fill="#1E88E5"
              p-id="13672"
            ></path>
            <path
              d="M810.9 471.1c13.8 5.8 20.3 21.6 14.5 35.4-2.7 6.6-8 11.8-14.5 14.5L525.6 668.8a42.37 42.37 0 0 1-37.4 0L200.3 521c-13.8-5.8-20.3-21.6-14.5-35.4 2.7-6.6 8-11.8 14.5-14.5l22.2-11.3 266.3 136.5c11.8 5.8 25.6 5.8 37.4 0l263.1-136.2 21.6 11z"
              fill="#64B5F6"
              p-id="13673"
            ></path>
            <path
              d="M810.9 616c13.7 5.5 20.3 21.1 14.8 34.8-2.7 6.8-8.1 12.1-14.8 14.8L525.6 813.4c-11.7 6.1-25.7 6.1-37.4 0L200.3 665.6c-13.7-5.5-20.3-21.1-14.8-34.8 2.7-6.8 8.1-12.1 14.8-14.8l22.2-11.6 266.3 136.9c11.8 5.8 25.6 5.8 37.4 0l263.1-136.5c0-0.1 21.6 11.2 21.6 11.2z"
              fill="#64B5F6"
              p-id="13674"
            ></path>
          </svg>
        </div>
        <div className="itemWaperRight">
          <div className="itemWaperRightTop">
            <div className="itemWaperRightTitle">{title}</div>
            <div className="itemWaperRightContent">{content}</div>
            <div className="itemWaperRightdate">{dates}</div>
          </div>
          <div className="itemWaperRightBotton">
            <Space>
              <Button disabled={spinning} onClick={getAoeoSave}>
                更新数据
              </Button>
              <Button type="primary" onClick={getDataExport}>
                导出数据
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(Index);
