import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, notification, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getSalesReport } from '../../../redux/apis/DataAction';
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
const formatedate = (value) => {

    let a = 'avsdFasdas'
    let formatedDate = value.split("T")
    let Date = formatedDate[0];
    let Time = formatedDate[1].split(".");
    Time = Time[0]
    let format = Date + ' ' + Time
    return Date
}
const OrderReportsView = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     setstate({ ...state, loader: true })
    // }, []);
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

    const onChange = (date, dateString) => {
        // // console.log('aaa', date, dateString)
        setstate({ ...state, [dateString]: date });
        // console.log(dateString);
    };



    const getSalesReporting = () => {
        setstate({ ...state, isLoader: true });

        dispatch(getSalesReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })).then(data => {
            console.log(data)
            let tempData = []
            data[1].map(item => {
                const {vendorname,	merchantsku,	vendorstylecode,	colorcode,	sizename,	orderstatus,	itemstatus,	orderdate,	ORDERTYPE,	orderno,	itemqty,	cost,	purchaseCost,	commit_status,	commision,	SalePrice,	pu_price,	Weight,	shipping,	po_shipping,	isRMA,	customer_pay_ship,	profit,	PPS,	final_profit                }=item
                tempData.push({
                    vendorname: vendorname,
                    merchantsku: merchantsku,
                    vendorstylecode: vendorstylecode,
                    colorcode: colorcode,
                    sizename: sizename,
                    orderstatus: orderstatus,
                    itemstatus: itemstatus,
                    orderdate: formatedate(orderdate),
                    ORDERTYPE: ORDERTYPE,
                    orderno: orderno,
                    itemqty: itemqty,
                    cost: cost,
                    purchaseCost: purchaseCost,
                    commit_status: commit_status,
                    commision: commision,
                    SalePrice: SalePrice,
                    pu_price: pu_price,
                    Weight: Weight,
                    shipping: shipping,
                    po_shipping: po_shipping,
                    isRMA: isRMA,
                    customer_pay_ship: customer_pay_ship,
                    profit: profit,
                    PPS: PPS,
                    final_profit: final_profit,

                })

            })




            setstate({ ...state, isLoader: false, dataSource: tempData, downloadFilePath: data[0] });

            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download Sales Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
        })

    };
    const dowloadFile = () => {

        downloadFile(downloadFilePath)
    }
    const columns = [
        {
            title: 'Vendorname',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'Merchantsku',
            dataIndex: 'merchantsku',
            key: 'merchantsku',
        },
        {
            title: 'Vendor Stylecode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
        },
        {
            title: 'ColorCode',
            dataIndex: 'colorcode',
            key: 'colorcode',
        },
        {
            title: 'SizeName',
            dataIndex: 'sizename',
            key: 'sizename',
        },
        {
            title: 'Order Status',
            dataIndex: 'orderstatus',
            key: 'orderstatus',
        },
        {
            title: 'ItemStatus',
            dataIndex: 'itemstatus',
            key: 'itemstatus',
        },

        {
            title: 'OrderDate',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },

        {
            title: 'OrderType',
            dataIndex: 'ORDERTYPE',
            key: 'ORDERTYPE',
        },
        {
            title: 'OrderNo',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'ItemQty',
            dataIndex: 'itemqty',
            key: 'itemqty',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'PurchaseCost',
            dataIndex: 'purchaseCost',
            key: 'purchaseCost',
        },
        {
            title: 'Commit Status',
            dataIndex: 'commit_status',
            key: 'commit_status',
        },
        {
            title: 'Commision',
            dataIndex: 'commision',
            key: 'commision',
        },
        {
            title: 'ColorCode',
            dataIndex: 'colorcode',
            key: 'colorcode',
        },
        {
            title: 'SalePrice',
            dataIndex: 'SalePrice',
            key: 'SalePrice',
        },
        {
            title: 'PU Price',
            dataIndex: 'pu_price',
            key: 'pu_price',
        },

        {
            title: 'Shipping',
            dataIndex: 'shipping',
            key: 'shipping',
        },
        {
            title: 'PO shipping',
            dataIndex: 'po_shipping',
            key: 'po_shipping',
        },

        {
            title: 'IsRMA',
            dataIndex: 'isRMA',
            key: 'isRMA',
        },
        {
            title: 'Customer pay Ship',
            dataIndex: 'customer_pay_ship',
            key: 'customer_pay_ship',
        },
        {
            title: 'Profit',
            dataIndex: 'profit',
            key: 'profit',
        },
        {
            title: 'PPS',
            dataIndex: 'PPS',
            key: 'PPS',
        },
        {
            title: 'Final Profit',
            dataIndex: 'final_profit',
            key: 'final_profit',
        },

    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row style={{}}>
                    <Cards title="Sales Report" caption="The simplest use of Drawer" >
                        <Form layout="inline" initialValue="" label="" form={form} id="Sales Report" name="nest-messages" onFinish={getSalesReporting} validateMessages={validateMessages}>
                            <Row gutter={30}>
                                <Col span={8}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}   >
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
