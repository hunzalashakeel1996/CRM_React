import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryReportPriceWise } from '../../../../redux/apis/DataAction';


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

  const {downloadFileDataLink , subOrderType, ordertypeParent, isSearchPressed, orderdatefrom, orderdateto, dateFormat, dataSourcePriceSummary, dataSourcePriceSummaryTempParent, onAddPrice, activeTab, selectedFilter } = props


  let isOrderTypeShow = selectedFilter == 'All' ? true : false
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setstate] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSourceOrdersummaryTemp: [],
    dataSourcesummary: [],
    orderdatetoCheck: 'todate',
    orderdatefromCheck: 'fromdate',
    dataSourcesummaryParent: [],
    dataSourcesummaryParentAll: []

  });

  const { orderdatetoCheck, dataSourcesummaryParent, dataSourcesummaryParentAll, sortedInfo, isLoader, dataSourcesummary, orderdatefromCheck } = state

  useEffect(() => {
    if (isSearchPressed && activeTab === 'PricePNLSummary' && (orderdatetoCheck !== orderdateto || orderdatefromCheck !== orderdatefrom)) {
      let tempDataSource_summary_report_price_wise = [];
      let tempDataSource_summary_report_price_wise_All = [];

      setstate({ ...state, isLoader: true })

      dispatch(apiSummaryReportPriceWise({ dateFormat: dateFormat, orderdateto: orderdateto, orderdatefrom: orderdatefrom })).then(data => {

      
        data[1].map(value => {

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
            profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${(Math.round(profit * 100) / 100)}</span></Link>,
            lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${Math.round(loss * 100) / 100}</span></Link>,

          });
          tempDataSource_summary_report_price_wise_All.push({
            vendorname: vendorname,
            TotalAmont: Math.round(TotalAmont * 100) / 100,
            profit: Math.round(profit * 100) / 100,
            loss: Math.round(loss * 100) / 100,
            percentge: Math.round(percentge * 100) / 100,
            ORDERTYPE: ORDERTYPE,
            profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profit * 100) / 100)}</span></Link>,
            lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(loss * 100) / 100}</span></Link>,

          });
        });

        filterTotalValue(data[1])

        setstate({
          ...state, isLoader: false, dataSourcesummary: tempDataSource_summary_report_price_wise
          , dataSourcesummaryParent: tempDataSource_summary_report_price_wise,
          dataSourcesummaryParentAll: tempDataSource_summary_report_price_wise_All,
          orderdatetoCheck: orderdateto, orderdatefromCheck: orderdatefrom
        })
   

      })

    }
    else if (activeTab === 'PricePNLSummary' )
    {
      
      let ordertype = []
      let tempOrderSummary = [];
 
  

    if (dataSourcesummaryParent.length>0&&['MarketPlace', 'Web', 'All'].includes(ordertypeParent) && activeTab === 'PricePNLSummary') {
      
      if ('All' === ordertypeParent) {
        priceSummarySumAll(dataSourcesummaryParentAll)
        filterTotalValue(dataSourcesummaryParentAll)
        return
      }

      ordertype = ordertypeParent === 'MarketPlace' ?
        ['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay', 'MPALL']
        :
        ['PU', 'JLC', 'WebALL']

      tempOrderSummary = dataSourcesummaryParent.filter(item => ordertype.includes(item.ORDERTYPE))

      setstate({ ...state,  dataSourcesummary: tempOrderSummary,  isSellerType: 'Enable', selectedFilter: ordertypeParent});
      filterTotalValue(tempOrderSummary)
    }
    
   

    if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&'MPALL' === subOrderType) {

      tempOrderSummary = dataSourcesummaryParent.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
      )


      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)
    }

    else if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay'].includes(subOrderType)) {



      tempOrderSummary = dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'] === (subOrderType))


      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)
    }
    else if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&['JLC', 'PU'].includes(subOrderType)) {
  

      tempOrderSummary = dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(subOrderType))


      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)

    }

    else if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&'WebALL' === subOrderType) {

      tempOrderSummary = dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))

  
      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)
    }


      filterTotalValue(dataSourcesummary)
    }
  }, [isSearchPressed, orderdateto, orderdatefrom, activeTab, selectedFilter]);
  useEffect(() => {
  
    let ordertype = []
    let tempOrder = [];
    let tempOrderSummary = [];
    let tempItemSummary = [];
    let tempPriceSummary = [];
    let tempItem = [];

    if (dataSourcesummaryParent.length>0&&['MarketPlace', 'Web', 'All'].includes(ordertypeParent) && activeTab === 'PricePNLSummary') {
      
      if ('All' === ordertypeParent) {
        priceSummarySumAll(dataSourcesummaryParentAll)
        filterTotalValue(dataSourcesummaryParentAll)
        return
      }

      ordertype = ordertypeParent === 'MarketPlace' ?
        ['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay', 'MPALL']
        :
        ['PU', 'JLC', 'WebALL']

      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => ordertype.includes(item.ORDERTYPE))]

      setstate({ ...state,  dataSourcesummary: tempOrderSummary,  isSellerType: 'Enable', selectedFilter: ordertypeParent});
      filterTotalValue(tempOrderSummary)
    }
    

  }, [ordertypeParent,dataSourcesummaryParent]);

  useEffect(() => {
    let tempOrder = [];
    let tempItem = [];
    let tempOrderSummary = [];
    let tempItemSummary = [];
    let tempPriceSummary = [];

    if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&'MPALL' === subOrderType) {

      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
      )]


      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)
    }

    else if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay'].includes(subOrderType)) {



      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'] === (subOrderType))]


      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)
    }
    else if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&['JLC', 'PU'].includes(subOrderType)) {
  

      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(subOrderType))]


      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)

    }

    else if (dataSourcesummaryParent.length>0&&activeTab === 'PricePNLSummary' &&'WebALL' === subOrderType) {

      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]

  
      setstate({ ...state, dataSourcesummary: tempOrderSummary });
      filterTotalValue(tempOrderSummary)
    }

  }, [subOrderType,dataSourcesummaryParent]);

  const filterTotalValue = (data) => {

    let order = []
    let loss = []
    let profit = []
   
    for (let i = 0; i < data.length; i++) {

      if (order.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
 
        let tempPriceSummary = { ...data[i], TotalAmont: typeof(data[i].TotalAmont) =='number' ? data[i].TotalAmont :JSON.parse(data[i].TotalAmont.split('$')[1]) }
        order.push(tempPriceSummary)
      }
      
      else {
     
        let indexTemp = order.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        order[indexTemp] = { ...order[indexTemp], TotalAmont: order[indexTemp].TotalAmont + (typeof(data[i].TotalAmont) =='number' ? data[i].TotalAmont : JSON.parse(data[i].TotalAmont.split('$')[1])) }
      }

      if (loss.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        let tempPriceSummary = { ...data[i], loss: data[i].loss }
        loss.push(tempPriceSummary)

      }
      else {
        let indexTemp = loss.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        loss[indexTemp] = { ...loss[indexTemp], loss: loss[indexTemp].loss + data[i].loss }
      }

      if (profit.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        let tempPriceSummary = { ...data[i], profit: data[i].profit }
        profit.push(tempPriceSummary)

      }
      else {
        let indexTemp = profit.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        profit[indexTemp] = { ...profit[indexTemp], profit: profit[indexTemp].profit + data[i].profit }
      }


    }

    onAddPrice({ order, loss, profit, data })
  }
  const priceSummarySumAll = (data) => {
    let order = []
    let loss = []
    let profit = []
    let percentge = []
    let vendorname = [];
    let loss_link = []
    let profit_link = []
    let ORDERTYPE = []
    for (let i = 0; i < data.length; i++) {


      if (vendorname.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        vendorname.push(data[i])
      }
      else {
        let indexTemp = vendorname.findIndex(item => item.vendorname === data[i].vendorname)
        vendorname[indexTemp] = { ...vendorname[indexTemp], vendorname: data[i].vendorname }
      }
      if (profit_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        profit_link.push(data[i])
      }
      else {
        let indexTemp = profit_link.findIndex(item => item.vendorname === data[i].vendorname)
        profit_link[indexTemp] = { ...profit_link[indexTemp], profit_link: data[i].profit_link }
      }

      if (ORDERTYPE.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        ORDERTYPE.push(data[i])
      }
      else {
        let indexTemp = ORDERTYPE.findIndex(item => item.vendorname === data[i].vendorname)
        ORDERTYPE[indexTemp] = { ...ORDERTYPE[indexTemp], ORDERTYPE: data[i].ORDERTYPE }
      }

      if (loss_link.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        loss_link.push(data[i])
      }
      else {
        let indexTemp = loss_link.findIndex(item => item.vendorname === data[i].vendorname)
        loss_link[indexTemp] = { ...loss_link[indexTemp], loss_link: data[i].loss_link }
      }


      if (order.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
        let tempPriceSummary = { ...data[i], TotalAmont: data[i].TotalAmont }
        order.push(tempPriceSummary)
      }
      else {
        let indexTemp = order.findIndex(item => item.vendorname === data[i].vendorname)
        order[indexTemp] = { ...order[indexTemp], TotalAmont: order[indexTemp].TotalAmont + data[i].TotalAmont }
      }


      if (loss.filter(value => value.vendorname === data[i].vendorname).length <= 0) {

        let tempOrderSummary = { ...data[i], loss: data[i].loss }

        loss.push(tempOrderSummary)
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




    }

    onSumPriceAll({ ORDERTYPE, vendorname, order, loss, profit, profit_link, loss_link, data })
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
    for (i = 0; i < result.order.length;) {
      let v = JSON.parse(result.profit[i].profit);

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
        profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${(Math.round(profitAll + result.profit[i].profit * 100) / 100)}</span></Link>,
        lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">${(Math.round(LossAll + result.loss[i].loss * 100) / 100)}</span></Link>,



      });

      i++;
    }


    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourcePriceSummaryTempParentDownload: result.data,
      dataSourcesummary: DataSource_summary_report_order_wise_All,
      selectedFilter: 'All'
    })
    downloadFileDataLink('PricePNLSummary',DataSource_summary_report_order_wise_All)
  }
  const filter = (value) => {

    var val = [];
    let temp = []
    let placeholder = ``;

    return <Input
      placeholder={placeholder}
      size='small'
      onChange={e => {

        temp = [...temp, ...dataSourcesummaryParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]

        filterTotalValue(temp)
        setstate({ ...state, dataSourcesummary: temp });

      }}
    />
  }

  const columns = [
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Vendorname</p>
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
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>ORDERTYPE</p>
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
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>TotalAmont</p>
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
          width: 30,


        }
      ]


    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Profit Amount</p>
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
          width: 30,


        }
      ]


    }
    ,
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Loss Amount</p>
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
          width: 30,


        }
      ]


    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Percentge</p>
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
          width: 30,


        }
      ]
   

    }

  ];
  isOrderTypeShow && columns.splice(1, 1)
  const handleChange = (pagination, filters, sorter) => {
    setstate({
      ...state,
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
              <Table pagination={false} dataSource={dataSourcesummary} columns={columns} onChange={handleChange} />
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
