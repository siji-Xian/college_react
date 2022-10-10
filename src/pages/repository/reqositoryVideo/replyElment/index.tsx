import React, { useEffect, useState, useRef, ReactNode, FC } from 'react';
import { connect } from 'dva';
import { Comment, Tooltip, Popconfirm, message } from 'antd';
import { history, Helmet } from 'umi';
import moment from 'moment';

import './index.less';
import api from '@/api';

interface Props {
  data?: any;
  reply: (v: any, i: any) => void;
  commentDel: (e: any) => void;
}
const Index: FC<Props> = (props: any) => {
  const { data, reply, commentDel } = props;
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  const user = localStorage.getItem('userInfo');
  let userData: any;
  if (user) {
    userData = JSON.parse(user || '');
  }

  const showAll = () => {
    setIsShowAll((p) => (p = true));
  };

  // const commentDel = (id: any) => {
  //   console.log(id);
  //   api.delVideoAppComment({comment_id:id}).then((res:any)=>{
  //     if (res?.err_code === 0) {
  //       message.success('删除成功');
  //     }
  //   })
  // }

  const Del = (e: any) => {
    let text: string | null;
    text = userData?.username === e?.name ? '删除' : null;
    return (
      <Popconfirm
        title="删除评论后，评论下所有回复都会被删除是否继续?"
        onConfirm={() => commentDel(e.id)}
      >
        <span className="commentDel">{text}</span>
      </Popconfirm>
    );
  };

  const actions = (date: any, name: any, id: any) => {
    return [
      // <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
      //   <span>{moment(date).fromNow()}</span>
      // </Tooltip>,
      <span>{moment(date).format('YYYY-MM-DD HH:mm')}</span>,
      <span
        key="comment-basic-reply-to"
        onClick={() => {
          reply(name, id);
        }}
      >
        回复
      </span>,
      <Del name={name} id={id} />,
    ];
  };

  //回复Elment
  const ReplyElment: React.FC<{
    children?: React.ReactNode;
    name: any;
    toName?: any;
    content: any;
    date: any;
    replyId: any;
  }> = ({ children, name, content, date, toName, replyId }) => {
    return (
      <Comment
        actions={actions(date, name, replyId)}
        author={
          <a>
            {name}
            {toName ? (
              <span>
                {' '}
                回复 <span style={{ color: '#3d8bf7' }}>@{toName}</span>
              </span>
            ) : null}
          </a>
        }
        content={<p>{content}</p>}
      >
        {children}
      </Comment>
    );
  };
  return (
    <div className="reqositoryVideo">
      <div className="videoInfos">
        <ReplyElment
          name={data?.author?.username}
          content={data?.body}
          date={data?.c_time}
          replyId={data?.id}
        >
          {data?.child?.map((v: any, index: number) => {
            return isShowAll || index <= 1 ? (
              <ReplyElment
                key={v?.id}
                name={v?.author?.username}
                toName={v?.author?.to_username}
                content={v?.body}
                date={v?.c_time}
                replyId={v?.id}
              />
            ) : null;
          })}
        </ReplyElment>
        {data?.child?.length > 2 && !isShowAll ? (
          <span
            style={{
              color: '#5289ef',
              cursor: 'pointer',
              fontSize: '13px',
              marginLeft: '44px',
            }}
            onClick={showAll}
          >
            展开{data?.child?.length - 2}条回复
          </span>
        ) : null}
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
