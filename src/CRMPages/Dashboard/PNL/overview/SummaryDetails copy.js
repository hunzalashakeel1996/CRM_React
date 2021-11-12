import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryPNLItemwise } from '../../../../redux/apis/DataAction';
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




const SummaryDetails = ( props ) => {
    const { dataSourceItem,  dataItemDownload,onAddItemCount,activeTab, match, location } = props

    const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setState] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSourceItemTemp: [],
    dataSourceItemTempParent:[]
  });
  // console.log('cehck123',match.params)
  const { sortedInfo, isLoader, dataSourceItemTemp,dataSourceItemTempParent } = state
  useEffect(() => {
    // console.log('cehck123',match.params)
 
    // if props is undefined then get ticket details from API
    if (location.ticket === undefined && location.state === undefined) {
        let tempDataSource_report_item_wise=[]
        console.log('1')
        setState({ ...state, isLoader: true })
        dispatch(apiSummaryPNLItemwise({ ORDERTYPE: match.params.ORDERTYPE,dateFormat: match.params.dateFormat,orderdateto: match.params.endDate,orderdatefrom: match.params.startDate,vendorname: match.params.vendorname,Value: match.params.Value   })).then( data=>{
            console.log('data', data)
            data[1].map(value => {

                const { vendorname,
                  merchantsku,
                  vendorstylecode,
                  colorcode,
                  sizename,
                  orderstatus,
                  itemstatus,
                  orderdate,
                  uspsdate,
                  ORDERTYPE,
                  orderno,
                  purchaseorderno,
                  itemqty,
                  cost,
                  purchaseCost,
                  commit_status,
                  commision,
                  SalePrice,
                  pu_price,
                  Weight,
                  shipping,
                  po_shipping,
                  isRMA,
                  customer_pay_ship,
                  profit,
                  PPS,
                  final_profit,
                  Type,
                  IsReplacement,
                  Discount_amount
                } = value;
        
        
                tempDataSource_report_item_wise.push({
                  vendorname: vendorname,
                  merchantsku: merchantsku,
                  vendorstylecode: vendorstylecode,
                  colorcode: colorcode,
                  sizename: sizename,
                  orderstatus: orderstatus,
                  itemstatus: itemstatus,
                  orderdate: orderdate,
                  uspsdate: uspsdate,
                  ORDERTYPE: ORDERTYPE,
                  orderno: orderno,
                  purchaseorderno: purchaseorderno,
                  itemqty: itemqty,
                  cost: `$${Math.round(cost * 100) / 100}`,
                  purchaseCost: `$${Math.round(purchaseCost * 100) / 100}`,
                  commit_status: commit_status,
                  commision: `$${Math.round(commision * 100) / 100}`,
                  SalePrice: `$${Math.round(SalePrice * 100) / 100}`,
                  pu_price: `$${Math.round(pu_price * 100) / 100}`,
                  Weight: Weight,
                  shipping: `$${Math.round(shipping * 100) / 100}`,
                  po_shipping: `$${Math.round(po_shipping * 100) / 100}`,
                  isRMA: isRMA,
                  customer_pay_ship: `$${Math.round(customer_pay_ship * 100) / 100}`,
                  profit: `$${Math.round(profit * 100) / 100}`,
                  PPS: PPS,
                  final_profit: `$${Math.round(final_profit * 100) / 100}`,
                  Type: Type,
                  IsReplacement: IsReplacement,
                  Discount_amount: `$${Math.round(Discount_amount * 100) / 100}`
                });
        
              });
            setState({ ...state, isLoader: false,dataSourceItemTemp:tempDataSource_report_item_wise,dataSourceItemTempParent:tempDataSource_report_item_wise})
        })
    }
    else {
        let tempDataSource_report_item_wise=[]
        console.log('2')
        setState({ ...state, isLoader: true })
        dispatch(apiSummaryPNLItemwise({  ORDERTYPE: match.params.ORDERTYPE,dateFormat: match.params.dateFormat,orderdateto: match.params.endDate,orderdatefrom: match.params.startDate,vendorname: match.params.vendorname,Value: match.params.Value   })).then(data => {
            console.log('data', data)
            data[1].map(value => {

                const { vendorname,
                  merchantsku,
                  vendorstylecode,
                  colorcode,
                  sizename,
                  orderstatus,
                  itemstatus,
                  orderdate,
                  uspsdate,
                  ORDERTYPE,
                  orderno,
                  purchaseorderno,
                  itemqty,
                  cost,
                  purchaseCost,
                  commit_status,
                  commision,
                  SalePrice,
                  pu_price,
                  Weight,
                  shipping,
                  po_shipping,
                  isRMA,
                  customer_pay_ship,
                  profit,
                  PPS,
                  final_profit,
                  Type,
                  IsReplacement,
                  Discount_amount
                } = value;
        
        
                tempDataSource_report_item_wise.push({
                  vendorname: vendorname,
                  merchantsku: merchantsku,
                  vendorstylecode: vendorstylecode,
                  colorcode: colorcode,
                  sizename: sizename,
                  orderstatus: orderstatus,
                  itemstatus: itemstatus,
                  orderdate: orderdate,
                  uspsdate: uspsdate,
                  ORDERTYPE: ORDERTYPE,
                  orderno: orderno,
                  purchaseorderno: purchaseorderno,
                  itemqty: itemqty,
                  cost: `$${Math.round(cost * 100) / 100}`,
                  purchaseCost: `$${Math.round(purchaseCost * 100) / 100}`,
                  commit_status: commit_status,
                  commision: `$${Math.round(commision * 100) / 100}`,
                  SalePrice: `$${Math.round(SalePrice * 100) / 100}`,
                  pu_price: `$${Math.round(pu_price * 100) / 100}`,
                  Weight: Weight,
                  shipping: `$${Math.round(shipping * 100) / 100}`,
                  po_shipping: `$${Math.round(po_shipping * 100) / 100}`,
                  isRMA: isRMA,
                  customer_pay_ship: `$${Math.round(customer_pay_ship * 100) / 100}`,
                  profit: `$${Math.round(profit * 100) / 100}`,
                  PPS: PPS,
                  final_profit: `$${Math.round(final_profit * 100) / 100}`,
                  Type: Type,
                  IsReplacement: IsReplacement,
                  Discount_amount: `$${Math.round(Discount_amount * 100) / 100}`
                });
        
              });
            setState({ ...state, isLoader: false,dataSourceItemTemp:tempDataSource_report_item_wise,dataSourceItemTempParent:tempDataSource_report_item_wise})
        })
    }
}, []);


  const dataSource = [];
  let temp = [];

  const filter = (value) => {
    var val = [];
    let placeholder = `Search ${value}`;
    // console.log(...dataSourceItemTempParent)
  //  console.log(value)
    return <Input
      placeholder=''
      size='small'
      onChange={e => {

        temp = [...temp, ...dataSourceItemTempParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]

        setState({ ...state, dataSourceItemTemp: temp });

      }}
    />
  }
  
  const columns = [
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Vendor Name</p>
        </div>,
      children: [
        {
          title: <>
            { filter('vendorname')}
          </>,
          dataIndex: 'vendorname',
          key: 'vendorname',
        }

      ]
      // { filter('vendorname')}     
      // </> ,
      // dataIndex: 'vendorname',
      // key: 'vendorname',
      // defaultSortOrder: 'descend',
    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Merchant Sku</p>
        </div>,
      children: [
        {
          title: <>
            { filter('merchantsku')}
          </>,
          dataIndex: 'merchantsku',
          key: 'merchantsku',
        }

      ]
      // { filter('merchantsku')}     
      // </> ,
      // dataIndex: 'merchantsku',
      // key: 'merchantsku',
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>VendorStyleCode</p>
        </div>,
      children: [
        {
          title: <>
            { filter('vendorstylecode')}
          </>,
          dataIndex: 'vendorstylecode',
          key: 'vendorstylecode',
        }

      ]
      //   { filter('vendorstylecode')}
      // </>,
      // dataIndex: 'vendorstylecode',
      // key: 'vendorstylecode',
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Color Code</p>
        </div>,
      children: [
        {
          title: <>
            { filter('colorcode')}
          </>,
          dataIndex: 'colorcode',
          key: 'colorcode',
        }

      ]
      

    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Size name</p>
        </div>,
      children: [
        {
          title: <>
            { filter('sizename')}
          </>,
          dataIndex: 'sizename',
          key: 'sizename',
        }

      ]
    

    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order Status</p>
        </div>,
      children: [
        {
          title: <>
            { filter('orderstatus')}
          </>,
          dataIndex: 'orderstatus',
          key: 'orderstatus',
        }

      ]
      //   { filter('orderstatus')}
      // </>,
      // dataIndex: 'orderstatus',
      // key: 'orderstatus',
    }
    ,
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Item Status</p>
        </div>,
      children: [
        {
          title: <>
            { filter('itemstatus')}
          </>,
          dataIndex: 'itemstatus',
          key: 'itemstatus',
        }

      ]
      //   { filter('itemstatus')}
      // </>,
      // dataIndex: 'itemstatus',
      // key: 'itemstatus',
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order Date</p>
        </div>,
      children: [
        {
          title: <>
            { filter('orderdate')}
          </>,
          dataIndex: 'orderdate',
          key: 'orderdate',
        }

      ]
        
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Usps Date</p>
        </div>,
      children: [
        {
          title: <>
            { filter('uspsdate')}
          </>,
          dataIndex: 'uspsdate',
          key: 'uspsdate',
        }

      ]
        
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order type</p>
        </div>,
      children: [
        {
          title: <>
            { filter('ORDERTYPE')}
          </>,
          dataIndex: 'ORDERTYPE',
          key: 'ORDERTYPE',
        }

      ]
        
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Orderno</p>
        </div>,
      children: [
        {
          title: <>
            { filter('orderno')}
          </>,
          dataIndex: 'orderno',
          key: 'orderno',
        }

      ]
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Purchase Orderno</p>
        </div>,
      children: [
        {
          title: <>
            { filter('purchaseorderno')}
          </>,
          dataIndex: 'purchaseorderno',
          key: 'purchaseorderno',
        }

      ]
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Itemqty</p>
        </div>,
      children: [
        {
          title: <>
            { filter('itemqty')}
          </>,
          dataIndex: 'itemqty',
          key: 'itemqty',
        },
        {
          key: 'itemqty',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.itemqty - d.itemqty,
          sortOrder: sortedInfo.columnKey === 'itemqty' && sortedInfo.order,
          width:30
        }


      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Cost</p>
        </div>,
      children: [
        {
          title: <>
            { filter('cost')}
          </>,
          dataIndex: 'cost',
          key: 'cost',
        },
        {
          key: 'cost',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.cost - d.cost,
          sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order,
          width:30
        }
      ]
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Purchase Cost</p>
        </div>,
      children: [
        {
          title: <>
            { filter('purchaseCost')}
          </>,
          dataIndex: 'purchaseCost',
          key: 'purchaseCost',
        },
        {
          key: 'purchaseCost',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.purchaseCost - d.purchaseCost,
          sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order,
          width:30
        }
      ]
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Commit Status</p>
        </div>,
      children: [
        {
          title: <>
            { filter('commit_status')}
          </>,
          dataIndex: 'commit_status',
          key: 'commit_status',
        }
      ]
        
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Commision</p>
        </div>,
      children: [
        {
          title: <>
            { filter('commision')}
          </>,
          dataIndex: 'commision',
          key: 'commision',
        },
        {
          key: 'commision',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.commision - d.commision,
          sortOrder: sortedInfo.columnKey === 'commision' && sortedInfo.order,
          width:30
        }
      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Sale Price</p>
        </div>,
      children: [
        {
          title: <>
            { filter('SalePrice')}
          </>,
          dataIndex: 'SalePrice',
          key: 'SalePrice',
        },
        {
          key: 'SalePrice',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.SalePrice - d.SalePrice,
          sortOrder: sortedInfo.columnKey === 'SalePrice' && sortedInfo.order,
          width:30
        }
      ]
      
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>pu price</p>
        </div>,
      children: [
        {
          title: <>
            { filter('pu_price')}
          </>,
          dataIndex: 'pu_price',
          key: 'pu_price',
        },
        {
          key: 'pu_price',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.pu_price - d.pu_price,
          sortOrder: sortedInfo.columnKey === 'pu_price' && sortedInfo.order,
          width:30
        }
      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Weight</p>
        </div>,
      children: [
        {
          title: <>
            { filter('Weight')}
          </>,
          dataIndex: 'Weight',
          key: 'Weight',
        },
        {
          key: 'Weight',
          defaultSortOrder: 'Weight',
          sorter: (c, d) => c.Weight - d.Weight,
          sortOrder: sortedInfo.columnKey === 'Weight' && sortedInfo.order,
          width:30
        }
      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>shipping</p>
        </div>,
      children: [
        {
          title: <>
            { filter('shipping')}
          </>,
          dataIndex: 'shipping',
          key: 'shipping',
        },
        {
          key: 'shipping',
          defaultSortOrder: 'shipping',
          sorter: (c, d) => c.shipping - d.shipping,
          sortOrder: sortedInfo.columnKey === 'shipping' && sortedInfo.order,
          width:30
        }
      ]
        
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Po Shipping</p>
        </div>,
      children: [
        {
          title: <>
            { filter('po_shipping')}
          </>,
          dataIndex: 'po_shipping',
          key: 'po_shipping',
        },
        {
          key: 'po_shipping',
          defaultSortOrder: 'po_shipping',
          sorter: (c, d) => c.po_shipping - d.po_shipping,
          sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
          width:30
        }
      ]
      
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>IsRMA</p>
        </div>,
      children: [
        {
          title: <>
            { filter('isRMA')}
          </>,
          dataIndex: 'isRMA',
          key: 'isRMA',
        }
      ]
      //   { filter('isRMA')}
      // </>,
      // dataIndex: 'isRMA',
      // key: 'isRMA',
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Customer Pay Ship</p>
        </div>,
      children: [
        {
          title: <>
            { filter('customer_pay_ship')}
          </>,
          dataIndex: 'customer_pay_ship',
          key: 'customer_pay_ship',
        },
        {
          key: 'customer_pay_ship',
          defaultSortOrder: 'customer_pay_ship',
          sorter: (c, d) => c.customer_pay_ship - d.customer_pay_ship,
          sortOrder: sortedInfo.columnKey === 'customer_pay_ship' && sortedInfo.order,
          width:30
        }
      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Profit</p>
        </div>,
      children: [
        {
          title: <>
            { filter('profit')}
          </>,
          dataIndex: 'profit',
          key: 'profit',
        },
        {
          key: 'profit',
          defaultSortOrder: 'profit',
          sorter: (c, d) => c.profit - d.profit,
          sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
          width:30
        }
      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>PPS</p>
        </div>,
      children: [
        {
          title: <>
            { filter('PPS')}
          </>,
          dataIndex: 'PPS',
          key: 'PPS',
        }
        
      ]
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Final Profit</p>
        </div>,
      children: [
        {
          title: <>
            { filter('final_profit')}
          </>,
          dataIndex: 'final_profit',
          key: 'final_profit',
        },
        {
          key: 'final_profit',
          defaultSortOrder: 'final_profit',
          sorter: (c, d) => c.final_profit - d.final_profit,
          sortOrder: sortedInfo.columnKey === 'final_profit' && sortedInfo.order,
          width:30
        }
      ]
       
    },
    {
      title: 
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Type</p>
        </div>,
      children: [
        {
          title: <>
            { filter('Type')}
          </>,
          dataIndex: 'Type',
          key: 'Type',
        }
      ]
       

    }
  ];

  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setState({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  const Download = (data) => {

    downloadFile(data)
  }
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>


        <Row >
        {/* <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <p>Total Item:{dataSourceItemTemp.length}</p>
               
                </Col> */}
          <Col xs={24}>
            <Cards title={'Summary Detail'}>

              <div className="table-responsive">
                <Table size='small' pagination={true} scroll={{ x: 4000, y: 1000 }} dataSource={dataSourceItemTemp} columns={columns} onChange={handleChange} />
              </div>

            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default SummaryDetails
