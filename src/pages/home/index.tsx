import React, { useEffect, useState, useRef } from 'react';
import { Select, Button, Spin, Tabs, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import api from '@/api';

import { connect } from 'dva';
import useWindowSize from '@/components/windowsHeight';

import './index.less';

import 图片1 from '@/static/image/图片1.png';
import 图片2 from '@/static/image/图片2.png';
import 图片3 from '@/static/image/图片3.png';

// import './index.less'

const { Option } = Select;

function Home(props: any) {
  const settings = {
    // dots: true,//是否显示小圆点索引
    autoplay: true, //是否自动播放
    infinite: true, //是否无限循环
    autoplaySpeed: 2000, //自动播放的时间
    fade: true, //是否采用淡入淡出的效果
    speed: 500, //速度
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="waper">
      <div className="sliders">
        <Slider {...settings}>
          <div className="sliderBox">
            <img src={图片1} alt="" />
          </div>
          <div className="sliderBox">
            <img src={图片2} alt="" />
          </div>
          <div className="sliderBox">
            <img src={图片3} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(Home);
