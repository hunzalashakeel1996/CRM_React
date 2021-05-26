import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { CardBarChart } from './style';
import { Bar } from 'react-chartjs-2';
import ReportBarChart from '../ReportBarChart';
//import { chartAmazonData } from '../../../redux/apis/DataAction';
import { chartTeamData } from '../../../../redux/apis/DataAction';
const TeamReport = () => {
    var UserTR = [];
    var UserOP = [];
    var orderProcess = [];
    const dispatch = useDispatch()
    const [state, setState] = useState({
        userNameTR: [],
        userNameOP: [],

        selectedTimeline: '',
        isLoading: false,
        qTYTeamReport: {
            Data: [3135]
        },
        qTYOrderProcess: {
            Data: [3135]
        },
        QTYSelectedTimeline: 'Data',

        loaderState: true
    });
    const { userNameTR, userNameOP, qTYOrderProcess, qTYTeamReport, QTYSelectedTimeline, loaderState } = state;
    useEffect(() => {
        let QTYTR = { ...qTYTeamReport }
        let QTYOP = { ...qTYOrderProcess }

        dispatch(chartTeamData({ "FROMDATE": "5/1/2021", "TODATE": "5/25/2021" })).then(data => {
         //   console.log('Team', data)

            for (let i = 0; i < data.length; i++) {

                if (data[i].Type == 'Team Report') {
                    UserTR.push(

                        data[i].USERNAME

                    )

                    QTYTR.Data.push(data[i].QTY)
                }
                if (data[i].Type == 'Order Process') {
                    console.log( data[i].QTY)
                    UserOP.push(

                        data[i].USERNAME

                    )
                    QTYOP.Data.push(data[i].QTY)

                }
            }
            setState({ ...state, userNameTR: UserTR, userNameOP: UserOP, loaderState: false })
        })

    }, [])
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
                <Row gutter={20}>
                    <Col lg={24} s={24}>
                        <ReportBarChart title='Team Report' orderType={userNameTR} dataset={qTYTeamReport[QTYSelectedTimeline]} />
                    </Col>


                    <Col lg={24} s={24}>
                        <ReportBarChart title='Order Process' orderType={userNameOP} dataset={qTYOrderProcess[QTYSelectedTimeline]} />
                    </Col>

                </Row>
            </Spin >
        </>
    );
};

export default TeamReport;
