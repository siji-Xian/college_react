// import React, { useState, useEffect } from 'react';

// import { history } from 'umi';

// import './index.less';

// export default function Index() {
//   const toOuterLink = () => {
//     window.open('https://school.oceanengine.com/page/academy-MarSci');
//   };

//   const toViodeo = () => {
//     history.push('/repository/video');
//   };

//   const toExamine = () => {
//     history.push('/examine/index');
//   };

//   return (
//     <div className="introduce">
//       <div
//         className="link"
//         style={{ top: '0', left: '0' }}
//         onClick={toOuterLink}
//       >
//         外链
//       </div>
//       <div
//         className="link"
//         style={{ top: '20px', left: '0' }}
//         onClick={toViodeo}
//       >
//         视频
//       </div>
//       <div
//         className="link"
//         style={{ top: '40px', left: '0' }}
//         onClick={toExamine}
//       >
//         考试
//       </div>
//       <img
//         src="http://47.101.192.122:8012/media/clustering/20220621094326616668.jpg"
//         alt=""
//         style={{ width: '100%', height: 'auto' }}
//       />
//     </div>
//   );
// }

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
} from 'antd';
import { history, Helmet } from 'umi';
import InfiniteScroll from 'react-infinite-scroll-component';

import RepositoryItem from './caseLibraryItem';

import './index.less';
import api from '@/api';

const { CheckableTag } = Tag;
const { TabPane } = Tabs;

