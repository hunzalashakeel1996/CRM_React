import React, { lazy, Suspense, useEffect, useState } from 'react';
// import moment from moment;
// import React, { useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, Checkbox, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { getBalanceSheetRecordOnClick, getBalanceSheetRecord } from '../../../redux/apis/DataAction';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
// import { Main } from '../../styled';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';
import { checkPageAccess, downloadFile } from '../../../components/utilities/utilities';
import './saleBalanceSheet.css';
// import { getDate } from 'date-fns';

// const { TabPane } = Tabs;

// const rangeConfig = {
//     rules: [{ type: 'array', required: true, message: 'Please select time!' }],
// };


const formInit = {
    VendorName: '',
    loader: false,
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

// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 8,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 8,
//     },
// };

// const {}


const ReportView = (props) => {


    let vendorNames = useSelector(state => state.tickets.vendornames);
    // // console.log(vendorNames)

    const [state, setState] = useState({
        controls: { ...formInit },
        dataSource: [],
        isLoading: false,
        downLoadLink: '',

    });




    const { controls } = state




    const dispatch = useDispatch();

    useEffect(() => {
        const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

        checkPageAccess(userAccess, 'Sales', "Balance Sheet", props.history)


        setState({ ...state, loader: true })
        let tempDataSource = [];
        // get balance sheet record
        dispatch(getBalanceSheetRecord()).then(data => {
            // // console.log('12310', data[1])


            let tempLinkDownload = data[0];
            // // console.log(tempLinkDownload);
            data[1].map(value => {
                const { vendorname, past_due, date } = value;
                return tempDataSource.push({
                    vendorname: vendorname,
                    past_due: past_due,
                    date: date,

                });
            });

            setState({ ...state, dataSource: [...tempDataSource], downLoadLink: tempLinkDownload, loader: false });
        })
    }, []);




    // user: JSON.parse(localStorage.getItem('user')).LoginName,
    // date: moment().format('MM-DD-YYYY'),


    const onSubmit = (values) => {
        setState({ ...state, loader: true })

        // get balance sheet record
        dispatch(getBalanceSheetRecordOnClick({ user: JSON.parse(localStorage.getItem('user')).LoginName, vendor: controls.VendorName, date: values['startDate'].format('YYYY-MM-DD'), payamount: values['payCount'] })).then(data => {
            // console.log('buttonResult', data)

            let tempDataSource = []
            data.map(value => {
                const { vendorname, past_due, date } = value;
                return tempDataSource.push({
                    vendorname: vendorname,
                    past_due: past_due,
                    date: date,


                });
            });
            setState({ ...state, dataSource: [...tempDataSource], loader: false });

        })
        // // console.log(objValues)

    };


    const downloadF = () => {
        setState({ ...state })
        // // console.log("Button 2 clicked!");
        // console.log(state.downLoadLink);
        downloadFile(state.downLoadLink)
    }

    const onSubmitFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };


    const onValueChange = (name, value) => {
        let temp = { ...controls }
        temp[name] = value
        // console.log(temp[name])
        setState({ ...state, controls: temp })
    }


    // Sheet Columns
    const columns = [
        {
            title: 'Vendorname',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Pasts Due',
            dataIndex: 'past_due',
            key: 'past_due',
        },
    ];



    return (
        <div>
          
            <Row style={{ marginRight: 20, marginLeft: 20 ,marginTop:20}}>
                <Cards size="large" title="Balance Sheet">
                    <Form validateMessages={validateMessages}
                        name="basic"
                        onFinish={onSubmit}
                        onFinishFailed={onSubmitFailed}
                    >
                        <Row gutter={25}>

                            {vendorNames && <Col xs={24} md={12} lg={6}  >
                                <Form.Item name="Vendorname" rules={[{ required: true }]} >
                                    <ReasonAutoComplete
                                        //   style={{ marginRight: 5 }}
                                        placeholder='Search Vendorname'
                                        onInputChange={(vendorName) => { onValueChange('VendorName', vendorName) }}
                                        selectedReason={controls.VendorName} style={{ width: '100%' }}
                                        dataSource={vendorNames}
                                        onReasonSelect={(vendorName) => { onValueChange('VendorName', vendorName) }} />
                                </Form.Item>
                            </Col>}

                            <Col xs={24} md={8} lg={6}>
                                <Form.Item name="startDate" rules={[{ required: true }]} >
                                    {/* <Space label="" {...rangeConfig}> */}
                                    <DatePicker style={{ padding: 10 }} renderExtraFooter={() => 'extra footer'} placeholder="Enter date" />
                                    {/* </Space > */}
                                </Form.Item>
                            </Col>
                            <Col lg={3}>
                                <Form.Item name="payCount" rules={[{ required: true }]} >
                                    <InputNumber style={{ height: 42 }} min={1} max={10} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={9}>
                                <Form.Item >
                                    <Button size="large" style={{ marginRight: '15px', }} type="success" htmlType="submit" >
                                        <Icon type="left" />
                                        Search
                                    </Button>

                                    <Button size="large" type="primary" icon={<VerticalAlignBottomOutlined />} onClick={() => { downloadF() }}  >
                                        <Icon type="left" />
                                        Download
                                    </Button>
                                </Form.Item>
                            </Col>


                        </Row>

                    </Form>
                </Cards>
            </Row>
            <Row style={{ marginRight: 20, marginLeft: 20 }}>
                <Col xs={24}>
                    <Cards headless>
                        <ProjectList>

                            <div className="table-responsive">
                                <Table pagination={true} dataSource={state.dataSource} columns={columns} />
                            </div>

                        </ProjectList>
                    </Cards>
                </Col>

            </Row>

        </div>
    );
};

export default ReportView;

