import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiReplacmentQty } from '../../../../redux/apis/DataAction';
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




const ReplacmentOrder = (props) => {

    const {downloadFileDataLink,orderdatefrom,orderdateto, isSearchPressed, activeTab, onDispatchComplete}= props
    // // console.log('dataSourceOrder',dataSourceOrder)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSource:[],
    orderdatetoCheck:'todate',
    orderdatefromCheck:'fromdate'
    
  });

  const {orderdatetoCheck,orderdatefromCheck,sortedInfo,isLoader,dataSource}=state

useEffect(()=>{
  console.log('aaaa',isSearchPressed,activeTab,orderdatetoCheck,orderdatefromCheck, orderdatefrom,orderdateto)
  if(isSearchPressed && activeTab === 'ReplacmentOrder'&&(orderdatetoCheck!==orderdateto ||orderdatefromCheck!==orderdatefrom)){

    setState({ ...state, isLoader: true })
dispatch(apiReplacmentQty({orderdateto: orderdateto, orderdatefrom:orderdatefrom})).then(data=>{
   
  downloadFileDataLink(data[0])
        
  setState({ ...state, isLoader: false,dataSource:data[1] ,orderdatetoCheck:orderdateto,orderdatefromCheck:orderdatefrom })

  //onDispatchComplete()
})
  }
},[isSearchPressed,activeTab,orderdateto,orderdatefrom])

const handleChange = (pagination, filters, sorter) =>  {
  // console.log('Various parameters', pagination, filters, sorter);
  setState({...state,
   
    sortedInfo: sorter,
  });
};

  const columns = [
    {
      title: 'vendorstylecode',
      dataIndex: 'vendorstylecode',
      key: 'vendorstylecode'
    },
    {
      title: 'stylecode',
      dataIndex: 'stylecode',
      key: 'stylecode'
 
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
      title: 'ItemQty',
      dataIndex: 'ItemQty',
      key: 'ItemQty',
       defaultSortOrder: 'descend',
      sorter: (c, d) => c.ItemQty - d.ItemQty,
      sortOrder: sortedInfo.columnKey === 'ItemQty' && sortedInfo.order,
    }
  ];
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
     <Cards headless>
                      

                      <div className="table-responsive">
                          <Table pagination={true} dataSource={dataSource} columns ={columns} onChange={handleChange} />
                      </div>

              </Cards>

      
    </Spin>
  );

};

export default ReplacmentOrder
