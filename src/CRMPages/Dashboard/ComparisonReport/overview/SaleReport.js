import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { CardBarChart } from './style';
import { Bar } from 'react-chartjs-2';
import ReportBarChart from '../ReportBarChart';
//import { chartAmazonData } from '../../../redux/apis/DataAction';
import { chartSaleData } from '../../../../redux/apis/DataAction';
const SaleReports = (props) => {
  const {data}=props
  console.log('saleData',data)
    var Type =[];
  const dispatch = useDispatch()
  const [state, setState] = useState({
    orderType:[],
    // data:[],

    selectedTimeline: '',
    isLoading: false,
    totalReport: {
      Data: []
    },
    salesReport: {
        Data: []
    },
    itemReport: {
        Data: []
    },
    totalSelectedTimeline: 'Data',
    salesSelectedTimeline: 'Data',
    itemRSelectedTimeline: 'Data',
    loaderState: true
  });
  const {orderType, totalReport, totalSelectedTimeline, salesReport, itemReport,  salesSelectedTimeline, itemRSelectedTimeline, loaderState } = state;
  useEffect(()=>{
    setState({...state,loaderState: false})
    let orders = {...totalReport}
    let sales = {...salesReport}
    let item = {...itemReport}
    // dispatch(chartSaleData({"rType":"Date","oType":0,"FROMDATE":"5/1/2021","TODATE":"5/25/2021"})).then(data => {
     console.log(data)
     let objects = [orders]
     if (data[0].length>0){
     for (let i = 0; i < data[0].length; i++) {
        Type.push(
            data[0][i].TYPE
          )
          orders.Data[i]  = data[0][i].TOTALORDER
          sales.Data[i]  = data[0][i].TOTALAMOUNT
          item.Data[i]  = data[0][i].ITEMCOUNT
    }
     }
         setState({...state,orderType:Type, loaderState: false})
    // })
   
},[data])
  return (
    <>
       {/* <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} > */}
      <Row gutter={20}>
        <Col lg={24} s={24}>
          <ReportBarChart title='Orders' orderType={orderType}  dataset={totalReport[totalSelectedTimeline]} />
        </Col>

        <Col lg={24} s={24}>
          <ReportBarChart title='Amount' orderType={orderType}  dataset={salesReport[salesSelectedTimeline]} />
        </Col>
      </Row>
      <Row gutter={20} >
        <Col lg={24} s={24}>
          <ReportBarChart title='Items' orderType={orderType}  dataset={itemReport[itemRSelectedTimeline]} />
        </Col>
{/* 
        <Col lg={12} s={24}>
          <ReportBarChart title='Pending' ordersSelectedTimelineMonth={ordersSelectedTimelineMonth} isTimelineChange={(timeline) => {setState({...state, pendingSelectedTimeline: timeline})}} dataset={pendingReport[pendingSelectedTimeline]} />
        </Col> */}
      </Row>
      {/* </Spin > */}
    </>
  );
};

export default SaleReports;
