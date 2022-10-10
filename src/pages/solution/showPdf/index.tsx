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
import { modifyPdf } from '@/components/modifyPdf';

import { history, Helmet } from 'umi';
import 'video-react/dist/video-react.css';
import moment from 'moment';
import { exportPDF } from '@/components/exportPDF';

import Reply from './replyElment';
import img1 from '@/static/image/图片1.png';

import './index.less';
import api from '@/api';

function Index(props: any) {
  //获取url参数
  const videoId: any = history.location.query?.id;
  const videoTabsIndex: any = history.location?.state;

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
  const [pdfHtml, setPdfHtml] = useState('');
  const [loadings, setLoadings] = useState<boolean>(false);

  const [videoInfo, setVideoInfo] = useState<any>();

  const user = localStorage.getItem('userInfo');

  // window.onload = () =>{
  //   let imgEle = document.getElementsByTagName('img')
  //   setTimeout(() => {
  //     console.log(imgEle.length);
  //     console.log(imgEle[1].src)
  //     for (let index = 0; index < imgEle.length; index++){
  //       if (index!=0) {
  //         imgEle[index].src = imgEle[index].src + '?time=' + new Date().valueOf();
  //       }
  //     }
  //   }, 500);
  // }

  //通过id查询视频信息
  const getVideoAppGetVideo = async (id: any) => {
    const res = await api.getStrategyAppPlayVideo({
      video_id: id,
      // status:2
    });
    if (res?.err_code === 0) {
      setVideoInfo(res.data.data);
      setPdfHtml(res.data?.data?.body);
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

  const formRef: any = useRef(null);
  const formRef1: any = useRef(null);

  //获取评论
  const getVideoCommont = async (e: number, isOne?: boolean) => {
    let datas = { video_id: videoId, page: e };
    const res = await api.getStrategyAppComment({ ...datas });
    if (res?.err_code === 0) {
      setReplyInfo(res);
      setReplyList(res.data.data);
      setBarrageObj(() => {
        return res.data.data.map((item: any) => {
          return item?.body;
        });
      });
    }
  };

  //删除评论
  const commentDel = (id: any) => {
    api.delStrategyAppComment({ comment_id: id }).then((res: any) => {
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
      .postStrategyAppComment({
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
      .postStrategyAppComment({
        data: { ...datas },
        requestType: 'form',
      })
      .then((res: any) => {
        // console.log(res);
        if (res.err_code === 0) {
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

  const exportPdf = () => {
    setLoadings(true);
    modifyPdf(videoInfo.pdf, userData?.username + ' ' + userData?.email)
      .then((res) => {
        message.success(res);
        setLoadings(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="showPdf">
      <div
        style={{
          width: '100%',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{ cursor: 'pointer', height: '24px', lineHeight: '24px' }}
          onClick={() => {
            history.go(-1);
          }}
        >
          &lt;&nbsp;返回
        </span>
        <div>
          <Button
            type="primary"
            loading={loadings}
            // size="small"
            onClick={exportPdf}
          >
            导出为pdf
          </Button>
        </div>
      </div>
      <div className="VideoBox">
        <p dangerouslySetInnerHTML={{ __html: pdfHtml }}></p>
      </div>
      {/* <div  id='toPDF'>
        <img src={img1} alt="" />
      </div> */}

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
