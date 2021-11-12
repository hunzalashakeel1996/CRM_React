import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryReportItemWise } from '../../../../redux/apis/DataAction';


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




const ItemPNLSummary = (props) => {
  const {subOrderType,ordertypeParent,  isSearchPressed, orderdatefrom, orderdateto, dateFormat,dataSourceItemsummary, dataSourceItemsummaryTempParent, onAddItem, activeTab,selectedFilter } = props

 
  let isOrderTypeShow = selectedFilter == 'All' ? true : false

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setstate] = useState({

    sortedInfo: [],
    dataSource: [],
    isLoader: false,
    dataSourcesummary: [],
    orderdatetoCheck: 'todate',
    orderdatefromCheck: 'fromdate',
    dataSourcesummaryParent:[],
    dataSourcesummaryParentAll:[]
  });

  const {dataSourcesummaryParent,dataSourcesummaryParentAll, orderdatetoCheck, orderdatefromCheck , sortedInfo, isLoader, dataSourcesummary } = state
  useEffect(() => {
    if (isSearchPressed &&activeTab === 'ItemPNLSummary' && (orderdatetoCheck !== orderdateto || orderdatefromCheck !== orderdatefrom)) {
      let tempDataSource_summary_report_item_wise = [];
      let tempDataSource_summary_report_item_wise_All = [];
      
      setstate({ ...state, isLoader: true })

      dispatch(apiSummaryReportItemWise({ dateFormat: dateFormat, orderdateto: orderdateto, orderdatefrom: orderdatefrom })).then(data => {

        console.log(data[1])
        data[1].map(value => {

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
            profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(Total_item_profit * 100) / 100)}</span></Link>,
            lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(Total_item_loss * 100) / 100}</span></Link>,
  
  
  
          });
  
          tempDataSource_summary_report_item_wise_All.push({
            vendorname: vendorname,
            Item_count: Item_count,
            Total_item_profit: Math.round(Total_item_profit * 100) / 100,
            Total_item_loss: Math.round(Total_item_loss * 100) / 100,
            percentge: percentge,
            ORDERTYPE: ORDERTYPE,
            profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(Total_item_profit * 100) / 100)}</span></Link>,
            lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{Math.round(Total_item_loss * 100) / 100}</span></Link>,
  
  
  
          });
        });


        setstate({ ...state, isLoader: false, dataSourcesummary: tempDataSource_summary_report_item_wise
          ,dataSourcesummaryParent:tempDataSource_summary_report_item_wise,
          dataSourcesummaryParentAll:tempDataSource_summary_report_item_wise_All,
           orderdatetoCheck: orderdateto, orderdatefromCheck: orderdatefrom })
        filterTotalValue(data[1])
      })


    }
      else if (activeTab === 'ItemPNLSummary' )
    {
      filterTotalValue(dataSourcesummary)
    }

   
    

  }, [isSearchPressed, orderdateto, orderdatefrom, activeTab, selectedFilter ]);

  useEffect(() => {    
    let ordertype = []
    
    let tempOrderSummary = [];
   
    if (['MarketPlace', 'Web', 'All'].includes(ordertypeParent) && activeTab === 'ItemPNLSummary') {
      
      if ('All' === ordertypeParent) {
        itemSummarySumAll(dataSourcesummaryParentAll)
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

 

  }, [ordertypeParent]);
  useEffect(() => {    
    let tempOrder = [];
    let tempItem = [];
    let tempOrderSummary = [];
    let tempItemSummary = [];
    let tempPriceSummary = [];
  
    if (activeTab === 'ItemPNLSummary' &&'MPALL' === subOrderType) {
   
      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item =>
        item.ORDERTYPE && item.ORDERTYPE === 'Amazon' ||
        item.ORDERTYPE && item.ORDERTYPE === 'AmazonRizno' ||
        item.ORDERTYPE && item.ORDERTYPE === 'Walmart' || item.ORDERTYPE && item.ORDERTYPE === 'Sears' || item.ORDERTYPE && item.ORDERTYPE === 'Ebay'
      )]
     

      setstate({ ...state,dataSourcesummary:tempOrderSummary});
      filterTotalValue(tempOrderSummary)
    }

    else if (activeTab === 'ItemPNLSummary' &&['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay'].includes(subOrderType)) {
  
    

      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE']=== (subOrderType))]

    
      setstate({ ...state,dataSourcesummary:tempOrderSummary});
      filterTotalValue(tempOrderSummary)
    }
    else if (activeTab === 'ItemPNLSummary' &&['JLC', 'PU'].includes(subOrderType)) {
    
      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && item['ORDERTYPE'].toUpperCase().includes(subOrderType))]
    
    
      setstate({ ...state,dataSourcesummary:tempOrderSummary});
      filterTotalValue(tempOrderSummary)

    }

    else if (activeTab === 'ItemPNLSummary' &&'WebALL' === subOrderType) {

      tempOrderSummary = [...tempOrderSummary, ...dataSourcesummaryParent.filter(item => item['ORDERTYPE'] && ['PU', 'JLC'].includes(item.ORDERTYPE))]
    
      console.log(tempOrderSummary)
      setstate({ ...state,dataSourcesummary:tempOrderSummary});
      filterTotalValue(tempOrderSummary)
    }

  }, [subOrderType]);


  const filterTotalValue =(data)=>{
    let order = []
    let loss = []
    let profit = []
    for (let i = 0; i < data.length; i++) {

      if (order.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        order.push(data[i])
      }
      else {
        let indexTemp = order.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        order[indexTemp] = { ...order[indexTemp], Item_count: order[indexTemp].Item_count + data[i].Item_count }
      }

      if (loss.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        
        let tempItemSummary = {...data[i], Total_item_loss:data[i].Total_item_loss}
        loss.push(tempItemSummary)
      }
      else {
        let indexTemp = loss.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)

        loss[indexTemp] = { ...loss[indexTemp], Total_item_loss: loss[indexTemp].Total_item_loss + data[i].Total_item_loss }

      }

      if (profit.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        
        let tempItemSummary = {...data[i], Total_item_profit:data[i].Total_item_profit}
        profit.push(tempItemSummary)
      }
      else {
        let indexTemp = profit.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        profit[indexTemp] = { ...profit[indexTemp], Total_item_profit: profit[indexTemp].Total_item_profit +  data[i].Total_item_profit  }
      }


    }

    onAddItem({ order, loss, profit,data })
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
      
      
        setstate({ ...state, dataSourcesummary: temp });
        filterTotalValue(temp)
      }}
    />
  }
  const itemSummarySumAll = (data) => {
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
            
            let tempItemSummary = {...data[i], Total_item_loss:data[i].Total_item_loss}
            loss.push(tempItemSummary)
          }
          else {
            let indexTemp = loss.findIndex(item => item.vendorname === data[i].vendorname)
    
            loss[indexTemp] = { ...loss[indexTemp], Total_item_loss: loss[indexTemp].Total_item_loss + data[i].Total_item_loss }
    
          }
    
          if (profit.filter(value => value.vendorname === data[i].vendorname).length <= 0) {
            
            let tempItemSummary = {...data[i], Total_item_profit:data[i].Total_item_profit}
            profit.push(tempItemSummary)
          }
          else {
            let indexTemp = profit.findIndex(item => item.vendorname === data[i].vendorname)
            profit[indexTemp] = { ...profit[indexTemp], Total_item_profit: profit[indexTemp].Total_item_profit +  data[i].Total_item_profit  }
          }
    
        }
        onSumItemAll({ ORDERTYPE, vendorname, order, loss, profit, profit_link, loss_link, data })
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
    for (i = 0; i < result.order.length;) {
      let v = JSON.parse(result.profit[i].Total_item_profit);

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
        profitLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Profit` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(profitAll + result.profit[i].Total_item_profit * 100) / 100)}</span></Link>,
        lossLink: <Link target="_blank" to={{ pathname: `/admin/PNL/SummaryDetails/${result.vendorname[i].vendorname}/${orderdatefrom.format('MM-DD-YYYY')}/${orderdateto.format('MM-DD-YYYY')}/${dateFormat}/${result.ORDERTYPE[i].ORDERTYPE}/Loss` }}><span style={{ color: '#42ba96', textDecoration: 'underline' }} className="date-started">{(Math.round(LossAll + result.loss[i].Total_item_loss * 100) / 100)}</span></Link>,



      });

      i++;
    }

    setstate({
      ...state,
      totalOrdersProfit: profit,
      totalOrdersLoss: Loss,
      totalOrdersSum: order,
      dataSourceItemsummaryTempParentDownload: result.data,
      dataSourcesummary: DataSource_summary_report_item_wise_All,
      selectedFilter: 'All'
    })

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


    },
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Item count</p>
      </div>,

      children: [
      {
        title: <>
        { filter('Item_count')}
        </>,
         dataIndex: 'Item_count',
         key: 'Item_count',
      },
      {
        
          key: 'Item_count',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.Item_count - d.Item_count,
          sortOrder: sortedInfo.columnKey === 'Item_count' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },
    
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Total Item Profit Count</p>
      </div>,

      children: [
      {
        title: <>
        { filter('Total_item_profit')}
        </>,
         dataIndex: 'profitLink',
         key: 'Total_item_profit',
      },
      {
        
          key: 'Total_item_profit',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.Total_item_profit - d.Total_item_profit,
          sortOrder: sortedInfo.columnKey === 'Total_item_profit' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },

    
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Total Item Loss Count</p>
      </div>,

      children: [
      {
        title: <>
        { filter('Total_item_loss')}
        </>,
         dataIndex: 'lossLink',
         key: 'Total_item_loss',
      },
      {
        
          key: 'Total_item_loss',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.Total_item_loss - d.Total_item_loss,
          sortOrder: sortedInfo.columnKey === 'Total_item_loss' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },

    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Percentge</p>
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
          width:30,
        
        
      }
      ]


    }

  ];
  isOrderTypeShow&&columns.splice(1, 1)

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

export default ItemPNLSummary
