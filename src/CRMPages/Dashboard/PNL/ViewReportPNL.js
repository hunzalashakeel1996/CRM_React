import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/buttons/buttons';
import DetailPNL from './overview/DetailPNL';
import ItemPNLSummary from './overview/ItemPNLSummary';
import OrderPNLSummary from './overview/OrderPNLSummary';
import PricePNLSummary from './overview/PricePNLSummary';
import ItemPNL from './overview/ItemPNL';
import OrderPNL from './overview/OrderPNL';
import { Cards } from '../../../components/cards/frame/cards-frame';

import { downloadFile,downloadFileTableData } from '../../../components/utilities/utilities'
import { apiReportOrderWise, apiReportItemWise, apiSummaryReportOrderWise, apiSummaryReportItemWise, apiSummaryReportPriceWise, apiSummaryReportDetailWise } from '../../../redux/apis/DataAction';
// import { webURL, audioPlay, uploadUrl, getVendorName, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getInventoryapi, getInventoryWalmart_all_otherapi, getInventoryWalmartapi, getEbayqtyapi, getSearsqtyapi, getSears_all_otherapi, getWallMartCAqtyapi, getwalmartCA_all_otherapi, getSearsPriceapi, getPriceWalmartapi } from '../../../redux/apis/DataAction';
import './overview/style.css';


const { TabPane } = Tabs;
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



