import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { CardBarChart } from './style';
import { Bar } from 'react-chartjs-2';
import ReportBarChart from '../ReportBarChart';
//import { chartAmazonData } from '../../../redux/apis/DataAction';
import { chartVendorSalesData } from '../../../../redux/apis/DataAction';
import SaleBarChart from '../SaleBarChart';
const VendorSales = (props) => {
    const {data}=props
    var Type = [];
    var categories = ['Total Orders', 'Total Units', 'Total Cost', 'Total Sales'];
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

        // dispatch(chartVendorSalesData({ "FROMDATE": "5/1/2021", "TODATE": "5/25/2021" })).then(data => {
            // console.log(data)

            for (let i = 0; i < data.length; i++) {
                Type.push(
                    data[i].VENDORNAME
                )

                dataSourceTemp[0].push(data[i].TotalOrders)
                dataSourceTemp[1].push(data[i].TotalUnits)
                dataSourceTemp[2].push(data[i].TotalCost)
                dataSourceTemp[3].push(data[i].TotalSales)
          
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

export default VendorSales;
