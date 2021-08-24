import { Card, Col, Row, Skeleton, Radio, notification, Collapse, Statistic, Typography, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { addComment, addAllComments, addReminder } from '../../redux/ticket/actionCreator';
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Main } from '../styled';


import { ChatSidebar, Content } from './AzabDetailStyle';
import { apiTrackingSummaryFetch, getAzabReportDetailapi,feed_report,getvendor,getBrand } from '../../redux/apis/DataAction';
import { Spin } from 'antd';
import { formatDate } from '../../components/time/formatDate'
import { audioPlay, webURL, uploadUrl, } from './../../redux/apis/DataAction';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import AzabReportDetailsOrderStatus from './overview/AzabReportDetailsOrderStatus';
import AzabReportDetailsPODetails from './overview/AzabReportDetailsPODetails';
import AzabReportDetailsItemsDetails from './overview/AzabReportDetailsItemsDetails';
import AzabReportDetailsNotes from './overview/AzabReportDetailsNotes';
import AzabReportDetailsTrackingSummary from './overview/AzabReportDetailsTrackingSummary';


// import PrivetChat from './overview/PrivetChat';
// import GroupChat from './overview/GroupChat';
//const SingleChat = lazy(() => import('./overview/singleChat'));
// const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));
const { Panel } = Collapse;

const viewAzabReportDetails = ({ match, location }) => {


  const customPanelStyle = {
    background: '#F8F9FB',
    borderRadius: 3,
    marginBottom: 20,
    border: 0,
    overflow: 'hidden',
  };

  const dispatch = useDispatch();

  const [azabReportDetailsState, setstateAzabReportDetails] = useState({
    itemState: [],
    itemStateDetail: [],
    itemStateOrder: [],
    itemStateExpectedShippedDate: "",
    poDetail: "",
    itemDetail: "",
    loaderState: true,
    orderItemStatus: [],
    orderNotes: [],
    trackingNO: "",
    trackingSummary: ""

  });
  const { itemState, itemStateDetail, itemStateOrder, itemStateExpectedShippedDate, poDetail, itemDetail, loaderState, orderItemStatus, orderNotes, trackingNO, trackingSummary } = azabReportDetailsState;


  const formatedate = (value) => {

    let a = 'avsdFasdas'
    let formatedDate = value.split("T")
    let Date = formatedDate[0];
    let Time = formatedDate[1].split(".");
    Time = Time[0]
    let format = Date + ' ' + Time
    return format
  }
  const formatedateremovetime = (value) => {

    var d = value;
    d = d.split('T')[0];
    return d
  }

  useEffect(() => {

    dispatch(getAzabReportDetailapi({ orderno: match.params.id })).then(data => {

    //  // console.log(data);
      //  // console.log('tracking state0',data[5][0].TrackingNo);

     // // console.log('tracking state', data[5][0].TrackingNo);
      dispatch(apiTrackingSummaryFetch({ trackingNO: data[5][0].TrackingNo })).then(response => {
        setstateAzabReportDetails({
          ...azabReportDetailsState,
          itemState: data[8], itemStateDetail: data[10], itemStateOrder: data[0],
          itemStateExpectedShippedDate: data[11], poDetail: data[9], itemDetail: data[2],
          orderItemStatus: data[6], orderNotes: data[0], trackingNO: data[5][0].TrackingNo, trackingSummary: response, loaderState: false
        })
      })
    })

    // dispatch(getvendor()).then(res => {
    //  // console.log('getvendor',res)
    // })
    // dispatch(getvendor({})).then(res => {
    //   // console.log('getvendor',res)

    //  })
    // dispatch(feed_report({
    //                           "user": "muhammad.aqib",
    //                           "orderdatefrom": "Mon Mar 01 2021",
    //                           "orderdateto": "Thu Mar 04 2021"
    //                         }
    // )).then(res => {
    //   // console.log('FeedBack',res)
    //  })
 


  }, []);


  let getOrderItemStatus = (itemno) => {
    return orderItemStatus.filter(s => s.ITEMNO == itemno);
  };

  

  //   // console.log(dataSource)
  return (
    <>

      {loaderState === false ?
        <div>
          <PageHeader
            title="Azab Report Detils"

          />
          <Main>
            <Row gutter={25}>
              <Col md={17}>
               
                <AzabReportDetailsOrderStatus azabReportDetailsState={azabReportDetailsState}  />
                <Row gutter={24}>

              <AzabReportDetailsPODetails azabReportDetailsState={azabReportDetailsState}  />   

                </Row>
                <Row gutter={15}>
                  <Col xs={24}>
                  <AzabReportDetailsItemsDetails azabReportDetailsState={azabReportDetailsState}  />   
                  </Col>
                </Row>
              </Col>
              <Col md={7}>
              <AzabReportDetailsNotes azabReportDetailsState={azabReportDetailsState}  />   
                <Row gutter={24}>
                  <Col md={24} xs={24}>
              
                  <AzabReportDetailsTrackingSummary azabReportDetailsState={azabReportDetailsState}  />   
                  </Col>
                </Row>
              </Col>
            </Row>

          </Main>
        </div>
        :
        <div className="spin">
          <Spin />
        </div>
      }
    </>
  );
};


export default viewAzabReportDetails;
