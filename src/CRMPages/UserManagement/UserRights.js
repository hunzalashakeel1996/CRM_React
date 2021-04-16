import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const UsersView = (props) => {
  const [state, setState] = useState({
    checkData: [],
    checked: null,
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    key: 0,
  });
  const callback = key => {
    setState({ ...state, key });
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };
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
      title: 'UserID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'UserName',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'FullName',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'address',
      key: 'address',
    },

  ];
  return (
    
    <>
      <PageHeader
        title="Manage Users"
        // buttons={[
        //   <div key="1" className="page-header-actions">

        //     <Button size="small" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       UserName Rights
        //     </Button>
        //   </div>,
        // ]}
      />

      <Row style={{ marginLeft: 20, marginRight: 20 }}>
        <Cards title="User Rights" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col xs={24}>

              <Collapse defaultActiveKey={['1']} onChange={callback}>
                {/* ORDERS  */}
                <Panel header="Orders" key="1">
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>OrderReports</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Marketplace Orders</Checkbox>
                    </Col>
                  </Row>
                </Panel>

                {/* INVENTORY  */}
                <Panel header="Inventory" key="2">
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Vendor Inventory</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Update Inventory</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Marketplace Inventory</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Marketplace Group Inventory</Checkbox>
                    </Col> 
                  </Row>
                </Panel>

                {/* SALES  */}
                <Panel header="Sales" key="3">
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Reports</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Balance Sheet</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Other Reports</Checkbox>
                    </Col>
                  </Row>
                </Panel>

                {/* SHIPPING  */}
                <Panel header="Shipping" key="4">
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>PolyBags and Thermal Labels</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Amazon Shipment</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Endicia Shipment</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Manual Shipment</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Shipping Reports</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Shipping Weight </Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Shipping Notes</Checkbox>
                    </Col>
                    
                  </Row>
                </Panel>

                {/* PUSTYLES  */}
                <Panel header="PUStyles" key="5">
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Styles Not in PU</Checkbox>
                    </Col>
                  </Row>
                </Panel>

                {/* PUSTYLES  */}
                <Panel header="UserManagement" key="6">
                  <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Add New Users</Checkbox>
                    </Col>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>Manage Users</Checkbox>
                    </Col>
                  </Row>
                </Panel>

                {/* RMA  */}
                <Panel header="RMA" key="7">
                <Row>
                    <Col xs={8}>
                      <Checkbox onChange={onChange}>RMA No Update</Checkbox>
                    </Col>
                  </Row>
                </Panel>

                {/* FINANCE  */}
                <Panel header="Finance" key="8">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Panel>
                {/* TICKETS  */}
                <Panel header="Tickets" key="9">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Panel>
                {/* REMINDERS  */}
                <Panel header="Reminders" key="10">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Panel>
                {/* EMAILS  */}
                <Panel header="Emails" key="11">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Panel>
                {/* AUDITING  */}
                <Panel header="Auditing" key="12">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Panel>
                {/* CHATBOT  */}
                <Panel header="Chatbot" key="13">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Panel>
              </Collapse>

            </Col>
          </Row>

        </Cards>
      </Row>





    </>
  );
};

export default UsersView;
