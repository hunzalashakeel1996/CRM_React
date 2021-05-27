import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import { CardBarChart } from './overview/style';
import { Bar,Line } from 'react-chartjs-2';

const labels = {
    overall: ['Amazon', 'Walmart', 'PU', 'JLC'],
    week: ['Amazon', 'Walmart', 'PU', 'JLC'],
    today: ['Amazon', 'Walmart', 'PU', 'JLC', 'Amazon', 'Walmart', 'PU', 'JLC', 'Amazon', 'Walmart'],
    month: ['Amazon', 'Walmart', 'PU', 'JLC']
}

const SaleBarChart = ({ isTimelineChange, dataset, title, orderType, categories }) => {
  //  console.log(categories)
    const [state, setState] = useState({
        selectedTimeline: categories[0],
        isLoading: false,
        // chartOptions: {
        // datasets: [
        //     {
        //         label: `${new Date().getFullYear() - 1}`,
        //         backgroundColor: '#ff9059',
        //         borderColor: '#ff732e',
        //         borderWidth: 1,
        //         hoverBackgroundColor: '#db642a',
        //         hoverBorderColor: '#ba5c2f',
        //         data: dataset[1],
        //         // data: [140, 3135, 1753,140, 3135, 1753,140, 3135, 1753,140, 3135, 1753],
        //         barPercentage: 0.6,
        //     }
        // ]
        // }
    });
    const { selectedTimeline, isLoading } = state;
    // console.log('typeofNumber',[dataset[1]])
    // console.log('aaaa', typeof(dataset[0])==='number')
    const chartOptions = {
        datasets: [
            {
                label: `${new Date().getFullYear() }`,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                 borderColor: "rgba(75,192,192,1)",
                 borderWidth: 1,
                 hoverBackgroundColor: '#1a2a3b',
                 hoverBorderColor: '#14212e',
                data: [...dataset],
                // data: [140, 3135, 1753,140, 3135, 1753,140, 3135, 1753,140, 3135, 1753],
                barPercentage: 0.6,
            }
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

    const timelineChange = (timeline, index) => {

        setState({  ...state, selectedTimeline: timeline })
        isTimelineChange(index)
    }

    return (
        <>
            <Cards
                title={title}
                size="large"
                isbutton={
                    <div className="card-nav">
                        <ul>
                            {
                                categories.map((value, i) => (
                                    <li className={selectedTimeline === value ? 'active' : 'deactivate'}>
                                        <Link onClick={() => { timelineChange(value, i) }} to="#">
                                            {value}
                                        </Link>
                                    </li>
                                ))
                            }

                            {/* <li className={selectedTimeline === 'week' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('week'); }} to="#">
                          Week
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'month' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('month')}} to="#">
                          {ordersSelectedTimelineMonth}
                        </Link>
                      </li>
                      <li className={selectedTimeline === 'overall' ? 'active' : 'deactivate'}>
                        <Link onClick={() => {timelineChange('overall')}} to="#">
                          Overall
                        </Link>
                      </li> */}
                        </ul>
                    </div>
                }
            >
                <Bar
                    data={{...chartOptions, labels: orderType }}
                    options={options}
                />
            </Cards>
        </>
    );
};

export default SaleBarChart;
