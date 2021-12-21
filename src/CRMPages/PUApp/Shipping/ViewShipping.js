import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Divider, Input, Select, DatePicker, InputNumber, Table, Space, notification, Card, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';

import './overview/style.css';
import { PUAppChangeShipping, PUAppFreeShipping, PUAppUpdateShipping } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;

const ViewSort = () => {
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Shipping'];

  const [shippingPrice, setShippingPrice] = useState(0);

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  const onFreeShipping = () => {
    dispatch(PUAppFreeShipping({})).then(res => {
      openNotificationWithIcon('success', 'Free Shipping Successfully Updated!');
    })
  };

  const onUpdateShipping = () => {
    dispatch(PUAppUpdateShipping({})).then(res => {
      openNotificationWithIcon('success', 'Shipping Successfully Updated!');
    })
  };

  const onChangeShipping = () => {
    let data = { price: shippingPrice }
    dispatch(PUAppChangeShipping(data)).then(res => {
      openNotificationWithIcon('success', 'Shipping Changed Successfully!');
    })
  };

  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={false} >
        <Card title="Shipping" style={{ margin: 10 }}>
          <Row gutter={24}>
            <Col>
              <Button size="large" type="primary" onClick={onFreeShipping}>
                Free Shipping
              </Button>
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={onUpdateShipping}>
                Update Shipping
              </Button>
            </Col>
          </Row>
          <Divider />
          <div style={{ marginTop: 20 }}>
            <InputNumber size='small' min={1} max={100} defaultValue={shippingPrice} onChange={(val) => setShippingPrice(val)} />
            <Button size="large" type="primary" style={{ marginLeft: 15 }} onClick={onChangeShipping}>
              Change Shipping
            </Button>
          </div>

        </Card>


      </Spin >
    </>
  );
};

export default ViewSort;

