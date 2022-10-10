import React, { useEffect, useState, useRef, ReactNode } from 'react';
import BulletScreen, { StyledBullet } from 'rc-bullets';
import { connect } from 'dva';
import {
  Input,
  Comment,
  Tabs,
  Tooltip,
  Button,
  Modal,
  Form,
  message,
  Pagination,
} from 'antd';
import { history, Helmet } from 'umi';
import 'video-react/dist/video-react.css';
import moment from 'moment';
import {
  Player,
  ControlBar,
  BigPlayButton,
  PlayerProps,
  ControlBarProps,
  PlaybackRateMenuButton,
} from 'video-react';

import Reply from './replyElment';

import './index.less';
import api from '@/api';

function Index(props: any) {
  //获取url参数
  const videoId: any = history.location.query?.id;
  const videoTabsIndex: any = history.location?.state;

  // 弹幕屏幕
  const [screen, setScreen] = useState<any>([]);
  // 弹幕内容
  const [bullet, setBullet] = useState('');

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoading1, setConfirmLoading1] = useState(false);
  const [tabsKey, setTabsKey] = useState(videoTabsIndex?.tabsIndex || '1');
  const [pageNumber, setPageNumber] = useState(1);
  const [modalTitle, setModalTitle] = useState('');
  const [replyList, setReplyList] = useState<any>([]);
  const [replyInfo, setReplyInfo] = useState<any>();
  const [commontId, setCommontId] = useState<any>();
  const [barrageObj, setBarrageObj] = useState<any>([]);

  const [videoInfo, setVideoInfo] = useState<any>();

  const user = localStorage.getItem('userInfo');

  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕
    let s = new BulletScreen('.screen', { duration: 20 });
    setScreen(s);
  }, []);

  //通过id查询视频信息
  const getVideoAppGetVideo = async (id: any) => {
    const res = await api.getVideoAppPlayVideo({
      video_id: id,
    });
    if (res?.err_code === 0) {
      setVideoInfo(res.data.data);
    }
  };

  useEffect(() => {
    if (videoId) {
      getVideoAppGetVideo(videoId);
    }
  }, [videoId]);

  let userData: any;
  if (user) {
    userData = JSON.parse(user || '');
  }

  moment.defineLocale('zh-cn', {
    relativeTime: {
      future: '%s内',
      past: '%s前',
      s: '几秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年',
    },
  });

  const formRef: any = useRef(null);
  const formRef1: any = useRef(null);
  // const player = useRef(null);

  // const playerElment: PlayerProps = {
  //   ref: player,
  //   preload: 'metadata',
  //   aspectRatio: 'auto',
  //   src: 'http://cdn.inlymedia.com/college/KXnZjwCUexDuLqAb.mp4',
  // };
  // const ControlBarElment: ControlBarProps = {
  //   autoHide: true,
  // };
  let a: any;
  useEffect(() => {
    if (barrageObj?.length) {
      barrageObj.map((item: string, i: number) => {
        let d = (
          <div className="barrageOrbitalItem">
            <span>{item}</span>
          </div>
        );
        a = setTimeout(() => {
          screen?.push(d);
        }, i * 2000);
      });
      return () => {
        clearTimeout(a);
      };
    }
  }, [barrageObj]);

  //获取评论
  const getVideoCommont = async (e: number, isOne?: boolean) => {
    let datas = { video_id: videoId, page: e };
    const res = await api.getVideoAppComment({ ...datas });
    if (res?.err_code === 0) {
      setReplyInfo(res);
      setReplyList(res.data.data);
      setBarrageObj(() => {
        return res.data.data.map((item: any) => {
          return item?.body;
        });
      });
      if (isOne) {
        res.data.data.map((item: any) => {
          setBullet(item?.body);
        });
      }
    }
  };

  //删除评论
  const commentDel = (id: any) => {
    api.delVideoAppComment({ comment_id: id }).then((res: any) => {
      if (res?.err_code === 0) {
        getVideoCommont(pageNumber, false);
        message.success('删除成功');
      }
    });
  };

  useEffect(() => {
    getVideoCommont(1, true);
  }, []);

  //发表评论
  const reply = (name: any, id: any) => {
    setModalTitle((p) => (p = name));
    setCommontId((p: any) => (p = id));
    setVisible(true);
  };

  const showSetCommont = () => {
    setVisible1(true);
  };

  const onFinish = (e: any) => {
    let datas = {
      ...e,
      video_id: +videoId,
      parent_comment_id: commontId,
    };
    api
      .postVideoAppComment({
        data: { ...datas },
        requestType: 'form',
      })
      .then((res: any) => {
        message.success('回复成功');
        setVisible(false);
        setConfirmLoading(false);
        getVideoCommont(pageNumber, false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const onFinish1 = (e: any) => {
    let datas = {
      ...e,
      video_id: +videoId,
    };
    api
      .postVideoAppComment({
        data: { ...datas },
        requestType: 'form',
      })
      .then((res: any) => {
        // console.log(res);
        if (res.err_code === 0) {
          let dom = (
            <div className="barrageOrbitalItem">
              <span>{e.body}</span>
            </div>
          );
          screen?.push(dom);
          message.success('发表成功');
          setVisible1(false);
          setConfirmLoading1(false);
          setReplyList(() => [
            {
              ...res?.data?.data,
            },
            ...replyList,
          ]);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleOk = () => {
    formRef?.current?.submit();
    setConfirmLoading(true);
  };

  const handleOk1 = () => {
    formRef1?.current?.submit();
    setConfirmLoading1(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible1(false);
  };

  const paginationChange = (e: any) => {
    setPageNumber(e);
    getVideoCommont(e, false);
  };

  const tabsChange = (key: any) => {
    setTabsKey((p: any) => (p = key));
  };

  return (
    <div className="reqositoryVideo">
      <div style={{ width: '100%' }}>
        <span
          style={{ cursor: 'pointer', height: '24px', lineHeight: '24px' }}
          onClick={() => {
            history.go(-1);
          }}
        >
          &lt;&nbsp;返回
        </span>
      </div>
      <div className="VideoBox">
        <div className="screen"></div>
        {/* <Player
                {...playerElment}
            >
                <BigPlayButton position="center" />
                <ControlBar {...ControlBarElment}>
                    <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} />
                </ControlBar>
            </Player> */}
        {videoInfo ? (
          <video width={'100%'} controls>
            <source src={videoInfo?.path} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="videoInfos">
        <Tabs activeKey={tabsKey} onChange={tabsChange}>
          <Tabs.TabPane tab="课程介绍" key="1">
            <div style={{ paddingBottom: '20px' }}>
              <div className="videoTitle">{videoInfo?.name}</div>
              <div className="videoContent">{videoInfo?.text}</div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="评论留言" key="2">
            <Button type={'primary'} onClick={showSetCommont}>
              发表评论
            </Button>
            {replyList.map((item: any, index: number) => {
              // console.log(item);
              return (
                <div
                  key={item?.id}
                  style={
                    replyList?.length - 1 > index
                      ? { borderBottom: '1px solid #ddd', width: '100%' }
                      : {}
                  }
                >
                  <Reply data={item} reply={reply} commentDel={commentDel} />
                </div>
              );
            })}
            {replyInfo?.count > 5 ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Pagination
                  simple
                  defaultCurrent={1}
                  pageSize={5}
                  total={replyInfo?.count}
                  onChange={paginationChange}
                />
              </div>
            ) : null}

            <div style={{ height: '10px' }}></div>
          </Tabs.TabPane>
        </Tabs>
        <Modal
          title={`回复 ${modalTitle}`}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose
        >
          <Form ref={formRef} onFinish={onFinish} preserve={false} name="form">
            <Form.Item
              name="body"
              rules={[{ required: true, message: '请输入回复内容' }]}
            >
              <Input.TextArea
                placeholder={`@ ${modalTitle}`}
                maxLength={100}
                showCount
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={`发表评论`}
          visible={visible1}
          onOk={handleOk1}
          confirmLoading={confirmLoading1}
          onCancel={handleCancel}
          destroyOnClose
        >
          <Form
            ref={formRef1}
            onFinish={onFinish1}
            preserve={false}
            name="form1"
          >
            <Form.Item
              name="body"
              rules={[{ required: true, message: '请输入内容' }]}
            >
              <Input.TextArea
                placeholder={`发表一条评论`}
                maxLength={100}
                showCount
              />
            </Form.Item>
          </Form>
        </Modal>
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
