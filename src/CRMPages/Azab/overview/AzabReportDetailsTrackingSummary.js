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
//import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
//import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
//import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';


// import PrivetChat from './overview/PrivetChat';
// import GroupChat from './overview/GroupChat';
//const SingleChat = lazy(() => import('./overview/singleChat'));
// const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));
const { Panel } = Collapse;

const AzabReportDetailsTrackingSummary = (props) => {


    const { trackingNO,trackingSummary} = props.azabReportDetailsState



    const dispatch = useDispatch();





    //   // console.log(dataSource)
    return (
        <>

           <Cards title="Tracking Status Summary">
                      <p>
                        TRACKING INFO: <a href={`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLabels=${trackingNO}`}target="_blank">{trackingNO}</a>
                      
                      </p>
                      <p>
                        Details: {trackingSummary}
                      </p>


                    </Cards>

        </>
    );
};


export default AzabReportDetailsTrackingSummary;
