import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs,Col, Table, Upload, Row, DatePicker } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, DatePickerWrapper } from '../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { TabPane } = Tabs;
const { TextArea } = Input;

const RMAView = (props) => {
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    date: null,
    dateString: null,
    values: {},
});
const onChange = (date, dateString) => {
    setstate({ ...state, date, dateString });
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
                <Cards title="Delivery Tracking Status Report" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={24} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>

                            <RangePicker onChange={onChange} />
                            <Button size="default" type="success" htmlType="download" style={{ marginLeft: 20 }}>
                                    Download
                        </Button>

                            </div>
                        </Col>
                        
                        
                        
                    </Row>
                </Cards>
            </Row>
      




    </>
  );
};

export default RMAView;
