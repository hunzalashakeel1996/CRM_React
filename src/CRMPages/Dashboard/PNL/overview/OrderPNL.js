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

    const {dataSourceOrderTempParent,dataSourceOrder,dataOrderDownload,activeTab,onAddOrderCount}= props
    // console.log('dataSourceOrder',dataSourceOrderTempParent)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[],
    profitTotal:0
    
  });
 
  const {sortedInfo,isLoader,dataSourceOrderTemp,profitTotal}=state
 
  useEffect(() => {
    // Update the document title using the browser API
    let profitTotal=0
    if(activeTab==='OrderPNL'&&dataSourceOrderTempParent.length>0){
   
      let profit = []
      for(let i=0; i<dataSourceOrderTempParent.length; i++){
    
          if(profit.filter(value=>value.ORDERTYPE===dataSourceOrderTempParent[i].ORDERTYPE).length<=0){
            profit.push(dataSourceOrderTempParent[i])
            }
            else{
              let indexTemp = profit.findIndex(item=>item.ORDERTYPE===dataSourceOrderTempParent[i].ORDERTYPE)
              profit[indexTemp] = {...profit[indexTemp], profit:profit[indexTemp].profit+dataSourceOrderTempParent[i].profit}
            }
    
          
          }
         
          onAddOrderCount({ order:dataSourceOrderTempParent.length , profit: profit })

          setState({ ...state, dataSourceOrderTemp: dataSourceOrderTempParent});
    }
  },[activeTab,dataSourceOrderTempParent]);
  const dataSource = [];
  let temp =[];




  const filter =(value)=>{
    var val =[];
    let placeholder=``; 
    
  return  <Input
    placeholder = {placeholder}    
    size='small'
    onChange={e => {        
 
      temp =[...temp,...dataSourceOrderTempParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]
     
      setState({...state,dataSourceOrderTemp:temp}); 

    }}
  />
  }


//  const getColumnSearchProps = (dataIndex) => ({

  
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
     
