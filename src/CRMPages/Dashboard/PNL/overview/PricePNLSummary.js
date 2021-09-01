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




const PricePNLSummary = (props) => {

    const {dataSourcePriceSummary,dataSourcePriceSummaryTempParent,onAddPrice, activeTab}= props
  //  console.log('PricePNL',dataSourcePriceSummaryTempParent)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setstate] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrdersummaryTemp:[]
  });

  const {sortedInfo,isLoader,dataSourcePricesummaryTemp}=state
  useEffect(() => { 
    if(activeTab==='PricePNLSummary' && dataSourcePriceSummaryTempParent.length>0){
    let order = []
    let loss = []
    let profit = []
    for(let i=0; i<dataSourcePriceSummaryTempParent.length; i++){
  
        if(order.filter(value=>value.ORDERTYPE===dataSourcePriceSummaryTempParent[i].ORDERTYPE).length<=0){
          order.push(dataSourcePriceSummaryTempParent[i])
        }
        else{
          let indexTemp = order.findIndex(item=>item.ORDERTYPE===dataSourcePriceSummaryTempParent[i].ORDERTYPE)
          order[indexTemp] = {...order[indexTemp], TotalAmont:order[indexTemp].TotalAmont+dataSourcePriceSummaryTempParent[i].TotalAmont}
        }
  
        if(loss.filter(value=>value.ORDERTYPE===dataSourcePriceSummaryTempParent[i].ORDERTYPE).length<=0){
          loss.push(dataSourcePriceSummaryTempParent[i])
          }
          else{
            let indexTemp = loss.findIndex(item=>item.ORDERTYPE===dataSourcePriceSummaryTempParent[i].ORDERTYPE)
            loss[indexTemp] = {...loss[indexTemp], loss:loss[indexTemp].loss+dataSourcePriceSummaryTempParent[i].loss}
          }
  
        if(profit.filter(value=>value.ORDERTYPE===dataSourcePriceSummaryTempParent[i].ORDERTYPE).length<=0){
          profit.push(dataSourcePriceSummaryTempParent[i])
          }
          else{
            let indexTemp = profit.findIndex(item=>item.ORDERTYPE===dataSourcePriceSummaryTempParent[i].ORDERTYPE)
            profit[indexTemp] = {...profit[indexTemp], profit:profit[indexTemp].profit+dataSourcePriceSummaryTempParent[i].profit}
          }
  
        
        }
       
        onAddPrice({ order: order, loss: loss, profit: profit })
    setstate({ ...state, dataSourcePricesummaryTemp: dataSourcePriceSummaryTempParent});
      }
  },[activeTab,dataSourcePriceSummaryTempParent]);


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
      title: 'Total Amont',
      dataIndex: 'TotalAmont',
      key: 'TotalAmont',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.TotalAmont - d.TotalAmont,
      sortOrder: sortedInfo.columnKey === 'TotalAmont' && sortedInfo.order,
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

  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({...state,
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
                  <Table pagination={false} dataSource={dataSourcePricesummaryTemp} columns={columns} onChange={handleChange}/>
                {/* </div> */}

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default PricePNLSummary
