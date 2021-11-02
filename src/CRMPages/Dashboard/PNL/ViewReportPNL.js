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

import { downloadFile, downloadFileTableData } from '../../../components/utilities/utilities'
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
  //console.log(tabChildBar)
  const [activeTab, setActiveTab] = useState('OrderPNL');
  const [isSearchPressed, setIsSearchPressed] = useState(false);

  const [state, setstate] = useState({


    dataSourceOrdersummary: [],
    dataSourceItemsummary:[],
    dataSourceOrder:[],
    dataSourceItem: [],
    dataSourcePrice: [],
    dataSourceDetails: [],
    isLoader: false,
    dataOrderDownload: '',
    dataItemDownload: '',
    sellerType: [],
    isSellerType: 'disabled',
    filterValue: '',
    selectedFilter: '',

    dataOrdersummaryDownloadTempParent: [],
    dataSourceOrderTempParentDownload: [],

    dataSourceItemTempParent: [],
    dataSourceItemTempParentDownload: [],

    dataSourceOrderSummary: [],
    dataOrderSummaryDownload: '',
    dataSourceOrdersummaryTempParent: [],
    dataSourceOrdersummaryTempParentDownload: [],
    dataSourceOrdersummaryTempParentAll: [],

    dataSourceItemSummary: [],
    dataItemSummaryDownload: '',
    dataSourceItemsummaryTempParent: [], 
    dataSourceItemsummaryTempParentDownload: [],
    dataSourceItemsummaryTempParentAll: [],

    dataSourcePriceSummary: [],
    dataPriceSummaryDownload: '',
    dataSourcePriceSummaryTempParent:[],
    dataSourcePriceSummaryTempParentDownload: [],
    dataSourcePriceSummaryTempParentAll:[],
  

    dataSourcetotalOrders: 0,
    totalOrdersSum: 0,
    totalOrdersLoss: 0,
    totalOrdersProfit: 0,
    dateFormat: 'USPS',
    startDate: '',
    endDate: ''
 



  });

  const {startDate,endDate,dataSourcePriceSummaryTempParentAll, dataSourceItemsummaryTempParentAll, dataSourceOrdersummaryTempParentAll, dataSourceOrderTempParentDownload, dataSourceItemTempParentDownload, dataSourceItemsummaryTempParentDownload, dataSourcePriceSummaryTempParentDownload, dataSourceItemsummaryTempParent, dataSourceOrdersummaryTempParentDownload, dateFormat, totalOrdersProfit, totalOrdersLoss, totalOrdersSum, dataSourcetotalOrders, dataSourcePriceSummary, dataPriceSummaryDownload, dataSourcePriceSummaryTempParent, dataSourceItemsummary, dataItemsummaryDownload, dataSourceOrdersummary, dataOrdersummaryDownload, dataSourceOrdersummaryTempParent, dataSourceOrderTempParent, dataSourceItemTempParent, filterValue, isSellerType, sellerType, dataOrderDownload, dataItemDownload, dataSourceOrder, isLoader, dataSourceItem, dataSourcePrice, dataSourceDetails, selectedFilter} = state
  let tempDataSource_report_order_wise = [];
  let tempDataSource_report_item_wise = [];
  let tempDataSource_summary_report_order_wise = [];
  let tempDataSource_summary_report_item_wise = [];
  let tempDataSource_summary_report_price_wise = [];

  let tempDataSource_summary_report_Detail_wise = [];
  let tempDataSource_summary_report_order_wise_All = [];
  let tempDataSource_summary_report_item_wise_All = [];
  let tempDataSource_summary_report_price_wise_All = [];

  
  const handleChange = (pagination, filters, sorter) => {
    // //console.log('Various parameters', pagination, filters, sorter);
    setstate({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const onChange = (value, key) => {
//    console.log('aaa', key, value)
    setstate({ ...state, [key]: value });

  };

  const getsummary_report_order_wise = () => {
    setstate({ ...state, isLoader: true })
    Promise.all([

      //  dispatch(apiSummaryReportDetailWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
      dispatch(apiReportOrderWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiReportItemWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      // dispatch(apiSummaryReportOrderWise({ dateFormat: dateFormat, orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(),
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
      // data[2][1].map(value => {

      //   const { vendorname,
      //     order_count,
      //     profit,
      //     loss,
      //     percentge,
      //     ORDERTYPE

      //   } = value;

      //   // //console.log('checking', `$${(Math.round(profit * 100) / 100)}`)
      //   tempDataSource_summary_report_order_wise.push({
      //     // vendorname: <Link target="_blank" to={{pathname:`/admin/PNL/SummaryDetails/${vendorname}-crm-${state.startDate.format('MM/DD/YYYY')}-crm-${state.endDate.format('MM/DD/YYYY')}-crm-${dateFormat}-crm-${ORDERTYPE}`}}><span style={{color: 'black'}} className="date-started">{vendorname}</span></Link>,
      //     vendorname: vendorname,
      //     order_count: order_count,
      //     profit: (Math.round(profit * 100) / 100),
      //     loss: (Math.round(loss * 100) / 100),
      //     percentge: `${percentge}%`,
      //     ORDERTYPE: ORDERTYPE,
      //     profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profit * 100) / 100)}</span></Link>,
      //     lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(loss * 100) / 100}</span></Link>,

      //   });

      //   tempDataSource_summary_report_order_wise_All.push({
      //     vendorname: vendorname,
      //     order_count: order_count,
      //     profit: (Math.round(profit * 100) / 100),
      //     loss: (Math.round(loss * 100) / 100),
      //     percentge: percentge,
      //     ORDERTYPE: ORDERTYPE,
      //     profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profit * 100) / 100)}</span></Link>,
      //     lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(loss * 100) / 100}</span></Link>,



      //   });
      // });

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
          Total_item_profit: Math.round(Total_item_profit * 100) / 100,
          Total_item_loss: Math.round(Total_item_loss * 100) / 100,
          percentge: `${percentge}%`,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(Total_item_profit * 100) / 100)}</span></Link>,
          lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(Total_item_loss * 100) / 100}</span></Link>,



        });

        tempDataSource_summary_report_item_wise_All.push({
          vendorname: vendorname,
          Item_count: Item_count,
          Total_item_profit: Math.round(Total_item_profit * 100) / 100,
          Total_item_loss: Math.round(Total_item_loss * 100) / 100,
          percentge: percentge,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(Total_item_profit * 100) / 100)}</span></Link>,
          lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(Total_item_loss * 100) / 100}</span></Link>,



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

        tempDataSource_summary_report_price_wise.push({
          vendorname: vendorname,
          TotalAmont: `$${Math.round(TotalAmont * 100) / 100}`,
          profit: Math.round(profit * 100) / 100,
          loss: Math.round(loss * 100) / 100,
          percentge: Math.round(percentge * 100) / 100,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${(Math.round(profit * 100) / 100)}</span></Link>,
          lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${Math.round(loss * 100) / 100}</span></Link>,

        });
        tempDataSource_summary_report_price_wise_All.push({
          vendorname: vendorname,
          TotalAmont: Math.round(TotalAmont * 100) / 100,
          profit: Math.round(profit * 100) / 100,
          loss: Math.round(loss * 100) / 100,
          percentge: Math.round(percentge * 100) / 100,
          ORDERTYPE: ORDERTYPE,
          profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profit * 100) / 100)}</span></Link>,
          lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(loss * 100) / 100}</span></Link>,

        });
      });



      setstate({
        ...state, dataOrderDownload: data[0][0],
        dataSourceOrderTempParent: [...tempDataSource_report_order_wise],
        dataSourceOrder: [...tempDataSource_report_order_wise],
         dataSourcetotalOrders:tempDataSource_report_order_wise.length,

        dataItemDownload: data[1][0],
        dataSourceItem: [...tempDataSource_report_item_wise],
        dataSourceItemTempParent: [...tempDataSource_report_item_wise],


        // dataOrdersummaryDownload: data[2][0],
        // dataSourceOrdersummary: [...tempDataSource_summary_report_order_wise],
        // dataSourceOrdersummaryTempParent: [...tempDataSource_summary_report_order_wise],
        // dataSourceOrdersummaryTempParentAll: [...tempDataSource_summary_report_order_wise_All],

        dataItemsummaryDownload: data[3][0],
        dataSourceItemsummary: [...tempDataSource_summary_report_item_wise],
        dataSourceItemsummaryTempParent: [...tempDataSource_summary_report_item_wise],
        dataSourceItemsummaryTempParentAll: [...tempDataSource_summary_report_item_wise_All],

        dataPriceSummaryDownload: data[4][0],
        dataSourcePriceSummary: [...tempDataSource_summary_report_price_wise],
        dataSourcePriceSummaryTempParent: [...tempDataSource_summary_report_price_wise],
        dataSourcePriceSummaryTempParentAll: [...tempDataSource_summary_report_price_wise_All],
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

        // //console.log('checking', `$${(Math.round(profit * 100) / 100)}`)
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
    for (i = 0; i < result.order.length;) {
      //strip out dollar signs and commas
      let v = JSON.parse(result.profit[i].profit);

      //convert string to integer
      var ct = parseFloat(v);
      sum += ct;
      order = order + result.order[i].order_count

      profit = profit + result.profit[i].profit
      Loss = Loss + result.loss[i].loss
      i++;
    }

    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceOrdersummaryTempParentDownload: result.data
    })

  }
  const onSumAll = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    let orderAll = 0;
    let LossAll = 0;
    let profitAll = 0;
    var sum = 0;
    let DataSource_summary_report_order_wise_All = []
     //console.log(result)
    for (i = 0; i < result.order.length;) {
      //strip out dollar signs and commas
      let v = JSON.parse(result.profit[i].profit);

      //convert string to integer
      var ct = parseFloat(v);
      sum += ct;
      order = order + result.order[i].order_count

      profit = profit + result.profit[i].profit
      Loss = Loss + result.loss[i].loss

      DataSource_summary_report_order_wise_All.push({
        vendorname: result.vendorname[i].vendorname,
        order_count: orderAll + result.order[i].order_count,
        profit: (Math.round(profitAll + result.profit[i].profit * 100) / 100),
        loss: (Math.round(LossAll + result.loss[i].loss * 100) / 100),
        percentge: `${(Math.round(result.profit[i].loss * 100 / result.order[i].order_count * 100) / 100)}%`,
        profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profitAll + result.profit[i].profit * 100) / 100)}</span></Link>,
        lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(LossAll + result.loss[i].loss * 100) / 100)}</span></Link>,



      });

      i++;
    }

    //  console.log('onSumAll',DataSource_summary_report_order_wise_All)
     
    //  console.log('onSumAll',[...DataSource_summary_report_order_wise_All])
    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceOrdersummaryTempParentDownload: result.data,
      dataSourceOrdersummaryTempParent: DataSource_summary_report_order_wise_All,
      selectedFilter: 'All'
    })

  }
  const onSumItem = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    //console.log('onSumItem',result)
    for (i = 0; i < result.order.length;) {
      // let v = JSON.parse(result.profit[i].Total_item_profit);

      order = order + result.order[i].Item_count

      profit = profit + result.profit[i].Total_item_profit
      Loss = Loss + result.loss[i].Total_item_loss
      i++;
    }


    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceItemsummaryTempParentDownload: result.data
    })

  }
  const onSumItemAll = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    let orderAll = 0;
    let LossAll = 0;
    let profitAll = 0;
    var sum = 0;
    let DataSource_summary_report_item_wise_All = []
     //console.log('onSumItemAll',result)
    for (i = 0; i < result.order.length;) {
      //strip out dollar signs and commas
      let v = JSON.parse(result.profit[i].Total_item_profit);

      //convert string to integer
      var ct = parseFloat(v);
      sum += ct;
      order = order + result.order[i].Item_count
      profit = profit + result.profit[i].Total_item_profit
      Loss = Loss + result.loss[i].Total_item_loss
      
      DataSource_summary_report_item_wise_All.push({
        vendorname: result.vendorname[i].vendorname,
        Item_count: orderAll + result.order[i].Item_count,
        Total_item_profit: (Math.round(profitAll + result.profit[i].Total_item_profit * 100) / 100),
        Total_item_loss: (Math.round(LossAll + result.loss[i].Total_item_loss * 100) / 100),
        percentge: `${(Math.round(result.loss[i].Total_item_loss * 100 / result.order[i].Item_count * 100) / 100)}%`,
        profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profitAll + result.profit[i].Total_item_profit * 100) / 100)}</span></Link>,
        lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(LossAll + result.loss[i].Total_item_loss * 100) / 100)}</span></Link>,



      });

      i++;
    }

    // //console.log('onSumItemAll',DataSource_summary_report_item_wise_All)
    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceItemsummaryTempParentDownload: result.data,
      dataSourceItemsummaryTempParent: [...DataSource_summary_report_item_wise_All],
      selectedFilter: 'All'
    })

  }

  const onSumPrice = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;

    for (i = 0; i < result.order.length;) {
      order = order + result.order[i].TotalAmont

      profit = profit + result.profit[i].profit
      Loss = Loss + result.loss[i].loss
      i++;
    }


    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourcePriceSummaryTempParentDownload: result.data
    })

  }
  const onSumPriceAll = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;
    let orderAll = 0;
    let LossAll = 0;
    let profitAll = 0;
    var sum = 0;
    let DataSource_summary_report_order_wise_All = []
     //console.log(result)
    for (i = 0; i < result.order.length;) {
      //strip out dollar signs and commas
      let v = JSON.parse(result.profit[i].profit);

      //convert string to integer
      var ct = parseFloat(v);
      sum += ct;
      order = order + result.order[i].TotalAmont

      profit = profit + result.profit[i].profit
      Loss = Loss + result.loss[i].loss

      DataSource_summary_report_order_wise_All.push({
        vendorname: result.vendorname[i].vendorname,
        TotalAmont: `$${(Math.round(orderAll + result.order[i].TotalAmont * 100) / 100)}`,
        profit: (Math.round(profitAll + result.profit[i].profit * 100) / 100),
        loss: (Math.round(LossAll + result.loss[i].loss * 100) / 100),
        percentge: `${(Math.round(result.profit[i].loss * 100 / result.order[i].TotalAmont * 100) / 100)}%`,
        profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${(Math.round(profitAll + result.profit[i].profit * 100) / 100)}</span></Link>,
        lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${state.startDate.format('MM-DD-YYYY')}/${state.endDate.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${(Math.round(LossAll + result.loss[i].loss * 100) / 100)}</span></Link>,



      });

      i++;
    }

   
    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourcePriceSummaryTempParentDownload: result.data,
      dataSourcePriceSummaryTempParent: [...DataSource_summary_report_order_wise_All],
      selectedFilter: 'All'
    })

  }
  const onSumOrderCount = (result) => {
    let i = 0
    let order = 0;
    let Loss = 0;
    let profit = 0;

    order = result.order
    for (i = 0; i < result.profit.length;) {
      //  //console.log('ae',result.order[i].order_count?'result.order[i].order_count':result.order[i].Item_count?'result.order[i].Item_count':'result.order[i].TotalAmount' )

      profit = profit + result.profit[i].profit

      i++;
    }


    setstate({
      ...state,
      totalOrdersProfit: profit,
      // totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceOrderTempParentDownload: result.data
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


    setstate({
      ...state,
      totalOrdersProfit: profit,
      // totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceItemTempParentDownload: result.data
    })

  }

  const topMenu = [
    {
      tab: 'PNL Order Summary',
      key: 'OrderPNLSummary',
      //tabName: <OrderPNLSummary selectedFilter={selectedFilter} activeTab={activeTab} onAddOrder={(value) => onSum(value)} dataSourceOrdersummaryTempParent={dataSourceOrdersummaryTempParent} dataSourceOrdersummary={dataSourceOrdersummary} />
      tabName: <OrderPNLSummary dateFormat={dateFormat} selectedFilter={selectedFilter} activeTab={activeTab} onAddOrder={(value) => onSum(value)} onOrderPNLSummaryParent={(data,dataParent,dataParentAll)=>{orderPNLSummaryParent(data,dataParent,dataParentAll)}} downloadFileDataLink={(value,data)=>downloadFileDataLink(value,data)} isSearchPressed={isSearchPressed}  dateFormat={dateFormat} orderdatefrom={startDate==''?'':startDate} orderdateto={endDate==''? '': endDate}/>
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
      // tabName: <OrderPNL activeTab={activeTab} onAddOrderCount={(value) => onSumOrderCount(value)} dataSourceOrder={dataSourceOrder} dataSourceOrderTempParent={dataSourceOrderTempParent} />
  tabName: <OrderPNL activeTab={activeTab} onAddOrderCount={(value) => onSumOrderCount(value)}  dataSourceOrderTempParent={dataSourceOrderTempParent} />
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

      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem, sellerType: ordertype, isSellerType: 'Enable', selectedFilter: e.target.value.toString()});

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

      setstate({ ...state, dataSourcePriceSummaryTempParent: tempPriceSummary, dataSourceItemsummaryTempParent: tempItemSummary, dataSourceOrdersummaryTempParent: tempOrderSummary, dataSourceOrderTempParent: tempOrder, dataSourceItemTempParent: tempItem, sellerType: ordertype, isSellerType: 'Enable', selectedFilter: e.target.value.toString() });

    }
    else if ('All' === e.target.value.toString()) {
      ordertype = []
      //console.log(e.target.value.toString())
      if (activeTab === 'OrderPNLSummary') {
        
        orderSummarySumAll([...dataSourceOrdersummaryTempParentAll])
      }
  else if (activeTab === 'ItemPNLSummary') {
      itemSummarySumAll([...dataSourceItemsummaryTempParentAll])
    }
   else if (activeTab === 'PricePNLSummary') {
   
      priceSummarySumAll([...dataSourcePriceSummaryTempParentAll])
    }

    }
    
  };

  const orderSummarySumAll = (data) => {
    //console.log('1')
    let order = []
    let loss = []
    let profit = []
    let percentge = []
    let vendorname = [];
    let loss_link = []
    let profit_link = []
    let ORDERTYPE = []
     console.log('orderSummarySumAll',data)
    for (let i = 0; i < data.length; i++) {


      if (vendorname.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        vendorname.push(data[i])
      }
      else {
        let indexTemp = vendorname.findIndex(item => item.vendorname === data[i].vendorname)
        vendorname[indexTemp] = { ...vendorname[indexTemp], vendorname: data[i].vendorname }
      }
      if (profit_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        profit_link.push(data[i])
      }
      else {
        let indexTemp = profit_link.findIndex(item => item.vendorname === data[i].vendorname)
        profit_link[indexTemp] = { ...profit_link[indexTemp], profit_link: data[i].profit_link }
      }

      if (ORDERTYPE.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        ORDERTYPE.push(data[i])
      }
      else {
        let indexTemp = ORDERTYPE.findIndex(item => item.vendorname === data[i].vendorname)
        ORDERTYPE[indexTemp] = { ...ORDERTYPE[indexTemp], ORDERTYPE: data[i].ORDERTYPE }
      }

      if (loss_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        loss_link.push(data[i])
      }
      else {
        let indexTemp = loss_link.findIndex(item => item.vendorname === data[i].vendorname)
        loss_link[indexTemp] = { ...loss_link[indexTemp], loss_link: data[i].loss_link }
      }
      if (order.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        order.push(data[i])
      }
      else {
        let indexTemp = order.findIndex(item => item.vendorname === data[i].vendorname)
        order[indexTemp] = { ...order[indexTemp], order_count: order[indexTemp].order_count + data[i].order_count }
      }
      if (loss.filter(value => value.vendorname === data[i].vendorname).length <= 0) {

        let tempOrderSummary = { ...data[i], loss: data[i].loss }

        loss.push(tempOrderSummary)
        // loss.push(data[i])
      }
      else {
        let indexTemp = loss.findIndex(item => item.vendorname === data[i].vendorname)

        loss[indexTemp] = { ...loss[indexTemp], loss: loss[indexTemp].loss + data[i].loss }

      }

      if (profit.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        let tempOrderSummary = { ...data[i], profit: data[i].profit }
        profit.push(tempOrderSummary)
      }
      else {
        let indexTemp = profit.findIndex(item => item.vendorname === data[i].vendorname)
        profit[indexTemp] = { ...profit[indexTemp], profit: profit[indexTemp].profit + data[i].profit }
      }

      if (percentge.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        let tempOrderSummary = { ...data[i], percentge: data[i].percentge }
        percentge.push(tempOrderSummary)
      }
      else {
        let indexTemp = percentge.findIndex(item => item.vendorname === data[i].vendorname)
        percentge[indexTemp] = { ...percentge[indexTemp], percentge: data[i].percentge }
      }


      //  //console.log(order[indexOrder].order_count + data[i].order_count)


    }


    onSumAll({ ORDERTYPE, vendorname, order, loss, profit, profit_link, loss_link, data })
  }

  const itemSummarySumAll = (data) => {
//console.log('2')
    let order = []
    let loss = []
    let profit = []
    let percentge = []
    let vendorname = [];
    let loss_link = []
    let profit_link = []
    let ORDERTYPE = []
      //console.log('itemSummarySumAll', data)
    for (let i = 0; i < data.length; i++) {

      if (vendorname.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        vendorname.push(data[i])
      }
      else {
        let indexTemp = vendorname.findIndex(item => item.vendorname === data[i].vendorname)
        vendorname[indexTemp] = { ...vendorname[indexTemp], vendorname: data[i].vendorname }
      }
      if (profit_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        profit_link.push(data[i])
      }
      else {
        let indexTemp = profit_link.findIndex(item => item.vendorname === data[i].vendorname)
        profit_link[indexTemp] = { ...profit_link[indexTemp], profit_link: data[i].profit_link }
      }
     

      if (ORDERTYPE.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        ORDERTYPE.push(data[i])
      }
      else {
        let indexTemp = ORDERTYPE.findIndex(item => item.vendorname === data[i].vendorname)
        ORDERTYPE[indexTemp] = { ...ORDERTYPE[indexTemp], ORDERTYPE: data[i].ORDERTYPE }
      }

    

      if (loss_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        loss_link.push(data[i])
      }
      else {
        let indexTemp = loss_link.findIndex(item => item.vendorname === data[i].vendorname)
        loss_link[indexTemp] = { ...loss_link[indexTemp], loss_link: data[i].loss_link }
      }

      if (order.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        order.push(data[i])
      }
      else {
        let indexTemp = order.findIndex(item => item.vendorname === data[i].vendorname)
        order[indexTemp] = { ...order[indexTemp], Item_count: order[indexTemp].Item_count + data[i].Item_count }
      }
      if (percentge.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        let tempOrderSummary = { ...data[i], percentge: data[i].percentge }
        percentge.push(tempOrderSummary)
      }
      else {
        let indexTemp = percentge.findIndex(item => item.vendorname === data[i].vendorname)
        percentge[indexTemp] = { ...percentge[indexTemp], percentge: data[i].percentge }
      }
      

      if (loss.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // //console.log(JSON.parse(data[i].Loss)
        
        let tempItemSummary = {...data[i], Total_item_loss:data[i].Total_item_loss}
        loss.push(tempItemSummary)
      //  loss.push(data[i])
      }
      else {
        let indexTemp = loss.findIndex(item => item.vendorname === data[i].vendorname)
          // //console.log(data[i].Total_item_loss)

        loss[indexTemp] = { ...loss[indexTemp], Total_item_loss: loss[indexTemp].Total_item_loss + data[i].Total_item_loss }

      }

      if (profit.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        
        let tempItemSummary = {...data[i], Total_item_profit:data[i].Total_item_profit}
        profit.push(tempItemSummary)
        // profit.push(data[i])
      }
      else {
        let indexTemp = profit.findIndex(item => item.vendorname === data[i].vendorname)
        profit[indexTemp] = { ...profit[indexTemp], Total_item_profit: profit[indexTemp].Total_item_profit +  data[i].Total_item_profit  }
      }

      //  //console.log(order[indexOrder].order_count + data[i].order_count)
    }
    onSumItemAll({ ORDERTYPE, vendorname, order, loss, profit, profit_link, loss_link, data })
  }
  const priceSummarySumAll = (data) => {
//console.log('3')
    let order = []
    let loss = []
    let profit = []
    let percentge = []
    let vendorname = [];
    let loss_link = []
    let profit_link = []
    let ORDERTYPE = []
     //console.log(data)
    for (let i = 0; i < data.length; i++) {


      if (vendorname.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        vendorname.push(data[i])
      }
      else {
        let indexTemp = vendorname.findIndex(item => item.vendorname === data[i].vendorname)
        vendorname[indexTemp] = { ...vendorname[indexTemp], vendorname: data[i].vendorname }
      }
      if (profit_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        profit_link.push(data[i])
      }
      else {
        let indexTemp = profit_link.findIndex(item => item.vendorname === data[i].vendorname)
        profit_link[indexTemp] = { ...profit_link[indexTemp], profit_link: data[i].profit_link }
      }

      if (ORDERTYPE.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        ORDERTYPE.push(data[i])
      }
      else {
        let indexTemp = ORDERTYPE.findIndex(item => item.vendorname === data[i].vendorname)
        ORDERTYPE[indexTemp] = { ...ORDERTYPE[indexTemp], ORDERTYPE: data[i].ORDERTYPE }
      }

      if (loss_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        // let tempOrderSummary = { ...data[i], vendorname: data[i].vendorname }
        loss_link.push(data[i])
      }
      else {
        let indexTemp = loss_link.findIndex(item => item.vendorname === data[i].vendorname)
        loss_link[indexTemp] = { ...loss_link[indexTemp], loss_link: data[i].loss_link }
      }

     
      if(order.filter(value=>value.vendorname===data[i].vendorname).length<=0){
        let tempPriceSummary = {...data[i], TotalAmont:data[i].TotalAmont}
        order.push(tempPriceSummary)
        // order.push(data[i])
      }
      else{
        let indexTemp = order.findIndex(item=>item.vendorname===data[i].vendorname)
        order[indexTemp] = {...order[indexTemp], TotalAmont:order[indexTemp].TotalAmont +data[i].TotalAmont }
        // order[indexTemp] = {...order[indexTemp], TotalAmont:order[indexTemp].TotalAmont+data[i].TotalAmont}
      }


      if (loss.filter(value => value.vendorname === data[i].vendorname).length <= 0) {

        let tempOrderSummary = { ...data[i], loss: data[i].loss }

        loss.push(tempOrderSummary)
        // loss.push(data[i])
      }
      else {
        let indexTemp = loss.findIndex(item => item.vendorname === data[i].vendorname)

        loss[indexTemp] = { ...loss[indexTemp], loss: loss[indexTemp].loss + data[i].loss }

      }

      if (profit.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        let tempOrderSummary = { ...data[i], profit: data[i].profit }
        profit.push(tempOrderSummary)
      }
      else {
        let indexTemp = profit.findIndex(item => item.vendorname === data[i].vendorname)
        profit[indexTemp] = { ...profit[indexTemp], profit: profit[indexTemp].profit + data[i].profit }
      }

      if (percentge.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        let tempOrderSummary = { ...data[i], percentge: data[i].percentge }
        percentge.push(tempOrderSummary)
      }
      else {
        let indexTemp = percentge.findIndex(item => item.vendorname === data[i].vendorname)
        percentge[indexTemp] = { ...percentge[indexTemp], percentge: data[i].percentge }
      }


      //  //console.log(order[indexOrder].order_count + data[i].order_count)


    }

    onSumPriceAll({ ORDERTYPE, vendorname, order, loss, profit, profit_link, loss_link, data })
  }
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
      //   //console.log('PU',...dataSourceOrder)
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
  const orderPNLSummaryParent =(data,dataParent,dataParentAll)=>
  {
    console.log('parent',data,dataParent,dataParentAll)
    setstate({...state, 
        dataOrdersummaryDownload: data,
        dataSourceOrdersummary:dataParent,
        dataSourceOrdersummaryTempParent:dataParent,
        dataSourceOrdersummaryTempParentAll: dataParentAll
      })
  }
  const  downloadFileDataLink =(data,dataSource)=>{
  
    console.log(data,dataSource)

    setstate({...state, downloadDataLink: data})

  }
  const download = (event) => {

    let activeTab = event

    if (activeTab === 'OrderPNL') {
      // downloadFile(dataOrderDownload)

      downloadFileTableData(dataSourceOrderTempParentDownload, 'OrderPNL')
    }
    else if (activeTab === 'ItemPNL') {
      // downloadFile(dataItemDownload)
      downloadFileTableData(dataSourceItemTempParentDownload, 'ItemPNL')
    }
    else if (activeTab === 'OrderPNLSummary') {
      // //console.log(dataSourceOrdersummaryTempParent)
      let temp = JSON.parse(JSON.stringify(dataSourceOrdersummaryTempParentDownload))
      // downloadFile(dataOrdersummaryDownload)
      for (let i = 0; i < temp.length; i++) {
        delete temp[i]['profitLink']
        delete temp[i]['lossLink']
        delete temp[i]['ORDERTYPE']
      }
      downloadFileTableData(temp, 'OrderPNLSummary')
    }
    else if (activeTab === 'ItemPNLSummary') {
      let temp = JSON.parse(JSON.stringify(dataSourceItemsummaryTempParentDownload))
      for (let i = 0; i < temp.length; i++) {
        delete temp[i]['profitLink']
        delete temp[i]['lossLink']
        delete temp[i]['ORDERTYPE']
      }
      downloadFileTableData(temp, 'ItemPNLSummary')
    }
    else if (activeTab === 'PricePNLSummary') {
      let temp = JSON.parse(JSON.stringify(dataSourcePriceSummaryTempParentDownload))
      for (let i = 0; i < temp.length; i++) {
        delete temp[i]['profitLink']
        delete temp[i]['lossLink']
        delete temp[i]['ORDERTYPE']
      }
      downloadFileTableData(temp, 'PricePNLSummary')
    }
  }


  const handleChangeDateFormat = (value) => {
    //console.log(`selected ${value}`);

    setstate({ ...state, dateFormat: value })
  }

  const onSetActivetab = (key) => {
    setActiveTab(key)
    if(['OrderPNLSummary','ItemPNLSummary','PricePNLSummary'].includes(key) && selectedFilter==='All'){
    // let functionToCall = {'OrderPNLSummary':orderSummarySumAll([...dataSourceOrdersummaryTempParent]), 'ItemPNLSummary':itemSummarySumAll([...dataSourceItemsummaryTempParent]), 'PricePNLSummary':priceSummarySumAll([...dataSourcePriceSummaryTempParent])}
    let functionToCall = {'OrderPNLSummary':{name:orderSummarySumAll, value:[...dataSourceOrdersummaryTempParentAll]}, 'ItemPNLSummary':{name:itemSummarySumAll,value:[...dataSourceItemsummaryTempParentAll]}, 'PricePNLSummary':{name:priceSummarySumAll,value:[...dataSourcePriceSummaryTempParentAll]}}
      functionToCall[key].name(functionToCall[key].value)
    }
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
                  {/* <Button size="large" type="primary" onClick={getsummary_report_order_wise} style={{ marginRight: 10, }} > Search</Button> */}
                  <Button size="large" type="primary" onClick={() => {setIsSearchPressed(true) }} style={{ marginRight: 10, }} > Search</Button> 
                  {/* {console.log('dataSourceOrdersummary.length',dataSourceOrdersummary.length)} */}
                   <Button size="large" type="success"
                    onClick={(value) => { download(activeTab) }} >
                    Download
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: 10 }}>
                <Col lg={8}>

                  <label style={{ marginBottom: 15 }}>Filtes:</label>
                  <br></br>

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




                <Col lg={16}>

                  <Row gutter={25}>
                    <Col>

                      <label style={{ fontSize: 13, fontWeight: 'bold' }} >{activeTab === 'PricePNLSummary' ? 'Total Amount' : 'TotalOrders'}: </label>
                      <p style={{ fontSize: 13, fontWeight: '600', color: '#5f63f2', paddingLeft: 2, }}>{activeTab === 'PricePNLSummary' ? '$' : ''}{Math.round(totalOrdersSum * 100) / 100}</p>
                    </Col>
                    {(activeTab !== 'OrderPNL' && activeTab !== 'ItemPNL') && <Col >

                      <label style={{ fontSize: 13, fontWeight: 'bold' }}>{(activeTab === 'OrderPNL'||activeTab === 'ItemPNL'||activeTab === 'PricePNLSummary') ? 'Total Loss': (activeTab === 'ItemPNLSummary')?'Total Loss Items' : 'Total Loss Orders'}: </label>
                      <p style={{ fontSize: 13, fontWeight: '600', color: '#5f63f2', paddingLeft: 2, }}>{activeTab === 'PricePNLSummary' ? '$' : ''}{Math.round(totalOrdersLoss * 100) / 100}</p>
                    </Col>}
                    <Col >

                      <label style={{ fontSize: 13, fontWeight: 'bold' }}>{(activeTab === 'OrderPNL'||activeTab === 'ItemPNL'||activeTab === 'PricePNLSummary') ? 'Total Profit' : (activeTab === 'ItemPNLSummary')?'Total Profit Items':'Total Profit Orders'}: </label>
                      <p style={{ fontSize: 13, fontWeight: '600', color: '#5f63f2', paddingLeft: 2, }}>{activeTab === 'PricePNLSummary' ? '$' : ''}{Math.round(totalOrdersProfit * 100) / 100}</p>
                    </Col>
                    {(activeTab !== 'OrderPNL' && activeTab !== 'ItemPNL') && <Col >

                      <label style={{ fontSize: 13, fontWeight: 'bold' }}>Total Profit Average: </label>
                      <p style={{ fontSize: 13, fontWeight: '600', color: '#5f63f2', paddingLeft: 2, }}>{Math.round(totalOrdersProfit * 100 / totalOrdersSum * 100) / 100}%</p>
                    </Col>}
                    {(activeTab !== 'OrderPNL' && activeTab !== 'ItemPNL') && <Col >
                      <label style={{ fontSize: 13, fontWeight: 'bold' }}>Total Loss Average: </label>
                      <p style={{ fontSize: 13, fontWeight: '600', color: '#5f63f2', paddingLeft: 2, }}>{Math.round(totalOrdersLoss * 100 / totalOrdersSum * 100) / 100}%</p>
                    </Col>}
                  </Row>
                </Col>


              </Row>


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