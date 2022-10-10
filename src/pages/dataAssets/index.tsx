import React, { useEffect, useState, useRef } from 'react';
import { Select, Button, Spin, Tabs, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { WaterMark } from '@ant-design/pro-layout';

import ExportJsonExcel from 'js-export-excel';

import api from '@/api';

import { connect } from 'dva';
import useWindowSize from '@/components/windowsHeight';

import DataAssetsItem from './dataAssetsItem';

import './index.less';

const { TabPane } = Tabs;

export type Status = {
  color: string;
  text: string;
};

export type TableListItem = {
  key: number;
  name: string;
};
// let tableListDataSource: TableListItem[] = [];

const { Option } = Select;

function Home(props: any) {
  // useEffect(()=>{

  // },[])

  function callback(key: any) {
    console.log(key);
  }

  let arr = [1];
  // console.log(arr);
  return (
    <div className="waper">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="固定场景" key="1">
          <div className="DataAssetsBox">
            {arr.map((v, i) => {
              return (
                <div key={i} className="DataAssets">
                  <div className="DataAssetsItem">
                    <DataAssetsItem
                      title={'品牌特秀日报'}
                      content={
                        '以日报的形式在品牌特秀广告投放期间的各项数据指标效果'
                      }
                      date={'2022-03-10'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </TabPane>
      </Tabs>
      <div className="tips">
        <span>
          <ExclamationCircleOutlined />
          &nbsp;固定场景
        </span>
        <span>
          &nbsp;&emsp;&nbsp;基于经典方法论的沉淀，提供场景化的解决方案
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(Home);
