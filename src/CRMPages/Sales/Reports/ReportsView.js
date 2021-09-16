import React, { lazy, Suspense, useEffect, useState } from 'react';
// import React, { useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, Dropdown, Menu, Space, Checkbox, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { getFeedBackRecordOnClick, getReturnRecordOnClick, orderDownloadReport,getVendorTrackingRecordOnClick, getPOitemReceivedRecordOnClick, getCheckReleaseOrdersRecordOnClick, getOrderTrackingRecordOnClick } from '../../../redux/apis/DataAction';
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
{ name: 'Vendor Tracking', api: getVendorTrackingRecordOnClick },
{ name: 'Check Release', api: getOrderTrackingRecordOnClick },
{ name: 'Order Tracking', api: getOrderTrackingRecordOnClick },
{ name: 'Vendor Name', api: getPOitemReceivedRecordOnClick }]

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
        VendorName: ''
    });


    const { controls } = state

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
        // // console.log(reportToUse)
        let data = { user: JSON.parse(localStorage.getItem('user')).LoginName, orderdatefrom: values['startDate'].format('YYYY-MM-DD'), orderdateto: values['endDate'].format('YYYY-MM-DD') }
        values.reportType === 'Vendor Name' ? data = { ...data, VendorName: controls.VendorName } : null
        setState({ ...state, isLoading: true })
        dispatch(reportToUse[0].api({ ...data })).then(data => {
            setState({ ...state, isLoading: false })
            downloadFile(data)
        })
    };

    const onSubmitFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const onMerchantSkuSubmit = (values) =>{

    
        // console.log('sd : ', values )
        
        setState({ ...state, isLoading: true })
        dispatch(orderDownloadReport({ ms : values.merchantSku })).then(data => {
            setState({ ...state, isLoading: false })
            downloadFile(data)
        })
    }

    const onMerchantSkuSubmitFailed = (errorInfo) =>{

        // console.log('error : ', errorInfo )
    }


    const onValueChange = (name, value) => {
        let temp = { ...controls }
        temp[name] = value
        // // console.log(temp[name])
        setState({ ...state, controls: temp })
    }




    return (
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >
            <div>
                <ProjectHeader>
                    <PageHeader
                        ghost
                        // title="Reports Section"
                    />
                </ProjectHeader>

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
                                            <Option value="Vendor Tracking">Vendor Tracking</Option>
                                            <Option value="Check Release">Check Release</Option>
                                            <Option value="Order Tracking">Order Tracking</Option>
                                            {/* <Option value="PO recieved Item">PO recieved Item</Option> */}
                                            <Option value="Vendor Name">Vendor Name</Option>
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
                                    {controls.reportType === 'Vendor Name' &&
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
                                <Form.Item >
                                     <Button size="large"  key="1" type="success"   htmlType="submit">
                                        Download
                           </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </Cards>
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
                                         <Button size="large"  type="primary" shape="round" icon={<VerticalAlignBottomOutlined />} htmlType="submit"  >
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

// {/* <Cards title="Reports" size="large">
//                         {/* <Main> */}
//                         <Form validateMessages={validateMessages}
//                             name="basic"
//                             onFinish={onFinish}
//                             onFinishFailed={onFinishFailed}
//                         >
//                             <Row gutter={10} style={{ width: '100%' }} >
//                                 <Col span={4}>
//                                     <Form.Item name="reportType" initialValue="" label="" rules={[{ required: true }]} >
//                                         <Select style={{ padding: 10, }} onChange={(val) => { onValueChange('reportType', val) }}>
//                                             <Option value="">For</Option>
//                                             <Option value="Feedback">Feedback</Option>
//                                             <Option value="Return">Return</Option>
//                                             <Option value="Vendor Tracking">Vendor Tracking</Option>
//                                             <Option value="Check Release">Check Release</Option>
//                                             <Option value="Order Tracking">Order Tracking</Option>
//                                             <Option value="PO recieved Item">PO recieved Item</Option>
//                                             <Option value="Vendor Name">Vendor Name</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Col>

//                                 <Col span={6} >
//                                     <Form.Item name="startDate" rules={[{ required: true }]}>
//                                         {/* <Space label="" {...rangeConfig}> */}
//                                         <DatePicker style={{ padding: 10  }} renderExtraFooter={() => 'extra footer'} />
//                                         {/* </Space > */}
//                                     </Form.Item>
//                                 </Col>
//                                 <Col span={6} style={{marginLeft: 10, marginRight: 10}}>
//                                     <Form.Item name="endDate" rules={[{ required: true }]}>
//                                         {/* <Space label="" {...rangeConfig}> */}
//                                         <DatePicker style={{ padding: 10 }} renderExtraFooter={() => 'extra footer'} placeholder="End date" />
//                                         {/* </Space > */}

//                                     </Form.Item>
//                                 </Col>

//                                 <Col span={6}  >
//                                     {controls.reportType === 'Vendor Name' &&
//                                         <Form.Item name="vendorName" initialValue="" label="">
//                                             <ReasonAutoComplete
//                                                 // style={{ marginRight: 5 }}
//                                                 placeholder='Search Vendorname'
//                                                 onInputChange={(vendorName) => { onValueChange('VendorName', vendorName) }}
//                                                 selectedReason={controls.VendorName} //style={{ width: '100%' }}
//                                                 dataSource={vendorNames.vendorname.split(',')}
//                                                 onReasonSelect={(vendorName) => { onValueChange('VendorName', vendorName) }} />
//                                         </Form.Item>
//                                     }
//                                 </Col>
//                             </Row>
//                             <Row style={{ flex: 1 }}>
//                                 <Col span={2}>
//                                     <Form.Item >
//                                          <Button size="large"  type="primary" htmlType="submit">
//                                             Submit
//                                             </Button>
//                                     </Form.Item>
//                                 </Col>
//                             </Row>
//                         </Form>
//                     </Cards> */}