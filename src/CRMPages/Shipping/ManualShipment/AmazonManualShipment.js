import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ManualShipmentView = (props) => {
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
        <Cards title="PO Numbers" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <TextArea />
              </div>
            </Col>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button type="success" htmlType="Submit">
                  Submit
                        </Button>
                <Button type="primary" htmlType="Manual Tick" style={{ marginLeft: 10 }}>
                  Manual Tick
                        </Button>
              </div>
            </Col>
          </Row>
        </Cards>
      </Row>
      <Row style={{ marginLeft: 20, marginRight: 20 }}>
        <Cards title="PO Numbers" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col lg={24} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>

                <Upload >
                  <Button style={{ marginTop: 10 }} className="btn-outlined" size="large" type="light" outlined>
                    <UploadOutlined /> Click to Upload
                </Button>
                </Upload>

              </div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button type="success" htmlType="Amazon Manual Ship">
                Amazon Manual Ship
                        </Button>
                <Button type="success" htmlType="Amazon Manual Ship Sheet" style={{ marginLeft: 10 }}>
                Amazon Manual Ship Sheet
                        </Button>
                        <Button type="success" htmlType="Amazon Manual Ship Donwload" style={{ marginLeft: 10 }}>
                        Amazon Manual Ship Donwload
                        </Button>
                        
              </div>

            </Col>
            
          </Row>
        </Cards>
      </Row>




    </>
  );
};

export default ManualShipmentView;
