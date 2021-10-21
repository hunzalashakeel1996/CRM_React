import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/buttons/buttons';


import AllMPShipment from './overview/AllMPShipment';

import { Cards } from '../../../components/cards/frame/cards-frame';

import { downloadFile, downloadFileTableData } from '../../../components/utilities/utilities'
import {apiRMAQty} from '../../../redux/apis/DataAction';
// import { webURL, audioPlay, uploadUrl, getVendorName, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getInventoryapi, getInventoryWalmart_all_otherapi, getInventoryWalmartapi, getEbayqtyapi, getSearsqtyapi, getSears_all_otherapi, getWallMartCAqtyapi, getwalmartCA_all_otherapi, getSearsPriceapi, getPriceWalmartapi } from '../../../redux/apis/DataAction';



const { TabPane } = Tabs;
const dateFormat = 'Single';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];




const ViewAllMPShipment = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

  const tabChildBar = JSON.parse(userAccess.top_navigation)['All MP Shipment'];
  // console.log(tabChildBar)
  const [activeTab, setActiveTab] = useState('All MP Shipment');
  const [isSearchPressed, setIsSearchPressed] = useState(false);

  const [state, setstate] = useState({

    isLoader: false,
    dateFormat: 'Year',
    startDate: '',
    endDate: '',
    downloadDataLink:'',

  });


  const {downloadDataLink,isLoader,dateFormat, startDate, endDate} = state


  const topMenu = [
    
    {
      tab: 'All MP Shipment',
      key: 'All MP Shipment',
      tabName: <AllMPShipment />

    }
   
   
  ];
 
  

  const onSearch = () => {

  }
  return (
    <>
      {/* <h1>test</h1> */}
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
      

     
        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20,marginTop: 20, marginRight: 20 }}>


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

export default ViewAllMPShipment;