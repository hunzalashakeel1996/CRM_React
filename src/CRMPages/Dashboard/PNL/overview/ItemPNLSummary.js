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




const ItemPNLSummary = (props) => {
    const {dataSourceItemsummary,dataSourceItemsummaryTempParent,onAddItem, activeTab}= props
   //  console.log('ItemPNL',dataSourceItemsummaryTempParent)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setstate] = useState({
   
    sortedInfo:[],
    dataSource:[],
    isLoader:false,
    dataSourceOrdersummaryTemp:[]
  });

  const {sortedInfo,isLoader,dataSourceOrdersummaryTemp}=state
  useEffect(() => {
    if(activeTab==='ItemPNLSummary'&&dataSourceItemsummaryTempParent.length>0){

    setstate({ ...state, dataSourceOrdersummaryTemp: dataSourceItemsummaryTempParent});
    let order = []
    let loss = []
    let profit = []
    for(let i=0; i<dataSourceItemsummaryTempParent.length; i++){
  
        if(order.filter(value=>value.ORDERTYPE===dataSourceItemsummaryTempParent[i].ORDERTYPE).length<=0){
          order.push(dataSourceItemsummaryTempParent[i])
        }
        else{
          let indexTemp = order.findIndex(item=>item.ORDERTYPE===dataSourceItemsummaryTempParent[i].ORDERTYPE)
          order[indexTemp] = {...order[indexTemp], Item_count:order[indexTemp].Item_count+dataSourceItemsummaryTempParent[i].Item_count}
        }
  
        if(loss.filter(value=>value.ORDERTYPE===dataSourceItemsummaryTempParent[i].ORDERTYPE).length<=0){
          loss.push(dataSourceItemsummaryTempParent[i])
          }
          else{
            let indexTemp = loss.findIndex(item=>item.ORDERTYPE===dataSourceItemsummaryTempParent[i].ORDERTYPE)
            loss[indexTemp] = {...loss[indexTemp], Total_item_loss:loss[indexTemp].Total_item_loss+dataSourceItemsummaryTempParent[i].Total_item_loss}
          }
  
        if(profit.filter(value=>value.ORDERTYPE===dataSourceItemsummaryTempParent[i].ORDERTYPE).length<=0){
          profit.push(dataSourceItemsummaryTempParent[i])
          }
          else{
            let indexTemp = profit.findIndex(item=>item.ORDERTYPE===dataSourceItemsummaryTempParent[i].ORDERTYPE)
            profit[indexTemp] = {...profit[indexTemp], Total_item_profit:profit[indexTemp].Total_item_profit+dataSourceItemsummaryTempParent[i].Total_item_profit}
          }
  
        
        }
       
        onAddItem({ order: order, loss: loss, profit: profit })
      }
    
  },[activeTab,dataSourceItemsummaryTempParent]);

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
      title: 'Item count',
      dataIndex: 'Item_count',
      key: 'Item_count',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Item_count - d.Item_count,
      sortOrder: sortedInfo.columnKey === 'Item_count' && sortedInfo.order,
    },
    {
      title: 'Total Item Profit',
      dataIndex: 'Total_item_profit',
      key: 'Total_item_profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Total_item_profit - d.Total_item_profit,
      sortOrder: sortedInfo.columnKey === 'Total_item_profit' && sortedInfo.order,
    },
    {
      title: 'Total Item Loss',
      dataIndex: 'Total_item_loss',
      key: 'Total_item_loss',
        
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Total_item_loss - d.Total_item_loss,
      sortOrder: sortedInfo.columnKey === 'Total_item_loss' && sortedInfo.order,
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
                  <Table pagination={false} dataSource={dataSourceOrdersummaryTemp} columns={columns} onChange={handleChange}/>
                {/* </div> */}

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default ItemPNLSummary
