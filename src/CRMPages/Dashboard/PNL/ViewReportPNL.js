









import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';
import DetailPNL from './overview/DetailPNL';
import ItemPNLSummary from './overview/ItemPNLSummary';
import OrderPNLSummary from './overview/OrderPNLSummary';
import PricePNLSummary from './overview/PricePNLSummary';
import ItemPNL from './overview/ItemPNL';
import OrderPNL from './overview/OrderPNL';
import { Cards } from '../../../components/cards/frame/cards-frame';

import { downloadFile } from '../../../components/utilities/utilities'
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
    dataSourceOrderSummaryTempParent:[],
    dataOrderSummaryDownload:'',
    dataSourceOrderSummary:[],

    dataSourceItemSummaryTempParent:[],
    dataItemSummaryDownload:'',
    dataSourceItemSummary:[],

    dataSourcePriceSummaryTempParent:[],
    dataPriceSummaryDownload:'',
    dataSourcePriceSummary:[],
  });
  
  const {dataSourcePriceSummary,dataPriceSummaryDownload,dataSourcePriceSummaryTempParent,dataSourceItemsummary,dataItemsummaryDownload,dataSourceItemsummaryTempParent,dataSourceOrdersummary,dataOrdersummaryDownload, dataSourceOrdersummaryTempParent,dataSourceOrderTempParent, dataSourceItemTempParent, filterValue, isSellerType, sellerType, dataOrderDownload, dataItemDownload, dataSourceOrder, isLoader, dataSourceItem, dataSourcePrice, dataSourceDetails } = state

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
      dispatch(apiReportOrderWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiReportItemWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY') })),
      dispatch(apiSummaryReportOrderWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})), 
      dispatch(apiSummaryReportItemWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
      dispatch(apiSummaryReportPriceWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
    ]).then((data) => {
      console.log(data)
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

        } = value;


        tempDataSource_report_order_wise.push({
          ORDERTYPE: ORDERTYPE,
          orderno: orderno,
          FULLNAME: FULLNAME,
          Zip: Zip,
          State: State,
          po_shipping: Math.round(po_shipping * 100) / 100,
          customerPay: Math.round(customerPay * 100) / 100,
          ShippingCost: Math.round(ShippingCost * 100) / 100,
          cost: Math.round(cost * 100) / 100,
          purchaseCost: Math.round(purchaseCost * 100) / 100,
          ordertotal: Math.round(ordertotal * 100) / 100,
          Moneycollected: Math.round(Moneycollected * 100) / 100,
          commission: Math.round(commission * 100) / 100,
          profit: Math.round(profit * 100) / 100,
          Isdropship: Isdropship,
          IsReplacement: IsReplacement,
          OrderDiscount: Math.round(OrderDiscount * 100) / 100


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
          cost: Math.round(cost * 100) / 100,
          purchaseCost: Math.round(purchaseCost * 100) / 100,
          commit_status: commit_status,
          commision: Math.round(commision * 100) / 100,
          SalePrice: Math.round(SalePrice * 100) / 100,
          pu_price: Math.round(pu_price * 100) / 100,
          Weight: Weight,
          shipping: Math.round(shipping * 100) / 100,
          po_shipping: Math.round(po_shipping * 100) / 100,
          isRMA: isRMA,
          customer_pay_ship: Math.round(customer_pay_ship * 100) / 100,
          profit: Math.round(profit * 100) / 100,
          PPS: PPS,
          final_profit: Math.round(final_profit * 100) / 100,
          Type: Type,
          IsReplacement: IsReplacement,
          Discount_amount: Math.round(Discount_amount * 100) / 100
        });

      });
      //Order summary    
      data[2][1].map(value => {

        const { vendorname,
          order_count,
          profit,
          loss,
          percentge

        } = value;


        tempDataSource_summary_report_order_wise.push({
          vendorname: vendorname,
          order_count: order_count,
          profit: Math.round(profit * 100) / 100,
          loss: Math.round(loss * 100) / 100,
          percentge: percentge


        });

      });
      data[3][1].map(value => {

        const { vendorname,
          Item_count,
          Total_item_profit,
          Total_item_loss,
          percentge

        } = value;


        tempDataSource_summary_report_item_wise.push({
          vendorname: vendorname,
          Item_count: Item_count,
          Total_item_profit: Math.round(Total_item_profit * 100) / 100,
          Total_item_loss: Math.round(Total_item_loss * 100) / 100,
          percentge: percentge


        });

      });
       //  downloadFile(data[2][0])
    //  Price PNL
      data[4][1].map(value => {

        const { vendorname
            , TotalAmont
            ,profit
            ,loss
            ,percentge
             } = value;

        tempDataSource_summary_report_Price_wise.push({
            vendorname: vendorname,
            TotalAmont: Math.round(TotalAmont * 100) / 100 ,
            profit:  Math.round(profit * 100) / 100 ,
            loss:  Math.round(loss * 100) / 100 ,
          percentge: Math.round(percentge * 100) / 100  
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

  const topMenu = [
    {
        tab: 'PNL Order Summary',
        key: 'OrderPNLSummary',
        tabName: <OrderPNLSummary dataSourceOrdersummaryTempParent={dataSourceOrdersummaryTempParent} dataSourceOrdersummary={dataSourceOrdersummary}/>
    },
    {
        tab: 'PNL Item Summary',
        key: 'ItemPNLSummary',
        tabName: <ItemPNLSummary dataSourceItemsummaryTempParent={dataSourceItemsummaryTempParent} dataSourceItemsummary={dataSourceItemsummary}/>

    },
    {
        tab: 'PNL Price Summary',
        key: 'PricePNLSummary',
        tabName: <PricePNLSummary dataSourcePriceSummaryTempParent={dataSourcePriceSummaryTempParent} dataSourcePriceSummary={dataSourcePriceSummary} />

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
      tabName: <OrderPNL dataSourceOrder={dataSourceOrder} dataSourceOrderTempParent={dataSourceOrderTempParent} />

    }
    ,
    {
      tab: 'PNL Item',
      key: 'ItemPNL',
      tabName: <ItemPNL dataSourceItem={dataSourceItem} dataSourceItemTempParent={dataSourceItemTempParent} />

    }
  ];


  const handleOrderTypeChange = (e) => {
    let ordertype = []
    let tempOrder=[];
    let tempItem=[];
    if ('MarketPlace' === e.target.value.toString()) {
      ordertype = ['Amazon', 'AmazonRizno', 'Walmart', 'Sears', 'Ebay','MPALL']
      
      tempOrder =[...tempOrder,...dataSourceOrder.filter(item => 
        item.ORDERTYPE==='Amazon'||
        item.ORDERTYPE==='AmazonRizno'||
        item.ORDERTYPE==='Walmart'||     item.ORDERTYPE==='Sears'||     item.ORDERTYPE==='Ebay'
        )]
        console.log('MarketPlace',tempOrder)
        tempItem =[...tempItem,...dataSourceItem.filter(item => 
          item.ORDERTYPE==='Amazon'||
          item.ORDERTYPE==='AmazonRizno'||
          item.ORDERTYPE==='Walmart'||     item.ORDERTYPE==='Sears'||     item.ORDERTYPE==='Ebay' )]
          console.log('MarketPlace',tempItem)
      setstate({ ...state, dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem , sellerType: ordertype, isSellerType: 'Enable'});
   
    }
    else if ('Web' === e.target.value.toString()) {
      ordertype = ['PU', 'JLC','WebALL']
      
      tempOrder =[...tempOrder,...dataSourceOrder.filter(item =>  item.ORDERTYPE==='PU'||item.ORDERTYPE==='JLC')]

        // console.log('Web',tempOrder)
        
        tempItem =[...tempItem,...dataSourceItem.filter(item =>  item.ORDERTYPE==='PU'|| item.ORDERTYPE==='JLC')]  

          // console.log('Web',tempItem)

          setstate({ ...state, dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem , sellerType: ordertype, isSellerType: 'Enable' });
    
    }
    else if ('All' === e.target.value.toString()) {
      // console.log('All')
      ordertype = []
      setstate({ ...state, dataSourceOrderTempParent:[...dataSourceOrder],dataSourceItemTempParent:[...dataSourceItem] , sellerType: ordertype, isSellerType: 'Enable' });
    }
    // console.log(ordertype)    

    // setstate({ ...state, sellerType: ordertype, isSellerType: 'Enable' });


  };

  const handleTypeChange = e => {
    let tempOrder=[];
    let tempItem=[];
    console.log('handleSizeChange',e.target.value.toString())
    if ('MPALL' === e.target.value.toString()) {
     
  
      tempOrder =[...tempOrder,...dataSourceOrder.filter(item => 
        item.ORDERTYPE==='Amazon'||
        item.ORDERTYPE==='AmazonRizno'||
        item.ORDERTYPE==='Walmart'||     item.ORDERTYPE==='Sears'||item.ORDERTYPE==='Ebay')]

        tempItem =[...tempItem,...dataSourceItem.filter(item => 
          item.ORDERTYPE==='Amazon'||
          item.ORDERTYPE==='AmazonRizno'||
          item.ORDERTYPE==='Walmart'||item.ORDERTYPE==='Sears'||item.ORDERTYPE==='Ebay')]
      setstate({ ...state, dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem });
              }
    else if ('Amazon' === e.target.value.toString()||'AmazonRizno'=== e.target.value.toString() 
    || 'Walmart'=== e.target.value.toString() 
    ||'Sears' === e.target.value.toString() ||'Ebay' === e.target.value.toString() ){
    
    tempOrder =[...tempOrder,...dataSourceOrder.filter(item => item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]
    
    tempItem =[...tempItem,...dataSourceItem.filter(item => item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase() ))]

    setstate({ ...state, filterValue: e.target.value,dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem  });
    }
    else if ('JLC' === e.target.value.toString()) {
      // cond for pu
       // filter(item => item.orderno.split('-')[0]!=='JLC)
       // filter(item => item.orderno.split('-')[0]==='JLC)
    //   console.log('PU',...dataSourceOrder)
       tempOrder =[...tempOrder,...dataSourceOrder.filter(item => item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]
      tempItem =[...tempItem,...dataSourceItem.filter(item => item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase() ))]

         setstate({ ...state, filterValue: e.target.value,dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem  });

         }
         else if ('PU' === e.target.value.toString()){
          // cond for pu
           // filter(item => item.orderno.split('-')[0]!=='JLC)
           // filter(item => item.orderno.split('-')[0]==='JLC)

           tempOrder =[...tempOrder,...dataSourceOrder.filter(item => item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase()))]
    
           tempItem =[...tempItem,...dataSourceItem.filter(item => item['ORDERTYPE'].toUpperCase().includes(e.target.value.toUpperCase() ))]
    
           
         
             setstate({ ...state, dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem  });
             }

             else if ('WebALL' === e.target.value.toString()){
 
              tempOrder =[...tempOrder,...dataSourceOrder.filter(item => 
                item.ORDERTYPE==='PU'||
                item.ORDERTYPE==='JLC'
                )]
        
                tempItem =[...tempItem,...dataSourceItem.filter(item => 
                  item.ORDERTYPE==='PU'||
                  item.ORDERTYPE==='JLC'
                  )]
              setstate({ ...state, dataSourceOrderTempParent:tempOrder,dataSourceItemTempParent:tempItem  });
             }
  };
  const download =(event)=>
  {

    let activeTab =event

    if (activeTab==='OrderPNL')
    {
      downloadFile(dataOrderDownload)
    }
    else if (activeTab==='ItemPNL')
    {
      downloadFile(dataItemDownload)
    }
    else if (activeTab==='OrderPNLSummary')
    {
      downloadFile(dataOrdersummaryDownload)
    }
    else if (activeTab==='ItemPNLSummary')
    {
      downloadFile(dataItemsummaryDownload)
    }
    else if (activeTab==='PricePNLSummary')
    {
      downloadFile(dataPriceSummaryDownload)
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
              </Row>

              <Row>
                <Col xs={24} style={{marginBottom:10}}>
                  <Button size="default" type="primary" onClick={getsummary_report_order_wise} style={{ marginRight: 10, }} > Search</Button>

                  <Button type="success"
                    onClick={ (value) => { download(activeTab)} } >
                    Download
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: 10 }}>
                <Col xs={24} lg={2}>

                  <label>Filtes:</label>
                </Col>
                <Col span={20} >

                  <Radio.Group onChange={handleOrderTypeChange}>
                    <Radio.Button value="Web">Web</Radio.Button>
                    <Radio.Button value="MarketPlace">MarketPlace</Radio.Button>
                    <Radio.Button value="All">All</Radio.Button>
                  </Radio.Group>

                  <Row style={{ marginTop: 10 }} >

                    <Col span={20}>

                      <Radio.Group onChange={handleTypeChange} optionType="button" buttonStyle="solid" disabled={isSellerType === 'disabled' ? true : false}>

                        {sellerType.map(val => (

                          <Radio.Button value={val}>{val}</Radio.Button>
                        ))}
                      </Radio.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>


            </Cards>
          </Col>

        </Row>

        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20 }}>


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

