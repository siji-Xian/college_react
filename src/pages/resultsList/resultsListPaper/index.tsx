import React, { useEffect, useState } from 'react';
import './index.less';
import { history } from 'umi';

import { Form, Radio, Checkbox, Row, Col } from 'antd';
import api from '@/api';

export default function Index() {
  const user = localStorage.getItem('userInfo');
  const testpaper_id = history.location.query?.testpaper_id;

  const [resulteList, setResulteList] = useState<any>();
  const [userAnswer, setUserAnswer] = useState<any>();
  let userData: any;
  if (user) {
    userData = JSON.parse(user || '');
  }
  const getAllExams = () => {
    let data = {
      email: userData?.account,
      testpaper_id,
    };
    api
      .getAllExams({ data: { ...data }, requestType: 'form' })
      .then((res) => {
        let datas = res.data.data[0];
        setResulteList(datas);
        let a: any = {};
        datas?.question?.map((v: any) => {
          a[v.id] = v.record.res;
        });
        setUserAnswer(a);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllExams();
  }, []);
  return (
    <div className="resultsListPaper">
      <div className="content">
        <div className="title">{resulteList?.course?.course_name}</div>
        <div className="info">
          <span>类目：引力考试科目</span>
          <span>考生：{userData.username}</span>
          <span>
            得分：
            <span
              style={
                resulteList?.pass_status
                  ? { color: '#52c41a' }
                  : { color: '#cf1322' }
              }
            >
              {resulteList?.fraction}
            </span>
          </span>
          <span>
            成绩：
            <span
              style={
                resulteList?.pass_status
                  ? { color: '#52c41a' }
                  : { color: '#cf1322' }
              }
            >
              {resulteList?.pass_status ? '合格' : '不合格'}
            </span>
          </span>
          <span>日期：{resulteList?.e_time?.slice(0, 10)}</span>
        </div>
        <div className="page">
          {userAnswer && (
            <Form
              name="examine"
              layout="vertical"
              scrollToFirstError
              initialValues={{ ...userAnswer }}
              requiredMark={false}
            >
              {resulteList?.question?.filter((s: any) => {
                return s.types == 1;
              }).length > 0 ? (
                <h3>一、单项选择</h3>
              ) : null}

              {resulteList?.question
                ?.filter((s: any) => {
                  return s.types == 1;
                })
                ?.map((v: any, i: number) => {
                  if (v.types == 1) {
                    return (
                      <div key={v.id}>
                        <Form.Item key={v.id} label={i + 1 + '.' + v.title}>
                          {v?.img ? (
                            <img
                              src={`${v.img}`}
                              style={{ maxWidth: '600px' }}
                            ></img>
                          ) : null}
                          <Form.Item
                            key={v.id}
                            name={v.id}
                            style={{ marginBottom: '0' }}
                          >
                            <Radio.Group disabled>
                              <Radio value="A">{v.a}</Radio>
                              <Radio value="B">{v.b}</Radio>
                              <Radio value="C">{v.c}</Radio>
                              {v.d ? <Radio value="D">{v.d}</Radio> : null}
                            </Radio.Group>
                          </Form.Item>
                        </Form.Item>
                        <div style={{ marginBottom: '20px' }}>
                          <span>正确答案：{v.answer}</span>
                          {v.answer !== v.record.res && (
                            <span
                              style={{ marginLeft: '10px' }}
                              dangerouslySetInnerHTML={{
                                __html: v.answer_analysis,
                              }}
                            ></span>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              {resulteList?.question?.filter((s: any) => {
                return s.types == 2;
              }).length > 0 ? (
                <h3>二、多项选择</h3>
              ) : null}

              {resulteList?.question
                ?.filter((s: any) => {
                  return s.types == 2;
                })
                ?.map((v: any, i: number) => {
                  if (v.types == 2) {
                    return (
                      <div key={v.id}>
                        <Form.Item
                          // rules={[{ required: true, message: '请选择您的答案!' }]}
                          key={v.id}
                          label={i + 1 + '.' + v.title}
                        >
                          {v?.img ? (
                            <img
                              src={`${v.img}`}
                              style={{ maxWidth: '600px' }}
                            ></img>
                          ) : null}
                          <Form.Item
                            key={v.id}
                            name={v.id}
                            style={{ marginBottom: '0' }}
                          >
                            <Checkbox.Group disabled>
                              <Row>
                                <Col span={20}>
                                  <Checkbox
                                    value="A"
                                    style={{ lineHeight: '32px' }}
                                  >
                                    {v.a}
                                  </Checkbox>
                                </Col>
                                <Col span={20}>
                                  <Checkbox
                                    value="B"
                                    style={{ lineHeight: '32px' }}
                                  >
                                    {v.b}
                                  </Checkbox>
                                </Col>
                                <Col span={20}>
                                  <Checkbox
                                    value="C"
                                    style={{ lineHeight: '32px' }}
                                  >
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
                        <div style={{ marginBottom: '20px' }}>
                          <span>正确答案：{v.answer}</span>
                          {v.answer !== v.record.res && (
                            <span
                              style={{ marginLeft: '10px' }}
                              dangerouslySetInnerHTML={{
                                __html: v.answer_analysis,
                              }}
                            ></span>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              {resulteList?.question?.filter((s: any) => {
                return s.types == 3;
              }).length > 0 ? (
                <h3>三、判断题</h3>
              ) : null}

              {resulteList?.question
                ?.filter((s: any) => {
                  return s.types == 3;
                })
                ?.map((v: any, i: number) => {
                  if (v.types == 3) {
                    return (
                      <div key={v.id}>
                        <Form.Item key={v.id} label={i + 1 + '.' + v.title}>
                          {v?.img ? (
                            <img
                              src={`${v.img}`}
                              style={{ maxWidth: '600px' }}
                            ></img>
                          ) : null}
                          <Form.Item
                            key={v.id}
                            name={v.id}
                            style={{ marginBottom: '0' }}
                          >
                            <Radio.Group disabled>
                              <Radio value="对">{v.a}</Radio>
                              <Radio value="错">{v.b}</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Form.Item>
                        <div style={{ marginBottom: '20px' }}>
                          <span>正确答案：{v.answer}</span>
                          {v.answer !== v.record.res && (
                            <span
                              style={{ marginLeft: '10px' }}
                              dangerouslySetInnerHTML={{
                                __html: v.answer_analysis,
                              }}
                            ></span>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
            </Form>
          )}
        </div>
        <div
          className="back"
          onClick={() => {
            history.replace('/examine/resultsList');
          }}
        >
          &lt;&nbsp;考试记录
        </div>
        <div className="examinationPaperButtom"></div>
      </div>
    </div>
  );
}
