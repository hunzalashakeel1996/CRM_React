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




const DetailPNL = (props) => {

    const {dataSourceDetails}= props
    // console.log('DetailPNL',dataSourceDetails)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceDetailsTemp:[]
  });

  const {sortedInfo,isLoader,dataSourceDetailsTemp}=state
 
  useEffect(() => {
    // Update the document title using the browser API
    setState({ ...state, dataSourceDetailsTemp: dataSourceDetails });

  },[dataSourceDetails]);
  const dataSource = [];
  let temp =[];
  const columns = [
    {
      title: 'Vendor Name',
      dataIndex: 'vendorname',
      key: 'vendorname',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.vendorname - d.vendorname,
      sortOrder: sortedInfo.columnKey === 'vendorname' && sortedInfo.order,
    },
    {
      title: 'Merchant Sku',
      dataIndex: 'merchantsku',
      key: 'merchantsku',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.merchantsku - d.merchantsku,
      sortOrder: sortedInfo.columnKey === 'merchantsku' && sortedInfo.order,
    },
    {
      title: 'Vendor Style Code',
      dataIndex: 'vendorstylecode',
      key: 'vendorstylecode',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.vendorstylecode - d.vendorstylecode,
      sortOrder: sortedInfo.columnKey === 'vendorstylecode' && sortedInfo.order,
    },
    {
      title: 'Color Code',
      dataIndex: 'colorcode',
      key: 'colorcode',
        
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.colorcode - d.colorcode,
      sortOrder: sortedInfo.columnKey === 'colorcode' && sortedInfo.order,
    },
    {
      title: 'Size Name',
      dataIndex: 'sizename',
      key: 'sizename',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.sizename - d.sizename,
      sortOrder: sortedInfo.columnKey === 'sizename' && sortedInfo.order,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderstatus',
      key: 'orderstatus',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.orderstatus - d.orderstatus,
      sortOrder: sortedInfo.columnKey === 'orderstatus' && sortedInfo.order,
    }
    ,
    {
      title: 'Item Status',
      dataIndex: 'itemstatus',
      key: 'itemstatus',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.itemstatus - d.itemstatus,
      sortOrder: sortedInfo.columnKey === 'itemstatus' && sortedInfo.order,
    } ,
    {
      title: 'Orderdate',
      dataIndex: 'orderdate',
      key: 'orderdate',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.orderdate - d.orderdate,
      sortOrder: sortedInfo.columnKey === 'orderdate' && sortedInfo.order,
    } ,
    {
      title: 'Uspsdate',
      dataIndex: 'uspsdate',
      key: 'uspsdate',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.uspsdate - d.uspsdate,
      sortOrder: sortedInfo.columnKey === 'uspsdate' && sortedInfo.order,
    },
    {
      title: 'Order Type',
      dataIndex: 'ORDERTYPE',
      key: 'ORDERTYPE',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ORDERTYPE - d.ORDERTYPE,
      sortOrder: sortedInfo.columnKey === 'ORDERTYPE' && sortedInfo.order,
    },
    {
      title: 'Orderno',
      dataIndex: 'orderno',
      key: 'orderno',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.orderno - d.orderno,
      sortOrder: sortedInfo.columnKey === 'orderno' && sortedInfo.order,
    },
    {
      title: 'Purchase Orderno',
      dataIndex: 'purchaseorderno',
      key: 'purchaseorderno',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.purchaseorderno - d.purchaseorderno,
      sortOrder: sortedInfo.columnKey === 'purchaseorderno' && sortedInfo.order,
    },
    {
      title: 'Itemqty',
      dataIndex: 'itemqty',
      key: 'itemqty',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.itemqty - d.itemqty,
      sortOrder: sortedInfo.columnKey === 'itemqty' && sortedInfo.order,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.cost - d.cost,
      sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order,
    },
    {
      title: 'Purchase Cost',
      dataIndex: 'purchaseCost',
      key: 'purchaseCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.purchaseCost - d.purchaseCost,
      sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order,
    },
    {
      title: 'Commit status',
      dataIndex: 'commit_status',
      key: 'commit_status',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.commit_status - d.commit_status,
      sortOrder: sortedInfo.columnKey === 'commit_status' && sortedInfo.order,
    },
    {
      title: 'Commision',
      dataIndex: 'commision',
      key: 'commision',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.commision - d.commision,
      sortOrder: sortedInfo.columnKey === 'commision' && sortedInfo.order,
    },
    {
      title: 'Sale Price',
      dataIndex: 'SalePrice',
      key: 'SalePrice',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.SalePrice - d.SalePrice,
      sortOrder: sortedInfo.columnKey === 'SalePrice' && sortedInfo.order,
    },
    {
      title: 'PU Price',
      dataIndex: 'pu_price',
      key: 'pu_price',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.pu_price - d.pu_price,
      sortOrder: sortedInfo.columnKey === 'pu_price' && sortedInfo.order,
    },
    {
      title: 'Weight',
      dataIndex: 'Weight',
      key: 'Weight',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Weight - d.Weight,
      sortOrder: sortedInfo.columnKey === 'Weight' && sortedInfo.order,
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      key: 'shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.shipping - d.shipping,
      sortOrder: sortedInfo.columnKey === 'shipping' && sortedInfo.order,
    },
    {
      title: 'Po Shipping',
      dataIndex: 'po_shipping',
      key: 'po_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.po_shipping - d.po_shipping,
      sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
    },
    {
      title: 'Ups Usps Item Shipping',
      dataIndex: 'ups_usps_item_shipping',
      key: 'ups_usps_item_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ups_usps_item_shipping - d.ups_usps_item_shipping,
      sortOrder: sortedInfo.columnKey === 'ups_usps_item_shipping' && sortedInfo.order,
    },
    {
      title: 'Usps Order Shipping',
      dataIndex: 'usps_order_shipping',
      key: 'usps_order_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.usps_order_shipping - d.usps_order_shipping,
      sortOrder: sortedInfo.columnKey === 'usps_order_shipping' && sortedInfo.order,
    },
    {
      title: 'Ups Order Shipping',
      dataIndex: 'ups_order_shipping',
      key: 'ups_order_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ups_order_shipping - d.ups_order_shipping,
      sortOrder: sortedInfo.columnKey === 'ups_order_shipping' && sortedInfo.order,
    },
    {
      title: 'IsRMA',
      dataIndex: 'isRMA',
      key: 'isRMA',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.isRMA - d.isRMA,
      sortOrder: sortedInfo.columnKey === 'isRMA' && sortedInfo.order,
    },
    {
      title: 'Customer Pay Ship',
      dataIndex: 'customer_pay_ship',
      key: 'customer_pay_ship',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.customer_pay_ship - d.customer_pay_ship,
      sortOrder: sortedInfo.columnKey === 'customer_pay_ship' && sortedInfo.order,
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
      title: 'PPS',
      dataIndex: 'PPS',
      key: 'PPS',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.PPS - d.PPS,
      sortOrder: sortedInfo.columnKey === 'PPS' && sortedInfo.order,
    },
    {
      title: 'Final Profit',
      dataIndex: 'final_profit',
      key: 'final_profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.final_profit - d.final_profit,
      sortOrder: sortedInfo.columnKey === 'final_profit' && sortedInfo.order,
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Type - d.Type,
      sortOrder: sortedInfo.columnKey === 'Type' && sortedInfo.order,
    }
    
    
    
    
    
  ];

  const handleChange = (pagination, filters, sorter) =>  {
    console.log('Various parameters', pagination, filters, sorter);
    setState({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const handleSearch = (searchText) => {
   // temp  = [...temp, dataSourceDetails.filter(item => item['merchantsku']==null?[]:[...item['merchantsku'].toUpperCase().includes(searchText.toUpperCase())])]

   console.log(searchText.toUpperCase())
   temp  = [...temp,...dataSourceDetails.filter(item => item['merchantsku']!==null&&item['merchantsku'].toUpperCase().includes(searchText.toUpperCase()))]
    
   
   console.log('merchantsku',temp)
    // console.log('merchantsku',dataSourceDetails.filter(item => item['merchantsku']==null?[]:item['merchantsku'].toUpperCase().includes(searchText.toUpperCase())))
   
     temp =[...temp,...dataSourceDetails.filter(item => item['orderno'].toUpperCase().includes(searchText.toUpperCase()))]
    // console.log('orderno',temp)


     temp = [...temp,...dataSourceDetails.filter(item => item['ORDERTYPE'].toUpperCase().includes(searchText.toUpperCase()))]
    // console.log('ORDERTYPE',temp)

   console.log('dataSourceDetails',temp)
    setState({ ...state, dataSourceDetailsTemp: temp });
  };

  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
  

        <Row >
        <Col md={8} xs={24} style={{marginBottom:10 }}>
               
                  <Input onChange={(event) => { handleSearch(event.target.value) }} placeholder="Filter" patterns />
                
              </Col>
          <Col xs={24}>
            <Cards headless>
              {/* <ProjectList> */}

                <div className="table-responsive">
                  <Table pagination={true} scroll={{ x: 5000, y: 1000 }} dataSource={dataSourceDetailsTemp} columns={columns} onChange={handleChange}/>
                </div>

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default DetailPNL
