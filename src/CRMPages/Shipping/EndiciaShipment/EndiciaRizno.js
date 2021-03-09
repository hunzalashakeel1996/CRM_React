import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs,Table, Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const EndiciaShipmentView = (props) => {
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
              title: 'Full Name',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'STREET ADDRESS 1',
              dataIndex: 'address',
              key: 'address',
            },
            {
                title: 'STREET ADDRESS 2',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'City',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'State',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'Country',
                dataIndex: 'address',
                key: 'address',
              },
          ];
    return (
        <>
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Endicia Rizno Shipping Labels" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>

                                <Button type="success" htmlType="submit">
                                    Insert Shipping
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
                                <Button type="success" htmlType="submit">
                                    Start Endicia Shipping
                        </Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 3</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button type="success" htmlType="submit">
                                    Generate Feed
                        </Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Total Count</h3></div>
                            <div className="atbd-drawer" style={{ marginRight: 20 }}>
                                {/* <Cards title="Total Count" caption="The simplest use of Drawer"> */}
                                <Button type="primary" htmlType="submit">
                                    Today Count
                        </Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                    </Row>
                </Cards>
            </Row>
            {/* Check Labels Here Div  */}
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Check Labels Here" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <TextArea />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <Button  type="success">
                Search
              </Button>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                                    Refresh
                        </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col xs={24}>
                                <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />                         
                        </Col>

                    </Row>
                </Cards>
            </Row>



        </>
    );
};

export default EndiciaShipmentView;
