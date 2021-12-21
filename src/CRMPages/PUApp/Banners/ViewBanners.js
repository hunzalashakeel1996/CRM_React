import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, Menu, Dropdown, Card, Image, InputNumber, Table, PageHeader, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import { DownOutlined } from '@ant-design/icons';

import './overview/style.css';
import { PUAppGetAllBanners, PUAppUpdateBannerStatus } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;

const ViewSort = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Banners'];

  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, [])

  const getBanners = () => {
    setLoader(true)
    dispatch(PUAppGetAllBanners()).then(res => {
      const dataSource = res.map((item, index) => {
        return {
          ...item,
          key: index,
          imageStatus: <Dropdown overlay={() => menu(item)}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {item.status ? 'Active' : 'InActive'} <DownOutlined />
            </a>
          </Dropdown>,
          BannerImage: <Image width={150} src={item.Banner_image} />,
        }
      })
      setBanners(dataSource);
      setLoader(false)

    })
  }

  const columns = [
    {
      title: 'Banner Image',
      dataIndex: 'BannerImage',
      key: 'BannerImage',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'imageStatus',
      key: 'imageStatus',
    }
  ];

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };


  const changeStatus = (key, item) => {
    if (key != item.status) {
      let data = {
        ID: item.ID,
        STATUS: key
      }
      dispatch(PUAppUpdateBannerStatus(data)).then(res => {
        getBanners();
        openNotificationWithIcon('success', 'Banner Status Update Successfully!')
      })
    }

  }

  const menu = (item) => (
    <Menu onClick={({ key }) => changeStatus(key, item)}>
      <Menu.Item key="1">Active</Menu.Item>
      <Menu.Item key="0">InActive</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loader} >
        <PageHeader title="Banners" />
        <Table style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }} dataSource={banners} columns={columns} />
      </Spin >
    </>
  );
};

export default ViewSort;