//       <div style={{ padding: 8 }}>
//             {console.log('dataIndex',dataIndex)}
//         <Input
//           ref={node => {
//             searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setState({
//                 searchText: selectedKeys[0],
//                 searchedColumn: dataIndex,
//               });
//             }}
//           >
//             Filter
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//         : '',
//     onFilterDropdownVisibleChange: visible => {
//       if (visible) {
//         setTimeout(() => searchInput.select(), 100);
//       }
//     },
//     render: text =>
//         searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

  const columns = [
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order no</p>
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
    
    
  
    //   {
      
    //   title: 
    //   <>
    //   <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
    //   <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>orderno</p>
    //   </div>

    //   {/* { filter('orderno')} */}
    //   </> ,
    //   dataIndex: 'orderno',
    //   key: 'orderno' ,
    //   // ...this.getColumnSearchProps('orderno')
    //   ...this.getColumnSearchProps('orderno')
    // },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>FULL NAME</p>
      </div>,
      children: [
      {
        title: <>
        { filter('FULLNAME')}
      </> , 
      dataIndex: 'FULLNAME',
      key: 'FULLNAME',
      }

        ]

     
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Zip </p>
      </div>,
      children: [
      {
        title: <>
        { filter('Zip')}
      </> , 
      dataIndex: 'Zip',
      key: 'Zip',
      }

        ]

    
      
    },
    {
     
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>State </p>
      </div>,
      children: [
      {
        title: <>
        { filter('State')}
        </>,
         dataIndex: 'State',
         key: 'State',
      }

        ]

      // {/* { filter('State')}
      // </>,
      // dataIndex: 'State',
      // key: 'State', */}
        
    },
    {
        title: 
        <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
        <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Orderstatus</p>
        </div>,
        children: [
        {
          title: <>
          { filter('orderstatus')}
        </> , 
        dataIndex: 'orderstatus',
        key: 'orderstatus',
        }
  
          ]
  
       
      },
    {
      title:  <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>PO shipping</p>
      </div> ,
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
        defaultSortOrder: 'descend',
        sorter: (c, d) => c.po_shipping - d.po_shipping,
        sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
        width:30
      }

        ]
      },

      
     
     
    
    {
      title:  <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Customer Pay</p>
      </div> ,
    children: [
      {
        title: <>
        { filter('customerPay')}
        </>,
         dataIndex: 'customerPay',
         key: 'customerPay'
         },
      {
        key: 'customerPay',
        defaultSortOrder: 'descend',
        sorter: (c, d) => c.customerPay - d.customerPay,
        sortOrder: sortedInfo.columnKey === 'customerPay' && sortedInfo.order,
        width:30,
      
      }
        ]

      // title: <>
      // <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      // <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Customer Pay </p>
      // </div>

      // { filter('customerPay')}
      // </>,
      // dataIndex: 'customerPay',
      // key: 'customerPay',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.customerPay - d.customerPay,
      // sortOrder: sortedInfo.columnKey === 'customerPay' && sortedInfo.order,
    }
    ,
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Shipping Cost </p>
      </div>,
    children: [
      {
        title: <>
        { filter('ShippingCost')}
        </>,
         dataIndex: 'ShippingCost',
         key: 'ShippingCost'
         },
      {
        key: 'ShippingCost',
        defaultSortOrder: 'ShippingCost',
        sorter: (c, d) => c.ShippingCost - d.ShippingCost,
        sortOrder: sortedInfo.columnKey === 'ShippingCost' && sortedInfo.order,
        width:30,
      
      }
        ]

      /* { filter('ShippingCost')}
      </>,
      dataIndex: 'ShippingCost',
      key: 'ShippingCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ShippingCost - d.ShippingCost
      sortOrder: sortedInfo.columnKey === 'ShippingCost' && sortedInfo.order, */
    } ,
    
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Cost </p>
      </div>,
    children: [
      {
        title: <>
        { filter('cost')}
        </>,
         dataIndex: 'cost',
         key: 'cost'
         },
      {
        key: 'cost',
        defaultSortOrder: 'cost',
        sorter: (c, d) => c.cost - d.cost,
        sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order,
        width:30,
      
      }
        ]

      /* { filter('cost')}
      </>,
      dataIndex: 'cost',
      key: 'cost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.cost - d.cost,
      sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order, */
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>purchase Cost</p>
      </div>,
    children: [
      {
        title: <>
        { filter('purchaseCost')}
        </>,
         dataIndex: 'purchaseCost',
         key: 'purchaseCost'
         },
      {
        key: 'purchaseCost',
        defaultSortOrder: 'purchaseCost',
        sorter: (c, d) => c.purchaseCost - d.purchaseCost,
        sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order,
        width:30,
      
      }
        ]
/* 
      { filter('purchaseCost')}
      </>,
      dataIndex: 'purchaseCost',
      key: 'purchaseCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.purchaseCost - d.purchaseCost,
      sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order, */
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order Total</p>
      </div>,
    children: [
      {
        title: <>
        { filter('ordertotal')}
        </>,
         dataIndex: 'ordertotal',
         key: 'ordertotal'
         },
      {
        key: 'ordertotal',
        defaultSortOrder: 'ordertotal',
        sorter: (c, d) => c.ordertotal - d.ordertotal,
        sortOrder: sortedInfo.columnKey === 'ordertotal' && sortedInfo.order,
        width:30,
      
      }
        ]
