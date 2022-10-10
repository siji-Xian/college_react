import React, { Component } from 'react';

import img_404 from '../static/image/404.png';

export default class Index extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <img src={img_404} alt="" style={{ width: '500px' }} />
        <div style={{ color: '#666', height: '100px' }}>
          当前访问的页面不存在
        </div>
      </div>
    );
  }
}
