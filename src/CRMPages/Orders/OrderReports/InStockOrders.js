import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const OrderReportsView = (props) => {


    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
    });
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };


    const onChange = (date, dateString) => {
        setstate({ ...state, date, dateString });

    };

    const dataSource = [
        {
            key: '1',
            name: 'Sanmar',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'Cherokee',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'VendorName',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Orders Count',
            dataIndex: 'age',
            key: 'age',
        },

    ];
    return (
        <>
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Instock Order Reports" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={onChange} />
                            </div>
                        </Col>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={onChange} />
                            </div>
                        </Col>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button size="default" type="success" htmlType="Submit">
                                    Download
                        </Button>

                            </div>
                        </Col>



                    </Row>



                </Cards>
            </Row>

            {/* INSTOCK SOLD REPORT */}

            {/* INSTOCK SOLD REPORT */}
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Instock Sold Report" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>From</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={onChange} />
                            </div>
                        </Col>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button size="default" type="success" htmlType="Submit">
                                    GetReport
                        </Button>
                            </div>
                        </Col>
                    </Row>
                </Cards>
            </Row>
            <Row style={{ marginLeft: 20, marginRight: 20 }}>

                <Col xs={24}>
                    <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>

            </Row>




        </>
    );
};

export default OrderReportsView;
