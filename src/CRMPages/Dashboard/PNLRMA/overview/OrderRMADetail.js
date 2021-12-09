import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiOrderRMADetail} from '../../../../redux/apis/DataAction';
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




const OrderRMADetail = (props) => {

    const {downloadFileDataLink,orderdatefrom,orderdateto,dateFormat, isSearchPressed, activeTab, onDispatchComplete}= props
    // // console.log('dataSourceOrder',dataSourceOrder)
    const formatedate = (value) => {
   
      let a = 'avsdFasdas'
      let formatedDate = value.split("T")
      let Date =formatedDate[0];
      let Time =formatedDate[1].split(".");
       Time=Time[0]
       let format=Date+' '+Time
      return Date
      }
      
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[],
    dataSource:[],
    orderdatetoCheck:'todate',
    orderdatefromCheck:'fromdate',
    dataDownloadLinkOrderRMADetail:''
  });

  const {dataDownloadLinkOrderRMADetail,orderdatetoCheck,orderdatefromCheck,dateFomat,sortedInfo,isLoader,dataSourceOrderTemp,dataSource}=state

  useEffect(() => {


    if(isSearchPressed && activeTab === 'OrderRMADetail'&& (orderdatetoCheck!==orderdateto ||orderdatefromCheck!==orderdatefrom) ){
     
      setState({ ...state, isLoader: true })
     
      dispatch(apiOrderRMADetail({ orderdateto: orderdateto, orderdatefrom:orderdatefrom})).then(data => {
       
          console.log(data)
          downloadFileDataLink(data[0])

          let tempDataSource =[]
         data[1].map(value=>{
           const{orderno,orderdate,Rmadate,ordertype,ponumber,vendorname,orderstatus,RMASTATUS,pono,postatus,RMAAMOUNT,NOTES,reason,ordernotes}=value
           
            tempDataSource.push({
              orderno:orderno,
              orderdate:formatedate(orderdate),
              Rmadate:formatedate(Rmadate),
              ordertype:ordertype,
              ponumber:ponumber,
              vendorname:vendorname,
              orderstatus:orderstatus,
              RMASTATUS:RMASTATUS,
              pono:pono,
              postatus:postatus,
              RMAAMOUNT:RMAAMOUNT,
              NOTES:NOTES,
              reason:reason,
              ordernotes:ordernotes

            })         

          })
       
           setState({ ...state,dataDownloadLinkOrderRMADetail:data[0], isLoader: false,dataSource:tempDataSource,orderdatetoCheck:orderdateto,orderdatefromCheck:orderdatefrom })
          // onDispatchComplete()
      })
    
    }
    else if (activeTab === 'OrderRMADetail')
    {
      downloadFileDataLink(dataDownloadLinkOrderRMADetail)
    }
 
  }, [isSearchPressed,activeTab,orderdateto,orderdatefrom])

  const columns = [
    {
      title: 'Orderno',
      dataIndex: 'orderno',
      key: 'orderno'
    },
    {
      title: 'Orderdate',
      dataIndex: 'orderdate',
      key:  'orderdate'
    },
    {
      title: 'Rmadate',
      dataIndex: 'Rmadate',
      key: 'Rmadate'
    },
    {
      title: 'Ordertype',
      dataIndex: 'ordertype',
      key: 'ordertype'
    },
    {
      title: 'OrderID',
      dataIndex: 'ponumber',
      key: 'ponumber'
    },
    {
      title: 'VendorName',
      dataIndex: 'vendorname',
      key: 'vendorname'
    },
    {
      title: 'OrderStatus',
      dataIndex: 'orderstatus',
      key: 'orderstatus'
    },
    {
      title: 'RmaStatus',
      dataIndex: 'RMASTATUS',
      key: 'RMASTATUS'
    },
     {
      title: 'Pono',
      dataIndex: 'pono',
      key: 'pono'
    },
    {
      title: 'Postatus',
      dataIndex: 'postatus',
      key: 'postatus'
    }
    ,
    {
      title: 'RmaAmount',
      dataIndex: 'RMAAMOUNT',
      key: 'RMAAMOUNT'
    },
    {
      title: 'Notes',
      dataIndex: 'NOTES',
      key: 'NOTES'
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason'
    },
    {
      title: 'OrderNotes',
      dataIndex: 'ordernotes',
      key: 'ordernotes'
    }
  ];
  

  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setState({...state,
     
      sortedInfo: sorter,
    });
  };
  
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
         <Cards headless>
                      

                            <div className="table-responsive">
                                <Table pagination={true} dataSource={dataSource} columns={columns} />
                            </div>

                    </Cards>
      
    </Spin>
  );

};

export default OrderRMADetail
