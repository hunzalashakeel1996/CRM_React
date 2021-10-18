import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiRMAQty } from '../../../../redux/apis/DataAction';
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

    const {orderdatefrom,orderdateto,dateFormat, isSearchPressed, activeTab, onDispatchComplete}= props
    // // console.log('dataSourceOrder',dataSourceOrder)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[]
    
  });

  const {dateFomat,sortedInfo,isLoader,dataSourceOrderTemp}=state

  useEffect(() => {
    console.log('aaaa', activeTab)
    if(isSearchPressed && activeTab === 'ReportRMAQty'){
      console.log(dateFormat,orderdateto,orderdatefrom)
      setState({ ...state, isLoader: true })
      dispatch(apiRMAQty({ dateFormat: dateFormat,orderdateto: orderdateto, orderdatefrom:orderdatefrom})).then(data => {
           console.log(data)
           setState({ ...state, isLoader: false })
          onDispatchComplete()
      })
     
    }
  }, [isSearchPressed])

  const getRMAQty = () => {
  

};
 
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      
    </Spin>
  );

};

export default RMAQty
