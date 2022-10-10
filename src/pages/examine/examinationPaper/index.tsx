import React, { useEffect, useState } from 'react';
import './index.less';
import { connect } from 'dva';
import { history, Prompt } from 'umi';
import moment from 'moment';

import { Form, message, Button, Modal, Radio, Checkbox, Row, Col } from 'antd';
import Timer from '../timer';
import api from '@/api';

import img1 from '@/static/image/图片1.png';

function Index(props: any) {
  const { requestUrl } = props;
  const [topicList, setTopicList] = useState([]); //试题
  const [topicData, setTopicData] = useState<any>({}); //试卷信息

  const [eTime, setETime] = useState<any>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState<boolean>(true);

  let testpaper_id: any;
  const showModal = () => {
    setIsModalVisible(true);
  };
  const comeBack = () => {
    history.goBack();
  };

  const handleOk = () => {
    setIsChecked(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsChecked(false);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsChecked(() => false);
      // history.replace('/login');
    }
  }, []);

  const user = localStorage.getItem('userInfo');

  function timestampToTime(timestamp: any) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }

  const courseId = history.location.query?.courseId;
  let userData: any;
  if (user) {
    userData = JSON.parse(user || '');
  }
  //获取试卷
  const getStartExam = () => {
    api.getStartExam({ id: courseId, email: userData?.account }).then((res) => {
      if (res?.err_code === 0) {
        let timers = moment(res?.data?.rule?.s_time).valueOf();

        const a = timestampToTime(timers + res?.data?.rule?.time_limit * 60000);

        setTopicList(res.data.questions);
        setTopicData(res.data.rule);
        testpaper_id = res.data.rule.testpaper_id;
        setETime(a);
      }
    });
  };

  useEffect(() => {
    getStartExam();
  }, []);

  //交卷
  const onFinish = (value: any) => {
    let values = Object.values(value).map((v: any, i: number) => {
      // console.log(v);
      return v === undefined || v.length === 0
        ? (value[i] = null)
        : (value[i] = v);
    });
    let submitFun = () => {
      let data = JSON.stringify({
        course_id: +(courseId || 0),
        testpaper_id: +topicData.testpaper_id,
        email: userData?.account,
        answer: value,
      });
      setIsChecked(false);
      api
        .getSubmitExam({ data, requestType: 'json' })
        .then((res) => {
          if (res?.err_code === 0) {
            message.success('提交成功！');
            history.replace(
              `/examine/resultsList/resultsListPaper?testpaper_id=${topicData.testpaper_id}`,
            );
          } else {
            message.error(res.msg);
            history.replace(`/examine/index`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (values.findIndex((v: any) => v === null) !== -1) {
      Modal.confirm({
        content: '您尚未完成所有题目，是否继续提交？',
        okText: '提交',
        cancelText: '取消',
        onOk() {
          submitFun();
        },
      });
      return;
    }
    submitFun();
  };

  const onFinishFailed = () => {
    message.error('请先完成作答！');
  };

  //放弃考试
  // const onCancel = () => {
  //   history.replace(`/examine`);
  // };

  useEffect(() => {
    if (!isChecked) {
      history.replace(`/examine/index`);
    }
  }, [isChecked]);

  return (
    <div className="examinationPaper">
      <div className="examinationPaperTimer">
        {eTime && (
          <div className="timer">
            <span>距考试结束还有&emsp;</span>
            <Timer onTimer={showModal} e_time={eTime} />
          </div>
        )}
      </div>
      <div className="content">
        <div className="title">{topicData?.course_name}</div>
        <div className="info">
          <span>类目：引力考试科目</span>
          <span>考生：{userData?.username}</span>
          <span>日期：{topicData?.s_time?.slice(0, 10)}</span>
        </div>
        <div className="page">
          <Form
            onFinish={onFinish}
            name="examine"
            layout="vertical"
            // onFinishFailed={onFinishFailed}
            scrollToFirstError
            requiredMark={false}
          >
            {topicList?.filter((s: any) => s.types == 1).length > 0 ? (
              <h3>一、单项选择</h3>
            ) : null}
            {topicList
              ?.filter((s: any) => s.types == 1)
              .map((v: any, i: number) => {
                return (
                  <Form.Item key={v.id} label={i + 1 + '.' + v.title}>
                    {v?.img ? (
                      <img src={`${v.img}`} style={{ maxWidth: '600px' }}></img>
                    ) : null}
                    <Form.Item
                      key={v.id}
                      name={v.id}
                      style={{ marginBottom: '0' }}
                    >
                      <Radio.Group>
                        <Radio value="A">{v.a}</Radio>
                        <Radio value="B">{v.b}</Radio>
                        <Radio value="C">{v.c}</Radio>
                        {v.d ? <Radio value="D">{v.d}</Radio> : null}
                      </Radio.Group>
                    </Form.Item>
                  </Form.Item>
                );
              })}
            {topicList?.filter((s: any) => s.types == 2).length > 0 ? (
              <h3>二、多项选择</h3>
            ) : null}
            {topicList
              ?.filter((s: any) => s.types == 2)
              .map((v: any, i: number) => {
                return (
                  <Form.Item
                    // rules={[{ required: true, message: '请选择您的答案!' }]}
                    key={v.id}
                    label={i + 1 + '.' + v.title}
                  >
                    {v?.img ? (
                      <img src={`${v.img}`} style={{ maxWidth: '600px' }}></img>
                    ) : null}
                    <Form.Item key={v.id} name={v.id}>
                      <Checkbox.Group>
                        <Row>
                          <Col span={20}>
                            <Checkbox value="A" style={{ lineHeight: '32px' }}>
                              {v.a}
                            </Checkbox>
                          </Col>
                          <Col span={20}>
                            <Checkbox value="B" style={{ lineHeight: '32px' }}>
                              {v.b}
                            </Checkbox>
                          </Col>
                          <Col span={20}>
                            <Checkbox value="C" style={{ lineHeight: '32px' }}>
                              {v.c}
                            </Checkbox>
                          </Col>
                          {v.d ? (
                            <Col span={20}>
                              <Checkbox
                                value="D"
                                style={{ lineHeight: '32px' }}
                              >
                                {v.d}
                              </Checkbox>
                            </Col>
                          ) : null}
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Form.Item>
                );
              })}
            {topicList?.filter((s: any) => s.types == 3).length > 0 ? (
              <h3>三、判断题</h3>
            ) : null}
            {topicList
              ?.filter((s: any) => s.types == 3)
              .map((v: any, i: number) => {
                return (
                  <Form.Item
                    // rules={[{ required: true, message: '请选择您的答案!' }]}
                    key={v.id}
                    label={i + 1 + '.' + v.title}
                  >
                    {v?.img ? (
                      <img src={`${v.img}`} style={{ maxWidth: '600px' }}></img>
                    ) : null}
                    <Form.Item
                      // rules={[{ required: true, message: '请选择您的答案!' }]}
                      key={v.id}
                      name={v.id}
                    >
                      <Radio.Group>
                        <Radio value="对">{v.a}</Radio>
                        <Radio value="错">{v.b}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Form.Item>
                );
              })}

            <Form.Item>
              <div className="examinationPaperButtom">
                <Button type="primary" htmlType="submit">
                  交卷
                </Button>
                <div style={{ width: '7vw' }}></div>
                <Button onClick={comeBack}>放弃</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Prompt
        when={isChecked}
        message={(location) => {
          Modal.confirm({
            content: '您正在做放弃本场考试的操作，是否继续？',
            okText: '继续',
            cancelText: '取消',
            onOk() {
              api.getGiveUpExam({ testpaper_id: topicData.testpaper_id });
              setIsChecked(false);
            },
          });
          return false;
          // return isSubmit || isModalVisible
          //   ? true
          //   : `您正在做放弃本场考试的操作，是否继续？`;
        }}
      />
      <Modal
        title="提示"
        visible={isModalVisible}
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        <span>考试已结束，请返回考试列表</span>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { url: requestUrl } = state.requestUrl;
  return {
    state,
    requestUrl,
  };
};
export default connect(mapStateToProps)(Index);
