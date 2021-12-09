import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Form, Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getInstockReport, getInstockSoldReport } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not validate email!',
        number: '${name} is not a validate number!',
    },
    number: {
        range: '${name} must be between ${min} and ${max}',
    },
};

const OrderReportsView = (props) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
        isLoader: false,
        dataSource: [],
        downloadFilePath: ''
    });
    const { isLoader, dataSource, downloadFilePath } = state
    const onChange = (value, key) => {
        // // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };

    const getInstockReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getInstockReport({ datefrom: state.startDate.format('MM/DD/YYYY'), dateto: state.endDate.format('MM/DD/YYYY'), flag: state.POType })).then(data => {
            console.log(data)
            setstate({ ...state, isLoader: false, dataSource: data[1], downloadFilePath: data[0] })


            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download InStock Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
        })

    };
    const dowloadFile = () => {

        downloadFile(downloadFilePath)
    }

    const columns = [
        {
            title: 'VendorName',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'OrderDate',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
        },        
        {
            title: 'Orderno',
            dataIndex: 'orderno',
            key: 'orderno',
        },        
        {
            title: 'VendorStyleCode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
        },        
        {
            title: 'StyleCode',
            dataIndex: 'stylecode',
            key: 'stylecode',
        }, 
        {
            title: 'ColorCode',
            dataIndex: 'colorcode',
            key: 'colorcode',
        },
        {
            title: 'ColorName',
            dataIndex: 'colorname',
            key: 'colorname',
        },
        {
            title: 'SizeName',
            dataIndex: 'sizename',
            key: 'sizename',
        },
    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="Instock Order Reports" caption="The simplest use of Drawer" >
                        <Form layout="inline" initialValue="" label="" form={form} id="Instock Order Reports" name="nest-messages" onFinish={getInstockReporting} validateMessages={validateMessages}>
                            <Row gutter={50}>
                                <Col span={8} >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                                    <Form.Item >    
                                        <Button size="large" type="primary" htmlType="Submit">
                                            Search
                                        </Button>
                                    </Form.Item>

                                </Col>
                                <Col span={4}  >
                                <Form.Item >  
                                    <Button size="large" type="success" onClick={dowloadFile}>Download </Button>
                                    </Form.Item>
                                </Col>


                            </Row>

                        </Form>

                    </Cards>
                </Row>

                <Row>
                    <Col xs={24}>
                        <Cards headless>
                            {/* <ProjectList> */}

                            <div className="table-responsive">
                                {/* <Styles> */}
                                <Table size='small' pagination={true} dataSource={dataSource} columns={columns} />
                                {/* </Styles> */}
                            </div>

                            {/* </ProjectList> */}
                        </Cards>
                    </Col>
                </Row>

            </Spin>


        </>
    );
};

export default OrderReportsView;
