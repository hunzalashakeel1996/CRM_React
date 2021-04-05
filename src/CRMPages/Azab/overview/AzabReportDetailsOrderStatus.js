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

const AzabReportDetailsOrderStatus = (props) => {
 
    const { itemStateOrder, itemStateExpectedShippedDate, itemState, itemStateDetail } = props.azabReportDetailsState

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





    //   console.log(dataSource)
    return (
        <>
            <Cards
                title={<Row>
                    <Col span={16}>
                        <p style={{ fontSize: 18, fontWeight: 'bold' }}>{`ORDER NO:  ${itemStateOrder[0].ORDERNO}`}</p>
                    </Col>
                    <Col span={8}>
                        <p style={{ fontSize: 18, fontWeight: 'bold' }}>{`Expected Shipped Date: ${formatedateremovetime(itemStateExpectedShippedDate[0].EXPECTEDSHIPDATE)}`}</p>
                    </Col>
                </Row>}>

                <p style={{ marginBottom: 20, fontSize: 18 }}>ORDER STATUS:</p>

                {itemState.map((val, index) => (
                    itemStateDetail.map((po, i) => (
                        <>
                            {val.vendorname != 'Pulse Uniform' && <span>


                                <p style={{ color: "red", fontSize: 22 }}>

                                    {<FeatherIcon icon="check" />} Item # {val.ItemNo}  Not Shipped | Picked By  {po.ASSIGNEDTO} on {formatedateremovetime(po.RECEIVEDDATE)}
                                </p>
                                <p style={{ color: "red", fontSize: 19, marginLeft: 30 }}>
                                    {val.PurchaseOrderNo} ({val.vendorname})
                                </p>
                                <p style={{ color: "red", fontSize: 19, marginLeft: 30 }}>
                                    {po.BOXNO}  ({po.BOXCOUNT})
                                </p>
                            </span>}
                        </>

                    ))

                ))}


            </Cards>







        </>
    );
};


export default AzabReportDetailsOrderStatus;
