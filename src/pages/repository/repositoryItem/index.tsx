import React, { useEffect, useState, FC } from 'react';
import { connect } from 'dva';
import { Image, Select, Tabs, Tag, message, Skeleton, Divider } from 'antd';
import { history, Helmet } from 'umi';
import {
  PlayCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
} from '@ant-design/icons';

import './index.less';
import api from '@/api';

import useWindowSize from '@/components/windowsHeight';
import moment from 'moment';

interface Props {
  data?: any;
}

const Index: FC<Props> = (props: any) => {
  const { data, state } = props;
  const requestUrl = state?.requestUrl?.url;
  const [likeCount, setLikeCount] = useState<number>(+data?.like);
  const [likeAnimation, setLikeAnimation] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(data?.status);

  const toVideo = (tabsIndex?: any) => {
    addCount(1, data?.id);
    // window.open(`/repository/repositoryVideo?id=${data?.id}`);
    history.push({
      pathname: '/repository/repositoryVideo',
      query: {
        id: data.id,
      },
      state: {
        tabsIndex,
      },
    });
  };
  let timer: any;
  const addCount = (e: any, id: any) => {
    let data = {
      types: e,
      video_id: id,
    };
    api
      .getVideoAppShow({
        data: { ...data },
        requestType: 'form',
      })
      .then((res: any) => {
        if (res.err_code === 0 && e === 2) {
          if (status === false) {
            setLikeCount((p) => (p = likeCount + 1));
            setLikeAnimation((p) => (p = true));
            setStatus((p) => (p = true));
            timer = setTimeout(() => {
              setLikeAnimation((p) => (p = false));
            }, 1000);
          } else if (status === true) {
            setLikeCount((p) => (p = likeCount - 1));
            setStatus((p) => (p = false));
            // message.info(res.msg);
          }
        }
      });
  };

  let likeAnimationClass: any = likeAnimation
    ? 'likeAnimation'
    : 'likeAnimationNone';

  let boxWidth: any =
    useWindowSize().width > 1720 ? 'calc(100% / 4)' : 'calc(100% / 3)';

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 使用moment判断日期是否大于三天
  // const isOverThreeDay = (time: any) => {
  //   let now = moment();
  //   let old = moment(time);
  //   let diff = now.diff(old, 'days');
  //   if (diff > 3) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div className="repositoryItem" style={{ width: boxWidth }}>
      <div className="repositoryItemBox">
        <div className="videoImg" onClick={() => toVideo('1')}>
          <img
            // src={requestUrl + 'media/' + data.img}
            src={data.oss_img}
            height={'100%'}
            width={'100%'}
          />
        </div>
        {data?.hot_tag ? (
          <div
            className="videoTag"
            style={{ backgroundColor: 'rgb(187, 50, 50)' }}
          >
            {/* {
              isOverThreeDay
            } */}
            <span>
              {data?.hot_tag ? (data?.hot_tag === 1 ? 'Hot' : 'New') : null}
            </span>
          </div>
        ) : null}

        <div className="videoInfo">
          <div className="videoInfoName" title={data?.name}>
            {data?.name}
          </div>
          <div className="videoInfoTag">
            {data?.tags?.map((v: any, i: any) => {
              return (
                <Tag key={i} color="#e8e6e6">
                  {v}
                </Tag>
              );
            })}
          </div>
          <div className="videoInfoChange">
            <div className="videoInfoUser">
              <div>
                <EyeOutlined />
                &nbsp;{data.watch}次
              </div>
              <div onClick={() => toVideo('2')} style={{ cursor: 'pointer' }}>
                <MessageOutlined />
                &nbsp;{data?.comment}条
              </div>
              <div
                className="like"
                style={{ cursor: 'pointer' }}
                onClick={() => addCount(2, data.id)}
              >
                {status ? <LikeFilled /> : <LikeOutlined />}
                {/* <LikeOutlined /> */}
                <span>&nbsp;{likeCount}赞</span>
                <div className={likeAnimationClass}>
                  <LikeOutlined />
                  &nbsp;+1
                </div>
              </div>
            </div>
            <div className="videoInfoStart">
              <div
                className="videoInfoStartButtom"
                onClick={() => toVideo('1')}
              >
                <span>
                  <PlayCircleOutlined />
                </span>{' '}
                立即学习
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Index);
