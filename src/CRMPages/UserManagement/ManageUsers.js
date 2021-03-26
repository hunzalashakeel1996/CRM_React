import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col,Switch } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { TextArea } = Input;

const UsersView = (props) => {
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
      address: <Link to={{pathname:`/admin/userManagement/UserRights/${'123'}`}}><span style={{color: 'black'}} className="date-started">shsh</span></Link>,
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
        buttons={[
          <div key="1" className="page-header-actions">
            
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New Users
            </Button>
          </div>,
        ]}
      />
       
      <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Users List" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                    <Col xs={24}>
                            <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                        </Col>
                    </Row>
                    
                </Cards>
            </Row>
      




    </>
  );
};

export default UsersView;
