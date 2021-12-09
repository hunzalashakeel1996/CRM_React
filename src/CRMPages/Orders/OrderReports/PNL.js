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
import { getPNLReport } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const antIcon = <img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />;

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
    const formatedate = (value) => {

        let a = 'avsdFasdas'
        let formatedDate = value.split("T")
        let Date = formatedDate[0];
        let Time = formatedDate[1].split(".");
        Time = Time[0]
        let format = Date + ' ' + Time
        return Date
    }
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

    const btn = (
        <Button size="large" type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
        </Button>
    );
    const multipleChange = childData => {
        setstate({ ...state, checkData: childData });
    };


    const onChange = (date, dateString) => {
        // // console.log('aaa', date, dateString)
        setstate({ ...state, [dateString]: date });
        // console.log(dateString);
    };
    const getPNLReporting = () => {
        setstate({ ...state, isLoader: true });

        dispatch(getPNLReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })).then(data => {
            let tempData = []

            data[1].map(item => {
                const { vendorname, merchantsku, vendorstylecode, colorcode, sizename, orderstatus, itemstatus, orderdate, uspsdate, ORDERTYPE, orderno, purchaseorderno, itemqty, cost, purchaseCost, commit_status, commision, SalePrice, pu_price, Weight, shipping, po_shipping, ups_usps_item_shipping, usps_order_shipping, ups_order_shipping, isRMA, customer_pay_ship, profit, PPS, final_profit, Type, } = item

                tempData.push({
                    vendorname: vendorname,
                    merchantsku: merchantsku,
                    vendorstylecode: vendorstylecode,
                    colorcode: colorcode,
                    sizename: sizename,
                    orderstatus: orderstatus,
                    itemstatus: itemstatus,
                    orderdate: formatedate(orderdate),
                    uspsdate: formatedate(uspsdate),
                    ORDERTYPE: ORDERTYPE,
                    orderno: orderno,
                    purchaseorderno: purchaseorderno,
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
                    ups_usps_item_shipping: ups_usps_item_shipping,
                    usps_order_shipping: usps_order_shipping,
                    ups_order_shipping: ups_order_shipping,
                    isRMA: isRMA,
                    customer_pay_ship: customer_pay_ship,
                    profit: profit,
                    PPS: PPS,
                    final_profit: final_profit,
                    Type: Type,

                })

            })

            setstate({ ...state, isLoader: false, dataSource: tempData, downloadFilePath: data[0] });

            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download PNL Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });

        })

    };

    const dowloadFile =()=>{
        console.log(downloadFilePath)
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
            title: 'UspsDate',
            dataIndex: 'uspsdate',
            key: 'uspsdate',
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
            title: 'PurchaseOrderNo',
            dataIndex: 'purchaseorderno',
            key: 'purchaseorderno',
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
            title: 'Weight',
            dataIndex: 'Weight',
            key: 'Weight',
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
            title: 'UPS USPS Item Shipping',
            dataIndex: 'ups_usps_item_shipping',
            key: 'ups_usps_item_shipping',
        },
        {
            title: 'USPS Order Shipping',
            dataIndex: 'usps_order_shipping',
            key: 'usps_order_shipping',
        },
        {
            title: 'UPS Order Shipping',
            dataIndex: 'ups_order_shipping',
            key: 'ups_order_shipping',
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
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        },
    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="Profit & Loss Report (PNL)" caption="The simplest use of Drawer" >
                        <Form layout="inline" initialValue="" label="" form={form} id="Profit & Loss Report (PNL)" name="nest-messages" onFinish={getPNLReporting} validateMessages={validateMessages}>
                            <Row gutter={30}>
                                <Col span={8}  >
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}  >
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}  >
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
