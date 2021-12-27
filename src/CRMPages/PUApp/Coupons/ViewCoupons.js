import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin, PageHeader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';

import './overview/style.css';
import EditCouponModal from './overview/EditCouponModal';
import { PUAppGetCoupons, PUAppUpdateCoupon } from '../../../redux/apis/DataAction';
import moment from 'moment';

const { TabPane } = Tabs;

const ViewSort = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Coupons'];
  const [activeTab, setActiveTab] = useState('Active');

  const [cartList, setCartList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [inActiveList, setInActiveList] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const topMenu = [
    {
      tab: 'Cart',
      key: 'Cart',
    },
    {
      tab: 'Active',
      key: 'Active',
    },
    {
      tab: 'InActive/Expired',
      key: 'InActive',
    },
  ];

  useEffect(() => {
    getCoupons();
  }, [])

  const getCoupons = () => {
    setInitLoading(true)
    dispatch(PUAppGetCoupons()).then(res => {
      const dataSource = res.map((item, index) => {
        return {
          ...item,
          key: index,
          CouponStatus: getStatus(item),
          COUPONSSTARTDATE: moment(item.COUPONSSTARTDATE).format('lll'),
          COUPONSENDDATE: moment(item.COUPONSENDDATE).format('lll'),
          Discount: item.COUPONSPERCENT == 0 ? '$' + item.COUPONSAMOUNT : item.COUPONSPERCENT + '%',
          Method: item.COUPONSPERCENT == 0 ? 'Amount' : 'Percent',
        }
      })
      setCartList(dataSource.filter(item => item.DISCOUNTTYPE == 'CART'))
      setActiveList(dataSource.filter(item => item.CouponStatus == 'Active' && item.DISCOUNTTYPE != 'CART'))
      setInActiveList(dataSource.filter(item => item.CouponStatus == 'InActive' || item.CouponStatus == 'Expired' && item.DISCOUNTTYPE != 'CART'))
      setInitLoading(false)
    })
  }

  const getStatus = (item) => {
    return item.COUPONSSTATUS == 'InActive' ? 'InActive' :
      new Date().getTime() > new Date(item.COUPONSENDDATE).getTime() ? 'Expired' :
        item.COUPONSSTATUS;
  }

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'COUPONSCODE',
      key: 'COUPONSCODE',
    },
    {
      title: 'Description',
      dataIndex: 'COUPONSDESCRIPTION',
      key: 'COUPONSDESCRIPTION',
      width: 200,
    },
    {
      title: 'Cart Limit ($)',
      dataIndex: 'COUPONSLIMIT',
      key: 'COUPONSLIMIT',
    },
    {
      title: 'Discount',
      dataIndex: 'Discount',
      key: 'Discount',
    },
    {
      title: 'Method',
      dataIndex: 'Method',
      key: 'Method',
    },
    // {
    //   title: 'Percentage (%)',
    //   dataIndex: 'COUPONSPERCENT',
    //   key: 'COUPONSPERCENT',
    // },
    // {
    //   title: 'Amount ($)',
    //   dataIndex: 'COUPONSAMOUNT',
    //   key: 'COUPONSAMOUNT',
    // },
    {
      title: 'Start Date',
      dataIndex: 'COUPONSSTARTDATE',
      key: 'COUPONSSTARTDATE',
    },
    {
      title: 'End Date',
      dataIndex: 'COUPONSENDDATE',
      key: 'COUPONSENDDATE',
    },
    {
      title: 'Status',
      dataIndex: 'CouponStatus',
      key: 'CouponStatus',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => { setIsModalVisible(true); setSelectedCoupon(record) }}>Edit</a>
        </Space >
      ),
    },
  ];

  const cartColumns = [
    {
      title: 'Code',
      dataIndex: 'COUPONSCODE',
      key: 'COUPONSCODE',
    },
    {
      title: 'Description',
      dataIndex: 'COUPONSDESCRIPTION',
      key: 'COUPONSDESCRIPTION',
      width: 200,
    },
    {
      title: 'Cart Limit From ($)',
      dataIndex: 'COUPONSLIMIT',
      key: 'COUPONSLIMIT',
    },
    {
      title: 'Cart Limit To ($)',
      dataIndex: 'COUPONSLIMIT1',
      key: 'COUPONSLIMIT1',
    },
    {
      title: 'Discount',
      dataIndex: 'Discount',
      key: 'Discount',
    },
    {
      title: 'Method',
      dataIndex: 'Method',
      key: 'Method',
    },
    // {
    //   title: 'Percentage (%)',
    //   dataIndex: 'COUPONSPERCENT',
    //   key: 'COUPONSPERCENT',
    // },
    // {
    //   title: 'Amount ($)',
    //   dataIndex: 'COUPONSAMOUNT',
    //   key: 'COUPONSAMOUNT',
    // },
    {
      title: 'Start Date',
      dataIndex: 'COUPONSSTARTDATE',
      key: 'COUPONSSTARTDATE',
    },
    {
      title: 'End Date',
      dataIndex: 'COUPONSENDDATE',
      key: 'COUPONSENDDATE',
    },
    {
      title: 'Status',
      dataIndex: 'CouponStatus',
      key: 'CouponStatus',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => { setIsModalVisible(true); setSelectedCoupon(record) }}>Edit</a>
        </Space >
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const updateCoupon = (data) => {
    setIsModalVisible(false);

    dispatch(PUAppUpdateCoupon(data)).then(res => {
      getCoupons();
      openNotificationWithIcon('success', 'Coupon Update Successfully!')
    })
  }

  const activeDataSource = activeTab == 'Cart' ? cartList :
    activeTab == 'Active' ? activeList :
      inActiveList;

  const activeColumns = activeTab == 'Cart' ? cartColumns : columns;

  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={initLoading} >
        <PageHeader title="Coupons" />
        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          {topMenu.map(item => (
            (
              <TabPane tab={item.tab} key={item.key}>
                {item.tabName}
              </TabPane>
            )
          ))}
        </Tabs>
        <div style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
          <Table pagination={{ pageSize: 20 }}
            dataSource={activeDataSource}
            columns={activeColumns} />
        </div>

        {isModalVisible && <EditCouponModal
          loader={initLoading}
          setLoader={setInitLoading}
          isModalVisible={isModalVisible}
          coupon={selectedCoupon}
          updateCoupon={updateCoupon}
          handleCancel={handleCancel} />}
      </Spin >
    </>
  );
};

export default ViewSort;

