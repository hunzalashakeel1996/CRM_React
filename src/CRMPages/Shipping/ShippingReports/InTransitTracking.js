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


const ShippingReportsView = (props) => {


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
                <Cards title="InTransit Tracking Report" caption="The simplest use of Drawer" >
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
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>State</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <TextArea></TextArea>
                            </div>
                        </Col>



                    </Row>


                </Cards>
            </Row>
            {/* MARKETPLACE CHECKBOXES  */}
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Marketplaces" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={12} xs={24}  >
                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="Amazon">
                                            <Image
                                                width={35}
                                                src="/img/icons/amazon.png"
                                            /> Amazon</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Walmart"><Image
                                            width={35}
                                            src="/img/icons/walmart.png"
                                        /> Walmart</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Sears"><Image
                                                width={45}
                                                src="/img/icons/sears.png"
                                            /> Sears</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Ebay"><Image
                                                width={35}
                                                src="/img/icons/ebay.png"
                                            /> Ebay</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="NewEgg"><Image
                                                width={35}
                                                src="/img/icons/newegg.png"
                                            /> NewEgg</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="PU"><Image
                                                width={90}
                                                src="/img/icons/pu.png"
                                            /> PU</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="JLC"><Image
                                                width={60}
                                                src="/img/icons/jlc.png"
                                            /> JLC</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>,
                        </Col>
                        <Col lg={6} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button type="success" htmlType="submit">
                                    Report Data
                                </Button>
                                <Upload >
                                    <Button style={{ marginTop: 10 }} className="btn-outlined" size="medium" type="light" outlined>
                                        <UploadOutlined /> Click to Upload
                                </Button>
                                </Upload>

                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>

                                <Button size="large"> <img
                                    style={{ width: 147, height: 141, marginTop: 30 }}
                                    src="/img/icons/upload_icon.png"
                                /></Button>


                            </div>
                        </Col>



                    </Row>
                    {/* MARKETPLACE CHECKBOXES  */}

                </Cards>
            </Row>




        </>
    );
};

export default ShippingReportsView;
