import React from 'react';
import './index.less';

import img1 from '@/static/image/图片1.png';
import img2 from '@/static/image/图片2.png';
import img3 from '@/static/image/图片3.png';
import img4 from '@/static/image/图片4.png';
import img5 from '@/static/image/图片5.png';
import img6 from '@/static/image/图片6.png';

export default function Index() {
  return (
    <div className="show">
      <div className="title1">1.新用户注册</div>
      <div className="title2">
        输入网址：https://business.oceanengine.com/site/login
      </div>
      <div className="title2">点击注册</div>
      <img src={img1} alt="" className="img" />
      <div className="title2">
        必须使用@yinlimedia结尾的公司邮箱注册！完成后点击发送验证码
      </div>
      <img src={img2} alt="" className="img" />
      <div className="title2">
        登录公司邮箱获取验证码，并填写在巨量账号注册页面
      </div>
      <img src={img3} alt="" className="img" />
      <div className="title2">
        注册完成后登录巨量纵横，点击右上方图标选择巨量学
      </div>
      <img src={img4} alt="" className="img" />
      <div className="title1">2.老用户邮箱绑定</div>
      <div className="title2">
        输入网址：https://business.oceanengine.com/site/login
      </div>
      <div className="title2">
        登录个人账号后，点击个人信息进入个人中心进行邮箱绑定
      </div>
      <img src={img5} alt="" className="img" />
      <div className="title2">
        点击绑定邮箱即可，必须使用@yinlimedia结尾的公司邮箱注册！
      </div>
      <img src={img6} alt="" className="img" />
    </div>
  );
}
