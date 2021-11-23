import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import { CardBarChart } from './overview/style';
import { Bar,Line } from 'react-chartjs-2';

const ReportBarChart = ({ isTimelineChange, dataset, title,ordersSelectedTimelineThisMonth,ordersSelectedTimelineLastMonth,ordersSelectedTimelineLast2Month }) => {
//    // console.log(dataset)
    const [state, setState] = useState({
        selectedTimeline: 'today',
        isLoading: false,
    });
    const { selectedTimeline, isLoading } = state;
    // // console.log('typeofNumber',[dataset[1]])
   //  console.log('aaaa', typeof(dataset[0])==='number')
//   console.log('aaaa', dataset[0])
    const chartOptions = {
        datasets: [
            {
                label: `${new Date().getFullYear() - 1}`,
                fill: true,
                backgroundColor: "#0000FF",
                borderColor: "#0000FF",
                borderWidth: 1,
                hoverBackgroundColor: '#0000FF',
                hoverBorderColor: '#0000FF',
                data: typeof(dataset[1])==='number' ? [dataset[1]]: [...dataset[1]],
                // data: [140, 3135, 1753,140, 3135, 1753,140, 3135, 1753,140, 3135, 1753],
                barPercentage: 0.6,
            },
            {
                label: `${new Date().getFullYear()}`,
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                borderWidth: 1,
                hoverBackgroundColor: '#FF0000',
                hoverBorderColor: '#FF0000',
                // data: [727, 2552, 17412],
                data: typeof(dataset[0])==='number' ? [dataset[0]]: [...dataset[0]],
                barPercentage: 0.6,
            },
        ]
    };

    const options = {
        maintainAspectRatio: true,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    // max: this.props.maxY,
                    // min: 0,
                    // stepSize: 3
                }
            }]
        },
        // legend: {
        //   display: false,
        //   labels: {
        //     display: false,
        //   },
        // },
    };

    const timelineChange = (timeline) => {
        setState({ ...state, selectedTimeline: timeline })
        isTimelineChange(timeline)
    }

    return (
        <>
            <Cards
                title={title}
                size="large"
                isbutton={
                    <div className="card-nav">
                        <ul>
                            <li className={selectedTimeline === 'today' ? 'active' : 'deactivate'}>
                                <Link onClick={() => { timelineChange('today') }} to="#">
                                    Today
                                </Link>
                      </li>
                      <li className={selectedTimeline === 'week' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('week'); }} to="#">
                          Week
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'month1' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('month1')}} to="#">
                          {ordersSelectedTimelineThisMonth}
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'month2' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('month2')}} to="#">
                          {ordersSelectedTimelineLastMonth}
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'month3' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('month3')}} to="#">
                          {ordersSelectedTimelineLast2Month}
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'over All' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('over All')}} to="#">
                          over All
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
            >
                <Bar
                    data={{...chartOptions, labels: ['Amazon','Walmart','PU', 'JLC', 'Sears','Ebay']}}
                    options={options}
                />
            </Cards>
        </>
    );
};

export default ReportBarChart;
