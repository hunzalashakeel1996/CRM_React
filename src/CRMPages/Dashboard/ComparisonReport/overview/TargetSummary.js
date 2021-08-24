import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { CardBarChart } from './style';
import { Bar } from 'react-chartjs-2';
import ReportBarChart from '../ReportBarChart';
//import { chartAmazonData } from '../../../redux/apis/DataAction';
import { chartTargetSummaryData } from '../../../../redux/apis/DataAction';
import SaleBarChart from '../SaleBarChart';

const TargetSummary = (props) => {
    const {data}=props
    var Type = [];
    var categories = ['Amazon', 'Walmart', 'Sears', 'Ebay'];
    const dispatch = useDispatch()
    const [state, setState] = useState({
        orderType: [],
        selectedTimeline: '',
        isLoading: false,
        dataSource: [[], [], [], []],  // [orders, units, cost, sale]       
        selectedDatasetIndex: 0,
        loaderState: true
    });
    const { orderType, dataSource, loaderState, selectedDatasetIndex } = state;
    useEffect(() => {
        let dataSourceTemp = dataSource

        // dispatch(chartTargetSummaryData({"orderdatefrom":"5/24/2021","orderdateto":"5/25/2021"})).then(data => {
            // console.log(data)

            for (let i = 0; i <  data.length; i++) {
                Type.push(
                     data[i].vendorname
                )

                dataSourceTemp[0].push(data[i].Amazon)
                dataSourceTemp[1].push(data[i].Walmart)
                dataSourceTemp[2].push(data[i].Sears)
                dataSourceTemp[3].push(data[i].Ebay)
          
            }

            setState({ ...state, orderType: Type, loaderState: false, dataSource: dataSourceTemp })
        // })

    }, [])

    const isTimelineChange = (index) => {
        setState({...state, selectedDatasetIndex: index})
    }
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
                <Row gutter={20}>
                    <Col lg={24} s={24}>
                        <SaleBarChart title='Total' categories={categories} orderType={orderType} dataset={dataSource[selectedDatasetIndex]} isTimelineChange={isTimelineChange} />
                    </Col>


                    {/* 
        <Col lg={12} s={24}>
          <ReportBarChart title='Pending' ordersSelectedTimelineMonth={ordersSelectedTimelineMonth} isTimelineChange={(timeline) => {setState({...state, pendingSelectedTimeline: timeline})}} dataset={pendingReport[pendingSelectedTimeline]} />
        </Col> */}
                </Row>
            </Spin >
        </>
    );
};

export default TargetSummary;