/* 
      { filter('ordertotal')}
      </>,
      dataIndex: 'ordertotal',
      key: 'ordertotal',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ordertotal - d.ordertotal,
      sortOrder: sortedInfo.columnKey === 'ordertotal' && sortedInfo.order, */
    },
    {
     
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Money Collected</p>
      </div>,
    children: [
      {
        title: <>
        { filter('Moneycollected')}
        </>,
         dataIndex: 'Moneycollected',
         key: 'Moneycollected'
         },
      {
        key: 'Moneycollected',
        defaultSortOrder: 'Moneycollected',
        sorter: (c, d) => c.Moneycollected - d.Moneycollected,
        sortOrder: sortedInfo.columnKey === 'Moneycollected' && sortedInfo.order,
        width:30,
      
      }
        ]

      // { filter('Moneycollected')}
      // </>,
      // dataIndex: 'Moneycollected',
      // key: 'Moneycollected',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.Moneycollected - d.Moneycollected,
      // sortOrder: sortedInfo.columnKey === 'Moneycollected' && sortedInfo.order,
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Commission</p>
      </div>,
    children: [
      {
        title: <>
        { filter('commission')}
        </>,
         dataIndex: 'commission',
         key: 'commission'
         },
      {
        key: 'commission',
        defaultSortOrder: 'commission',
        sorter: (c, d) => c.commission - d.commission,
        sortOrder: sortedInfo.columnKey === 'commission' && sortedInfo.order,
        width:30,
      
      }
        ]

      // { filter('commission')}
      // </>,
      // dataIndex: 'commission',
      // key: 'commission',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.commission - d.commission,
      // sortOrder: sortedInfo.columnKey === 'commission' && sortedInfo.order,
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Profit</p>
      </div>,
    children: [
      {
        title: <>
        { filter('profit')}
        </>,
         dataIndex: 'profit',
         key: 'profit'
         },
      {
        key: 'profit',
        defaultSortOrder: 'profit',
        sorter: (c, d) => c.profit - d.profit,
        sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
        width:30,
      
      }
        ]

      // { filter('profit')}
      // </>,
      // dataIndex: 'profit',
      // key: 'profit',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.profit - d.profit,
      // sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Is Dropship</p>
      </div>,
    children: [
      {
        title: <>
        { filter('Isdropship')}
        </>,
         dataIndex: 'Isdropship',
         key: 'Isdropship'
         },
      {
        key: 'Isdropship',
        defaultSortOrder: 'Isdropship',
        sorter: (c, d) => c.Isdropship - d.Isdropship,
        sortOrder: sortedInfo.columnKey === 'Isdropship' && sortedInfo.order,
        width:30,
      
      }
        ]

      // { filter('Isdropship')}
      // </>,
      // dataIndex: 'Isdropship',
      // key: 'Isdropship',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.Isdropship - d.Isdropship,
      // sortOrder: sortedInfo.columnKey === 'Isdropship' && sortedInfo.order,
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Is Replacement</p>
      </div>,
    children: [
      {
        title: <>
        { filter('IsReplacement')}
        </>,
         dataIndex: 'IsReplacement',
         key: 'IsReplacement'
         },
      {
        key: 'IsReplacement',
        defaultSortOrder: 'IsReplacement',
        sorter: (c, d) => c.IsReplacement - d.IsReplacement,
        sortOrder: sortedInfo.columnKey === 'IsReplacement' && sortedInfo.order,
        width:30,
      
      }
        ]

      // { filter('IsReplacement')}
      // </>,
      // dataIndex: 'IsReplacement',
      // key: 'IsReplacement',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.IsReplacement - d.IsReplacement,
      // sortOrder: sortedInfo.columnKey === 'IsReplacement' && sortedInfo.order,
    },
    {
      title: 
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Order Discount</p>
      </div>,
    children: [
      {
        title: <>
        { filter('OrderDiscount')}
        </>,
         dataIndex: 'OrderDiscount',
         key: 'OrderDiscount'
         },
      {
        key: 'OrderDiscount',
        defaultSortOrder: 'OrderDiscount',
        sorter: (c, d) => c.OrderDiscount - d.OrderDiscount,
        sortOrder: sortedInfo.columnKey === 'OrderDiscount' && sortedInfo.order,
        width:30,
      
      }
        ]

      // { filter('OrderDiscount')}
      // </>,
      // dataIndex: 'OrderDiscount',
      // key: 'OrderDiscount',
      // defaultSortOrder: 'descend',
      // sorter: (c, d) => c.OrderDiscount - d.OrderDiscount,
      // sortOrder: sortedInfo.columnKey === 'OrderDiscount' && sortedInfo.order,
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
{/*        
              <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <p>Total Orders:{dataSourceOrderTemp.length}</p>
               
                </Col> */}
                {/* <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <p>Total Profit:{profitTotal}</p>
               
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
