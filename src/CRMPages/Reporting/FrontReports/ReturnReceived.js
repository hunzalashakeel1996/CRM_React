import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ReportView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });
  const dataSource = [
    {
      key: '1',
      userName: '1038',
      Count: '1038'
    },
    {
      key: '2',
      userName: '562',
      Count: '1038'
    },
    {
      key: '3',
      userName: '178',
      Count: '1038'
    },
    {
      key: '4',
      userName: '1778',
      Count: '1038'
    }
  ];
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Count',
      dataIndex: 'Count',
      key: 'Count',
    }

  ];


  return (
    <>
      <Row style={{  }}>
        <Cards title="Update Order Notes" caption="The simplest use of Drawer" >
              <Row>
              <Table dataSource={dataSource} columns={columns} />
              </Row>
        
        </Cards>
      </Row>
      




    </>
  );
};

export default ReportView;
