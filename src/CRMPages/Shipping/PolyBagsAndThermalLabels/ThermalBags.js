import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs,Table,  Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const PolyBagsAndThermalLabelsView = (props) => {
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
              title: 'Date',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Shipped Label',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Remaining UPS',
              dataIndex: 'address',
              key: 'address',
            },
            {
                title: 'Remaining USPS',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'Remaining Amazon',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'Remaining Total Labels',
                dataIndex: 'address',
                key: 'address',
              },
              
          ];
    return (
        <>
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Endica Shiping Label" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>UPS</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Input/>

                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                        <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>USPS</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Input/>

                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Amazon</h3></div>
                            
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Input/>

                            </div>
                            
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Update</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button size="default" type="success" htmlType="Update">
                                   Update
                        </Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                        
                    </Row>
                </Cards>
            </Row>
            {/* Summary Div  */}
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Summary" caption="The simplest use of Drawer" >
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

export default PolyBagsAndThermalLabelsView;
