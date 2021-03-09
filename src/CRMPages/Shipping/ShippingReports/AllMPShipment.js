import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col,DatePicker } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const ShippingReportsView = (props) => {
    
      
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
                <Cards title="Get Report" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={24} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                            <Button size="default" type="success" htmlType="download" style={{ marginLeft: 0 }}>
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

export default ShippingReportsView;
