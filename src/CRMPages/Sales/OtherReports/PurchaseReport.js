import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile, getTotals } from '../../../components/utilities/utilities';
import { Button } from '../../../components/buttons/buttons';
import { purchaseReport } from '../../../redux/apis/DataAction';





const PurchaseReport = (props) => {


    const dispatch = useDispatch();

    const [state, setState] = useState({
        dataSource: [],
        isLoading: false,
        downLoadLink: '',
    });

    const { controls, dataSource, isLoading, downLoadLink } = state

    const onSubmit = (values) => {

        let object = {
            orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
            orderdateto: values['endDate'].format('YYYY-MM-DD')
        }

        console.log('success:', object);

        setState({ ...state, isLoading: true })
        dispatch(purchaseReport({
            orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
            orderdateto: values['endDate'].format('YYYY-MM-DD')
        })).then(data => {

            console.log(data[1])
            let tempDataSource = [];
            let tempLinkDownload = data[0];
            console.log(data);
            data[1].map(value => {
                const { vendorname, PurchaseCost } = value;
                return tempDataSource.push({
                    vendorname: vendorname,
                    PurchaseCost: PurchaseCost
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


    const columns = [

        {
            title: 'Vendor Name',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'Purchase Cost',
            dataIndex: 'PurchaseCost',
            key: 'PurchaseCost',
        }


    ]



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
                        <Form name="basic"
                            onFinish={onSubmit}
                            onFinishFailed={onSubmitFailed}>

                            <Row>
                                <Col span={6}>
                                    <Form.Item name="startDate" rules={[{ required: true }]}>
                                        {/* <Space label="" {...rangeConfig}> */}
                                        <DatePicker style={{ padding: 10 }} size='default'
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
                                <Col span={3}  style={{  margintTop: 3}}>

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
                <Row style={{ marginRight: 15, marginLeft: 15 }}>
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

export default PurchaseReport;
