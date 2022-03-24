import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import {  apiOverAllRMAQty } from '../../../../redux/apis/DataAction';
import './style.css';




const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
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




const RMAQty = (props) => {

  const { downloadFileDataLink, orderdatefrom, orderdateto, dateFormat, isSearchPressed, activeTab, onDispatchComplete } = props
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setState] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSourceOrderTemp: [],
    dataSourceSingle: [],
    dataSourceYear: [],
    orderdatetoCheck: 'todate',
    orderdatefromCheck: 'fromdate',
    dataDownloadLinkRMAQty: '',
    dateFormatCurrent: '',
    dataDownloadLinkRMAQtySingle:'',
    dataDownloadLinkRMAQtyYear:''


  });

  const {dataDownloadLinkRMAQtyYear,dataDownloadLinkRMAQtySingle,dateFormatCurrent, dataDownloadLinkRMAQty, orderdatetoCheck, orderdatefromCheck, dateFomat, sortedInfo, isLoader, dataSourceOrderTemp, dataSourceSingle, dataSourceYear } = state

  useEffect(() => {

    if (isSearchPressed && activeTab === 'Over All Rma Qty'  && (orderdatetoCheck !== orderdateto || orderdatefromCheck !== orderdatefrom ||dateFormatCurrent!==dateFormat ))
     {
      if ( (orderdatetoCheck !== orderdateto || orderdatefromCheck !== orderdatefrom ||dataSourceSingle.length<1 ))
       {
    
        setState({ ...state, isLoader: true })
        dispatch(apiOverAllRMAQty({ orderdateto: orderdateto, orderdatefrom: orderdatefrom })).then(data => {
          //  console.log(data[1])
          downloadFileDataLink(data[0])
          let tempYearData = (orderdatetoCheck !== orderdateto || orderdatefromCheck !== orderdatefrom) ? [] : dataSourceYear          
          setState({ ...state, dateFormatCurrent: dateFormat, dataDownloadLinkRMAQtySingle: data[0], isLoader: false, dataSourceYear: tempYearData ,dataSourceSingle: data[1], orderdatetoCheck: orderdateto, orderdatefromCheck: orderdatefrom })
         
        })
      }
     
      else if (activeTab === 'ReportRMAQty') 
      {
       
          downloadFileDataLink(dataDownloadLinkRMAQtySingle)
        
      }
    }
    else if (activeTab === 'ReportRMAQty')
     {
     
        downloadFileDataLink(dataDownloadLinkRMAQtySingle)
      
    }


  }, [isSearchPressed, activeTab, orderdateto, orderdatefrom, dateFormat])

  const columns = [   
 
    {
    title: 'MerchantSku',
    dataIndex: 'merchantsku',
    key: 'merchantsku'
  },
  {
    title: 'PUstatus',
    dataIndex: 'pustatus',
    key: 'pustatus'

  },
  {
    title: 'Walmartstatus',
    dataIndex: 'wallmartstatus',
    key: 'wallmartstatus'

  }, {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost'

  },
  {
    title: 'Vendor Status',
    dataIndex: 'vendorstatus',
    key: 'vendorstatus'

  },

  {
    title: 'Brandname',
    dataIndex: 'brandname',
    key: 'brandname'

  },
  {
    title: 'Vendorname',
    dataIndex: 'vendorname',
    key: 'vendorname'

  },
  {
    title: 'vendorstylecode',
    dataIndex: 'vendorstylecode',
    key: 'vendorstylecode'
  },
 
  {
    title: 'colorname',
    dataIndex: 'colorname',
    key: 'colorname'
  },
  {
    title: 'colorcode',
    dataIndex: 'colorcode',
    key: 'colorcode'
  },
  {
    title: 'sizename',
    dataIndex: 'sizename',
    key: 'sizename'
  },
  {
    title: 'ItemCount',
    dataIndex: 'Order_count',
    key: 'Order_count',
    defaultSortOrder: 'descend',
    sorter: (c, d) => c.Order_count - d.Order_count,
    sortOrder: sortedInfo.columnKey === 'Order_count' && sortedInfo.order,
  },
  {
    title: 'RMACount',
    dataIndex: 'RMA_count',
    key: 'RMA_count',
    defaultSortOrder: 'descend',
    sorter: (c, d) => c.RMA_count - d.RMA_count,
    sortOrder: sortedInfo.columnKey === 'RMA_count' && sortedInfo.order,
  }
  ];



  const handleChange = (pagination, filters, sorter) => {
    setState({
      ...state,

      sortedInfo: sorter,
    });
  };

  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
      <Cards headless>


        <div className="table-responsive">
          <Table pagination={true} dataSource={dataSourceSingle} columns={columns} onChange={handleChange} />
        </div>

      </Cards>

    </Spin>
  );

};

export default RMAQty
