import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
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
import { apiReportOrderWise,apiReportItemWise,apiSummaryReportOrderWise,apiSummaryReportItemWise,apiSummaryReportPriceWise,apiSummaryReportDetailWise } from '../../../redux/apis/DataAction';
// import { webURL, audioPlay, uploadUrl, getVendorName, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getInventoryapi, getInventoryWalmart_all_otherapi, getInventoryWalmartapi, getEbayqtyapi, getSearsqtyapi, getSears_all_otherapi, getWallMartCAqtyapi, getwalmartCA_all_otherapi, getSearsPriceapi, getPriceWalmartapi } from '../../../redux/apis/DataAction';


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

    const [activeTab, setActiveTab] = useState('');


    const [state, setstate] = useState({
   
        
        dataSourceOrder:[],
        dataSourceItem:[],
        dataSourcePrice:[],
        dataSourceDetails:[],
        isLoader:false,
        dataOrderDownload:'',
        dataItemDownload:'',

      });

    const { dataOrderDownload,dataItemDownload, dataSourceOrder,isLoader,dataSourceItem,dataSourcePrice,dataSourceDetails } = state

    let tempDataSource_summary_report_order_wise = [];
    let tempDataSource_summary_report_item_wise = [];
    let tempDataSource_summary_report_Price_wise = [];
    let tempDataSource_summary_report_Detail_wise = [];

    const handleChange = (pagination, filters, sorter) =>  {
        console.log('Various parameters', pagination, filters, sorter);
        setstate({...state,
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };
       
  const onChange = (value, key) => {
    // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };
  
  const getsummary_report_order_wise = () => {
    setstate({ ...state, isLoader: true })
    Promise.all([
    //   dispatch(apiSummaryReportOrderWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})), 
    // dispatch(apiSummaryReportItemWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
    //  dispatch(apiSummaryReportPriceWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
    //  dispatch(apiSummaryReportDetailWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
      dispatch(apiReportOrderWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
     dispatch(apiReportItemWise({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})),
        ]).then((data) => { 
        console.log(data)
//Order PNL
              data[0][1].map(value => {
      
                const { orderno,
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
             
               
                 tempDataSource_summary_report_order_wise.push({
                  orderno:orderno,
                  FULLNAME:FULLNAME,
                  Zip:Zip,
                  State:State,
                  po_shipping:po_shipping,
                  customerPay:customerPay,
                  ShippingCost:ShippingCost,
                  cost:cost,
                  purchaseCost:purchaseCost,
                  ordertotal:ordertotal,
                  Moneycollected:Moneycollected,
                  commission:commission,
                  profit:profit,
                  Isdropship:Isdropship,
                  IsReplacement:IsReplacement,
                  OrderDiscount:OrderDiscount
                  
                  
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

 
       tempDataSource_summary_report_item_wise.push({
    vendorname:vendorname,
merchantsku:merchantsku,
vendorstylecode:vendorstylecode,
colorcode:colorcode,
sizename:sizename,
orderstatus:orderstatus,
itemstatus:itemstatus,
orderdate:orderdate,
uspsdate:uspsdate,
ORDERTYPE:ORDERTYPE,
orderno:orderno,
purchaseorderno:purchaseorderno,
itemqty:itemqty,
cost:cost,
purchaseCost:purchaseCost,
commit_status:commit_status,
commision:commision,
SalePrice:SalePrice,
pu_price:pu_price,
Weight:Weight,
shipping:shipping,
po_shipping:po_shipping,
isRMA:isRMA,
customer_pay_ship:customer_pay_ship,
profit:profit,
PPS:PPS,
final_profit:final_profit,
Type:Type,
IsReplacement:IsReplacement,
Discount_amount:Discount_amount
  });

});
                //    downloadFile(data[1][0])
                    //Price PNL
              // data[2][1].map(value => {
      
              //   const { vendorname
              //       , TotalAmont
              //       ,profit
              //       ,loss
              //       ,percentge
              //        } = value;

              //   tempDataSource_summary_report_Price_wise.push({
              //       vendorname: vendorname,
              //       TotalAmont: Math.round(TotalAmont * 100) / 100 ,
              //       profit:  Math.round(profit * 100) / 100 ,
              //       loss:  Math.round(loss * 100) / 100 ,
              //     percentge: Math.round(percentge * 100) / 100  
              //   });
        
              // });
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
                      // console.log('json',json)

              setstate({ ...state, dataOrderDownload:data[0][0],dataSourceOrder: [...tempDataSource_summary_report_order_wise],
                dataItemDownload:data[1][0],dataSourceItem: [...tempDataSource_summary_report_item_wise],
                //  dataSourcePrice: [...tempDataSource_summary_report_Price_wise],
                // dataSourceDetails: [...tempDataSource_summary_report_Detail_wise],
                isLoader: false });
  



   });

}

const topMenu = [
    // {
    //     tab: 'PNL Order Summary',
    //     key: 'OrderPNLSummary',
    //     tabName: <OrderPNLSummary dataSourceOrder={dataSourceOrder}/>
    // },
    // {
    //     tab: 'PNL Item Summary',
    //     key: 'ItemPNLSummary',
    //     tabName: <ItemPNLSummary dataSourceItem={dataSourceItem}/>

    // },
    // {
    //     tab: 'PNL Price Summary',
    //     key: 'PricePNLSummary',
    //     tabName: <PricePNLSummary dataSourcePrice={dataSourcePrice} />

    // }
    // ,
    // {
    //     tab: 'PNL Detail',
    //     key: 'Detail PNL',
    //     tabName: <DetailPNL  dataSourceDetails={dataSourceDetails}  />

    // }
    // ,
    {
        tab: 'PNL Order',
        key: 'OrderPNL',
        tabName: <OrderPNL dataSourceOrder={dataSourceOrder} dataOrderDownload={dataOrderDownload} />

    }
    ,
    {
        tab: 'PNL Item',
        key: 'ItemPNL',
        tabName: <ItemPNL  dataSourceItem={dataSourceItem} dataItemDownload={dataItemDownload}  />

    }
];
    return (
        <>
            {/* <h1>test</h1> */}
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
            <Row>
          <Cards  title="PNL Report">
        

              <Row gutter={50}>
                <Col span={8}>
                 
                  <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
             
                </Col>
               
                <Col span={8}>
                
                  <DatePicker style={{ padding: 10 }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                  
                </Col>
               
                <Col span={4} >
               
                <Button size="default" type="primary" onClick={getsummary_report_order_wise} > Search</Button>
                
                </Col>
             
                
                {/* <Col span={4}  >
                <Form.Item >
                  <Button   style={{ margintTop: 7 }} key="1" type="success" size="default" >
                    Download
                           </Button>
                           </Form.Item>
                </Col> */}

              </Row>

           
            
          </Cards>
        </Row>
                <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
             
                    {topMenu.map(item => (
                        tabChildBar?.includes(item.tab) && (
                            <TabPane tab={item.tab} key={item.key}>

                                {item.tabName}
                            </TabPane>)

                    ))}

                </Tabs>


              


            </Spin >


        </>
    );
};

export default ReportPNLView;