import React, { lazy, Suspense, useEffect, useState } from 'react';
// import React, { useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, Dropdown, Menu, Space, Checkbox, Tabs, Spin, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { getFeedBackRecordOnClick, getReturnRecordOnClick, orderDownloadReport, getVendorTrackingRecordOnClick, getPOitemReceivedRecordOnClick, getCheckReleaseOrdersRecordOnClick, getOrderTrackingRecordOnClick } from '../../../redux/apis/DataAction';
import { ProjectHeader } from '../../Tickets/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { checkPageAccess, downloadFile } from '../../../components/utilities/utilities';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';
import './saleReport.css';

// const { TabPane } = Tabs;

// const rangeConfig = {
//     rules: [{ type: 'array', required: true, message: 'Please select time!' }],
// };

const reportingAPIs = [{ name: 'Return', api: getReturnRecordOnClick },
{ name: 'Feedback', api: getFeedBackRecordOnClick },
{ name: 'Vendor_Tracking', api: getVendorTrackingRecordOnClick },
{ name: 'Check_Release', api: getCheckReleaseOrdersRecordOnClick },
{ name: 'Order_Tracking', api: getOrderTrackingRecordOnClick },
{ name: 'Vendor_Name', api: getPOitemReceivedRecordOnClick }]

const formInit = {
    reportType: '',
    VendorName: ''
}




const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

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



