import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile, getTotals } from '../../../components/utilities/utilities';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';
import { comparisonReport } from '../../../redux/apis/DataAction';



const { Option } = Select;

const ComparisonReport = (props) =>{

    let vendorNames = useSelector(state => state.tickets.vendornames);


    const dispatch = useDispatch();

    const [state, setState] = useState({
        dataSource: [],
        isLoading: false,
        downLoadLink : '',
    });

    const { downLoadLink } = state


    const onSubmit = (values) => {

        let object = {
            vendor: values['vendorName'],
            orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
            orderdateto: values['endDate'].format('YYYY-MM-DD'),
            marketplace: values['orderType']
        }

        console.log('success:', object);

        setState({ ...state, isLoading: true })
        dispatch(comparisonReport({
            vendor: values['vendorName'],
            orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
            orderdateto: values['endDate'].format('YYYY-MM-DD'),
            marketplace: values['orderType']
        })).then(data => {

            console.log(data[1])
            let tempDataSource = [];
            let tempLinkDownload = data[0];
            console.log(tempLinkDownload);
            data[1].map(value => {
                const { vendorname, Past_year, current_Year, Amazon, AmazonRizno, Walmart,Ebay,
                     Sears, Newegg, Rakuten, Map, NonMap, Rank_no } = value;
                return tempDataSource.push({
                    vendorname: vendorname,
                    Past_year: Past_year,
                    current_Year: current_Year,
                    Amazon: Amazon,
                    AmazonRizno: AmazonRizno,
                    Walmart: Walmart,
                    Ebay: Ebay,
                    Sears: Sears,
                    Newegg: Newegg,
                    Rakuten: Rakuten,
                    Map: Map,
                    NonMap: NonMap,
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
            notification.error({
                message: 'Download Failed',
                description: `Please Select Record First`,
                onClose: close,
            });
        }
        else
        {

        downloadFile(state.downLoadLink);
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

    const columns = [

        {
            title: 'Vendor name',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'Past year',
            dataIndex: 'Past_year',
            key: 'Past_year',
        },
        {
            title: 'Current year',
            dataIndex: 'current_Year',
            key: 'current_Year',
        },
        {
            title: 'Amazon',
            dataIndex: 'Amazon',
            key: 'Amazon',
        },
        {
            title: 'Purchase Cost',
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
            title: 'Map',
            dataIndex: 'Map',
            key: 'Map',
        },
        {
            title: 'NonMap',
            dataIndex: 'NonMap',
            key: 'NonMap',
        },
        {
            title: 'Rank No',
            dataIndex: 'Rank_no',
            key: 'Rank_no',
        }


    ]

    const changeVendorName = (values) => {

        console.log('selectedVendorName', values);

    }

return (
  
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

            <div>
                <ProjectHeader>
                    <PageHeader
                        ghost
                        title="Comparison Report"
                    />
                </ProjectHeader>

                <Row>
                    <Cards>
                        <Form name="basic"
                            onFinish={onSubmit}
                            onFinishFailed={onSubmitFailed}>

                            <Row>
                                <Col span={6}>
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }} size='small'
                                            renderExtraFooter={() => 'extra footer'} />
                                        {/* </Space > */}
                                    </Form.Item>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={6}>
                                    <Form.Item name="endDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }}
                                            renderExtraFooter={() => 'extra footer'} placeholder="End date" />
                                        {/* </Space > */}
                                    </Form.Item>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={8}>

                                    <Form.Item name="vendorName" rules={[{ required: true }]}>
                                        {vendorNames && <Select
                                            mode="multiple"
                                            size={'medium'}
                                            // listHeight={500}
                                            // size={size}
                                            maxTagCount={3}
                                            placeholder="Select Vendor Name"
                                            style={{ width: '100%' }}
                                            onChange={changeVendorName}
                                        >
                                            {vendorNames.map((vendorName,i) => (
                                                <Option key={i} value={vendorName}>{vendorName}</Option>
                                            ))}

                                        </Select>}

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                               

                                <Col span={3}>

                                    <Button key="1" type="primary" size="default" htmlType="submit">
                                        Search
                           </Button>

                                </Col>
                                <Col span={3}>

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
                                    <Table pagination={true} dataSource={state.dataSource} columns={columns} />
                                </div>

                            </ProjectList>
                        </Cards>
                    </Col>

                </Row>
            </div>
        </Spin>
);

};

export default ComparisonReport;
