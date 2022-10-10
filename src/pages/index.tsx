import styles from './index.less';
import { useEffect } from 'react';
import { Card } from 'antd';
import { Link, Helmet } from 'umi';
import api from '@/api';

export default function IndexPage() {
  const checkBrand = (e: number) => {
    console.log(e);
  };

  return <div className={styles.indexPages}></div>;
}
