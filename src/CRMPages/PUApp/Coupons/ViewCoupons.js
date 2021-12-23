import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';

import './overview/style.css';
// import Brand from './overview/Brand';
import Category from './overview/Category';

const { TabPane } = Tabs;

const ViewSort = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Coupons'];
  const [activeTab, setActiveTab] = useState('Active');

  const topMenu = [
    {
      tab: 'Active',
      key: 'Active',
    }
    , {
      tab: 'InActive',
      key: 'InActive',
    }
  ];
  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={false} >

        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          {topMenu.map(item => (
            (
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

