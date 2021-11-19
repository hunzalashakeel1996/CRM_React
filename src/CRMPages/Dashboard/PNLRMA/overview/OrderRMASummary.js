import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiOrderRMASummary} from '../../../../redux/apis/DataAction';
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




const OrderRMASummary = (props) => {

    const {onAddRMAOrder,downloadFileDataLink,orderdatefrom,orderdateto,dateFormat, isSearchPressed, activeTab, onDispatchComplete}= props
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
    console.log('aaaa', activeTab)

    if(isSearchPressed && activeTab === 'OrderRMASummary'&&(orderdatetoCheck!==orderdateto ||orderdatefromCheck!==orderdatefrom)){
     
      setState({ ...state, isLoader: true })
     
      dispatch(apiOrderRMASummary({ orderdateto: orderdateto, orderdatefrom:orderdatefrom})).then(data => {
       
         console.log(data)
          downloadFileDataLink(data[0])
            let tempDataSource =[]
            data[1].map(value=>{
              const{ordertype,orderCount,RMA,Open,Process,Closed}=value

              tempDataSource.push({
                ordertype:ordertype,
                orderCount:orderCount,              
                RMA:RMA,
                percentage:`${Math.round((RMA/orderCount*100)*100)/100}%`,
                Open:Open,
                Process:Process,
                Closed:Closed,
               
              
  
              })      

            })

           setState({ ...state, isLoader: false,dataSource:tempDataSource,orderdatetoCheck:orderdateto,orderdatefromCheck:orderdatefrom  })
           onAddRMAOrder(data[1])
         //  onDispatchComplete()
      })
    
    }
    else if (activeTab === 'OrderRMASummary')
    {
      onAddRMAOrder(dataSource)
    }

  }, [isSearchPressed,activeTab,orderdateto,orderdatefrom])

  const columns = [
    {
      title: 'Ordertype',
      dataIndex: 'ordertype',
      key: 'ordertype'
    },{
      title: 'OrderCount',
      dataIndex: 'orderCount',
      key: 'orderCount'
 
    },{
      title: 'RMAOrderCount',
      dataIndex: 'RMA',
      key: 'RMA'
 
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage'
 
    },
    {
      title: 'Open',
      dataIndex: 'Open',
      key: 'Open'
    },
    {
      title: 'Process',
      dataIndex: 'Process',
      key: 'Process'
    },
    {
      title: 'Closed',
      dataIndex: 'Closed',
      key: 'Closed'
    }
  ];
 
  
  const findTotalValues = (data) => {
    let Rmaorder = []
    let Open = []
    let Process = []
    let Close = []
    console.log(data)
    for (let i = 0; i < data.length; i++) {

      if (Rmaorder.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        Rmaorder.push(data[i])
      }
      else {
        let indexTemp = Rmaorder.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        Rmaorder[indexTemp] = { ...Rmaorder[indexTemp], Rmaorder: Rmaorder[indexTemp].RMA + data[i].RMA }
      }

      if (Open.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {

        let tempItemSummary = { ...data[i], Open: data[i].Open }
        Open.push(tempItemSummary)
      }
      else {
        let indexTemp = Open.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)

        Open[indexTemp] = { ...Open[indexTemp], Open: Open[indexTemp].Open + data[i].Open }

      }

      if (Process.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {

        let tempItemSummary = { ...data[i], Process: data[i].Process }
        Process.push(tempItemSummary)
      }
      else {
        let indexTemp = Process.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        Process[indexTemp] = { ...Process[indexTemp], Process: Process[indexTemp].Process + data[i].Process }
      }

      if (Close.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {

        let tempItemSummary = { ...data[i], Close: data[i].Close }
        Close.push(tempItemSummary)
      }
      else {
        let indexTemp = Close.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        Close[indexTemp] = { ...Close[indexTemp], Close: Close[indexTemp].Close + data[i].Close }
      }

    }

    onAddRMAOrder({ Rmaorder, Open, Process,Close, data })
  }


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

export default OrderRMASummary
