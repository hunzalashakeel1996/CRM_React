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
    
   // console.log('PricePNL',dataSourcePriceSummaryTempParent)
  let isOrderTypeShow = dataSourcePriceSummaryTempParent[0]&&dataSourcePriceSummaryTempParent[0].ORDERTYPE==undefined?true:false
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setstate] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrdersummaryTemp:[]
  });

  const {sortedInfo,isLoader,dataSourcePricesummaryTemp}=state

  useEffect(() => { 
    if(activeTab==='PricePNLSummary' && dataSourcePriceSummaryTempParent&& dataSourcePriceSummaryTempParent.length>0){
   

    setstate({ ...state, dataSourcePricesummaryTemp: dataSourcePriceSummaryTempParent});

    filterTotalValue(dataSourcePriceSummaryTempParent)
      }
  },[activeTab,dataSourcePriceSummaryTempParent]);

  const filterTotalValue =(data)=>{

    let order = []
    let loss = []
    let profit = []
    for(let i=0; i<data.length; i++){
  
        if(order.filter(value=>value.ORDERTYPE===data[i].ORDERTYPE).length<=0){
          let tempPriceSummary = {...data[i], TotalAmont:JSON.parse(data[i].TotalAmont.split('$')[1])}
          order.push(tempPriceSummary)
          // order.push(data[i])
        }
        else{
          let indexTemp = order.findIndex(item=>item.ORDERTYPE===data[i].ORDERTYPE)
          order[indexTemp] = {...order[indexTemp], TotalAmont:order[indexTemp].TotalAmont +JSON.parse(data[i].TotalAmont.split('$')[1]) }
          // order[indexTemp] = {...order[indexTemp], TotalAmont:order[indexTemp].TotalAmont+data[i].TotalAmont}
        }
  
        if(loss.filter(value=>value.ORDERTYPE===data[i].ORDERTYPE).length<=0){
          let tempPriceSummary = {...data[i], loss:data[i].loss}
          loss.push(tempPriceSummary)

          // loss.push(data[i])
          }
          else{
            let indexTemp = loss.findIndex(item=>item.ORDERTYPE===data[i].ORDERTYPE)
            loss[indexTemp] = {...loss[indexTemp], loss:loss[indexTemp].loss +data[i].loss }
            // loss[indexTemp] = {...loss[indexTemp], loss:loss[indexTemp].loss+data[i].loss}
          }
  
        if(profit.filter(value=>value.ORDERTYPE===data[i].ORDERTYPE).length<=0){
          let tempPriceSummary = {...data[i], profit:data[i].profit}
          profit.push(tempPriceSummary)

          // profit.push(data[i])
          }
          else{
            let indexTemp = profit.findIndex(item=>item.ORDERTYPE===data[i].ORDERTYPE)
            profit[indexTemp] = {...profit[indexTemp], profit:profit[indexTemp].profit +data[i].profit }
            // profit[indexTemp] = {...profit[indexTemp], profit:profit[indexTemp].profit+data[i].profit}
          }
  
        
        }
       
        onAddPrice({ order, loss, profit,data  })
  }
  const filter = (value) => {
   
    var val = [];
    let temp = []
    let placeholder = ``;

    return <Input
      placeholder={placeholder}
      size='small'
      onChange={e => {

        temp = [...temp, ...dataSourcePriceSummaryTempParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]
       
        filterTotalValue(temp)
        setstate({ ...state, dataSourcePricesummaryTemp: temp });

      }}
    />
  }

  const columns = [
    {  title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Vendorname</p>
      </div>,

      children: [
      {
        title: <>
        { filter('vendorname')}
        </>,
         dataIndex: 'vendorname',
         key: 'vendorname',
      },
     

        ]

      
    }, 
    {  title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>ORDERTYPE</p>
      </div>,

      children: [
      {
        title: <>
        { filter('ORDERTYPE')}
        </>,
         dataIndex: 'ORDERTYPE',
         key: 'ORDERTYPE',
      },
     

        ]

      
    }
    ,
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>TotalAmont</p>
      </div>,

      children: [
      {
        title: <>
        { filter('TotalAmont')}
        </>,
         dataIndex: 'TotalAmont',
         key: 'TotalAmont',
      },
      {
        
          key: 'TotalAmont',
          defaultSortOrder: 'descend',
        
          sorter: (c, d) => c.TotalAmont.split('$')[1] - d.TotalAmont.split('$')[1],
          sortOrder: sortedInfo.columnKey === 'TotalAmont' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Profit Amount</p>
      </div>,

      children: [
      {
        title: <>
        { filter('profit')}
        </>,
         dataIndex: 'profitLink',
         key: 'profit',
      },
      {
        
          key: 'profit',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.profit - d.profit,
          sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    }
   ,
   {
    title:     
    <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
    <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Loss Amount</p>
    </div>,

    children: [
    {
      title: <>
      { filter('loss')}
      </>,
       dataIndex: 'lossLink',
       key: 'loss',
    },
    {
      
        key: 'loss',
        defaultSortOrder: 'descend',
        sorter: (c, d) => c.loss - d.loss,
        sortOrder: sortedInfo.columnKey === 'loss' && sortedInfo.order,
        width:30,
      
      
    }
    ]


  },
  {
    title:     
    <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
    <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Percentge</p>
    </div>,

    children: [
    {
      title: <>
      { filter('percentge')}
      </>,
       dataIndex: 'percentge',
       key: 'percentge',
    },
    {
      
        key: 'percentge',
        defaultSortOrder: 'descend',
        sorter: (c, d) => c.percentge.split('%')[0] - d.percentge.split('%')[0],
        sortOrder: sortedInfo.columnKey === 'percentge' && sortedInfo.order,
        width:30,
      
      
    }
    ]


  }
    
  ];
  isOrderTypeShow&&columns.splice(1, 1)
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