const ReportPNLView = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

  const tabChildBar = JSON.parse(userAccess.top_navigation)['Report PNL'];

  const [activeTab, setActiveTab] = useState('OrderPNL');


  const [state, setstate] = useState({


    dataSourceOrder: [],
    dataSourceItem: [],
    dataSourcePrice: [],
    dataSourceDetails: [],
    isLoader: false,
    dataOrderDownload: '',
    dataItemDownload: '',
    sellerType: [],
    isSellerType: 'disabled',
    filterValue: '',
    dataSourceOrderTempParent: [],
    dataSourceItemTempParent: [],
    dataSourceOrderSummaryTempParent: [],
    dataOrderSummaryDownload: '',
    dataSourceOrderSummary: [],

    dataSourceItemSummaryTempParent: [],
    dataItemSummaryDownload: '',
    dataSourceItemSummary: [],

    dataSourcePriceSummaryTempParent: [],
    dataPriceSummaryDownload: '',
    dataSourcePriceSummary: [],
    dataSourcetotalOrders: 0,
    totalOrdersSum: 0,
    totalOrdersLoss: 0,
    totalOrdersProfit: 0,
    dateFormat: 'USPS',

  });

  const { dateFormat, totalOrdersProfit, totalOrdersLoss, totalOrdersSum, dataSourcetotalOrders, dataSourcePriceSummary, dataPriceSummaryDownload, dataSourcePriceSummaryTempParent, dataSourceItemsummary, dataItemsummaryDownload, dataSourceItemsummaryTempParent, dataSourceOrdersummary, dataOrdersummaryDownload, dataSourceOrdersummaryTempParent, dataSourceOrderTempParent, dataSourceItemTempParent, filterValue, isSellerType, sellerType, dataOrderDownload, dataItemDownload, dataSourceOrder, isLoader, dataSourceItem, dataSourcePrice, dataSourceDetails } = state

  let tempDataSource_summary_report_order_wise = [];
  let tempDataSource_report_order_wise = [];
  let tempDataSource_summary_report_item_wise = [];
  let tempDataSource_report_item_wise = [];
  let tempDataSource_summary_report_Price_wise = [];
  let tempDataSource_summary_report_Detail_wise = [];

  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const getsummary_report_order_wise = () => {
    setstate({ ...state, isLoader: true })
    Promise.all([

      //  dispatch(apiSummaryReportDetailWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
      dispatch(apiReportOrderWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiReportItemWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiSummaryReportOrderWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiSummaryReportItemWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiSummaryReportPriceWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
    ]).then((data) => {
      console.log('data', data)
      //Order PNL
      data[0][1].map(value => {

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
      //  downloadFile(data[0][0])
      //Item PNL
      data[1][1].map(value => {

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
      //Order summary    
      data[2][1].map(value => {

        const { vendorname,
          order_count,
          profit,
          loss,
          percentge,
          ORDERTYPE

        } = value;

        // console.log('checking', `$${(Math.round(profit * 100) / 100)}`)
        tempDataSource_summary_report_order_wise.push({
          // vendorname: <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}-crm-${state.startDate.format('MM/DD/YYYY')}-crm-${state.endDate.format('MM/DD/YYYY')}-crm-${dateFormat}-crm-${ORDERTYPE}`}}><span style={{color: 'black'}} className="date-started">{vendorname}</span></Link>,
          vendorname: vendorname,
          order_count: order_count,
          profit:`$${(Math.round(profit * 100) / 100)}`,
          loss:  `$${(Math.round(loss * 100) / 100)}` ,
          percentge: `${percentge} %`,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit`}}><span style={{color: '#42ba96', textDecoration:'underline'}} className="date-started">{(Math.round(profit * 100) / 100)}</span></Link>,
          lossLink:  <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss`}}><span style={{color: '#42ba96', textDecoration:'underline'}} className="date-started">{Math.round(loss * 100) / 100}</span></Link> ,
          
        });

      });
      // let OrderPNL = []     
      // for(let i=0; i<tempDataSource_summary_report_order_wise.length; i++){
      // if(OrderPNL.filter(value=>value.vendorname===tempDataSource_summary_report_order_wise[i].vendorname).length<=0){

      //   OrderPNL.push(tempDataSource_summary_report_order_wise[i])
      // }
      // else{
      //   let indexTemp = OrderPNL.findIndex(item=>item.vendorname===tempDataSource_summary_report_order_wise[i].vendorname)
      //   OrderPNL[indexTemp] = {...OrderPNL[indexTemp], order_count:OrderPNL[indexTemp].order_count+tempDataSource_summary_report_order_wise[i].order_count}

      //   let indexTemp1 = OrderPNL.findIndex(item=>item.vendorname===tempDataSource_summary_report_order_wise[i].vendorname)
      //   OrderPNL[indexTemp1] = {...OrderPNL[indexTemp1], profit:OrderPNL[indexTemp1].profit+tempDataSource_summary_report_order_wise[i].profit}

      //   let indexTemp2 = OrderPNL.findIndex(item=>item.vendorname===tempDataSource_summary_report_order_wise[i].vendorname)
      //   OrderPNL[indexTemp2] = {...OrderPNL[indexTemp2], loss:OrderPNL[indexTemp2].loss+tempDataSource_summary_report_order_wise[i].loss}

      //   let indexTemp3 = OrderPNL.findIndex(item=>item.vendorname===tempDataSource_summary_report_order_wise[i].vendorname)
      //   OrderPNL[indexTemp3] = {...OrderPNL[indexTemp3], percentge:Math.round(tempDataSource_summary_report_order_wise[i].loss*100/tempDataSource_summary_report_order_wise[i].order_count* 100) / 100}

      // }

      // }
      // ,'Orderloss',Orderloss,'Orderprofit',Orderprofit
      console.log('OrderPNL', OrderPNL)
      // tempDataSource_summary_report_order_wise.push(OrderPNL)
      // let temp = []
      // for(let i=0; i<OrderPNL.length;i++){
      //   let orderProfit = Orderprofit.filter(value=>value)
      //   let orderLoss = Orderprofit
      //   temp.push({vendorname: OrderPNL[i].vendorname, order_count: OrderPNL[i].order_count, profit: Orderprofit[]})
      // }
      data[3][1].map(value => {

        const { vendorname,
          Item_count,
          Total_item_profit,
          Total_item_loss,
          percentge,
          ORDERTYPE

        } = value;


        tempDataSource_summary_report_item_wise.push({
          vendorname: vendorname,
          Item_count: Item_count,
          Total_item_profit: `$${Math.round(Total_item_profit * 100) / 100}`,
          Total_item_loss: `$${Math.round(Total_item_loss * 100) / 100}`,
          percentge: `${percentge}%`,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit`}}><span style={{color: '#42ba96', textDecoration:'underline'}} className="date-started">{(Math.round(Total_item_profit * 100) / 100)}</span></Link>,
          lossLink:  <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss`}}><span style={{color: '#42ba96', textDecoration:'underline'}} className="date-started">{Math.round(Total_item_loss * 100) / 100}</span></Link> ,
          


        });

      });
      //  downloadFile(data[2][0])
      //  Price PNL
      data[4][1].map(value => {

        const { vendorname
          , TotalAmont
          , profit
          , loss
          , percentge
          , ORDERTYPE
        } = value;

        tempDataSource_summary_report_Price_wise.push({
          vendorname: vendorname,
          TotalAmont: `$${Math.round(TotalAmont * 100) / 100}`,
          profit: `$${Math.round(profit * 100) / 100}`,
          loss: `$${Math.round(loss * 100) / 100}`,
          percentge: `${Math.round(percentge * 100) / 100}%`,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit`}}><span style={{color: '#42ba96', textDecoration:'underline'}} className="date-started">{(Math.round(profit * 100) / 100)}</span></Link>,
          lossLink:  <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss`}}><span style={{color: '#42ba96', textDecoration:'underline'}} className="date-started">{Math.round(loss * 100) / 100}</span></Link> ,
          
        });

      });

      // downloadFile(data[2][0])
      //        //Detail PNL
      //        data[3][1].map(value => {

      //           const { vendorname,
      //               merchantsku,
      //               vendorstylecode,
      //               colorcode,
      //               sizename,
      //               orderstatus,
      //               itemstatus,
      //               orderdate,
      //               uspsdate,
      //               ORDERTYPE,
      //               orderno,
      //               purchaseorderno,
      //               itemqty,
      //               cost,
      //               purchaseCost,
      //               commit_status,
      //               commision,
      //               SalePrice,
      //               pu_price,
      //               Weight,
      //               shipping,
      //               po_shipping,
      //               ups_usps_item_shipping,
      //               usps_order_shipping,
      //               ups_order_shipping,
      //               isRMA,
      //               customer_pay_ship,
      //               profit,
      //               PPS,
      //               final_profit,
      //               Type

      //                } = value;

      //           tempDataSource_summary_report_Detail_wise.push({
      //               vendorname:vendorname,
      //               merchantsku:merchantsku,
      //               vendorstylecode:vendorstylecode,
      //               colorcode:colorcode,
      //               sizename:sizename,
      //               orderstatus:orderstatus,
      //               itemstatus:itemstatus,
      //               orderdate:orderdate,
      //               uspsdate:uspsdate,
      //               ORDERTYPE:ORDERTYPE,
      //               orderno:orderno,
      //               purchaseorderno:purchaseorderno,
      //               itemqty:itemqty,
      //               cost:Math.round(cost * 100) / 100   ,
      //               purchaseCost: Math.round(purchaseCost * 100) / 100  ,
      //               commit_status:commit_status,
      //               commision: Math.round(commision * 100) / 100  ,
      //               SalePrice:Math.round(SalePrice * 100) / 100  ,
      //               pu_price:Math.round(pu_price * 100) / 100  ,
      //               Weight: Math.round(Weight * 100) / 100  ,
      //               shipping:Math.round(shipping * 100) / 100  ,
      //               po_shipping: Math.round(po_shipping * 100) / 100   ,
      //               ups_usps_item_shipping: Math.round(ups_usps_item_shipping * 100) / 100  ,
      //               usps_order_shipping: Math.round(usps_order_shipping * 100) / 100  ,
      //               ups_order_shipping: Math.round(ups_order_shipping * 100) / 100  ,
      //               isRMA:isRMA,
      //               customer_pay_ship:Math.round(customer_pay_ship * 100) / 100 ,
      //               profit: Math.round(profit * 100) / 100 ,
      //               PPS:PPS,
      //               final_profit: Math.round(final_profit * 100) / 100 ,
      //               Type:Type

      //           });

      //         });
      //         downloadFile(data[3][0])
      // let json = JSON.stringify(data[3][1])
      // // console.log('json',json)



      setstate({
        ...state, dataOrderDownload: data[0][0],
        dataSourceOrderTempParent: [...tempDataSource_report_order_wise],
        dataSourceOrder: [...tempDataSource_report_order_wise],
        // dataSourcetotalOrders:tempDataSource_report_order_wise.length,

        dataItemDownload: data[1][0],
        dataSourceItem: [...tempDataSource_report_item_wise],
        dataSourceItemTempParent: [...tempDataSource_report_item_wise],


        dataOrdersummaryDownload: data[2][0],
        dataSourceOrdersummary: [...tempDataSource_summary_report_order_wise],
        dataSourceOrdersummaryTempParent: [...tempDataSource_summary_report_order_wise],

        dataItemsummaryDownload: data[3][0],
        dataSourceItemsummary: [...tempDataSource_summary_report_item_wise],
        dataSourceItemsummaryTempParent: [...tempDataSource_summary_report_item_wise],

        dataPriceSummaryDownload: data[4][0],
        dataSourcePriceSummary: [...tempDataSource_summary_report_Price_wise],
        dataSourcePriceSummaryTempParent: [...tempDataSource_summary_report_Price_wise],

        // dataSourceDetails: [...tempDataSource_summary_report_Detail_wise],
        isLoader: false
      });




    });

  }

  const onGetOrderSummary = () => {
    dispatch(apiSummaryReportOrderWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })).then(data => {
      //Order summary    
      data.map(value => {

        const { vendorname,
          order_count,
          profit,
          loss,
          percentge,
          ORDERTYPE

        } = value;

        // console.log('checking', `$${(Math.round(profit * 100) / 100)}`)
        tempDataSource_summary_report_order_wise.push({
          vendorname: vendorname,
          order_count: order_count,
          profit: `$${(Math.round(profit * 100) / 100)}`,
          loss: `$${Math.round(loss * 100) / 100}`,
          percentge: `${percentge} %`,
          ORDERTYPE: ORDERTYPE


        });

      });
    })
  }

  const onSum = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    var sum = 0;
    console.log('onSum', result)
    for (i = 0; i < result.order.length;) {
      //strip out dollar signs and commas
      console.log('split', result.profit[i].profit)
      let v = JSON.parse(result.profit[i].profit);

      //convert string to integer
      var ct = parseFloat(v);
      console.log('ct', ct)
      sum += ct;
      console.log('ae', result.order[i].order_count ? 'result.order[i].order_count' : result.order[i].Item_count ? 'result.order[i].Item_count' : 'result.order[i].TotalAmount')
      order = order + result.order[i].order_count

      profit = profit + result.profit[i].profit
      Loss = Loss + result.loss[i].loss
      i++;
    }
    console.log('profit', sum);
    // console.log('profit', profit.replace('$', ''))

    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order
    })

  }

  const onSumItem = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    console.log('item', result)
    console.log('order1', order)
    for (i = 0; i < result.order.length;) {
      // let v = JSON.parse(result.profit[i].Total_item_profit);
      console.log('avd3', result.profit[i].Total_item_profit)
      order = order + result.order[i].Item_count

      profit = profit + result.profit[i].Total_item_profit
      Loss = Loss + result.loss[i].Total_item_loss
      i++;
    }
    console.log('orer0', order)

    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order
    })

  }

  const onSumPrice = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    console.log('price', result)
    console.log('order1', order)
    for (i = 0; i < result.order.length;) {
      console.log('ae', result.order[i].order_count ? 'result.order[i].order_count' : result.order[i].Item_count ? 'result.order[i].Item_count' : 'result.order[i].TotalAmount')
      order = order + result.order[i].TotalAmont
      console.log('order20', order)
      profit = profit + result.profit[i].profit
      Loss = Loss + result.loss[i].loss
      i++;
    }
    console.log('orer0', order)

    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order
    })

  }
  const onSumOrderCount = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    console.log('price', result)
    console.log('order1', order)
    order = result.order
    for (i = 0; i < result.profit.length;) {
      //  console.log('ae',result.order[i].order_count?'result.order[i].order_count':result.order[i].Item_count?'result.order[i].Item_count':'result.order[i].TotalAmount' )

      profit = profit + result.profit[i].profit

      i++;
    }
    console.log('orer0', order)

    setstate({
      ...state,
      totalOrdersProfit: profit,
      // totalOrdersLoss: Loss,
      totalOrdersSum: order
    })

  }
  const onSumItemCount = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;

    order = result.order
    for (i = 0; i < result.profit.length;) {
      profit = profit + result.profit[i].profit

      i++;
    }
    console.log('orer0', order)

    setstate({
      ...state,
      totalOrdersProfit: profit,
      // totalOrdersLoss: Loss,
      totalOrdersSum: order
    })

  }

  const topMenu = [
    {
      tab: 'PNL Order Summary',
      key: 'OrderPNLSummary',
      tabName: <OrderPNLSummary activeTab={activeTab} onAddOrder={(value) => onSum(value)} dataSourceOrdersummaryTempParent={dataSourceOrdersummaryTempParent} dataSourceOrdersummary={dataSourceOrdersummary} />
    },
    {
      tab: 'PNL Item Summary',
      key: 'ItemPNLSummary',
      tabName: <ItemPNLSummary activeTab={activeTab} onAddItem={(value) => onSumItem(value)} dataSourceItemsummaryTempParent={dataSourceItemsummaryTempParent} dataSourceItemsummary={dataSourceItemsummary} />

    },
    {
      tab: 'PNL Price Summary',
      key: 'PricePNLSummary',
      tabName: <PricePNLSummary activeTab={activeTab} onAddPrice={(value) => onSumPrice(value)} dataSourcePriceSummaryTempParent={dataSourcePriceSummaryTempParent} dataSourcePriceSummary={dataSourcePriceSummary} />

    }
    ,
    // {
    //     tab: 'PNL Detail',
    //     key: 'Detail PNL',
    //     tabName: <DetailPNL  dataSourceDetails={dataSourceDetails}  />

    // }
    // ,
    {
      tab: 'PNL Order',
      key: 'OrderPNL',
      tabName: <OrderPNL activeTab={activeTab} onAddOrderCount={(value) => onSumOrderCount(value)} dataSourceOrder={dataSourceOrder} dataSourceOrderTempParent={dataSourceOrderTempParent} />

    }
    ,
    {
      tab: 'PNL Item',
      key: 'ItemPNL',
      tabName: <ItemPNL activeTab={activeTab} onAddItemCount={(value) => onSumItemCount(value)} dataSourceItem={dataSourceItem} dataSourceItemTempParent={dataSourceItemTempParent} />

    }
  ];


  const handleOrderTypeChange = (e) => {
    let ordertype = []
    let tempOrder = [];
    let tempOrderSummary = [];
    let tempItemSummary = [];
    let tempPriceSummary = [];
    let tempItem = [];

    if ('MarketPlace' === e.target.value.toString()) {

      ordertype = ['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay', 'MPALL']
      //orderwise filter
      tempOrder = [...tempOrder, ...dataSourceOrder.filter(item => ordertype.includes(item.ORDERTYPE))]

      //itemwise filter
      tempItem = [...tempItem, ...dataSourceItem.filter(item => ordertype.includes(item.ORDERTYPE))]

      //ordersummarywise filter
      tempOrderSummary = [...tempOrderSummary, ...dataSourceOrdersummary.filter(item => ordertype.includes(item.ORDERTYPE))]

      //Itemsummarywise filter
      tempItemSummary = [...tempItemSummary, ...dataSourceItemsummary.filter(item => ordertype.includes(item.ORDERTYPE))]

      //Itemsummarywise filter
      tempPriceSummary = [...tempPriceSummary, ...dataSourcePriceSummary.filter(item => ordertype.includes(item.ORDERTYPE))]

      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem, sellerType: ordertype, isSellerType: 'Enable' });

    }
    else if ('Web' === e.target.value.toString()) {
      ordertype = ['PU', 'JLC', 'WebALL']

      tempOrder = [...tempOrder, ...dataSourceOrder.filter(item => ordertype.includes(item.ORDERTYPE))]

      tempItem = [...tempItem, ...dataSourceItem.filter(item => ordertype.includes(item.ORDERTYPE))]

      //ordersummatywise filter
      tempOrderSummary = [...tempOrderSummary, ...dataSourceOrdersummary.filter(item => ordertype.includes(item.ORDERTYPE))]
      //Itemsummatywise filter
      tempItemSummary = [...tempItemSummary, ...dataSourceItemsummary.filter(item => ordertype.includes(item.ORDERTYPE))]

      tempPriceSummary = [...tempPriceSummary, ...dataSourcePriceSummary.filter(item => ordertype.includes(item.ORDERTYPE))]

      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem, sellerType: ordertype, isSellerType: 'Enable' });

    }
    else if ('All' === e.target.value.toString()) {
      ordertype = []
      setstate({ ...state, dataSourcePriceSummaryTempParent: [...dataSourcePriceSummary], dataSourceItemsummaryTempParent: [...dataSourceItemsummary], dataSourceOrdersummaryTempParent: [...dataSourceOrdersummary], dataSourceOrderTempParent: [...dataSourceOrder], dataSourceItemTempParent: [...dataSourceItem], sellerType: ordertype, isSellerType: 'Enable' });
    }
  };

  const handleTypeChange = e => {
    let tempOrder = [];
    let tempItem = [];
    let tempOrderSummary = [];
    let tempItemSummary = [];
    let tempPriceSummary = [];

    if ('MPALL' === e.target.value.toString()) {
      tempOrder = [...tempOrder, ...dataSourceOrder.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay')]

      tempItem = [...tempItem, ...dataSourceItem.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay')]

      //ordersummatywise filter
      tempOrderSummary = [...tempOrderSummary, ...dataSourceOrdersummary.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
      )]
      //Itemsummatywise filter
      tempItemSummary = [...tempItemSummary, ...dataSourceItemsummary.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
      )]
      //Itemwise filter
      tempItem = [...tempItem, ...dataSourceItem.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay')]
      //Pricewise filter
      tempPriceSummary = [...tempPriceSummary, ...dataSourcePriceSummary.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay')]



      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem });
    }

    else if (['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay'].includes(e.target.value.toString())) {
      tempOrder = [...tempOrder, ...dataSourceOrder.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase() === (e.target.value.toUpperCase()))]

      tempOrderSummary = [...tempOrderSummary, ...dataSourceOrdersummary.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase() === (e.target.value.toUpperCase()))]

      tempItemSummary = [...tempItemSummary, ...dataSourceItemsummary.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase() === (e.target.value.toUpperCase()))]

      tempPriceSummary = [...tempPriceSummary, ...dataSourcePriceSummary.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase() === (e.target.value.toUpperCase()))]

      tempItem = [...tempItem, ...dataSourceItem.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase() === (e.target.value.toUpperCase()))]

      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, filterValue: e.target.value, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem });
    }
    else if (['JLC', 'PU'].includes(e.target.value.toString())) {
      // cond for pu
      // filter(item => item.orderno.split('-')[0]!=='JLC)
      // filter(item => item.orderno.split('-')[0]==='JLC)
      //   console.log('PU',...dataSourceOrder)
      tempOrder = [...tempOrder, ...dataSourceOrder.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]
      tempOrderSummary = [...tempOrderSummary, ...dataSourceOrdersummary.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]
      tempItem = [...tempItem, ...dataSourceItem.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]

      tempItemSummary = [...tempItemSummary, ...dataSourceItemsummary.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]

      tempPriceSummary = [...tempPriceSummary, ...dataSourcePriceSummary.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]
      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, filterValue: e.target.value, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem });

    }

    else if ('WebALL' === e.target.value.toString()) {

      tempOrder = [...tempOrder, ...dataSourceOrder.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]

      tempItem = [...tempItem, ...dataSourceItem.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]

      tempOrderSummary = [...tempOrderSummary, ...dataSourceOrdersummary.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]
      tempItemSummary = [...tempItemSummary, ...dataSourceItemsummary.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]
      tempPriceSummary = [...tempPriceSummary, ...dataSourcePriceSummary.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]
      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem });
    }
  };
  const download = (event) => {

    let activeTab = event

    if (activeTab === 'OrderPNL') {
      // downloadFile(dataOrderDownload)
     
       downloadFileTableData(dataSourceOrderTempParent,'OrderPNL')
    }
    else if (activeTab === 'ItemPNL') {
     // downloadFile(dataItemDownload)
      downloadFileTableData(dataSourceItemTempParent,'ItemPNL')
    }
    else if (activeTab === 'OrderPNLSummary') {
      let temp = [...dataSourceOrdersummaryTempParent]
     // downloadFile(dataOrdersummaryDownload)
     for(let i=0; i<temp.length;i++){
       delete temp[i]['profitLink']
       delete temp[i]['lossLink']
       delete temp[i]['ORDERTYPE']
     }
      downloadFileTableData(temp,'OrderPNLSummary')
    }
    else if (activeTab === 'ItemPNLSummary') {
      let temp = [...dataSourceItemsummaryTempParent]
      for(let i=0; i<temp.length;i++){
        delete temp[i]['profitLink']
        delete temp[i]['lossLink']
        delete temp[i]['ORDERTYPE']
      }
      downloadFileTableData(temp,'ItemPNLSummary')
    }
    else if (activeTab === 'PricePNLSummary') {
      let temp = [...dataSourcePriceSummaryTempParent]
      for(let i=0; i<temp.length;i++){
        delete temp[i]['profitLink']
        delete temp[i]['lossLink']
        delete temp[i]['ORDERTYPE']
      }
      downloadFileTableData(temp,'PricePNLSummary')
    }
  }


  const handleChangeDateFormat = (value) => {
    console.log(`selected ${value}`);

    setstate({ ...state, dateFormat: value })
  }

  const onSetActivetab = (key) => {
    setActiveTab(key)
  }

  return (
    <>
      {/* <h1>test</h1> */}
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >

        <Row style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          <Col span={24}>
            <Cards title="PNL Report">
              <Row gutter={25}>
                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }} placeholder="Start date" size='small' onChange={(date) => { onChange(date, 'startDate') }} />

                </Col>

                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }}
                    placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                </Col>

                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>

                  <Select defaultValue={dateFormat} style={{ width: 180 }} onChange={handleChangeDateFormat}>

                    <Option value="USPS">USPS</Option>
                    <Option value="Order">Order</Option>

                  </Select>
                </Col>


              </Row>

              <Row>
                <Col xs={24} style={{ marginBottom: 10 }}>
                  <Button type="primary" onClick={getsummary_report_order_wise} style={{ marginRight: 10, }} > Search</Button>

                  {dataSourceOrder.length > 0 && <Button type="success"
                    onClick={(value) => { download(activeTab) }} >
                    Download
                  </Button>}
                </Col>
              </Row>

              {dataSourceOrder.length > 0 && <Row style={{ marginTop: 10 }}>
                <Col span={1}>

                  <label>Filtes:</label>
                </Col>
                <Col span={10} >

                  <Radio.Group onChange={handleOrderTypeChange}>
                    <Radio.Button value="Web">Web</Radio.Button>
                    <Radio.Button value="MarketPlace">MarketPlace</Radio.Button>
                    <Radio.Button value="All">All</Radio.Button>
                  </Radio.Group>

                  <Row style={{ marginTop: 10 }} >

                    <Col span={15}>

                      <Radio.Group onChange={handleTypeChange} optionType="button" buttonStyle="solid" disabled={isSellerType === 'disabled' ? true : false}>

                        {sellerType.map(val => (

                          <Radio.Button value={val}>{val}</Radio.Button>
                        ))}
                      </Radio.Group>
                    </Col>
                  </Row>
                </Col>
                <Col span={2}>

                  <label style={{ fontSize: 13, fontWeight: 'bold'}} >{activeTab === 'PricePNLSummary'?'Total Amount':'TotalOrders'}: </label>
                  <p style={{ fontSize: 13, fontWeight: 'bold'}}>{Math.round(totalOrdersSum * 100) / 100}</p> 
                </Col>
                {(activeTab !== 'OrderPNL' && activeTab !== 'ItemPNL') && <Col span={2}>

                  <label style={{ fontSize: 13, fontWeight: 'bold'}}>Total Loss: </label>
                  <p style={{ fontSize: 13, fontWeight: 'bold'}}>${Math.round(totalOrdersLoss * 100) / 100}</p>  
                </Col>}
                <Col span={2}>

                  <label style={{ fontSize: 13, fontWeight: 'bold'}}>Total Profit: </label>
                  <p style={{ fontSize: 13, fontWeight: 'bold'}}>${Math.round(totalOrdersProfit * 100) / 100}</p>   
                </Col>
                {(activeTab !== 'OrderPNL' && activeTab !== 'ItemPNL') && <Col span={2}>

                  <label style={{ fontSize: 13, fontWeight: 'bold'}}>Total Profit Average: </label>
                  <p style={{ fontSize: 13, fontWeight: 'bold'}}>${Math.round(totalOrdersProfit*100/totalOrdersSum * 100) / 100}</p>   
                </Col>}
                {(activeTab !== 'OrderPNL' && activeTab !== 'ItemPNL') && <Col span={2}>
                  <label style={{ fontSize: 13, fontWeight: 'bold'}}>Total Loss Average: </label>
                  <p style={{ fontSize: 13, fontWeight: 'bold'}}> ${Math.round(totalOrdersLoss*100/totalOrdersSum * 100) / 100}</p>   
                </Col>}
              </Row>}


            </Cards>
          </Col>

        </Row>

        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { onSetActivetab(key) }} style={{ marginLeft: 20, marginRight: 20 }}>


          {topMenu.map(item => (
            tabChildBar?.includes(item.tab) && (

              <TabPane tab={item.tab} key={item.key}>

                {item.tabName}
              </TabPane>

            )

          ))}


        </Tabs>

      </Spin >


    </>
  );
};

export default ReportPNLView;