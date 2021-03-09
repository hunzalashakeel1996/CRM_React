import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ShippingWeightView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  const columns = [
    {
      title: 'Order NO',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'PO number',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tracking NO',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },

  ];
  return (
    <>
      <Row style={{  }}>
                <Cards title="Endica Shiping Label" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>

                                <Button type="success" size="default" htmlType="submit">
                                    Shipping Weight
                        </Button>
                                <Upload >
                                    <Button style={{ marginTop: 10 }} className="btn-outlined" size="large" type="light" outlined>
                                        <UploadOutlined /> Click to Upload
                </Button>
                                </Upload>

                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 2</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                <Button type="primary" size="default" htmlType="submit">
                                    Download Shippping Tracking
                        </Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                        
                    </Row>
                </Cards>
            </Row>
      




    </>
  );
};

export default ShippingWeightView;
