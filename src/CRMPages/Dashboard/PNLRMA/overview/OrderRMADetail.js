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
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[],
    dataSource:[],
    orderdatetoCheck:'todate',
    orderdatefromCheck:'fromdate'
    
  });

  const {orderdatetoCheck,orderdatefromCheck,dateFomat,sortedInfo,isLoader,dataSourceOrderTemp,dataSource}=state

  useEffect(() => {


    if(isSearchPressed && activeTab === 'OrderRMADetail'&& (orderdatetoCheck!==orderdateto ||orderdatefromCheck!==orderdatefrom) ){
     
      setState({ ...state, isLoader: true })
     
      dispatch(apiOrderRMADetail({ orderdateto: orderdateto, orderdatefrom:orderdatefrom})).then(data => {
       
         console.log(data)
          downloadFileDataLink(data[0])
        
           setState({ ...state, isLoader: false,dataSource:data[1],orderdatetoCheck:orderdateto,orderdatefromCheck:orderdatefrom })
          // onDispatchComplete()
      })
    
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
      key: 'orderdate'
 
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
      title: 'PoNumber',
      dataIndex: 'ponumber',
      key: 'ponumber'
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
      title: 'OrderNotes',
      dataIndex: 'ordernotes',
      key: 'ordernotes'
    }
    ,
    {
      title: 'RmaAmount',
      dataIndex: 'RMAAMOUNT',
      key: 'RMAAMOUNT'
    } ,
    {
      title: 'VendorName',
      dataIndex: 'vendorname',
      key: 'vendorname'
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
      title: 'Pono',
      dataIndex: 'pono',
      key: 'pono'
    },
    {
      title: 'Postatus',
      dataIndex: 'postatus',
      key: 'postatus'
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