function Index(props: any) {
  const [selectedTags, setSelectedTags] = useState<any>(['全部']);
  const [selectedTagsId, setSelectedTagsId] = useState<any>('1');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [twoSelectedTags, setTwoSelectedTags] = useState<any>(['全部']);
  const [twoLevelTagArr, setTwoLevelTagArr] = useState<any>([]);
  const [itemData, setItemData] = useState<any>([]);
  const [itemLength, setItemLength] = useState<any>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [t, setT] = useState<any>([]);
  const [solt, setSolt] = useState<any>('-c_time');

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
        name: '云图使用',
      },
      {
        id: 2,
        name: '云图案例',
      },
    ]);
  };

  let itemDatas = [
    {
      url: 'https://school.oceanengine.com/course/7071202713307971592',
      id: 1,
      hot_tag: 0,
      oss_img:
        'https://p3-academy.byteimg.com/tos-cn-i-0m7f4oheql/1be7a1ad517d4a969d3a40215325a1e4~tplv-0m7f4oheql-default:0:354.webp',
      name: '入门小白可从“巨量云图平台介绍”进入',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约0.5小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7026283073247379486/intro',
      id: 2,
      hot_tag: 0,
      oss_img:
        'https://sf1-cdn-tos.huoshanstatic.com/img/arthur/202111171dbd4839b948d93b43909ae5~680x0.webp',
      name: '巨量云图-5A关系资产',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约1.5小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7026283674337280037/intro',
      id: 3,
      hot_tag: 0,
      oss_img:
        'https://sf1-cdn-tos.huoshanstatic.com/img/arthur/202111031dbde57ea5243d9f46c08c51~680x0.webp',
      name: '巨量云图产品实操-内容洞察',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约1小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7026284242753552421/intro',
      id: 4,
      hot_tag: 0,
      oss_img:
        'https://sf1-cdn-tos.huoshanstatic.com/img/arthur/202111031dbd333005395138418db486~680x0.webp',
      name: '巨量云图产品实操-达人优选',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约1小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7090417647979855886/intro',
      id: 5,
      hot_tag: 0,
      oss_img:
        'https://p3-academy.byteimg.com/tos-cn-i-0m7f4oheql/31362e5efe4a4733abbcb902193b4124~tplv-0m7f4oheql-default:680:0.image',
      name: '巨量云图-3步学会直播运营',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约1小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7105738096137732110/7108525166925185061',
      id: 6,
      hot_tag: 0,
      oss_img:
        'https://p3-academy.byteimg.com/tos-cn-i-0m7f4oheql/409f05f3d78845ee95c1f77763010a1a~tplv-0m7f4oheql-default:680:0.image',
      name: '投后复盘-投后结案工具',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约1.5小时'],
    },
  ];

  let itemDatas2 = [
    {
      url: 'https://school.oceanengine.com/premium/course/7026923900554444836/7026259465175318542',
      id: 1,
      hot_tag: 0,
      oss_img:
        'https://sf1-cdn-tos.huoshanstatic.com/img/arthur/202111051dbd471bd6eb310c474c97f3~680x0.webp',
      name: '进阶方法论-营销科学方法论',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约2小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7026924898966568974/7026260805834244103',
      id: 2,
      hot_tag: 0,
      oss_img:
        'https://sf1-cdn-tos.huoshanstatic.com/img/arthur/202111051dbdc7cfc39655734a64ab60~680x0.webp',
      name: '服务商案例-最新营销实战案例',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约2.5小时'],
    },
    {
      url: 'https://school.oceanengine.com/premium/course/7080881806693793805/7080840241044520991',
      id: 3,
      hot_tag: 0,
      oss_img:
        'https://p3-academy.byteimg.com/tos-cn-i-0m7f4oheql/06eeb659d3d64f778f5ce43b873dc969~tplv-0m7f4oheql-default:680:0.image',
      name: '营销科学100案',
      path: null,
      status: false,
      is_show: true,
      index: 0,
      watch: 7,
      tags: ['约0.5小时'],
    },
  ];

  const soltChange = (e: any) => {
    // console.log(e);
    setSolt((p: any) => (p = e));
  };

  //获取视频列表
  const getVideoAppGetVideo = async (e: any, page: number) => {
    // let data = {
    //   // category_id: e,
    //   status:2,
    //   page,
    //   num: 9,
    //   order_by: solt,
    // };
    // const res = await api.getVideoAppGetVideo({
    //   ...data,
    // });
    // if (res?.err_code === 0) {
    //   setItemData((p: any) => (p = [...p, ...res.data.data]));
    //   setItemLength(res.data.count);
    // }
  };

  useEffect(() => {
    getVideoAppTage();
    loadMoreData();
  }, []);

  useEffect(() => {
    // setSpinning((p) => (p = true));
    setPageNumber((p) => (p = 2));
    // let data = {
    //   // category_id: selectedTagsId,
    //   status:2,
    //   page: 1,
    //   num: 9,
    //   order_by: solt,
    // };
    // api
    //   .getVideoAppGetVideo({
    //     ...data,
    //   })
    //   .then((res: any) => {
    //     if (res?.err_code === 0) {
    //       setItemData((p: any) => (p = res.data.data));
    //       setItemLength(res.data.count);
    //       setSpinning((p) => (p = false));
    //     }
    //   });
    setItemData(
      (p: any) => (p = selectedTagsId === '1' ? itemDatas : itemDatas2),
    );
  }, [selectedTagsId, solt]);

  return (
    <div className="introduce">
      <div className="title">
        <div
          className="titleTip"
          onClick={() => {
            history.push('/repository/guide');
          }}
        >
          如何注册云图？
        </div>
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
      <div style={{ height: '10px' }}>
        {/* <Tabs defaultActiveKey={solt} size={'small'} onChange={soltChange}>
          <TabPane tab="最新发布" key="-c_time"></TabPane>
          <TabPane tab="最多评论" key="-comment"></TabPane>
        </Tabs> */}
      </div>
      <div className="content">
        <div className="filter"></div>
        <div className="box" id="scrollableDiv">
          <Spin spinning={spinning}>
            {/* <InfiniteScroll
              dataLength={itemData.length}
              next={loadMoreData}
              hasMore={itemData.length < itemLength}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>已经到底了～</Divider>}
              scrollThreshold={'100px'}
              scrollableTarget="scrollableDiv"
              style={{ width: '100%' }}
            > */}
            {itemData.map((v: any) => {
              return <RepositoryItem key={v.id} data={v} />;
            })}
            {/* </InfiniteScroll> */}
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