const ReportView = (props) => {


    let vendorNames = useSelector(state => state.tickets.vendornames);
    // console.log('redux',vendorNames)

    const [state, setState] = useState({
        controls: { ...formInit },
        isLoading: false,
        VendorName: '',
        downloadFilePath: '',
        dataSource: [],
        columnName: []

    });


    const { columnName, dataSource, downloadFilePath, controls } = state

    const { path } = props.match;
    const dispatch = useDispatch();
    // const [Bags, setBags] = useState([]);
    useEffect(() => {
        const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

        checkPageAccess(userAccess, 'Sales', "Reports", props.history)
    })

    const onSubmit = (values) => {
        let obj = {
            ...values,
            vendorName: controls.VendorName,
            startDate: values['startDate'].format('YYYY-MM-DD'),
            endDate: values['endDate'].format('YYYY-MM-DD'),
            reportTypr: values['reportType']
        }

        let reportToUse = reportingAPIs.filter(value => { return values.reportType === value.name })

        let data = { user: JSON.parse(localStorage.getItem('user')).LoginName, orderdatefrom: values['startDate'].format('YYYY-MM-DD'), orderdateto: values['endDate'].format('YYYY-MM-DD') }
        values.reportType === 'Vendor Name' ? data = { ...data, VendorName: controls.VendorName } : null
        setState({ ...state, isLoading: true, reportToUseSelect: reportToUse })
        console.log(reportToUse[0].name)
        dispatch(reportToUse[0].api({ ...data })).then(data => {
            // console.log(data)
            setState({ ...state, isLoader: false, dataSource: data[1], downloadFilePath: data[0] })

            // downloadFile(data)
        })
    };

    const onSubmitFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const onMerchantSkuSubmit = (values) => {


        // console.log('sd : ', values )

        setState({ ...state, isLoading: true })
        dispatch(orderDownloadReport({ ms: values.merchantSku })).then(data => {
            setState({ ...state, isLoading: false })
            downloadFile(data)
        })
    }
    const onMerchantSkuSubmitFailed = (errorInfo) => {

        // console.log('error : ', errorInfo )
    }
    const onValueChange = (name, value) => {
        let temp = { ...controls }
        temp[name] = value
        console.log(temp.reportType)
        setState({ ...state, controls: temp, columnName: temp.reportType })
    }
    const dowloadFile = () => {

        downloadFile(downloadFilePath)
    }
    const Return = [
        {
            title: 'Merchantsku',
            dataIndex: 'merchantsku',
            key: 'merchantsku',
        },
        {
            title: 'VendorStyleCode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
        },
        {
            title: 'Total Order Count',
            dataIndex: 'Total_Order_Count',
            key: 'Total_Order_Count',
        },

        {
            title: 'Return Count',
            dataIndex: 'Return_Count',
            key: 'Return_Count',
        }
    ];

    const Feedback = [
        {
            title: 'Orderno',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'Ponumber',
            dataIndex: 'ponumber',
            key: 'ponumber',
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
            title: 'Trackingno',
            dataIndex: 'trackingno',
            key: 'trackingno',
        },
        {
            title: 'Orderdate',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },
        {
            title: 'Delivery Date',
            dataIndex: 'Delivery_Date',
            key: 'Delivery_Date',
        },
        {
            title: 'Delivery end date',
            dataIndex: 'delivery_end_date',
            key: 'delivery_end_date',
        }
    ];

    const Vendor_Tracking = [
        {
            title: 'Vendorname',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'PONO',
            dataIndex: 'pono',
            key: 'pono',
        },
        {
            title: 'TrackingCode',
            dataIndex: 'trackingcode',
            key: 'trackingcode',
        },

        {
            title: 'TrackingCount',
            dataIndex: 'trackingCount',
            key: 'trackingCount',
        },

        {
            title: 'POqty',
            dataIndex: 'POqty',
            key: 'POqty',
        },
        {
            title: 'Shipping Price',
            dataIndex: 'shipping_price',
            key: 'shipping_price',
        },
        {
            title: 'Avg_Item_Ship_Price',
            dataIndex: 'avg_item_ship_price',
            key: 'avg_item_ship_price',
        },
        {
            title: 'PoType',
            dataIndex: 'PoType',
            key: 'PoType',
        }
    ];

    const Check_Release = [
        {
            title: 'Orderno',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'Orderdate',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },
        {
            title: 'Ponumber',
            dataIndex: 'ponumber',
            key: 'ponumber',
        },

        {
            title: 'OrderStatus',
            dataIndex: 'orderstatus',
            key: 'orderstatus',
        },

        {
            title: 'Trackingno',
            dataIndex: 'trackingno',
            key: 'trackingno',
        },
        {
            title: 'Vendorname',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'PurchaseOrderno',
            dataIndex: 'purchaseorderno',
            key: 'purchaseorderno',
        },
        {
            title: 'PoStatus',
            dataIndex: 'postatus',
            key: 'postatus',
        }
        ,
        {
            title: 'POItemStatus',
            dataIndex: 'POItemStatus',
            key: 'POItemStatus',
        },
        {
            title: 'TrackingCode',
            dataIndex: 'trackingcode',
            key: 'trackingcode',
        },
        {
            title: 'Ordernotes',
            dataIndex: 'ordernotes',
            key: 'ordernotes',
        }
    ];

    const Order_Tracking = [
        {
            title: 'Orderno',
            dataIndex: 'orderno',
            key: 'orderno',
        }, {
            title: 'Ponumber',
            dataIndex: 'ponumber',
            key: 'ponumber',
        },
        {
            title: 'Orderdate',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },

        {
            title: 'OrderStatus',
            dataIndex: 'orderstatus',
            key: 'orderstatus',
        },
        {
            title: 'ShippedDate',
            dataIndex: 'shippeddate',
            key: 'shippeddate',
        },
        {
            title: 'Trackingno',
            dataIndex: 'trackingno',
            key: 'trackingno',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'PONO',
            dataIndex: 'pono',
            key: 'pono',
        }, {
            title: 'Podate',
            dataIndex: 'podate',
            key: 'podate',
        },
        {
            title: 'PoStatus',
            dataIndex: 'postatus',
            key: 'postatus',
        }
        ,
        {
            title: 'Date Delivered',
            dataIndex: 'Date_Delivered',
            key: 'Date_Delivered',
        },
        {
            title: 'Ordertype',
            dataIndex: 'ordertype',
            key: 'ordertype',
        }
    ];

    const Vendor_Name = [
        {
            title: 'Stylecode',
            dataIndex: 'stylecode',
            key: 'stylecode',
        }, {
            title: 'Itemstatus',
            dataIndex: 'itemstatus',
            key: 'itemstatus',
        },
        {
            title: 'Itemid',
            dataIndex: 'itemid',
            key: 'itemid',
        },

        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'StyleSize',
            dataIndex: 'stylesize',
            key: 'stylesize',
        },
        {
            title: 'PurchaseOrderno',
            dataIndex: 'purchaseorderno',
            key: 'purchaseorderno',
        },
        {
            title: 'VirtualPonumber',
            dataIndex: 'virtualponumber',
            key: 'virtualponumber',
        },
        {
            title: 'StyleName',
            dataIndex: 'stylename',
            key: 'stylename',
        }, {
            title: 'ColorName',
            dataIndex: 'colorname',
            key: 'colorname',
        },
        {
            title: 'ColorCode',
            dataIndex: 'colorcode',
            key: 'colorcode',
        }
        ,
        {
            title: 'orderno',
            dataIndex: 'Orderno',
            key: 'Orderno',
        },
        {
            title: 'Itemno',
            dataIndex: 'itemno',
            key: 'itemno',
        }

        ,
        {
            title: 'Vendorname',
            dataIndex: 'vendorname',
            key: 'vendorname',
        }
        ,
        {
            title: 'POdate',
            dataIndex: 'podate',
            key: 'podate',
        },
        {
            title: 'ConfirmationNo',
            dataIndex: 'ConfirmationNo',
            key: 'ConfirmationNo',
        }

        ,
        {
            title: 'EShipDate',
            dataIndex: 'EShipDate',
            key: 'EShipDate',
        }
        ,
        {
            title: 'POStatus',
            dataIndex: 'POStatus',
            key: 'POStatus',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        }


        ,
        {
            title: 'ItemUnitCost',
            dataIndex: 'ItemUnitCost',
            key: 'ItemUnitCost',
        }
        ,
        {
            title: 'TotalCost',
            dataIndex: 'TotalCost',
            key: 'TotalCost',
        },
        {
            title: 'TrackingCode',
            dataIndex: 'trackingcode',
            key: 'trackingcode',
        }
        ,
        {
            title: 'Tick',
            dataIndex: 'Tick',
            key: 'Tick',
        }
    ];
    return (
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >
            <div>

                <Row style={{ marginRight: 20, marginLeft: 20 }}>
                    <Cards title="Reports" size="large">
                        <Form validateMessages={validateMessages}
                            name="basic"
                            onFinish={onSubmit}
                            onFinishFailed={onSubmitFailed}
                        >
                            <Row gutter={25}>
                                <Col xs={24} sm={12} md={8} lg={6} >
                                    <Form.Item name="reportType" initialValue="" label="" rules={[{ required: true }]}>
                                        <Select onChange={(val) => { onValueChange('reportType', val) }}>
                                            <Option value="">For</Option>
                                            <Option value="Feedback">Feedback</Option>
                                            <Option value="Return">Return</Option>
                                            <Option value="Vendor_Tracking">Vendor Tracking</Option>
                                            <Option value="Check_Release">Check Release</Option>
                                            <Option value="Order_Tracking">Order Tracking</Option>
                                            {/* <Option value="PO recieved Item">PO recieved Item</Option> */}
                                            <Option value="Vendor_Name">Vendor Name</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8} lg={6}>
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }} renderExtraFooter={() => 'extra footer'} />
                                        {/* </Space > */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={6}>
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }} renderExtraFooter={() => 'extra footer'} placeholder="End date" />
                                        {/* </Space > */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={6}>
                                    {controls.reportType === 'Vendor_Name' &&
                                        <Form.Item name="vendorName" value={state.VendorName} label="">
                                            <ReasonAutoComplete
                                                //   style={{ marginRight: 5 }}
                                                placeholder='Search Vendorname'
                                                onInputChange={(vendorName) => { onValueChange('VendorName', vendorName) }}
                                                selectedReason={controls.VendorName} style={{ width: '100%' }}
                                                dataSource={vendorNames}
                                                onReasonSelect={(vendorName) => { onValueChange('VendorName', vendorName) }} />
                                        </Form.Item>}
                                </Col>

                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item >
                                        <Button size="large" key="1" type="primary" htmlType="submit">
                                            Search
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
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
                <Row style={{ marginRight: 20, marginLeft: 20 }}>
                    <Col xs={24}>
                        <Cards headless>
                        <div className="table-responsive">                             
                                <Table size='small' pagination={true} dataSource={dataSource} 
                           columns={Vendor_Name} />                             
                            </div>
                        </Cards>
                    </Col>
                </Row>

                <Row style={{ marginRight: 20, marginLeft: 20 }}>
                    <Row style={{ flex: 1 }}>
                        <Cards title="Merchant Sku PO's and Order Number" size="large">

                            <Form validateMessages={validateMessages}
                                name="basic"
                                onFinish={onMerchantSkuSubmit}
                                onFinishFailed={onMerchantSkuSubmitFailed}
                            >
                                <Row gutter={25}>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name='merchantSku' rules={[{ required: true }]}>
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} lg={24}>
                                        {/* two */}
                                        <Button size="large" type="primary" shape="round" icon={<VerticalAlignBottomOutlined />} htmlType="submit"  >
                                            <Icon type="left" />
                                            Download
                                        </Button>
                                    </Col>

                                </Row>
                            </Form>

                        </Cards>
                    </Row>
                </Row>
                {/* </Main> */}
            </div>
        </Spin>
    );
};

export default ReportView;
