import React, { lazy, Suspense, useEffect, useState } from 'react';
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




const ItemPNL = (props) => {

    const {dataSourceItem,dataSourceItemTempParent,dataItemDownload}= props
     // console.log('dataSourceItem',dataSourceItem)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceItemTemp:[]
  });

  const {sortedInfo,isLoader,dataSourceItemTemp}=state
 
  useEffect(() => {
    // Update the document title using the browser API
    setState({ ...state, dataSourceItemTemp: dataSourceItemTempParent });

  },[dataSourceItemTempParent]);
  const dataSource = [];
  let temp =[];
  
  const filter =(value)=>{
    var val =[];
    let placeholder=`Search ${value}`; 
    
  return  <Input
    placeholder = ''  
    size='small'
    onChange={e => {        
 
      temp =[...temp,...dataSourceItem.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]
     
      setState({...state,dataSourceItemTemp:temp}); 

    }}
  />
  }
  const columns = [
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Vendor Name</p>
      </div>
      { filter('vendorname')}     
      </> ,
      dataIndex: 'vendorname',
      key: 'vendorname',
      defaultSortOrder: 'descend',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Merchant Sku</p>
      </div>
      { filter('merchantsku')}     
      </> ,
      dataIndex: 'merchantsku',
      key: 'merchantsku',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>VendorStyleCode</p>
      </div>
      { filter('vendorstylecode')}     
      </> ,
      dataIndex: 'vendorstylecode',
      key: 'vendorstylecode',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Color Code</p>
      </div>
      { filter('colorcode')}     
      </> ,
      dataIndex: 'colorcode',
      key: 'colorcode',
        
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Size name</p>
      </div>
      { filter('sizename')}     
      </> ,
      dataIndex: 'sizename',
      key: 'sizename',
    
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order Status</p>
      </div>
      { filter('orderstatus')}     
      </> ,
      dataIndex: 'orderstatus',
      key: 'orderstatus',
    }
    ,
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Item Status</p>
      </div>
      { filter('itemstatus')}     
      </> ,
      dataIndex: 'itemstatus',
      key: 'itemstatus',
    } ,
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order Date</p>
      </div>
      { filter('orderdate')}     
      </> ,
      dataIndex: 'orderdate',
      key: 'orderdate',
    } ,
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Usps Date</p>
      </div>
      { filter('uspsdate')}     
      </> ,
      dataIndex: 'uspsdate',
      key: 'uspsdate',
      defaultSortOrder: 'descend',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order type</p>
      </div>
      { filter('ORDERTYPE')}     
      </> ,
      dataIndex: 'ORDERTYPE',
      key: 'ORDERTYPE',
      defaultSortOrder: 'descend',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Orderno</p>
      </div>
      { filter('orderno')}     
      </> ,
      dataIndex: 'orderno',
      key: 'orderno',
      defaultSortOrder: 'descend',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Purchase Orderno</p>
      </div>
      { filter('purchaseorderno')}     
      </> ,
      dataIndex: 'purchaseorderno',
      key: 'purchaseorderno',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Itemqty</p>
      </div>
      { filter('itemqty')}     
      </> ,
      dataIndex: 'itemqty',
      key: 'itemqty',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.itemqty - d.itemqty,
      sortOrder: sortedInfo.columnKey === 'itemqty' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Cost</p>
      </div>
      { filter('cost')}     
      </> ,
      dataIndex: 'cost',
      key: 'cost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.cost - d.cost,
      sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Purchase Cost</p>
      </div>
      { filter('purchaseCost')}     
      </> ,
      dataIndex: 'purchaseCost',
      key: 'purchaseCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.purchaseCost - d.purchaseCost,
      sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Commit Status</p>
      </div>
      { filter('commit_status')}     
      </> ,
      dataIndex: 'commit_status',
      key: 'commit_status',
      defaultSortOrder: 'descend',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Commision</p>
      </div>
      { filter('commision')}     
      </> ,
      dataIndex: 'commision',
      key: 'commision',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.commision - d.commision,
      sortOrder: sortedInfo.columnKey === 'commision' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Sale Price</p>
      </div>
      { filter('SalePrice')}     
      </> ,
      dataIndex: 'SalePrice',
      key: 'SalePrice',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.SalePrice - d.SalePrice,
      sortOrder: sortedInfo.columnKey === 'SalePrice' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>pu price</p>
      </div>
      { filter('pu_price')}     
      </> ,
      dataIndex: 'pu_price',
      key: 'pu_price',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.pu_price - d.pu_price,
      sortOrder: sortedInfo.columnKey === 'pu_price' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Weight</p>
      </div>
      { filter('Weight')}     
      </> ,
      dataIndex: 'Weight',
      key: 'Weight',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>shipping</p>
      </div>
      { filter('shipping')}     
      </> ,
      dataIndex: 'shipping',
      key: 'shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.shipping - d.shipping,
      sortOrder: sortedInfo.columnKey === 'shipping' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Po Shipping</p>
      </div>
      { filter('po_shipping')}     
      </> ,
      dataIndex: 'po_shipping',
      key: 'po_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.po_shipping - d.po_shipping,
      sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>IsRMA</p>
      </div>
      { filter('isRMA')}     
      </> ,
      dataIndex: 'isRMA',
      key: 'isRMA',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Customer Pay Ship</p>
      </div>
      { filter('customer_pay_ship')}     
      </> ,
      dataIndex: 'customer_pay_ship',
      key: 'customer_pay_ship',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.customer_pay_ship - d.customer_pay_ship,
      sortOrder: sortedInfo.columnKey === 'customer_pay_ship' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Profit</p>
      </div>
      { filter('profit')}     
      </> ,
      dataIndex: 'profit',
      key: 'profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.profit - d.profit,
      sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>PPS</p>
      </div>
      { filter('PPS')}     
      </> ,
      dataIndex: 'PPS',
      key: 'PPS',
      defaultSortOrder: 'descend',
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Final Profit</p>
      </div>
      { filter('final_profit')}     
      </> ,
      dataIndex: 'final_profit',
      key: 'final_profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.final_profit - d.final_profit,
      sortOrder: sortedInfo.columnKey === 'final_profit' && sortedInfo.order,
    },
    {
      title: <>
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Type</p>
      </div>
      { filter('Type')}     
      </> ,
      dataIndex: 'Type',
      key: 'Type'
    
    }
    
    
    
    
    
  ];

  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setState({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  const Download = ( data) =>  {
   
    downloadFile(data)
    }
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
  

        <Row >
        
          <Col xs={24}>
            <Cards headless>

                <div className="table-responsive">
                  <Table size='small' pagination={true} scroll={{ x: 4000, y: 1000 }} dataSource={dataSourceItemTemp} columns={columns} onChange={handleChange}/>
                </div>

            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default ItemPNL
