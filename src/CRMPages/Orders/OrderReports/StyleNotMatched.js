import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import DatePicker from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { apistyleNotMatched } from '../../../redux/apis/DataAction';
import { downloadFile, DownlaodWithReact } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
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

const StyleNotMatched = (props) => {


    const dispatch = useDispatch();
    const [form] = Form.useForm();

    //  get vendors from redux 
    let vendornameState = useSelector(state => state.tickets.vendornames);

    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        VendorName: null,
        values: {},
        isLoader: false,
        dataSource:[],
        downloadFilePath:''
    });
    const { dataSource,isLoader,downloadFilePath } = state
    const onChange = (value, key) => {
        // // console.log('aaa', date, dateString)
        setState({ ...state, [key]: value });

    };

    const getStyleNotMatchedReporting = () => {

        setState({ ...state, isLoader: true })
        dispatch(apistyleNotMatched({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), vendor: state.VendorName })).then(data => {
         
            setState({ ...state, isLoader: false, dataSource: data[1], downloadFilePath: data[0] })
          // console.log('My Data: ', data)
         
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download & Rendered BackOrderItems of ${state.VendorName}  From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });


        })

    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current > moment().endOf('day');
    }
    const columns = [
        {
            title: 'OrderNo',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'OrderDate',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },
        {
            title: 'PONumber',
            dataIndex: 'PONumber',
            key: 'PONumber',
        },
        {
            title: 'OrderStatus',
            dataIndex: 'orderstatus',
            key: 'orderstatus',
        },
        {
            title: 'Vendorname',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'VendorStyleCode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
        },
        {
            title: 'StyleName',
            dataIndex: 'stylename',
            key: 'stylename',
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
        {
            title: 'Merchantsku',
            dataIndex: 'merchantsku',
            key: 'merchantsku',
        },
    ];
    const dowloadFile = () => {

        downloadFile(downloadFilePath)
    }
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="Style Not Matched Reporting" caption="The simplest use of Drawer" >
                        <Form layout="inline" initialValue="" label="" form={form} id="StyleNotMatchedReporting" name="nest-messages" onFinish={getStyleNotMatchedReporting} validateMessages={validateMessages}>
                            <Row gutter={50}>

                                <Col span={8}   >
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}

                                        <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onChange(date, 'startDate') }} />

                                    </Form.Item>
                                </Col>
                                <Col span={8}  >
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}

                                        <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onChange(date, 'endDate') }} />

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
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                             
                                      
                        
                                        <Button size="large" type="success" onClick={dowloadFile}>Download </Button>
                                  
                                      
                               
                                </Col>
                            </Row>
                        </Form>
                        <Row style={{}}>

                            <Col xs={24}>
                                
                            <div className="table-responsive">
                                <Table pagination={true} dataSource={dataSource} columns={columns} />
                                </div>
                            </Col>

                        </Row>
                    </Cards>
                </Row>


            </Spin>


        </>
    );
};

export default StyleNotMatched;
