import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getOrderSearch } from '../../../redux/apis/DataAction';
import { downloadFile,DownlaodWithReact } from '../../../components/utilities/utilities'

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
     //  get vendors from redux 
   let vendornameState = useSelector(state => state.tickets.vendornames);
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
        VendorName: null,
        values: {},
        isLoader: false,
    });
    const {isLoader}= state
    const onChange = (value, key) => {
        // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };

    const getOrderSearchReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getOrderSearch({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), vendorname: state.VendorName })).then(data => {
            setstate({ ...state, isLoader: false })
            console.log('My Data: ', data)
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download OrderReport of ${state.VendorName}  From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
           // let tempDataSource = [];
            // data[1] .map(value => {
            //     const { orderno, itemno,stylecode,stylename,vendorstylecode,colorcode,sizename,itemqty,backorderdate,ponumber,order_status,vendorname} = value;
            //     return tempDataSource.push({
            //         orderno: orderno,
            //         itemno: itemno,
            //         stylecode: stylecode,
            //         stylename: stylename,
            //         vendorstylecode: vendorstylecode,
            //         colorcode: colorcode,
            //         sizename: sizename,
            //         itemqty: itemqty,
            //         backorderdate: backorderdate,
            //         ponumber: ponumber,
            //         order_status: order_status,
            //         vendorname: vendorname,
            //     });
            // });
            // setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
        })

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
            title: 'PONumber',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'MerchantSku',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'VendorStyleCode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ColorName',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'SizeName',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Cost',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ItemQty',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'OrderType',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'IsMap',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'MapPrice',
            dataIndex: 'age',
            key: 'age',
        },

    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
            <Row style={{  }}>
                <Cards title="Order Search" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Order Search" name="nest-messages" onFinish={getOrderSearchReporting} validateMessages={validateMessages}>
                    <Row gutter={25}>
                        <Col lg={8} xs={24}  >
                          
                                
                                 <Form.Item name="Vendor Name" rules={[{ required: true }]}>
                                <Select mode="multiple" style={{ padding: 10 }} placeholder='Vendor Name'  allowClear  onChange={(VendorName) => { onChange(VendorName, 'VendorName') }}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        } style={{ width: 300 }}  >
                                    {vendornameState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}

                                </Select>
                                </Form.Item>
                           
                        </Col>
                        <Col lg={8} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}
                            <Form.Item name="startDate" rules={[{ required: true }]}>
                            <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }} />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}
                            <Form.Item name="endDate" rules={[{ required: true }]}>
                                    <DatePicker  style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 20 }}>
                            <Col lg={6} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                                <Form.Item >
                                    <Button size="default" type="success" htmlType="Submit">
                                        Download
                                     </Button>

                                     </Form.Item>
                            </Col>
                        </Row>
                        </Form>

                </Cards>
            </Row>

            {/* INSTOCK SOLD REPORT */}

           
            {/* <Row style={{  }}>

                <Col xs={24}>
                    <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>

            </Row> */}

            </Spin>


        </>
    );
};

export default OrderReportsView;

