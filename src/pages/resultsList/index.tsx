import api from '@/api';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import { Avatar, Tag, Spin, Input } from 'antd';
import getDvaApp from 'dva';
import IndexModel from '@/models/requestUrl';

let data: any = getDvaApp().model(IndexModel);
let requestUrl = data.state.url;
const { CheckableTag } = Tag;
const { Search } = Input;
export default function Index() {
  const user = localStorage.getItem('userInfo');
  const [resulteList, setResulteList] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any>(['按考试时间']);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [course_name, setSearch] = useState<string>('');

  let userData: any;
  if (user) {
    userData = JSON.parse(user || '');
  }
  const getAllExams = () => {
    setSpinning(true);
    let order_by =
      selectedTags[0] === '按考试时间' ? '["-s_time"]' : '["-fraction"]';

    let data: any = {
      email: userData.account,
      order_by,
    };
    if (course_name) {
      data.course_name = course_name;
    }
    api
      .getAllExams({ data: { ...data }, requestType: 'form' })
      .then((res) => {
        if (res?.err_code === 0) {
          setSpinning(false);
          setResulteList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllExams();
  }, [selectedTags, course_name]);

  const CheckableTaghandleChange = (tag: any, checked: any) => {
    if (checked) {
      setSelectedTags([tag]);
    }
  };

  const tagsData = ['按考试时间', '按考试得分'];

  const onSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="resultsList">
      <div className="title">
        <div className="left">
          <span>参加过的考试</span>
          <div>
            {tagsData.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags?.indexOf(tag) > -1}
                onChange={(checked) => CheckableTaghandleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        </div>
        <div className="right">
          <Search
            placeholder="输入考试名称搜索"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="box">
        <Spin spinning={spinning}>
          {resulteList.map((v: any) => {
            return (
              <div key={v.s_time} className="boxList">
                <div className="boxListLeft">
                  <Avatar
                    shape="square"
                    src={v.course.img ? `${v.course.img}` : ''}
                  />
                  <div className="info">
                    <span>{v.course.course_name}</span>
                    <span className="message">{v.course.course_name}</span>
                  </div>
                </div>
                <div className="boxListRigth">
                  <div className="rigthItem">
                    <span>考生</span>
                    <span>{userData.username}</span>
                  </div>
                  <div className="rigthItem">
                    <span>开始时间</span>
                    <span>{v.s_time?.slice(0, 19)}</span>
                  </div>
                  <div className="rigthItem">
                    <span>分数</span>
                    <span style={{ fontSize: '16px' }}>{v.fraction}</span>
                  </div>
                  <div className="rigthItem">
                    <span>成绩</span>
                    <span style={{ fontSize: '14px' }}>
                      {v.pass_status ? '合格' : '不合格'}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/examine/resultsList/resultsListPaper?testpaper_id=${v.testpaper_id}`}
                    >
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Spin>
      </div>
    </div>
  );
}
