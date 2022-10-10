import styles from './index.less';
import { useState } from 'react';
import { Upload, message, DatePicker, Space, Tooltip, Select } from 'antd';
import {
  InboxOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Helmet } from 'umi';
import api from '@/api/index';
const { Dragger } = Upload;
const { Option } = Select;
export default function IndexPage() {
  const [year, setYear] = useState('2022');
  const [bu, setBu] = useState('');
  const [upLoadType, setUpLoadType] = useState(0);

  const branch = localStorage.getItem('branch');
  const userInfo = localStorage.getItem('userInfo');
  let branchData = [];
  let userid = '';
  let status = '';
  if (branch) {
    branchData = JSON.parse(branch || '');
  }
  if (userInfo) {
    userid = JSON.parse(userInfo || '').id;
    status = JSON.parse(userInfo || '').status;
  }
  const onChange = (_: any, e: string) => {
    setYear(e);
  };
  const upload = (e: any) => {
    setUpLoadType(0);
    let data = new FormData();
    data.append('file', e.file);
    // data.append('year', year);
    // data.append('branch_id', bu);
    // data.append('user_id', userid);
    if (status == '3') {
      api
        .uploadXls({ data })
        .then((res) => {
          if (res.err_code === 0) {
            message.success('上传成功！');
            setUpLoadType(1);
          } else {
            message.error(res.msg);
            setUpLoadType(2);
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      return;
    }
    api
      .uploadXls1({ data })
      .then((res) => {
        if (res.err_code === 0) {
          message.success('上传成功！');
          setUpLoadType(1);
        } else {
          message.error(res.msg);
          setUpLoadType(2);
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  const [peopleList, setPeopleList] = useState<string[]>();
  //上传前钩子
  const befUpload = (_: any, file: any) => {
    // console.log(file);
    let fileNames = file.map((v: any) => {
      return v.name;
    });
    setPeopleList(fileNames);
    return true;
  };
  const props = {
    name: 'file',
    disabled: (year && bu) || status == '3' ? false : true,
    multiple: true,
    accept: '.xlsx',
    maxCount: 1,
    customRequest: upload,
    showUploadList: false,
    beforeUpload: befUpload,
  };
  const handleChange = (value: any) => {
    setBu(value);
  };
  return (
    <div style={{ boxSizing: 'border-box', padding: '30px' }}>
      {/* <Helmet>
        <title>INLY BI</title>
      </Helmet> */}
      <Space direction="vertical">
        {/* <DatePicker onChange={onChange} picker="year" /> */}
        <h3>2022年预算</h3>
        {status == '3' ? (
          ''
        ) : (
          <Select
            style={{ width: 155 }}
            showSearch
            placeholder="请选择部门"
            optionFilterProp="children"
            onChange={handleChange}
          >
            {branchData.map((v: any) => {
              return (
                <Option key={v.id} value={v.id}>
                  {v.bu}
                </Option>
              );
            })}
          </Select>
        )}
        <div style={{ width: '300px' }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
            <p className="ant-upload-hint">支持扩展名：.xlsx</p>
          </Dragger>
        </div>
        {peopleList?.map((v, i) => {
          return (
            <div key={i}>
              {v}
              <Tooltip
                placement="right"
                title={
                  upLoadType
                    ? upLoadType == 1
                      ? '上传成功'
                      : '上传失败，请重新上传'
                    : '上传中...'
                }
              >
                {upLoadType ? (
                  upLoadType == 1 ? (
                    <CheckCircleOutlined
                      style={{ color: '#56b97f', marginLeft: '5px' }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: 'red', marginLeft: '5px' }}
                    />
                  )
                ) : (
                  <LoadingOutlined style={{ marginLeft: '5px' }} />
                )}
              </Tooltip>
            </div>
          );
        })}
      </Space>
    </div>
  );
}
