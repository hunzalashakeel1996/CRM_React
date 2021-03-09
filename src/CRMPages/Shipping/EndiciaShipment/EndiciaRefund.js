import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs,Table,  Upload, Row, Col } from 'antd';
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
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Endica Refund Label" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Tracking Number</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Input/>

                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Refund</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                <Button size="default" type="danger" htmlType="submit">
                                    Refund
                        </Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                        
                    </Row>
                </Cards>
            </Row>
            {/* Check Labels Here Div  */}
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Check Refund Labels Here" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <TextArea />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button type="success" htmlType="submit">
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
