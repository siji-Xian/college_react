import React, { useEffect, useState } from 'react';

import './index.less';
import {
  Card,
  Space,
  Avatar,
  Tag,
  Tooltip,
  Spin,
  message,
  Modal,
  Tabs,
} from 'antd';
import { history } from 'umi';
import api from '@/api';

import { QuestionCircleOutlined } from '@ant-design/icons';
import getDvaApp from 'dva';
import IndexModel from '@/models/requestUrl';
let data: any = getDvaApp().model(IndexModel);
let requestUrl = data.state.url;

const { CheckableTag } = Tag;
const { TabPane } = Tabs;

const { Meta } = Card;
export default function Index() {
  const [examineData, setExamineData] = useState<any>();
  const [examineInfo, setExamineInfo] = useState<any>();
  const [examineMessage, setExamineMessage] = useState<any>();
  const [selectedTags, setSelectedTags] = useState<any>(['按发布时间']);
  const [spinning, setSpinning] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = localStorage.getItem('userInfo');
  let userData: any;
  if (user) {
    userData = JSON.parse(user || '');
  }

  const Texts = (e: any) => {
    return <div className="overflow3">{e.data}</div>;
  };

  const showModal = (e: any) => {
    if (e.status) {
      message.success('您已通过本场考试！');
      return;
    }
    api.getNeedPrompt({ course_id: e.id }).then((res) => {
      if (res?.err_code === 0) {
        setExamineMessage(() => res?.data);
        setIsModalVisible(true);
        setExamineInfo(() => e);
      }
    });
  };
  const handleOk = () => {
    setIsModalVisible(false);
    history.push({
      pathname: '/examine/examinationPaper',
      query: {
        courseId: examineInfo.id,
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getExamCard = () => {
    setSpinning(true);
    let order_by =
      selectedTags[0] === '按发布时间' ? '["-create_time"]' : '["-counts"]';
    let data = {
      order_by,
      email: userData?.account,
    };
    api.getExamCard(data).then((res) => {
      if (res?.err_code === 0) {
        setSpinning(false);
        setExamineData(res?.data);
      }
    });
  };

  useEffect(() => {
    getExamCard();
  }, [selectedTags]);

  const toExaminatioPaper = (e: any) => {
    if (e.status) {
      message.success('您已通过本场考试！');
      return;
    }
    history.push({
      pathname: '/examine/examinationPaper',
      query: {
        courseId: e.id,
      },
    });
  };

  const CheckableTaghandleChange = (tag: any, checked: any) => {
    if (checked) {
      setSelectedTags([tag]);
    }
  };

  const tagsData = ['按发布时间', '按报考次数'];

  const text = (
    <div>
      <p>小助手提示：</p>
      <p>1.在巨量学开始学习之旅之前请确保是本人账号</p>
      <p>2.在确认是本人账号后，请在‘考生资料’中完善信息</p>
      <p>*注意：在绑定邮箱时，请务必以引力公司邮箱绑定为主</p>
    </div>
  );

  return (
    <div className="examine">
      <div className="title">
        <Tabs defaultActiveKey="1">
          <TabPane tab="引力考试科目" key="1">
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
          </TabPane>
          {/* <TabPane tab="阿里电商营销学" disabled key="2">
            Tab 2
          </TabPane> */}
        </Tabs>
        <div className="tip">
          <Tooltip placement="bottom" title={text}>
            <QuestionCircleOutlined />
          </Tooltip>
          <span>温馨提示，看课先激活已绑定引力邮箱的巨量学个人账号！</span>
          <a
            href="https://bytedance.feishu.cn/docs/doccnfplPf3YGW5tocG4H6xbl1d"
            target={'_blank'}
          >
            立即前往
          </a>
        </div>
      </div>
      <Spin spinning={spinning}>
        <Space size={[20, 10]} wrap>
          {examineData?.map((v: any) => {
            return (
              <Card
                key={v.id}
                style={{ width: 300 }}
                actions={[
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      color: '#8c8c8c',
                    }}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3777"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M931.2 518.4c0-233.6-188.8-419.2-419.2-419.2-233.6 0-419.2 188.8-419.2 419.2 0 137.6 67.2 259.2 169.6 336l-57.6 51.2c-9.6 9.6-12.8 25.6-3.2 35.2 9.6 9.6 25.6 12.8 35.2 3.2l70.4-57.6c60.8 35.2 131.2 54.4 208 54.4 80 0 153.6-22.4 214.4-60.8 0 0 0 0 3.2 3.2l73.6 60.8c9.6 9.6 25.6 6.4 35.2-3.2 9.6-9.6 6.4-25.6-3.2-35.2l-64-54.4C867.2 774.4 931.2 652.8 931.2 518.4zM512 889.6c-204.8 0-371.2-166.4-371.2-371.2s166.4-371.2 371.2-371.2 371.2 166.4 371.2 371.2S716.8 889.6 512 889.6z"
                        p-id="3778"
                        fill="#8c8c8c"
                      ></path>
                      <path
                        d="M208 96c-9.6-9.6-25.6-9.6-35.2 0l-118.4 118.4c-9.6 9.6-9.6 25.6 0 35.2 9.6 9.6 25.6 9.6 35.2 0l118.4-118.4C217.6 121.6 217.6 105.6 208 96z"
                        p-id="3779"
                        fill="#8c8c8c"
                      ></path>
                      <path
                        d="M969.6 211.2l-118.4-115.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l118.4 115.2c9.6 9.6 25.6 9.6 35.2 0C979.2 236.8 979.2 220.8 969.6 211.2z"
                        p-id="3780"
                        fill="#8c8c8c"
                      ></path>
                      <path
                        d="M707.2 300.8l-144 128c0 0 0 3.2-3.2 3.2-12.8-3.2-22.4-6.4-35.2-6.4-12.8 0-22.4 3.2-32 6.4 0-3.2-3.2-3.2-3.2-6.4l-92.8-83.2c-9.6-9.6-25.6-9.6-35.2 3.2-9.6 9.6-9.6 25.6 3.2 35.2l89.6 80c-16 19.2-28.8 41.6-28.8 70.4 0 54.4 44.8 102.4 102.4 102.4 54.4 0 102.4-44.8 102.4-102.4 0-25.6-9.6-48-25.6-67.2l140.8-124.8c9.6-9.6 9.6-25.6 3.2-35.2C732.8 294.4 716.8 294.4 707.2 300.8zM524.8 582.4c-28.8 0-51.2-22.4-51.2-51.2 0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2C576 556.8 553.6 582.4 524.8 582.4z"
                        p-id="3781"
                        fill="#8c8c8c"
                      ></path>
                    </svg>
                    {v.time_limit}
                    分钟
                  </span>,
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      color: '#8c8c8c',
                    }}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1974"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M864 96H256c-35.346 0-64 28.654-64 64v640H96v64c0 35.347 28.654 64 64 64h608c35.346 0 64-28.653 64-64V224h96v-64c0-35.346-28.654-64-64-64zM160 896c-17.673 0-32-14.327-32-32v-32h544v32a63.692 63.692 0 0 0 8.583 32H160z m640-736v704c0 17.673-14.327 32-32 32h-32c-17.673 0-32-14.327-32-32v-64H224V160c0-17.673 14.327-32 32-32h552.584A63.682 63.682 0 0 0 800 160z m96 32h-64v-32c0-17.673 14.327-32 32-32s32 14.327 32 32v32z m-560 96h160c8.836 0 16-7.164 16-16s-7.164-16-16-16H336c-8.836 0-16 7.164-16 16s7.164 16 16 16z m0 128h352c8.837 0 16-7.164 16-16s-7.163-16-16-16H336c-8.836 0-16 7.164-16 16s7.164 16 16 16z m0 128h224c8.837 0 16-7.163 16-16s-7.163-16-16-16H336c-8.836 0-16 7.163-16 16s7.164 16 16 16z m0 128h352c8.837 0 16-7.163 16-16s-7.163-16-16-16H336c-8.836 0-16 7.163-16 16s7.164 16 16 16z"
                        p-id="1975"
                        fill="#8c8c8c"
                      ></path>
                    </svg>
                    {v.full_score}分
                  </span>,
                  // onClick={() => toExaminatioPaper(v)}
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => showModal(v)}
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="4756"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M1016.477963 461.351616q0 17.049951-6.519099 32.094025t-17.55142 26.076396-26.076396 18.052889-32.094025 7.020568l-349.022527 0q34.099902 0 58.170421 22.064643t24.070519 55.161606-24.070519 57.167483-58.170421 24.070519l-31.091087 0q17.049951 0 32.094025 6.519099t26.577865 17.049951 18.052889 25.073457 6.519099 30.589618q0 17.049951-9.527914 31.592556t-25.073457 25.574927-36.105779 17.55142-42.624878 6.519099q35.10284 0 56.164545 23.56905t21.061704 57.668952q0 21.061704-12.03526 35.60431t-30.088149 24.571988-38.613124 14.542605-37.610186 4.513222l-55.161606 0-248.728697 0q-33.096964 0-61.680705-11.032321t-49.143976-30.589618-32.595495-47.639569-12.03526-63.185113l0-315.925563q0-20.058766 1.504407-40.619001t7.522037-38.613124 18.554358-33.096964 34.601371-24.070519q31.091087-13.038198 74.217434-43.627816t82.742409-71.710088 67.698335-91.267385 28.082272-102.299706q1.002938-30.088149 8.524976-51.149853t19.055828-34.099902 25.574927-19.055828 28.082272-6.01763q37.108717 0 62.182174 23.067581t36.105779 74.217434q2.005877 46.135162-5.014691 94.2762-6.01763 42.123408-22.064643 92.771792t-48.141038 99.79236l491.439765 0q34.099902 0 58.170421 21.563173t24.070519 55.663075z"
                        p-id="4757"
                        fill="#8c8c8c"
                      ></path>
                    </svg>
                    开始答题
                  </span>,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar shape="square" src={v.img ? `${v.img}` : ''} />
                  }
                  style={{ height: 100 }}
                  title={v.course_name}
                  // description={v.introduction}
                  description={<Texts data={v.introduction}></Texts>}
                />
              </Card>
            );
          })}
        </Space>
        <Modal
          title="温馨提示"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{`本次考试共计${
            examineMessage?.to_rule.multiple + examineMessage?.to_rule.radio
          }题，题型分为单选题和多选题。`}</p>
          <p>{`单选题${examineMessage?.to_rule.radio}题，每题${
            examineMessage?.to_rule.radio_fraction
          }分；多选题${examineMessage?.to_rule.multiple}题，每题${
            examineMessage?.to_rule.multiple_fraction
          }分；${
            examineMessage?.to_rule.judge
              ? '判断题' +
                examineMessage?.to_rule.judge +
                '题，每题' +
                examineMessage?.to_rule.judge_fraction +
                '分；'
              : ''
          }`}</p>
          <p>{`注意，考试时间${examineMessage?.course.time_limit}分钟，${examineMessage?.course.pass_score}分为成绩合格！`}</p>
        </Modal>
      </Spin>
    </div>
  );
}
