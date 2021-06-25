import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile, getTotals } from '../../../components/utilities/utilities';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';
import { topSellingStyleCodes } from '../../../redux/apis/DataAction';



const { Option } = Select;



const formInit = {
    VendorName: '',
}

const TopSelling = (props) => {
    const [form] = Form.useForm();
    let vendorNames = useSelector(state => state.tickets.vendornames);


    const dispatch = useDispatch();

    const [state, setState] = useState({
        controls: { ...formInit },
        dataSource: [],
        isLoading: false,
        downLoadLink: '',
    });

    const { controls, dataSource, isLoading, downLoadLink } = state

    const onSubmit = (values) => {

        let object = {
            vendor: controls.VendorName,
            orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
            orderdateto: values['endDate'].format('YYYY-MM-DD'),
            marketplace: values['orderType']
        }

        console.log('success:', object);

        setState({ ...state, isLoading: true })
        dispatch(topSellingStyleCodes({
            vendor: controls.VendorName,
            orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
            orderdateto: values['endDate'].format('YYYY-MM-DD')
        })).then(data => {

            console.log(data[1])
            let tempDataSource = [];
            let tempLinkDownload = data[0];
            console.log(data);
            data[1].map(value => {
                const { stylecode, vendorname, categoryname, Amazon, AmazonRizno, Walmart, Ebay,
                    Sears, Newegg, Rakuten, Sold_qty, Rank_no } = value;
                return tempDataSource.push({
                    stylecode: stylecode,
                    vendorname: vendorname,
                    categoryname: categoryname,
                    Amazon: Amazon,
                    AmazonRizno: AmazonRizno,
                    Walmart: Walmart,
                    Ebay: Ebay,
                    Sears: Sears,
                    Newegg: Newegg,
                    Rakuten: Rakuten,
                    Sold_qty: Sold_qty,
                    Rank_no: Rank_no
                });
            });

            setState({ ...state, dataSource: [...tempDataSource], downLoadLink: tempLinkDownload, loader: false });
        })
    }


    const downloadFiles = () => {
        setState({ ...state })
        // console.log("Button 2 clicked!");
        // console.log(state.downLoadLink);

        if(downLoadLink == ""){
            // alert("Please Select Record First")

            notification.error({
                message: 'Download Failed',
                description: `Please Select Record First`,
                onClose: close,
            });

        }
        else{

            downloadFile(downLoadLink);
            notification.success({
                message: 'Successfull Dowload',
                description: `File Downloaded`,
                onClose: close,
            });

        }
      
    }

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onValueChange = (name, value) => {
        let temp = { ...controls }
        temp[name] = value
        console.log(temp[name])
        setState({ ...state, controls: temp })
    }

    const columns = [

        {
            title: 'Style Code',
            dataIndex: 'stylecode',
            key: 'stylecode',
        },
        {
            title: 'Vendor Name',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryname',
            key: 'categoryname',
        },
        {
            title: 'Amazon',
            dataIndex: 'Amazon',
            key: 'Amazon',
        },
        {
            title: 'Amazon Rizno',
            dataIndex: 'AmazonRizno',
            key: 'AmazonRizno',
        },
        {
            title: 'Walmart',
            dataIndex: 'Walmart',
            key: 'Walmart',
        },
        {
            title: 'Ebay',
            dataIndex: 'Ebay',
            key: 'Ebay',
        },
        {
            title: 'Sears',
            dataIndex: 'Sears',
            key: 'Sears',
        },
        {
            title: 'Newegg',
            dataIndex: 'Newegg',
            key: 'Newegg',
        },
        {
            title: 'Rakuten',
            dataIndex: 'Rakuten',
            key: 'Rakuten',
        },
        {
            title: 'Sold Qty',
            dataIndex: 'sold_qty',
            key: 'sold_qty',
        },
        {
            title: 'Rank No',
            dataIndex: 'Rank_no',
            key: 'Rank_no',
        }


    ]
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


    return (

        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoading} >

            <div>
                <ProjectHeader>
                    <PageHeader
                        ghost
                        title="Top Selling StyleCode"
                    />
                </ProjectHeader>

                <Row>
                    <Cards>
                        <Form layout="inline" initialValue="" label=""  name="basic"  form={form} id="Top Selling" onFinish={onSubmit}  onFinishFailed={onSubmitFailed}  validateMessages={validateMessages}>

                            <Row gutter={50}>
                                <Col span={8}>
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }} size='default'
                                            renderExtraFooter={() => 'extra footer'} />
                                        {/* </Space > */}
                                    </Form.Item>
                                </Col>
                           
                                <Col span={8}>
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }}
                                            renderExtraFooter={() => 'extra footer'} placeholder="End date" />
                                        {/* </Space > */}
                                    </Form.Item>
                                </Col>
                           

                                {vendorNames && <Col span={8} >
                                    <Form.Item name="vendorName" rules={[{ required: true }]} >
                                        <ReasonAutoComplete
                                            //   style={{ marginRight: 5 }}
                                            placeholder='Search Vendorname'
                                            onInputChange={(vendorName) => { onValueChange('VendorName', vendorName) }}
                                            selectedReason={controls.VendorName} style={{ width: '100%' }}
                                            dataSource={vendorNames}
                                            onReasonSelect={(vendorName) => { onValueChange('VendorName', vendorName) }} />
                                    </Form.Item>
                                </Col>}
                            </Row>
                            <Row style={{marginTop:10}} gutter={50}>


                                <Col span={12}>

                                    <Button key="1" type="primary" size="default" htmlType="submit">
                                        Search
                           </Button>

                                </Col>
                                <Col span={12}>

                                    <Button key="1" type="success" size="default" onClick={() => { downloadFiles() }}>
                                        Download
                           </Button>

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
                                    <Table pagination={true} dataSource={dataSource} columns={columns} />
                                </div>

                            </ProjectList>
                        </Cards>
                    </Col>

                </Row>
            </div>
        </Spin>
    );

};

export default TopSelling;
