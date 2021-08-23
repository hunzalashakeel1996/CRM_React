import React, { lazy, Suspense, useEffect, useState } from 'react';
// import moment from moment;
// import React, { useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { saleSummaryReport, getBalanceSheetRecord } from '../../../redux/apis/DataAction';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { downloadFile,getTotals } from '../../../components/utilities/utilities';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';
import './saleOtherReport.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;



const formInit = {
    reportType: '',
    VendorName: []
}





const SummaryReport = (props) => {


    const dispatch = useDispatch();


    let vendorNames = useSelector(state => state.tickets.vendornames);
    console.log(vendorNames)

    let orderType = { orderType : "Amazon,Amazonrizno,Ebay,Newegg,Rakuten,Sears,Walmart"};
    // console.log(orderType)
    const [state, setState] = useState({
        controls: { ...formInit },
        dataSource: [],
        isLoading: false,
        downLoadLink : '',
    });


    const { controls,downLoadLink  } = state




    const onSubmit = (values) =>
    {
      
        let object = {
            vendor : values['vendorName'],
            orderdatefrom : values['startDate'].format('YYYY-MM-DD'),
            orderdateto : values['endDate'].format('YYYY-MM-DD'),
            marketplace : values['orderType']
        }

        console.log('success:', object);

        setState({ ...state, isLoading: true })
        dispatch(saleSummaryReport({ vendor : values['vendorName'],
        orderdatefrom : values['startDate'].format('YYYY-MM-DD'),  
        orderdateto:values['endDate'].format('YYYY-MM-DD'), 
        marketplace : values['orderType']})).then(data => {
          
            console.log(data[1])
            let tempDataSource = [];
            let tempLinkDownload = data[0];
            console.log(tempLinkDownload);
            data[1].map(value => {
                const { Order_Count, PPS, SalePrice,Total_Profit,Total_item_loss,Total_loss,commision,cost,final_profit,ordertype,po_shipping,profit,purchaseCost,shipping,vendorname} = value;
                return tempDataSource.push({
                    Order_Count : Order_Count, 
                    PPS : PPS, 
                    SalePrice : Math.round(SalePrice),
                    Total_Profit : Math.round(Total_Profit),
                    Total_item_loss : Math.round(Total_item_loss),
                    Total_loss : Math.round(Total_loss),
                    commision : Math.round(commision),
                    cost : Math.round(cost),
                    final_profit: Math.round(final_profit),
                    ordertype : ordertype,
                    po_shipping : Math.round(po_shipping),
                    profit : Math.round(profit),
                    purchaseCost : Math.round(purchaseCost),
                    shipping : Math.round(shipping),
                    vendorname : vendorname
                });
              });


                    tempDataSource.push({
                        Order_Count : getTotals(tempDataSource,"Order_Count"), 
                        PPS : getTotals(tempDataSource,"PPS"), 
                        SalePrice : getTotals(tempDataSource,"SalePrice"),
                        Total_Profit : getTotals(tempDataSource,"Total_Profit"),
                        Total_item_loss : getTotals(tempDataSource,"Total_item_loss"),
                        Total_loss :  getTotals(tempDataSource,"Total_loss"),
                        commision : getTotals(tempDataSource,"commision"),
                        cost :  getTotals(tempDataSource,"cost"),
                        final_profit: getTotals(tempDataSource,"final_profit"),
                        ordertype : "=",
                        po_shipping : getTotals(tempDataSource,"po_shipping"),
                        profit : getTotals(tempDataSource,"profit"),
                        purchaseCost : getTotals(tempDataSource,"purchaseCost"),
                        shipping : getTotals(tempDataSource,"shipping"),
                        vendorname : "TOTAL"
            })
     setState({ ...state, dataSource: [...tempDataSource],downLoadLink : tempLinkDownload,  loader: false });
        })
    }


        
    const downloadFiles = () => {
        setState({ ...state })

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


    const columns = [

        {
            title: 'Vendor name',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'Order Type',
            dataIndex: 'ordertype',
            key: 'ordertype',
        },
        {
            title: 'Order Count',
            dataIndex: 'Order_Count',
            key: 'Order_Count',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Purchase Cost',
            dataIndex: 'purchaseCost',
            key: 'purchaseCost',
        },
        {
            title: 'Commission',
            dataIndex: 'commision',
            key: 'commision',
        },
        {
            title: 'Sale Price',
            dataIndex: 'SalePrice',
            key: 'SalePrice',
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
            title: 'Final profit',
            dataIndex: 'final_profit',
            key: 'final_profit',
        },
        {
            title: 'Total Profit',
            dataIndex: 'Total_Profit',
            key: 'Total_Profit',
        },
        {
            title: 'Total Lost',
            dataIndex: 'Total_loss',
            key: 'Total_loss',
        },
        {
            title: 'Total item lost',
            dataIndex: 'Total_item_loss',
            key: 'Total_item_loss',
        },


    ]

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    const changeVendorName = (values) => {

        console.log('selectedVendorName', values);

    }

    const changeOrderType = (values) => {

        console.log('selectedOrderType', values);

    }

    

    return (
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >
      
        <div>
            <ProjectHeader>
                <PageHeader
                    ghost
                    title="Sale Summary"
                />
            </ProjectHeader>

            <Row>
                <Cards>
                    <Form   name="basic"
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitFailed}>
                    
                            <Row gutter={25}>
                            <Col xs={24} md={12} lg={6}>
                                <Form.Item name="startDate" rules={[{ required: true }]}>
                                    {/* <Space label="" {...rangeConfig}> */}
                                    <DatePicker style={{ padding: 10}} size='default' 
                                    renderExtraFooter={() => 'extra footer'} />
                                    {/* </Space > */}
                                </Form.Item> 
                                </Col>
                               
                            <Col xs={24} md={12} lg={6}>
                                <Form.Item name="endDate" rules={[{ required: true }]}>
                                    {/* <Space label="" {...rangeConfig}> */}
                                    <DatePicker style={{ padding: 10 }} 
                                    renderExtraFooter={() => 'extra footer'} placeholder="End date" />
                                    {/* </Space > */}
                                </Form.Item>
                            </Col>
                        
                            <Col xs={24} md={12} lg={6}>

                                <Form.Item name="vendorName" rules={[{ required: true }]}>
                                {vendorNames && <Select
                                mode="multiple"
                                size={'medium'}
                                // listHeight={500}
                                // size={size}
                                maxTagCount= {3}
                                placeholder="Select Vendor Name"
                                style={{ width: '100%' }}
                                onChange={changeVendorName}
                                >
                                    {vendorNames.map(vendorName => (
                                        <Option value={vendorName}>{vendorName}</Option>
                                    ))}
                           
                                </Select>}

                                </Form.Item>
                            </Col>
                            
                            <Col xs={24} md={12} lg={6}>
                            <Form.Item name="orderType" rules={[{ required: true }]}>
                                {orderType.orderType && <Select
                                mode="multiple"
                                size={'medium'}
                                maxTagCount= {3}
                                placeholder="Select Order Type"
                                style={{ width: '100%' }}
                                onChange={changeOrderType}
                              
                                >
                                    {orderType.orderType.split(',').map(vendorName => (
                                        <Option value={vendorName}>{vendorName}</Option>
                                    ))}
                           
                                </Select>}

                                </Form.Item>
                            </Col>

                            

                            <Col xs={24}>

                            <Button key="1" type="primary" size="default" htmlType="submit" style={{marginRight:15,}}>
                                Search
                           </Button>
        
                           

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
                                <Table pagination={true} dataSource = {state.dataSource} columns={columns} />
                            </div>

                        </ProjectList>
                    </Cards>
                </Col>

            </Row>
        </div>
    </Spin>
    );
};

export default SummaryReport;
