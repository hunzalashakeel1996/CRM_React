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

  const { dataSourceItem, dataSourceItemTempParent, dataItemDownload,onAddItemCount,activeTab } = props
  //console.log('dataSourceItem',dataSourceItem)
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setState] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSourceItemTemp: []
  });

  const { sortedInfo, isLoader, dataSourceItemTemp } = state

  useEffect(() => {
    if(activeTab==='ItemPNL'&&dataSourceItemTempParent&&dataSourceItemTempParent.length>0){
      let profit = []
      for(let i=0; i<dataSourceItemTempParent.length; i++){
    
          if(profit.filter(value=>value.ORDERTYPE===dataSourceItemTempParent[i].ORDERTYPE).length<=0){
            profit.push(dataSourceItemTempParent[i])
            }
            else{
              let indexTemp = profit.findIndex(item=>item.ORDERTYPE===dataSourceItemTempParent[i].ORDERTYPE)
              profit[indexTemp] = {...profit[indexTemp], profit:profit[indexTemp].profit+dataSourceItemTempParent[i].profit}
            }
    
          
          }
         
          onAddItemCount({ order:dataSourceItemTempParent.length , profit: profit })
    // Update the document title using the browser API
    setState({ ...state, dataSourceItemTemp: dataSourceItemTempParent });


  }
  }, [activeTab,dataSourceItemTempParent]);
  const dataSource = [];
  let temp = [];

  const filter = (value) => {
    var val = [];
    let placeholder = `Search ${value}`;

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
            <Cards headless>

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

export default ItemPNL
