import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryReportOrderWise } from '../../../../redux/apis/DataAction';


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




const OrderPNLSummary = (props) => {

  const { dataSourceOrdersummary, dataSourceOrdersummaryTempParent, onAddOrder, activeTab } = props
 // console.log('orderPNLSumamry', dataSourceOrdersummaryTempParent)
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setstate] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSourceOrdersummaryTemp: [],
  });

  const { sortedInfo, isLoader, dataSourceOrdersummaryTemp } = state
  
  useEffect(() => {
    console.log('asdasasd', dataSourceOrdersummaryTempParent)
    if(activeTab==='OrderPNLSummary'&&dataSourceOrdersummaryTempParent&&dataSourceOrdersummaryTempParent.length>0){
    setstate({ ...state, dataSourceOrdersummaryTemp: dataSourceOrdersummaryTempParent });
    let order = []
  let loss = []
  let profit = []
  for(let i=0; i<dataSourceOrdersummaryTempParent.length; i++){

      if(order.filter(value=>value.ORDERTYPE===dataSourceOrdersummaryTempParent[i].ORDERTYPE).length<=0){
        order.push(dataSourceOrdersummaryTempParent[i])
      }
      else{
        let indexTemp = order.findIndex(item=>item.ORDERTYPE===dataSourceOrdersummaryTempParent[i].ORDERTYPE)
        order[indexTemp] = {...order[indexTemp], order_count:order[indexTemp].order_count+dataSourceOrdersummaryTempParent[i].order_count}
      }

      if(loss.filter(value=>value.ORDERTYPE===dataSourceOrdersummaryTempParent[i].ORDERTYPE).length<=0){
        loss.push(dataSourceOrdersummaryTempParent[i])
        }
        else{
          let indexTemp = loss.findIndex(item=>item.ORDERTYPE===dataSourceOrdersummaryTempParent[i].ORDERTYPE)
          loss[indexTemp] = {...loss[indexTemp], loss:loss[indexTemp].loss+dataSourceOrdersummaryTempParent[i].loss}
        }

      if(profit.filter(value=>value.ORDERTYPE===dataSourceOrdersummaryTempParent[i].ORDERTYPE).length<=0){
        profit.push(dataSourceOrdersummaryTempParent[i])
        }
        else{
          let indexTemp = profit.findIndex(item=>item.ORDERTYPE===dataSourceOrdersummaryTempParent[i].ORDERTYPE)
          profit[indexTemp] = {...profit[indexTemp], profit:profit[indexTemp].profit+dataSourceOrdersummaryTempParent[i].profit}
        }

      
      }
     
      onAddOrder({ order: order, loss: loss, profit: profit })
 
    }
 

  }, [activeTab,dataSourceOrdersummaryTempParent]);

  const filter = (value) => {
    var val = [];
    let placeholder = ``;

    return <Input
      placeholder={placeholder}
      size='small'
      onChange={e => {

        temp = [...temp, ...dataSourceOrder.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]

        setState({ ...state, dataSourceOrderTemp: temp });

      }}
    />
  }

  const columns = [
    {
      title: 'Vendorname',
      dataIndex: 'vendorname',
      key: 'vendorname',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.vendorname - d.vendorname,
      sortOrder: sortedInfo.columnKey === 'vendorname' && sortedInfo.order,
    },
    {
      title: 'Order count',
      dataIndex: 'order_count',
      key: 'order_count',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.order_count - d.order_count,
      sortOrder: sortedInfo.columnKey === 'order_count' && sortedInfo.order,
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.profit - d.profit,
      sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
    },
    {
      title: 'Loss',
      dataIndex: 'loss',
      key: 'loss',

      defaultSortOrder: 'descend',
      sorter: (c, d) => c.loss - d.loss,
      sortOrder: sortedInfo.columnKey === 'loss' && sortedInfo.order,
    },
    {
      title: 'Percentge',
      dataIndex: 'percentge',
      key: 'percentge',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.percentge - d.percentge,
      sortOrder: sortedInfo.columnKey === 'percentge' && sortedInfo.order,
    }

  ];

  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>


        <Row >
          <Col xs={24}>
            <Cards headless>
              {/* <ProjectList> */}

              {/* <div className="table-responsive"> */}
              <Table pagination={false} dataSource={dataSourceOrdersummaryTemp} columns={columns} onChange={handleChange} />
              {/* </div> */}

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default OrderPNLSummary
