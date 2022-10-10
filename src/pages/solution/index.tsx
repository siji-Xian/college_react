import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import {
  Input,
  Spin,
  Tabs,
  Tag,
  Space,
  Skeleton,
  Divider,
  message,
  Radio,
  RadioChangeEvent,
} from 'antd';
import { history, Helmet } from 'umi';
import InfiniteScroll from 'react-infinite-scroll-component';

import RepositoryItem from './caseLibraryItem';

import './index.less';
import api from '@/api';

const { CheckableTag } = Tag;
const { TabPane } = Tabs;
const { Search } = Input;

function Index(props: any) {
  const [selectedTags, setSelectedTags] = useState<any>(['全部']);
  const [selectedTagsId, setSelectedTagsId] = useState<any>(3);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [twoSelectedTags, setTwoSelectedTags] = useState<any>(['全部']);
  const [twoLevelTagArr, setTwoLevelTagArr] = useState<any>([]);
  const [itemData, setItemData] = useState<any>([]);
  const [itemLength, setItemLength] = useState<any>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [t, setT] = useState<any>([]);
  const [sortValues, setSortValues] = useState('-c_time');
  const [solt, setSolt] = useState<any>('-c_time');
  const [searchText, setSearchText] = useState('');

  const CheckableTaghandleChange = (tag: any, checked: any) => {
    if (checked) {
      // setPageNumber((p)=>p=0)
      setSelectedTagsId(tag.id);
      setTwoLevelTagArr((p: any) => (p = tag.child || []));
      setSelectedTags([tag.name]);
      setTwoSelectedTags(['全部']);
    }
  };

  const twoLevelTaghandleChange = (tag: any, checked: any) => {
    if (checked) {
      setSelectedTagsId(tag.id);
      setTwoSelectedTags([tag.name]);
    }
  };

  const tabsChange = (e: any) => {
    setSelectedTagsId(e);
    setSelectedTags(['全部']);
    setTwoLevelTagArr((p: any) => (p = []));
  };

  const loadMoreData = () => {
    setPageNumber((p: number) => p + 1);
    getVideoAppGetVideo(selectedTagsId, pageNumber);
  };

  //获取筛选栏
  const getVideoAppTage = async () => {
    // const res = await api.getVideoAppTags();
    // if (res?.err_code === 0) {
    //   console.log(res);
    //   setT(res.data);
    // }
    setT([
      {
        id: 1,
        name: '优秀案例',
      },
    ]);
  };

  // const soltChange = ({ target: { value } }: RadioChangeEvent) => {
  //   // console.log(e);
  //   setSortValues(value);
  //   setSolt((p: any) => (p = value));
  // };
  const soltChange = (value: any) => {
    // console.log(e);
    setSortValues(value);
    setSolt((p: any) => (p = value));
  };

  //获取视频列表
  const getVideoAppGetVideo = async (e: any, page: number) => {
    let data = {
      // category_id: e,
      status: 2,
      page,
      num: 9,
      order_by: solt,
    };
    const res = await api.getStrategyAppGetVideo({
      ...data,
    });
    if (res?.err_code === 0) {
      setItemData((p: any) => (p = [...p, ...res.data.data]));
      setItemLength(res.data.count);
    }
  };

  useEffect(() => {
    getVideoAppTage();
    loadMoreData();
  }, []);

  const loadPage = () => {
    setSpinning((p) => (p = true));
    setPageNumber((p) => (p = 2));
    let data: any = {
      // category_id: selectedTagsId,
      status: 2,
      page: 1,
      num: 9,
      order_by: solt,
    };
    if (searchText) {
      data.search = searchText;
    }
    api
      .getStrategyAppGetVideo({
        ...data,
      })
      .then((res: any) => {
        if (res?.err_code === 0) {
          setItemData((p: any) => (p = res.data.data));
          setItemLength(res.data.count);
          setSpinning((p) => (p = false));
        }
      });
  };

  useEffect(() => {
    loadPage();
  }, [selectedTagsId, solt, searchText]);

  const optionsWithDisabled = [
    { label: '最新发布', value: '-c_time' },
    { label: '最多评论', value: '-comment' },
  ];

  const onSearch = (e: any) => {
    setSearchText(() => e);
  };

  return (
    <div className="caseLibrary">
      <div className="title">
        <Tabs defaultActiveKey="1" onChange={tabsChange}>
          {t.map((item: any) => {
            return (
              <TabPane tab={item.name} key={item.id}>
                {item?.child ? (
                  <Space direction="vertical">
                    <Space>
                      <div className="titleName">一级分类</div>
                      <div>
                        {item?.child?.map((tag: any) => {
                          return (
                            <CheckableTag
                              key={tag.id}
                              checked={selectedTags?.indexOf(tag.name) > -1}
                              onChange={(checked) =>
                                CheckableTaghandleChange(tag, checked)
                              }
                            >
                              {tag.name}
                            </CheckableTag>
                          );
                        })}
                      </div>
                    </Space>
                    {twoLevelTagArr.length ? (
                      <Space>
                        <div className="titleName">二级分类</div>
                        <div>
                          {twoLevelTagArr?.map((tag: any) => (
                            <CheckableTag
                              key={tag.id}
                              checked={twoSelectedTags?.indexOf(tag.name) > -1}
                              onChange={(checked) =>
                                twoLevelTaghandleChange(tag, checked)
                              }
                            >
                              {tag.name}
                            </CheckableTag>
                          ))}
                        </div>
                      </Space>
                    ) : null}
                  </Space>
                ) : null}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
      <div style={{ padding: '0 10px' }}>
        <Tabs defaultActiveKey={solt} size={'small'} onChange={soltChange}>
          <TabPane tab="最新发布" key="-c_time"></TabPane>
          <TabPane tab="最多评论" key="-comment"></TabPane>
        </Tabs>
        {/* <Space>
          <Radio.Group
            options={optionsWithDisabled}
            onChange={soltChange}
            size='small'
            value={sortValues}
            optionType="button"
            buttonStyle="solid"
          />
          <Search size='small' placeholder="引力传媒" onSearch={onSearch} style={{ width: 200 }} />
        </Space> */}
      </div>
      <div className="content">
        <div className="filter"></div>
        <div className="box" id="scrollableDiv">
          <Spin spinning={spinning}>
            <InfiniteScroll
              dataLength={itemData.length}
              next={loadMoreData}
              hasMore={itemData.length < itemLength}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>已经到底了～</Divider>}
              scrollThreshold={'100px'}
              scrollableTarget="scrollableDiv"
              style={{ width: '100%' }}
            >
              {itemData.map((v: any) => {
                return <RepositoryItem key={v.id} data={v} />;
              })}
            </InfiniteScroll>
          </Spin>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Index);
