import request from '@/utils/request';
import { stringify } from 'qs';
export default {
  // //损益表数据
  // getTableList(params?: object) {
  //   return request.get(`v1/api/budget/user/total?${stringify(params)}`);
  // },
  // //损益表结构
  // getTableOS(params?: object) {
  //   return request.get(`v1/api/budget/user/to/t2?${stringify(params)}`);
  // },

  // //V2.1上传表格（多部门）
  // uploadXls(params?: object) {
  //   return request.post('v2/api/budget/total/upload', params);
  // },
  // //V2.1上传表格（单部门）
  // uploadXls1(params?: object) {
  //   return request.post('v2/api/budget/upload', params);
  // },

  // //v2.1损益表数据
  // getTableListV2(params?: object) {
  //   return request.get(`v2/api/budget/get_bu_datas_v2_1?${stringify(params)}`);
  // },
  // //

  getOperationdetail(params?: object) {
    return request.get(
      `v2/api/budget/get_operationdetail?${stringify(params)}`,
    );
  },

  //get_version
  getVersion(params?: object) {
    return request.get(`v2/api/budget/get_version?${stringify(params)}`);
  },

  //登录
  login(params?: object) {
    return request.post('user_app/login/', params);
  },

  //注册
  register(params?: object) {
    return request.post('user_app/register/', params);
  },

  //找回密码
  findPassword(params?: object) {
    return request.post('user_app/forgot_password/', params);
  },

  //发送邮箱验证码
  sendEmailCode(params?: object) {
    return request.get(`user_app/send_code/?${stringify(params)}`);
  },

  //获取用户已绑定品牌
  getPlatformList(params?: object) {
    return request.post('v1/user/platform/list', params);
  },

  //获取品牌列表
  getBankList(params?: object) {
    return request.post('v1/user/brand/list/', params);
  },

  //固定场景
  getDataBank(params?: object) {
    return request.post('v1/ec/save/aoeo/fixed/databank/', params);
  },

  //固定场景：同步数据
  getDataSave(params?: object) {
    return request.post('v1/ec/aoeo/save/', params);
  },
  //固定场景：导出表格
  getDataExport(params?: object) {
    return request.post('v1/ec/aoeo/export/', params);
  },

  //固定场景 v1/d_bank/api/aoeo/index
  getAoeoIndex(params?: object) {
    return request.post('v1/d_bank/api/aoeo/index', params);
  },
  //固定场景 刷新数据 v1/d_bank/api/aoeo/save
  getAoeoSave(params?: object) {
    return request.post('v1/d_bank/api/aoeo/save', params);
  },

  //固定场景 导出表格 v1/d_bank/api/aoeo/export
  getAoeoExport(params?: object) {
    return request.post('v1/d_bank/api/aoeo/export', params);
  },

  //全链路 状态 list
  getStatus(params?: object) {
    return request.post('v1/d_bank/api/push/status/', params);
  },

  //二级类目List
  getCategory(params?: object) {
    return request.post('v1/d_bank/api/push/category', params);
  },

  //历史天使list
  getPushNumber(params?: object) {
    return request.post('v1/d_bank/api/push/number', params);
  },

  //自定义任务列表
  getCustomList(params?: object) {
    return request.post('v1/d_bank/api/custom/list/', params);
  },

  // 创建圈包任务
  getPackcreate(params?: object) {
    return request.post('v1/d_bank/api/pack/create/', params);
  },

  // 创建计算人数任务
  getCalculateCreate(params?: object) {
    return request.post('v1/d_bank/api/calculate/create/', params);
  },
  //人群包导出
  getPackExport(params?: object) {
    return request.post('v1/d_bank/api/pack/export/', params);
  },

  //试卷列表
  getExamCard(params?: object) {
    return request.get(`exam_app/exam_card/?${stringify(params)}`);
  },
  //考试信息
  getNeedPrompt(params?: object) {
    return request.get(`exam_app/need_prompt/?${stringify(params)}`);
  },
  //试题列表
  getStartExam(params?: object) {
    return request.get(`exam_app/start_exam/?${stringify(params)}`);
  },

  //放弃考试
  getGiveUpExam(params?: object) {
    return request.get(`exam_app/give_up_exam/?${stringify(params)}`);
  },

  //提交试卷
  getSubmitExam(params?: object) {
    return request.post('exam_app/submit_exam/', params);
  },

  //成绩查询v1/exam/all_exams
  getAllExams(params?: object) {
    return request.post(`exam_app/all_exams/`, params);
  },

  //知识库筛选栏/video_app/tags/
  getVideoAppTags(params?: object) {
    return request.get(`video_app/tags/?${stringify(params)}`);
  },

  //获取视频列表video_app/get_video/
  getVideoAppGetVideo(params?: object) {
    return request.get(`video_app/get_video/?${stringify(params)}`);
  },

  //获取评论video_app/comment/
  getVideoAppComment(params?: object) {
    return request.get(`video_app/comment/?${stringify(params)}`);
  },

  //获取视频信息
  getVideoAppPlayVideo(params?: object) {
    return request.get(`video_app/play_video/?${stringify(params)}`);
  },

  //评论
  postVideoAppComment(params?: object) {
    return request.post(`video_app/comment/`, params);
  },

  //删除评论video_app/delete_comment/?comment_id=70
  delVideoAppComment(params?: object) {
    return request.get(`video_app/delete_comment/?${stringify(params)}`);
  },

  //点赞和观看统计
  getVideoAppShow(params?: object) {
    return request.post(`video_app/counts/`, params);
  },

  //获取视频列表video_app/get_video/
  getStrategyAppGetVideo(params?: object) {
    return request.get(`strategy_app/get_video/?${stringify(params)}`);
  },

  //获取评论video_app/comment/
  getStrategyAppComment(params?: object) {
    return request.get(`strategy_app/comment/?${stringify(params)}`);
  },

  //获取视频信息
  getStrategyAppPlayVideo(params?: object) {
    return request.get(`strategy_app/play_video/?${stringify(params)}`);
  },

  //评论
  postStrategyAppComment(params?: object) {
    return request.post(`strategy_app/comment/`, params);
  },

  //删除评论video_app/delete_comment/?comment_id=70
  delStrategyAppComment(params?: object) {
    return request.get(`strategy_app/delete_comment/?${stringify(params)}`);
  },

  //点赞和观看统计
  getStrategyAppShow(params?: object) {
    return request.post(`strategy_app/counts/`, params);
  },

  //全局搜索
  searchApi(params?: object) {
    return request.get(`video_app/search/?${stringify(params)}`);
  },
};
