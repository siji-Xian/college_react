import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Input, Select } from 'antd';
import { history, Helmet } from 'umi';

import './index.less';
import api from '@/api';

const { Option } = Select;

function Index(props: any) {
  const { name = '' } = props;
  const [brandList, setBrandList] = useState<any>();
  const [brandId, setBrandId] = useState<number>();
  const [brandInfo, setBrandInfo] = useState<any>({ smartId: 357, id: 1 });

  const DataInfo = localStorage.getItem('dataInfo');
  const brandInfos = localStorage.getItem('brandInfo');
  let dataInfo: any;
  if (DataInfo) {
    dataInfo = JSON.parse(DataInfo || '');
  }
  let brand_info: any;
  if (brandInfos) {
    brand_info = JSON.parse(brandInfos);
  }

  useEffect(() => {
    if (props.name) {
      api
        .getBankList()
        .then((res) => {
          if (res?.err_code === 0) {
            //    console.log(res)
            //do_create为false不让创建人群包
            setBrandList(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.dispatch({
        type: 'dataInfo/save',
        payload: {
          ...dataInfo,
        },
      });
    }
  }, [name]);

  useEffect(() => {
    // console.log(brandInfo)
    const { smartId, id } = brandInfo;
    // console.log(smartId);
    if (brandId) {
      props.dispatch({
        type: 'brandInfo/save',
        payload: {
          brandId: smartId,
          id,
        },
      });
      localStorage.setItem('brandInfo', JSON.stringify(brandInfo));
    } else {
      props.dispatch({
        type: 'brandInfo/save',
        payload: {
          brandId: smartId,
          id,
        },
      });
      // console.log(brand_info);
      setBrandId(+brand_info?.smartId);
      setBrandInfo(brand_info);
    }
  }, [brandId]);

  function onChange(value: any) {
    let data = brandList.filter((v: any) => {
      return v?.smartId === value;
    });
    setBrandInfo(data[0]);
    setBrandId(value);
  }

  //   function onSearch(val:any) {
  //     console.log('search:', val);
  //   }
  //   console.log(brandId);

  return (
    <div className="brandData">
      <div>
        <span>品牌：</span>
        {brandList?.length ? (
          <Select
            style={{ width: '200px' }}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            defaultValue={brandId}
            // filterOption={(input, option) =>
            // option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            {brandList?.map((v: any) => {
              return (
                <Option key={v?.id} value={v?.smartId}>
                  {v?.brand_name}
                </Option>
              );
            })}
          </Select>
        ) : (
          <div style={{ width: '242px' }}></div>
        )}
      </div>
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
