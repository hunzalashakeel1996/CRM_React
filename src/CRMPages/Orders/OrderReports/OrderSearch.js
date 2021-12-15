import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getOrderSearch } from '../../../redux/apis/DataAction';
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
    //  get vendors from redux 
    let vendornameState = useSelector(state => state.tickets.vendornames);
    vendornameState=['All Vendor',...vendornameState]
    const dispatch = useDispatch();
    const [form] = Form.useForm();

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
        dataSource: [],
        downloadFilePath: ''
    });
    const { isLoader, dataSource, downloadFilePath } = state

    const onChange = (value, key) => {
        console.log('aaa', value, key)
        setState({ ...state, [key]: value });

    };

    const getOrderSearchReporting = () => {

        setState({ ...state, isLoader: true })
        dispatch(getOrderSearch({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), vendorname: state.VendorName })).then(data => {
            setState({ ...state, isLoader: false, dataSource: data[1], downloadFilePath: data[0] })


            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download OrderReport of ${state.VendorName}  From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });

        })

    };



    const columns = [
        {
            title: 'Orderno',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'PONumber',
            dataIndex: 'PONUMBER',
            key: 'PONUMBER',
        },
        {
            title: 'OrderDate',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },
        {
            title: 'MerchantSKU',
            dataIndex: 'merchantsku',
            key: 'merchantsku',
        },
        {
            title: 'VendorStyleCode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
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
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'ItemUnitPrice',
            dataIndex: 'itemunitprice',
            key: 'itemunitprice',
        },
        {
            title: 'ItemQty',
            dataIndex: 'itemqty',
            key: 'itemqty',
        },
        {
            title: 'VendorName',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },

        {
            title: 'OrderType',
            dataIndex: 'ordertype',
            key: 'ordertype',
        },
        {
            title: 'IsMap',
            dataIndex: 'ismap',
            key: 'ismap',
        },
        {
            title: 'MapPrice',
            dataIndex: 'mapprice',
            key: 'mapprice',
        },

    ];
    const dowloadFile = () => {

        downloadFile(downloadFilePath)
    }

        
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="Order Search" caption="The simplest use of Drawer" >
                        <Form initialValue="" label="" form={form} id="Order Search" name="nest-messages" onFinish={getOrderSearchReporting} validateMessages={validateMessages}>
                            <Row gutter={25}>
                                <Col lg={8} xs={24}  >
                                    <Form.Item name="Vendor Name" rules={[{ required: true }]}>
                                        <Select mode="multiple" style={{ padding: 10 }} placeholder='Vendor Name' allowClear onChange={(VendorName) => { onChange(VendorName, 'VendorName') }}
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
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row  gutter={50} style={{ marginTop: 10 }}>
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
                                {downloadFilePath&&
                                    <Button size="large" type="success" onClick={dowloadFile}>Download </Button>
                                }
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

