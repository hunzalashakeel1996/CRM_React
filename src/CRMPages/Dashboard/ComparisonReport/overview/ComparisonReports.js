import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { CardBarChart } from './style';
import { Bar } from 'react-chartjs-2';
import ComparisonBarChart from '../ComparisonBarChart';
//import { chartAmazonData } from '../../../redux/apis/DataAction';
import { chartAmazonData, chartWalmartData, chartJLCData, chartPUData ,chartSearsData,chartEbayData} from '../../../../redux/apis/DataAction';
const AmazonComparisonReports = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({


    selectedTimeline: 'week',
    isLoading: false,
    ordersReport: {
      today: [[], []],
      week: [[], []],
      month1: [[], []],
      month2: [[], []],
      month3: [[], []],
      'over All': [[], []]
    },
    salesReport: {
      today: [[], []],
      week: [[], []],
      month1: [[], []],
      month2: [[], []],
      month3: [[], []],
      'over All': [[], []]
    },
    retrurnReport: {
      today: [[], []],
      week: [[], []],
      month1: [[], []],
      month2: [[], []],
      month3: [[], []],
      'over All': [[], []]
    },
    pendingReport: {
      today: [[], []],
      week: [[], []],
      month1: [[], []],
      month2: [[], []],
      month3: [[], []],
      'over All': [[], []]
    },
    ordersSelectedTimeline: 'today',
    salesSelectedTimeline: 'today',
    returnSelectedTimeline: 'today',
    pendingSelectedTimeline: 'today',
    ordersSelectedTimelineThisMonth: '',
    ordersSelectedTimelineLastMonth: '',
    ordersSelectedTimelineLast2Month: '',
    loaderState: true
  });
  const { ordersReport, ordersSelectedTimeline, salesReport, retrurnReport, pendingReport, salesSelectedTimeline, returnSelectedTimeline, pendingSelectedTimeline, ordersSelectedTimelineThisMonth,ordersSelectedTimelineLastMonth,ordersSelectedTimelineLast2Month, loaderState } = state;
  useEffect(() => {
    let orders = { ...ordersReport }
    let sales = { ...salesReport }
    let returnRep = { ...retrurnReport }
    let pending = { ...pendingReport }

    Promise.all([dispatch(chartAmazonData()), dispatch(chartWalmartData()), dispatch(chartPUData()), dispatch(chartJLCData()), dispatch(chartSearsData()), dispatch(chartEbayData())]).then(data => {
     console.log(data[5])
      var AmazonData = JSON.parse(data[0])
      var WalmartData = JSON.parse(data[1])
      var PUData = JSON.parse(data[2])
      var JLCData = JSON.parse(data[3])
      var SearsData = JSON.parse(data[4])
      var EbayData = JSON.parse(data[5])
      let dataTemp = [AmazonData, WalmartData, PUData, JLCData,SearsData,EbayData]
      // console.log(AmazonData)
      // condition to check if any marketplace does not contain today object
      dataTemp.map(value => {
        if (value.Table.length === 3) {
          value = addMissingTodayObject(value)
        }
      })

      let objects = [orders, sales, returnRep, pending]
      let categories = ['today', 'week', 'month1','month2','month3', 'over All']

      let objectsCountName = [['OrdersCountCurrent', 'OrdersCountOld'], ['SalesCurrent', 'SalesOld'], ['ReturnCurrentRMA', 'ReturnOldRMA'], ['PendingOrderCurrent', 'PendingOrderOld']]

      // first loop is for objects(orders, sales, etc) and second loop is for set values from db to each object. ObjectCountName is for 2020 and 2021 values
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
          
      
          

          objects[i][categories[j]][0][0] = AmazonData.Table[j][objectsCountName[i][0]]
          objects[i][categories[j]][1][0] = AmazonData.Table[j][objectsCountName[i][1]]
          objects[i][categories[j]][0][1] = WalmartData.Table[j][objectsCountName[i][0]]
          objects[i][categories[j]][1][1] = WalmartData.Table[j][objectsCountName[i][1]]
          objects[i][categories[j]][0][2] = PUData.Table[j][objectsCountName[i][0]]
          objects[i][categories[j]][1][2] = PUData.Table[j][objectsCountName[i][1]]
          objects[i][categories[j]][0][3] = JLCData.Table[j][objectsCountName[i][0]]
          objects[i][categories[j]][1][3] = JLCData.Table[j][objectsCountName[i][1]]
          objects[i][categories[j]][0][4] = SearsData.Table[j][objectsCountName[i][0]]
          objects[i][categories[j]][1][4] = SearsData.Table[j][objectsCountName[i][1]]
          objects[i][categories[j]][0][5] = EbayData.Table[j][objectsCountName[i][0]]
          objects[i][categories[j]][1][5] = EbayData.Table[j][objectsCountName[i][1]]
        }
      }
      // console.log('AmazonData',AmazonData.Table[2].TodayDate);

      setState({ ...state, ordersSelectedTimelineThisMonth: AmazonData.Table[2].TodayDate,ordersSelectedTimelineLastMonth: AmazonData.Table[3].TodayDate,ordersSelectedTimelineLast2Month: AmazonData.Table[4].TodayDate, loaderState: false })
    })

  }, [])

  const addMissingTodayObject = (object) => {
    object.Table.unshift({
      OrdersCountCurrent: 0,
      OrdersCountOld: 0,
      PendingOrderCurrent: 0,
      PendingOrderOld: 0,
      ReturnCurrentRMA: 0,
      ReturnOldRMA: 0,
      SalesCurrent: 0,
      SalesOld: 0,
      TodayDate: "today"
    })
    return object
  }
  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
        <Row gutter={20}>
          <Col lg={12} sm={24}>
            <ComparisonBarChart title='Orders' ordersSelectedTimelineThisMonth={ordersSelectedTimelineThisMonth} ordersSelectedTimelineLastMonth={ordersSelectedTimelineLastMonth} ordersSelectedTimelineLast2Month={ordersSelectedTimelineLast2Month} isTimelineChange={(timeline) => { setState({ ...state, ordersSelectedTimeline: timeline }) }} dataset={ordersReport[ordersSelectedTimeline]} />
          </Col>

          <Col lg={12} sm={24}>
            <ComparisonBarChart title='Sales' ordersSelectedTimelineThisMonth={ordersSelectedTimelineThisMonth} ordersSelectedTimelineLastMonth={ordersSelectedTimelineLastMonth} ordersSelectedTimelineLast2Month={ordersSelectedTimelineLast2Month} isTimelineChange={(timeline) => { setState({ ...state, salesSelectedTimeline: timeline }) }} dataset={salesReport[salesSelectedTimeline]} />
          </Col>
        </Row>
        <Row gutter={20} >
          <Col lg={12} sm={24}>
            <ComparisonBarChart title='Return' ordersSelectedTimelineThisMonth={ordersSelectedTimelineThisMonth}ordersSelectedTimelineLastMonth={ordersSelectedTimelineLastMonth} ordersSelectedTimelineLast2Month={ordersSelectedTimelineLast2Month} isTimelineChange={(timeline) => { setState({ ...state, returnSelectedTimeline: timeline }) }} dataset={retrurnReport[returnSelectedTimeline]} />
          </Col>

          <Col lg={12} sm={24}>
            <ComparisonBarChart title='Pending' ordersSelectedTimelineThisMonth={ordersSelectedTimelineThisMonth} ordersSelectedTimelineLastMonth={ordersSelectedTimelineLastMonth} ordersSelectedTimelineLast2Month={ordersSelectedTimelineLast2Month} isTimelineChange={(timeline) => { setState({ ...state, pendingSelectedTimeline: timeline }) }} dataset={pendingReport[pendingSelectedTimeline]} />
          </Col>
        </Row>
      </Spin >
    </>
  );
};

export default AmazonComparisonReports;
