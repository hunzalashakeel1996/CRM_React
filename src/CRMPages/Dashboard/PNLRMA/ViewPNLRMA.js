import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/buttons/buttons';

import ReplacmentOrder from './overview/ReplacmentOrder';
import RMAQty from './overview/RMAQty';
import OrderRMASummary from './overview/OrderRMASummary';
import ItemRMASummary from './overview/ItemRMASummary';
import OrderRMADetail from './overview/OrderRMADetail';
import ItemRMADetail from './overview/ItemRMADetail';
import { Cards } from '../../../components/cards/frame/cards-frame';

import { downloadFile, downloadFileTableData } from '../../../components/utilities/utilities'
import {apiRMAQty, apiTrackingSummaryFetch} from '../../../redux/apis/DataAction';
// import { webURL, audioPlay, uploadUrl, getVendorName, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getInventoryapi, getInventoryWalmart_all_otherapi, getInventoryWalmartapi, getEbayqtyapi, getSearsqtyapi, getSears_all_otherapi, getWallMartCAqtyapi, getwalmartCA_all_otherapi, getSearsPriceapi, getPriceWalmartapi } from '../../../redux/apis/DataAction';



const { TabPane } = Tabs;
const dateFormat = 'Single';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];




const ViewPNLRMA = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

  const tabChildBar = JSON.parse(userAccess.top_navigation)['Report RMA PNL'];
  // console.log(tabChildBar)
  const [activeTab, setActiveTab] = useState('ReplacmentOrder');
  const [isSearchPressed, setIsSearchPressed] = useState(false);

  const [state, setstate] = useState({

    isLoader: false,
    dateFormat: 'Year',
    startDate: '',
    endDate: '',
    downloadDataLink:'',

  });
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const {downloadDataLink,isLoader,dateFormat, startDate, endDate} = state


  const topMenu = [
    
    {
      tab: 'Replacement Order',
      key: 'ReplacmentOrder',
      tabName: <ReplacmentOrder downloadFileDataLink={(value)=>downloadFileDataLink(value)} isSearchPressed={isSearchPressed} activeTab={activeTab} orderdatefrom={startDate==''?'':startDate.format('MM/DD/YYYY')} orderdateto={endDate==''? '': endDate.format('MM/DD/YYYY')}/>

    }
    ,
    {
      tab: 'Report RMA Qty',
      key: 'ReportRMAQty',
      tabName: <RMAQty downloadFileDataLink={(value)=>downloadFileDataLink(value)}  isSearchPressed={isSearchPressed} activeTab={activeTab} dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate.format('MM/DD/YYYY')} orderdateto={endDate==''? '': endDate.format('MM/DD/YYYY')}/>

    },
    {
      tab: 'Order RMA Summary',
      key: 'OrderRMASummary',
      tabName: <OrderRMASummary downloadFileDataLink={(value)=>downloadFileDataLink(value)} isSearchPressed={isSearchPressed} activeTab={activeTab} dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate.format('MM/DD/YYYY')} orderdateto={endDate==''? '': endDate.format('MM/DD/YYYY')}/>

    }
    ,
    {
      tab: 'Item RMA Summary',
      key: 'ItemRMASummary',
      tabName: <ItemRMASummary downloadFileDataLink={(value)=>downloadFileDataLink(value)}  isSearchPressed={isSearchPressed} activeTab={activeTab} dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate.format('MM/DD/YYYY')} orderdateto={endDate==''? '': endDate.format('MM/DD/YYYY')}/>

    }
    ,
    {
      tab: 'Order RMA Detail',
      key: 'OrderRMADetail',
      tabName: <OrderRMADetail downloadFileDataLink={(value)=>downloadFileDataLink(value)}  isSearchPressed={isSearchPressed} activeTab={activeTab} dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate.format('MM/DD/YYYY')} orderdateto={endDate==''? '': endDate.format('MM/DD/YYYY')}/>

    }
    ,
    {
      tab: 'Item RMA Detail',
      key: 'ItemRMADetail',
      tabName: <ItemRMADetail downloadFileDataLink={(value)=>downloadFileDataLink(value)}  isSearchPressed={isSearchPressed} activeTab={activeTab} dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate.format('MM/DD/YYYY')} orderdateto={endDate==''? '': endDate.format('MM/DD/YYYY')}/>

    }
  ];
  const  downloadFileDataLink =(data)=>{
  
    setstate({...state, downloadDataLink: data})

  }

  const handleChangeDateFormat = (value) => {


    setstate({ ...state, dateFormat: value })
  }
  const download = (event) => {
    let activeTab = event
    console.log(activeTab)
    if (activeTab === 'ReportRMAQty') {
       downloadFile(downloadDataLink)

    //  downloadFileTableData(downloadDataLink, 'ReportRMAQty')
    }
    else if (activeTab === 'ItemPNL') {
       downloadFile(dataItemDownload)
      //downloadFileTableData(dataSourceItemTempParent, 'ItemPNL')
    }
    else if (activeTab === 'ItemRMASummary') {
      downloadFile(downloadDataLink)
     //downloadFileTableData(dataSourceItemTempParent, 'ItemPNL')
   }
   else if (activeTab === 'OrderRMASummary') {
    downloadFile(downloadDataLink)
   //downloadFileTableData(dataSourceItemTempParent, 'ItemPNL')
 }


  }

  const onSearch = () => {

  }
  return (
    <>
      {/* <h1>test</h1> */}
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
      <Row style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          <Col span={24}>
            <Cards title="PNL Report RMA">
              <Row gutter={25}>
                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }} placeholder="Start date" size='small' onChange={(date) => { onChange(date, 'startDate') }} />

                </Col>

                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }}
                    placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                </Col>

               {activeTab ==='ReportRMAQty' && <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>

                  <Select defaultValue={dateFormat} style={{ width: 180 }} onChange={handleChangeDateFormat}>

                    <Option value="Year">Year</Option>
                    <Option value="Single">Single</Option>

                  </Select>
                </Col>}

              </Row>


              <Row>
                <Col xs={24} style={{ marginBottom: 10 }}>
                  <Button size="large" type="primary" style={{ marginRight: 10, }} onClick={() => {setIsSearchPressed(true) }}> Search</Button>

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

              <TabPane tab={item.tab} key={item.key}>

                {item.tabName}
              </TabPane>

            )

          ))}


        </Tabs>

      </Spin >


    </>
  );
};

export default ViewPNLRMA;