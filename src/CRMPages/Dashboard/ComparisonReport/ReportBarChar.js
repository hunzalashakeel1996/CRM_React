import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import { CardBarChart } from './Amazon/style';
import { Bar } from 'react-chartjs-2';

const labels = {
    overall:['Overall'], 
    week: ['1 Week', '2 Week', '3 Week', 'This Week'], 
    today:['Today'], 
    month:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
}

const ReportBarChart = ({ isTimelineChange, dataset, title }) => {
    const [state, setState] = useState({
        selectedTimeline: 'today',
        isLoading: false,
    });
    const { selectedTimeline, isLoading } = state;
    console.log('aaaa', typeof(dataset[0])==='number')
    const chartOptions = {
        datasets: [
            {
                label: `${new Date().getFullYear() - 1}`,
                backgroundColor: '#ff9059',
                borderColor: '#ff732e',
                borderWidth: 1,
                hoverBackgroundColor: '#db642a',
                hoverBorderColor: '#ba5c2f',
                data: typeof(dataset[1])==='number' ? [dataset[1]]: [...dataset[1]],
                // data: [140, 3135, 1753,140, 3135, 1753,140, 3135, 1753,140, 3135, 1753],
                barPercentage: 0.6,
            },
            {
                label: `${new Date().getFullYear()}`,
                backgroundColor: '#304860',
                borderColor: '#233445',
                borderWidth: 1,
                hoverBackgroundColor: '#1a2a3b',
                hoverBorderColor: '#14212e',
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
                      <li className={selectedTimeline === 'month' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('month')}} to="#">
                          Month
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'overall' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('overall')}} to="#">
                          Overall
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
            >
                <Bar
                    data={{...chartOptions, labels: labels[selectedTimeline]}}
                    options={options}
                />
            </Cards>
        </>
    );
};

export default ReportBarChart;
