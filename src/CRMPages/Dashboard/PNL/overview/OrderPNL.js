import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryReportOrderWise } from '../../../../redux/apis/DataAction';
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




const OrderPNL = (props) => {

    const {dataSourceOrder,dataOrderDownload}= props
    // // console.log('dataSourceOrder',dataSourceOrder)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[],
    
  });

  const {sortedInfo,isLoader,dataSourceOrderTemp}=state
 
  useEffect(() => {
    // Update the document title using the browser API
    setState({ ...state, dataSourceOrderTemp: dataSourceOrder });

  },[dataSourceOrder]);
  const dataSource = [];
  let temp =[];

  const filter =(value)=>{
    var val =[];
    let placeholder=``; 
    
  return  <Input
    placeholder = {placeholder}    
    size='small'
    onChange={e => {        
 
      temp =[...temp,...dataSourceOrder.filter(item => JSON.stringify(item[value]).includes(e.target.value.toString()))]
     
      setState({...state,dataSourceOrderTemp:temp}); 

    }}
  />
  }

  // const filterByZipInput = (
  //   <Input
  //     placeholder="Search Zip"
     
  //     onChange={e => {
        
  //       temp =[...temp,...dataSourceOrder.filter(item => item['Zip'].toUpperCase().includes( e.target.value))]
  //       setState({...state,dataSourceOrderTemp:temp}); 
  //     }}
  //   />
  // );
  const columns = [
    {
      
      title: 
      <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order no</p>
      </div>

      { filter('orderno')}
      </> ,
      dataIndex: 'orderno',
      key: 'orderno' ,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>FULL NAME</p>
      </div>

       { filter('FULLNAME')}
      {/* {filterByFirstNameInput} */}
      </> , 
      dataIndex: 'FULLNAME',
      key: 'FULLNAME',
     
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Zip </p>
      </div>

      { filter('Zip')}
      </> , 
      dataIndex: 'Zip',
      key: 'Zip',
      
    },
    {
     
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>State </p>
      </div>

      { filter('State')}
      </>,
      dataIndex: 'State',
      key: 'State',
        
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>po shipping </p>
      </div>

      { filter('po_shipping')}
      </>,
      dataIndex: 'po_shipping',
      key: 'po_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.po_shipping - d.po_shipping,
      sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Customer Pay </p>
      </div>

      { filter('customerPay')}
      </>,
      dataIndex: 'customerPay',
      key: 'customerPay',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.customerPay - d.customerPay,
      sortOrder: sortedInfo.columnKey === 'customerPay' && sortedInfo.order,
    }
    ,
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Shipping Cost </p>
      </div>

      { filter('ShippingCost')}
      </>,
      dataIndex: 'ShippingCost',
      key: 'ShippingCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ShippingCost - d.ShippingCost,
      sortOrder: sortedInfo.columnKey === 'ShippingCost' && sortedInfo.order,
    } ,
    
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Cost </p>
      </div>

      { filter('cost')}
      </>,
      dataIndex: 'cost',
      key: 'cost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.cost - d.cost,
      sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>purchase Cost</p>
      </div>

      { filter('purchaseCost')}
      </>,
      dataIndex: 'purchaseCost',
      key: 'purchaseCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.purchaseCost - d.purchaseCost,
      sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order Total</p>
      </div>

      { filter('ordertotal')}
      </>,
      dataIndex: 'ordertotal',
      key: 'ordertotal',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ordertotal - d.ordertotal,
      sortOrder: sortedInfo.columnKey === 'ordertotal' && sortedInfo.order,
    },
    {
     
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Money Collected</p>
      </div>

      { filter('Moneycollected')}
      </>,
      dataIndex: 'Moneycollected',
      key: 'Moneycollected',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Moneycollected - d.Moneycollected,
      sortOrder: sortedInfo.columnKey === 'Moneycollected' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Commission</p>
      </div>

      { filter('commission')}
      </>,
      dataIndex: 'commission',
      key: 'commission',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.commission - d.commission,
      sortOrder: sortedInfo.columnKey === 'commission' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Profit</p>
      </div>

      { filter('profit')}
      </>,
      dataIndex: 'profit',
      key: 'profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.profit - d.profit,
      sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Is Dropship</p>
      </div>

      { filter('Isdropship')}
      </>,
      dataIndex: 'Isdropship',
      key: 'Isdropship',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Isdropship - d.Isdropship,
      sortOrder: sortedInfo.columnKey === 'Isdropship' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Is Replacement</p>
      </div>

      { filter('IsReplacement')}
      </>,
      dataIndex: 'IsReplacement',
      key: 'IsReplacement',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.IsReplacement - d.IsReplacement,
      sortOrder: sortedInfo.columnKey === 'IsReplacement' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order Discount</p>
      </div>

      { filter('OrderDiscount')}
      </>,
      dataIndex: 'OrderDiscount',
      key: 'OrderDiscount',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.OrderDiscount - d.OrderDiscount,
      sortOrder: sortedInfo.columnKey === 'OrderDiscount' && sortedInfo.order,
    }
    
    
    
    
  ];

  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setState({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const handleSearch = (searchText) => {
   // temp  = [...temp, dataSourceDetails.filter(item => item['merchantsku']==null?[]:[...item['merchantsku'].toUpperCase().includes(searchText.toUpperCase())])]

   // console.log(searchText.toUpperCase())
  //  temp  = [...temp,...dataSourceOrder.filter(item => item['merchantsku']!==null&&item['merchantsku'].toUpperCase().includes(searchText.toUpperCase()))]
    
   
  //  // console.log('merchantsku',temp)
    // // console.log('merchantsku',dataSourceDetails.filter(item => item['merchantsku']==null?[]:item['merchantsku'].toUpperCase().includes(searchText.toUpperCase())))
   
     temp =[...temp,...dataSourceOrder.filter(item => item['orderno'].toUpperCase().includes(searchText.toUpperCase()))]
    // // console.log('orderno',temp)


    //  temp = [...temp,...dataSourceOrder.filter(item => item['ORDERTYPE'].toUpperCase().includes(searchText.toUpperCase()))]
    // // console.log('ORDERTYPE',temp)

  //  // console.log('dataSourceDetails',temp)
    setState({ ...state, dataSourceOrderTemp: temp });
  };
  const Download = ( data) =>  {
   
  downloadFile(data)
  }
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
  

        <Row >
        {/* <Col md={8} xs={24} style={{marginBottom:10 }}>
               
                  <Input onChange={(event) => { handleSearch(event.target.value) }} placeholder="Filter" patterns />
                
              </Col> */}
              {/* <Col span={4} >
               
               <Button  style={{marginLeft:10 }}  size="default" type="primary" onClick={(event) => {  Download(dataOrderDownload)  }} > Download</Button>
               
               </Col> */}
            
          <Col xs={24}>
            <Cards headless>
              {/* <ProjectList> */}

                <div className="table-responsive">
                {/* <Styles> */}
                  <Table size='small' pagination={true} scroll={{ x: 2000, y: 1000 }} dataSource={dataSourceOrderTemp} columns={columns} onChange={handleChange}/>
                  {/* </Styles> */}
                </div>

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default OrderPNL
