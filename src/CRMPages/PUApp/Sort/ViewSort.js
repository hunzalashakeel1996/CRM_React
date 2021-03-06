import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, PageHeader, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';

import './overview/style.css';
import Brand from './overview/Brand';
import Category from './overview/Category';
import Promotion from './overview/Promotion';

const { TabPane } = Tabs;

const ViewSort = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Sort'];
  const [activeTab, setActiveTab] = useState('Brand');
  const [loader, setLoader] = useState(false);
  const topMenu = [
    {
      tab: 'Brand',
      key: 'Brand',
      tabName: <Brand setLoader={setLoader} />

    }
    ,{
      tab: 'Category',
      key: 'Category',
      tabName: <Category setLoader={setLoader} />
    }
    ,{
      tab: 'Promotion',
      key: 'Promotion',
      tabName: <Promotion setLoader={setLoader} />
    }
  ];
  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loader} >
      <PageHeader title="Sort Style" />
        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20,marginTop: 20 }}>
          {topMenu.map(item => (
            tabChildBar?.includes(item.tab) && (
              <TabPane tab={item.tab} key={item.key}>
                {item.tabName}
              </TabPane>
            )
          ))}
        </Tabs>

      </Spin >
    </>
  );
};

export default ViewSort;

