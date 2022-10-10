import React, { useEffect, useState } from 'react';
import { history, Link } from 'umi';
import { List, Dropdown, Select, Empty, Avatar, Pagination } from 'antd';
import { CaretRightOutlined, FilePdfOutlined } from '@ant-design/icons';
import './index.less';
import api from '@/api';

export default function Index() {
  const query = history.location.query;

  const [page,setPage] = useState<any>(1)
  const [datas,setDatas] = useState<any>([])

  const toDetl = (e: string) => {
    history.push(e);
  };

  const toPage = (e: any) => {
    setPage((p:any)=>p = e)
  };

  const searchApi = (page?:any)=>{
    let data = {
        keyword:query?.search,
        page,
    }
    api.searchApi(data).then((res) => {
        if (res?.err_code === 0) {
            setDatas(res)
        }
    }).catch((err) => {
        
    });
  }

  useEffect(()=>{
    searchApi(page)
  },[query,page])


  const data = [
    {
      title: 'Ant Design Title 1',
      type: 'pdf',
      pathName: '/repository/showPdf?id=58',
    },
    {
      title: 'Ant Design Title 2',
      type: 'video',
      pathName: '/repository/repositoryVideo?id=45',
    },
    {
      title: 'Ant Design Title 3',
      type: 'pdf',
      pathName: '/repository/showPdf?id=58',
    },
    {
      title: 'Ant Design Title 4',
      type: 'pdf',
      pathName: '/solution/showPdf?id=1',
    },
  ];
  return (
    <div className="searchResult">
      <div className="searchResultContent">
        <div className="searchResultContentTitle">
          共搜索到与“{query?.search}”相关的{datas?.count}条结果
        </div>
        {datas?.count ? (
          <List
            itemLayout="horizontal"
            dataSource={datas?.data}
            renderItem={(item:any) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => toDetl(item.url)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: '#fdf6e5', color: '#faa41d' }}
                      icon={
                        item?.pdf ? (
                          <FilePdfOutlined />
                        ) : (
                          <CaretRightOutlined />
                        )
                      }
                    />
                  }
                  title={<span>{item.name}</span>}
                  description={item.text || item.name}
                />
              </List.Item>
            )}
          />
        ) : (
          <div>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>换个关键词试试</span>}/>
          </div>
        )}
        {
            datas?.count ?
            <div className="searchResultContentTitle">
                <Pagination
                    simple
                    size="small"
                    defaultCurrent={1}
                    total={datas?.count}
                    onChange={toPage}
                />
            </div>
            : null
        }
        
      </div>
    </div>
  );
}
