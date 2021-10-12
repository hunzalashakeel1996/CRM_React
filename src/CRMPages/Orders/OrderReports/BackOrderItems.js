import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getBackOrderItems } from '../../../redux/apis/DataAction';
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

const OrderReportsView = (props) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    //  get vendors from redux 
    let vendornameState = useSelector(state => state.tickets.vendornames);

    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        VendorName: null,
        value: '',
        isLoader: false,
        values: []
    });
    const { isLoader, values } = state
    const onChange = (value, key) => {
        console.log('aaa', value)
        setstate({ ...state, [key]: value });

    };
    const onChangeSelect = (value, key) => {
        console.log('aaa', value)
        setstate({ ...state, values: value });

    };
    const getBackOrderItemsReporting = () => {
     
        setstate({ ...state, isLoader: true })
        dispatch(getBackOrderItems({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), vendor: state.VendorName })).then(data => {
            setstate({ ...state, isLoader: false })
           console.log('My Data: ', data)
            // DownlaodWithReact(data);
             downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download & Rendered BackOrderItems of ${state.VendorName}  From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
            let tempDataSource = [];
            data.map(value => {
                const { orderno, itemno, stylecode, stylename, vendorstylecode, colorcode, sizename, itemqty, backorderdate, ponumber, order_status, vendorname } = value;
                return tempDataSource.push({
                    orderno: orderno,
                    itemno: itemno,
                    stylecode: stylecode,
                    stylename: stylename,
                    vendorstylecode: vendorstylecode,
                    colorcode: colorcode,
                    sizename: sizename,
                    itemqty: itemqty,
                    backorderdate: backorderdate,
                    ponumber: ponumber,
                    order_status: order_status,
                    vendorname: vendorname,
                });
            });
            setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
        })

    };
    const columns = [
        {
            title: 'OrderNo',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'ItemNo',
            dataIndex: 'itemno',
            key: 'itemno',
        },
        {
            title: 'StyleCode',
            dataIndex: 'stylecode',
            key: 'stylecode',
        },
        {
            title: 'StyleName',
            dataIndex: 'stylename',
            key: 'stylename',
        },
        {
            title: 'Size',
            dataIndex: 'sizename',
            key: 'sizename',
        },
        {
            title: 'ItemQty',
            dataIndex: 'itemqty',
            key: 'itemqty',
        },
        {
            title: 'BackOrderDate',
            dataIndex: 'backorderdate',
            key: 'backorderdate',
        },
        {
            title: 'PONumber',
            dataIndex: 'ponumber',
            key: 'ponumber',
        },
        {
            title: 'OrderStatus',
            dataIndex: 'order_status',
            key: 'order_status',
        },
        {
            title: 'VendorName',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
    ];


    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="BackOrderItems" caption="The simplest use of Drawer" >
                        <Form layout="inline" initialValue="" label="" form={form} id="BackOrderItems" name="nest-messages" onFinish={getBackOrderItemsReporting} validateMessages={validateMessages}>

                            <Row gutter={50}>
                                <Col span={8} >

                                  
                                    <Form.Item name="VendorName" initialValue="" label="" rules={[{ required: true }]} >
                                        <Select  style={{ padding: 10 }}  placeholder='Vendor Name' allowClear onChange={(VendorName) => { onChangeSelect(VendorName, 'VendorName') }}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }  >
                                            <Option value='' key=''>Vendor Name</Option>
                                            {vendornameState.map((val, i) => (
                                                <Option value={val} key={val}>{val}</Option>

                                            ))}

                                        </Select>
                                        </Form.Item>
                                 
                                    {/* </Form.Item> */}
                                </Col>
                                <Col span={6}   >
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}

                                    <DatePicker style={{ padding: 10 }}   size='small' onChange={(date) => { onChange(date, 'startDate') }} />

                                    </Form.Item>
                                </Col>
                                <Col span={6}  >
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}

                                    <DatePicker  style={{ padding: 10 }}  size='small' onChange={(date) => { onChange(date, 'endDate') }} />

                                    </Form.Item>
                                </Col>


                 
                                <Col span={4}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                                 
                                        <Form.Item >
                                        <Button  size="large"  type="success" htmlType="submit">
                                        Download
                                      </Button>
                                        </Form.Item>
                                     
                                
                                </Col>
                            </Row>
                        </Form>

                    </Cards>
                </Row>

                {/* INSTOCK SOLD REPORT */}


                <Row style={{}}>

                    <Col xs={24}>
                        <Table pagination={true} dataSource={state.dataSource} columns={columns} />
                    </Col>

                </Row>

            </Spin>


        </>
    );
};

export default OrderReportsView;
