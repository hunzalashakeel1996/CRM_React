import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiReportOrderWise } from '../../../../redux/apis/DataAction';
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

  const {selectedFilter, subOrderType,ordertypeParent,  isSearchPressed, orderdatefrom, orderdateto, dateFormat,dataSourceOrderTempParent, dataSourceOrder, dataOrderDownload, activeTab, onAddOrderCount } = props

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setState] = useState({

    sortedInfo: [],

    isLoader: false,
   
    profitTotal: 0,
    dataOrderSource: [],
    orderdatetoCheck: 'todate',
    orderdatefromCheck: 'fromdate',
    dataSourceParent: []

  });

  const {orderdatefromCheck,orderdatetoCheck,dataSourceParent, sortedInfo, isLoader, dataOrderSource, profitTotal } = state

  let isOrderTypeShow = selectedFilter == 'All' ? true : false

  useEffect(() => {
 
    if (isSearchPressed && activeTab === 'OrderPNL' && (orderdatetoCheck !== orderdateto || orderdatefromCheck !== orderdatefrom)) {
      let tempDataSource_report_order_wise = [];
  
      setState({...state,isLoader:true})
      dispatch(apiReportOrderWise({ dateFormat: dateFormat, orderdateto: orderdateto, orderdatefrom: orderdatefrom })).then(data => {

      
        data[1].map(value => {

          const { ORDERTYPE,
            orderno,
            FULLNAME,
            Zip,
            State,
            po_shipping,
            customerPay,
            ShippingCost,
            cost,
            purchaseCost,
            ordertotal,
            Moneycollected,
            commission,
            profit,
            Isdropship,
            IsReplacement,
            OrderDiscount,
            orderstatus
  
          } = value;
  
  
          tempDataSource_report_order_wise.push({
            ORDERTYPE: ORDERTYPE,
            orderno: orderno,
            FULLNAME: FULLNAME,
            Zip: Zip,
            State: State,
            po_shipping: `$${Math.round(po_shipping * 100) / 100}`,
            customerPay: `$${Math.round(customerPay * 100) / 100}`,
            ShippingCost: `$${Math.round(ShippingCost * 100) / 100}`,
            cost: `$${Math.round(cost * 100) / 100}`,
            purchaseCost: `$${Math.round(purchaseCost * 100) / 100}`,
            ordertotal: `$${Math.round(ordertotal * 100) / 100}`,
            Moneycollected: `$${Math.round(Moneycollected * 100) / 100}`,
            commission: `$${Math.round(commission * 100) / 100}`,
            profit: `$${Math.round(profit * 100) / 100}`,
            Isdropship: Isdropship,
            IsReplacement: IsReplacement,
            OrderDiscount: `$${Math.round(OrderDiscount * 100) / 100}`,
            orderstatus: orderstatus
  
  
          });
  
        });
        filterTotalValue(data[1])
        setState({
          ...state, dataOrderDownload: data[0],
          dataOrderSource: tempDataSource_report_order_wise,
          dataSourceParent: tempDataSource_report_order_wise,
          orderdatetoCheck: orderdateto, orderdatefromCheck: orderdatefrom
        })

 
      })
      
    }
    else if (activeTab === 'OrderPNL' )
    {
      let ordertype = []
      let tempOrderSummary = [];
      if (dataSourceParent.length>0&&['MarketPlace', 'Web', 'All'].includes(ordertypeParent) && activeTab === 'OrderPNL') {
      
        if ('All' === ordertypeParent) {
          setState({ ...state,  dataOrderSource: [...dataSourceParent]});
          filterTotalValue([...dataSourceParent])
          return
        }
    
        ordertype = ordertypeParent === 'MarketPlace' ?
          ['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay', 'MPALL']
          :
          ['PU', 'JLC', 'WebALL']
    
        tempOrderSummary = dataSourceParent.filter(item => ordertype.includes(item.ORDERTYPE))
    
        setState({ ...state,  dataOrderSource: tempOrderSummary,  isSellerType: 'Enable', selectedFilter: ordertypeParent});
        filterTotalValue(tempOrderSummary)
      }   
     
    
     
    
      if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&'MPALL' === subOrderType) {
     
        tempOrderSummary = dataSourceParent.filter(item =>
          item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
          item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
          item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
        )
       
  
        setState({ ...state,dataOrderSource:tempOrderSummary});
        filterTotalValue(tempOrderSummary)
      }
  
       if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay'].includes(subOrderType)) {
    
      
  
        tempOrderSummary = dataSourceParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE']=== (subOrderType))
  
      
        setState({ ...state,dataOrderSource:tempOrderSummary});
        filterTotalValue(tempOrderSummary)
      }
       if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&['JLC', 'PU'].includes(subOrderType)) {
      
        tempOrderSummary = dataSourceParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(subOrderType))
      
      
        setState({ ...state,dataOrderSource:tempOrderSummary});
        filterTotalValue(tempOrderSummary)
  
      }
  
       if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&'WebALL' === subOrderType) {
  
        tempOrderSummary = dataSourceParent.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))
      
        setState({ ...state,dataOrderSource:tempOrderSummary});
        filterTotalValue(tempOrderSummary)
      }
  
      filterTotalValue( dataOrderSource)

    }
   

  }, [isSearchPressed, orderdateto, orderdatefrom, activeTab, selectedFilter]);


 useEffect(() => {    
    
    let ordertype = []
  
    let tempOrderSummary = [];
 
    if (dataSourceParent.length>0&&['MarketPlace', 'Web', 'All'].includes(ordertypeParent) && activeTab === 'OrderPNL') {
      
      if ('All' === ordertypeParent) {
        setState({ ...state,  dataOrderSource: [...dataSourceParent]});
        filterTotalValue([...dataSourceParent])
        return
      }
  
      ordertype = ordertypeParent === 'MarketPlace' ?
        ['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay', 'MPALL']
        :
        ['PU', 'JLC', 'WebALL']
  
      tempOrderSummary = [...tempOrderSummary, ...dataSourceParent.filter(item => ordertype.includes(item.ORDERTYPE))]
  
      setState({ ...state,  dataOrderSource: tempOrderSummary,  isSellerType: 'Enable', selectedFilter: ordertypeParent});
      filterTotalValue(tempOrderSummary)
    }   
    


  }, [ordertypeParent,dataSourceParent]);
  useEffect(() => {    
    let tempOrder = [];
    let tempItem = [];
    let tempOrderSummary = [];
    let tempItemSummary = [];
    let tempPriceSummary = [];
  
    if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&'MPALL' === subOrderType) {
   
      tempOrderSummary = [...tempOrderSummary, ...dataSourceParent.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
      )]
     

      setState({ ...state,dataOrderSource:tempOrderSummary});
      filterTotalValue(tempOrderSummary)
    }

    else if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay'].includes(subOrderType)) {
  
    

      tempOrderSummary = [...tempOrderSummary, ...dataSourceParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE']=== (subOrderType))]

    
      setState({ ...state,dataOrderSource:tempOrderSummary});
      filterTotalValue(tempOrderSummary)
    }
    else if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&['JLC', 'PU'].includes(subOrderType)) {
    
      tempOrderSummary = [...tempOrderSummary, ...dataSourceParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(subOrderType))]
    
    
      setState({ ...state,dataOrderSource:tempOrderSummary});
      filterTotalValue(tempOrderSummary)

    }

    else if (dataSourceParent.length>0&&activeTab === 'OrderPNL' &&'WebALL' === subOrderType) {

      tempOrderSummary = [...tempOrderSummary, ...dataSourceParent.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]
    
      setState({ ...state,dataOrderSource:tempOrderSummary});
      filterTotalValue(tempOrderSummary)
    }

  }, [subOrderType,dataSourceParent]);


  const onSumOrderCount = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;

    order = result.order
    for (i = 0; i < result.profit.length;) {

      profit = profit + result.profit[i].profit

      i++;
    }


    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersSum: order,
      dataSourceOrderTempParentDownload: result.data
    })

  }


  const filterTotalValue = (data) => {
    let profitTotal = 0
    let profit = []
    for (let i = 0; i < data.length; i++) {
      if (profit.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        let tempOrderSummary = { ...data[i], profit: (typeof(data[i].profit) =='number' ? data[i].profit:typeof(data[i].profit)  =='object' ? 0 :JSON.parse(data[i].profit.split('$')[1])) }
        profit.push(tempOrderSummary)
      }
      else {
        let indexTemp = profit.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        profit[indexTemp] = { ...profit[indexTemp], profit: profit[indexTemp].profit + (typeof(data[i].profit) =='number' ? data[i].profit:typeof(data[i].profit)  =='object' ? 0 :JSON.parse(data[i].profit.split('$')[1]))  }


      }


    }

    onAddOrderCount({ order: data.length, profit, data })
  }


  const filter = (value) => {
    var val = [];
    let temp =[]
    let placeholder = ``;

    return <Input
      placeholder={placeholder}
      size='small'
      onChange={e => {

        temp = [...temp, ...dataSourceParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]
        filterTotalValue(temp)
        setState({ ...state, dataOrderSource: temp });

      }}
    />
  }






  const columns = [
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order no</p>
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
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>FULL NAME</p>
        </div>,
      children: [
        {
          title: <>
            { filter('FULLNAME')}
          </>,
          dataIndex: 'FULLNAME',
          key: 'FULLNAME',
        }

      ]


    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Zip </p>
        </div>,
      children: [
        {
          title: <>
            { filter('Zip')}
          </>,
          dataIndex: 'Zip',
          key: 'Zip',
        }

      ]



    },
    {

      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>State </p>
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


    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Orderstatus</p>
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


    },
    {
      title: <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>PO shipping</p>
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
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.po_shipping - d.po_shipping,
          sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
          width: 30
        }

      ]
    },





    {
      title: <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Customer Pay</p>
      </div>,
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
          width: 30,

        }
      ]


    }
    ,
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Shipping Cost </p>
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
          width: 30,

        }
      ]

      /* { filter('ShippingCost')}
      </>,
      dataIndex: 'ShippingCost',
      key: 'ShippingCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ShippingCost - d.ShippingCost
      sortOrder: sortedInfo.columnKey === 'ShippingCost' && sortedInfo.order, */
    },

    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Cost </p>
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
          width: 30,

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
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>purchase Cost</p>
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
          width: 30,

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
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order Total</p>
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
          width: 30,

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
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Money Collected</p>
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
          width: 30,

        }
      ]

    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Commission</p>
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
          width: 30,

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
          key: 'profit'
        },
        {
          key: 'profit',
          defaultSortOrder: 'profit',
          sorter: (c, d) => c.profit - d.profit,
          sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
          width: 30,

        }
      ]

    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Is Dropship</p>
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
          width: 30,

        }
      ]

    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Is Replacement</p>
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
          width: 30,

        }
      ]

    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order Discount</p>
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
          width: 30,

        }
      ]

    }




  ];

  const handleChange = (pagination, filters, sorter) => {
    setState({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const handleSearch = (searchText) => {




    temp = [...temp, ...dataSourceOrder.filter(item => item['orderno'].toUpperCase().includes(searchText.toUpperCase()))]



    setState({ ...state, dataSource: temp });
  };
  const Download = (data) => {

    downloadFile(data)
  }

  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>


        <Row >
          {/*        
              <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <p>Total Orders:{dataSource.length}</p>
               
                </Col> */}
          {/* <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <p>Total Profit:{profitTotal}</p>
               
                </Col> */}

          <Col xs={24}>
            <Cards headless>
              {/* <ProjectList> */}

              <div className="table-responsive">
                {/* <Styles> */}
                <Table size='small' pagination={true} scroll={{ x: 2000, y: 1000 }} dataSource={dataOrderSource} columns={columns} onChange={handleChange} />
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