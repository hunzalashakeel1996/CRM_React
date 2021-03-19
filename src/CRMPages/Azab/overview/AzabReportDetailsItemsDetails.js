import { Card, Col, Row, Skeleton, Radio, notification, Collapse, Statistic, Typography, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
//import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
//import { PageHeader } from '../../components/page-headers/page-headers';
import { addComment, addAllComments, addReminder } from '../../../redux/ticket/actionCreator';
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Main } from '../../styled';
// import { Table } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import CreateComment from './overview/CreateComment';
// import CreateReminder from './overview/CreateReminder';

import { ChatSidebar, Content } from './../AzabDetailStyle';
//import { apiTrackingSummaryFetch, getAzabReportDetailapi } from '../../redux/apis/DataAction';
import { Spin } from 'antd';
import { formatDate } from '../../../components/time/formatDate'
import { audioPlay, webURL, uploadUrl, } from './../../../redux/apis/DataAction';
import differenceInCalendarWeeksWithOptions from 'date-fns/fp';
//import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
//import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
//import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';


// import PrivetChat from './overview/PrivetChat';
// import GroupChat from './overview/GroupChat';
//const SingleChat = lazy(() => import('./overview/singleChat'));
// const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));
const { Panel } = Collapse;

const AzabReportDetailsItemsDetails = (props) => {


const {itemDetail,orderItemStatus }=props.azabReportDetailsState

    const customPanelStyle = {
        background: '#F8F9FB',
        borderRadius: 3,
        marginBottom: 20,
        border: 0,
        overflow: 'hidden',
    };

    const dispatch = useDispatch();



    const formatedateremovetime = (value) => {

        var d = value;
        d = d.split('T')[0];
        return d
    }


    let getOrderItemStatus = (itemno) => {
        return orderItemStatus.filter(s => s.ITEMNO == itemno);
      };
    


    //   console.log(dataSource)
    return (
        <>
<Cards title="Item Details">
                      <>
                        {/* <Table className="table-responsive"pagination={false} dataSource={dataSource} columns={columns}/> */}

                        <Row style={{ backgroundColor: '#f8f9fb', color: '#9299B8', borderWidth: "2px", borderColor: "#F1F2F6", borderStyle: 'solid' }}>
                          <Col span={2}  ><p style={{ fontSize: 18,textAlign: 'center'}}> Item No</p></Col>
                          <Col span={4}><p style={{ fontSize: 18,textAlign: 'center' }}> Style Code</p></Col>
                          <Col span={4}><p style={{ fontSize: 18,textAlign: 'center' }}> Color</p></Col>
                          <Col span={2}><p style={{ fontSize: 18,textAlign: 'center' }}> Size</p></Col>
                          <Col span={2}><p style={{ fontSize: 18,textAlign: 'center' }}> Item Qty</p></Col>
                          <Col span={4}><p style={{ fontSize: 18,textAlign: 'center' }}> Embroidery</p></Col>
                          <Col span={6}><p style={{ fontSize: 18,textAlign: 'center' }}> SKU</p></Col>
                        </Row>

                        {itemDetail.map((val, i) => (
                          <>
                            <Row style={{ padding: 10, borderTopRadius: 20, backgroundColor: '#ececec' }}>
                              <Col span={2} ><p style={{ fontSize: 18,textAlign: 'center'}}> {val.ITEMNO}</p></Col>
                              <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}> {val.STYLECODE}</p></Col>
                              <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}> {val.COLORCODE}:{val.COLORNAME}</p></Col>
                              <Col span={2}><p style={{ fontSize: 18,textAlign: 'center'}}> {val.SIZENAME}</p></Col>
                              <Col span={2}><p style={{ fontSize: 18,textAlign: 'center'}}>{val.ITEMQTY}</p></Col>
                              <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}> {val.EMBROIDERY}</p></Col>
                              <Col span={6}><p style={{ fontSize: 18,textAlign: 'center'}}> {val.SKU}</p></Col>
                            </Row>


                            {getOrderItemStatus(val.ITEMNO).map((status, index) => (

                              <Row style={{ padding: 10, borderTopRadius: 20 }}>
                                <Col span={2}></Col>
                                <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}> {<FeatherIcon icon="arrow-right" />} </p></Col>
                                <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}> {status.ITEMSTATUS}</p></Col>
                                <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}>{status.NOTES}</p></Col>
                                <Col span={4}><p style={{ fontSize: 18,textAlign: 'center'}}>{status.USERNAME}</p></Col>

                              </Row>
                            ))}
                          </>

                        ))}

                      </>
                    </Cards>








        </>
    );
};


export default AzabReportDetailsItemsDetails;
