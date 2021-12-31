import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/buttons/buttons';

import OverAllSummary from './overview/OverAllSummary';
import ProfitBeforePPS from './overview/ProfitBeforePPS';

import { Cards } from '../../../components/cards/frame/cards-frame';

import { downloadFile, downloadFileTableData } from '../../../components/utilities/utilities'
import { apiReportOrderWise, apiReportItemWise, apiSummaryReportOrderWise, apiSummaryReportItemWise, apiSummaryReportPriceWise, apiSummaryReportDetailWise } from '../../../redux/apis/DataAction';
import './overview/style.css';


const { TabPane } = Tabs;
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



const ViewReportPNLOverAll = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

  const tabChildBar = JSON.parse(userAccess.top_navigation)['Report OverAll'];
  const [downloadDataLink, setDownloadDataLink] = useState('Profit Before PPS');
  const [activeTab, setActiveTab] = useState('Profit Before PPS');
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  

  const [state, setstate] = useState({
    isLoader: false,

    dataSourcetotalOrders: 0,
    totalOrdersSum: 0,
    totalOrdersLoss: 0,
    totalOrdersProfit: 0,
    dateFormat: 'USPS',
    startDate: '',
    endDate: '',
    ordertypeParent:'',
    subOrderType:'',
    isSearchPressed:false



  });

  const {subOrderType,ordertypeParent,startDate,endDate,dataSourcePriceSummaryTempParentAll, dataSourceItemsummaryTempParentAll, dataSourceOrdersummaryTempParentAll, dataSourceOrderTempParentDownload, dataSourceItemTempParentDownload, dataSourceItemsummaryTempParentDownload, dataSourcePriceSummaryTempParentDownload, dataSourceItemsummaryTempParent, dataSourceOrdersummaryTempParentDownload, dateFormat, totalOrdersProfit, totalOrdersLoss, totalOrdersSum, dataSourcetotalOrders, dataSourcePriceSummary, dataPriceSummaryDownload, dataSourcePriceSummaryTempParent, dataSourceItemsummary, dataItemsummaryDownload, dataSourceOrdersummary, dataOrdersummaryDownload, dataSourceOrdersummaryTempParent, dataSourceOrderTempParent, dataSourceItemTempParent, filterValue, isSellerType, sellerType, dataOrderDownload, dataItemDownload, dataSourceOrder, isLoader, dataSourceItem, dataSourcePrice, dataSourceDetails, selectedFilter} = state


  
  const handleChange = (pagination, filters, sorter) => {
    setstate({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const onChange = (value, key) => {
    setstate({ ...state, [key]: value });

  };


  const topMenu = [
    {
      tab: 'SummaryOverAll',
      key: 'Item Summary OverAll',
      tabName: <OverAllSummary subOrderType={subOrderType} ordertypeParent={selectedFilter} dateFormat={dateFormat} selectedFilter={selectedFilter} activeTab={activeTab} onAddOrder={(value) => onSum(value)} downloadFileDataLink={(value,data)=>downloadFileDataLink(value,data)} setIsSearchPressed={setIsSearchPressed}  isSearchPressed={isSearchPressed}  dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate} orderdateto={endDate==''? '': endDate}/>
    },
 
    {
      tab: 'Profit Before PPS',
      key: 'Profit Before PPS',
      tabName: <ProfitBeforePPS subOrderType={subOrderType} ordertypeParent={selectedFilter} dateFormat={dateFormat} selectedFilter={selectedFilter} activeTab={activeTab} onAddItem={(value) => onSumItem(value)} downloadFileDataLink={(value,data)=>downloadFileDataLink(value,data)} setIsSearchPressed={setIsSearchPressed} isSearchPressed={isSearchPressed}  dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate} orderdateto={endDate==''? '': endDate}/>
    }
  ];


 
  const  downloadFileDataLink =(data)=>{
  
   

    setDownloadDataLink(data)

  }
  const download = (event) => {
    let activeTab = event
   
    if (activeTab === 'Item Summary OverAll') {
      downloadFile(downloadDataLink)

      //  downloadFileTableData(downloadDataLink, 'ReportRMAQty')
    }
    else if (activeTab === 'Profit Before PPS') {
      downloadFile(downloadDataLink)

      //  downloadFileTableData(downloadDataLink, 'ReportRMAQty')
    }


  }


  const handleChangeDateFormat = (value) => {

    setstate({ ...state, dateFormat: value })
  }


  return (
    <>
      {/* <h1>test</h1> */}
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >

        <Row style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          <Col span={24}>
            <Cards title="PNL Over All">
              <Row gutter={25}>
                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }} placeholder="Start date" size='small' onChange={(date) => { onChange(date, 'startDate') }} />

                </Col>

                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }}
                    placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                </Col>

                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>

                  <Select defaultValue={dateFormat} style={{ width: 180 }} onChange={handleChangeDateFormat}>

                    <Option value="USPS">USPS</Option>
                    <Option value="Order">Order</Option>

                  </Select>
                </Col>


              </Row>

              <Row>
                <Col xs={24} style={{ marginBottom: 10 }}>
                  {/* <Button size="large" type="primary" onClick={getsummary_report_order_wise} style={{ marginRight: 10, }} > Search</Button> */}
                  <Button size="large" type="primary" onClick={() => {setIsSearchPressed(true) }} style={{ marginRight: 10, }} > Search</Button> 
                  {/* {console.log('dataSourceOrdersummary.length',dataSourceOrdersummary.length)} */}
                   <Button size="large" type="success"
                    onClick={(value) => { download(activeTab) }} >
                    Download
                  </Button>
                </Col>
              </Row>

           

            </Cards>
          </Col>

        </Row>

        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20 }}>


          {topMenu.map(item => (
            tabChildBar?.includes(item.tab) && (

              <TabPane tab={item.key} key={item.key}>

                {item.tabName}
              </TabPane>

            )

          ))}


        </Tabs>

      </Spin >


    </>
  );
};

export default ViewReportPNLOverAll;