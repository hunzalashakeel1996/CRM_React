import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import { CardBarChart } from './overview/style';
import { Bar,Line } from 'react-chartjs-2';

const labels = {
    overall:['Amazon','Walmart','PU', 'JLC'], 
    week:['Amazon','Walmart','PU', 'JLC'], 
    today:['Amazon','Walmart','PU', 'JLC','Amazon','Walmart','PU', 'JLC','Amazon','Walmart'], 
    month:['Amazon','Walmart','PU', 'JLC']
}

const ReportBarChart = ({ isTimelineChange, dataset, title,orderType }) => {
 //console.log(orderType)
  
    const [state, setState] = useState({
        selectedTimeline: 'Data',
        isLoading: false,
    });
    const { selectedTimeline, isLoading } = state;
    // console.log('typeofNumber',[dataset[1]])
    // console.log('aaaa', typeof(dataset[0])==='number')
    const chartOptions = {
        datasets: [
            {
                 label: `${new Date().getFullYear()}`,
                 fill: true,
                 backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                 borderWidth: 1,
                 hoverBackgroundColor: '#1a2a3b',
                 hoverBorderColor: '#14212e',
                data:  [...dataset],
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

    const timelineChange = (timeline) => {
        setState({ ...state, selectedTimeline: timeline })
        isTimelineChange(timeline)
    }

    return (
        <>
            <Cards
                title={title}
                size="large"
                // isbutton={
                //     <div className="card-nav">
                //         <ul>
                //             <li className={selectedTimeline === 'today' ? 'active' : 'deactivate'}>
                //                 <Link onClick={() => { timelineChange('today') }} to="#">
                //                     Today
                //                 </Link>
                //       </li>
                //       <li className={selectedTimeline === 'week' ? 'active' : 'deactivate'}>
                //         <Link onClick={() => {timelineChange('week'); }} to="#">
                //           Week
                //         </Link>
                //       </li>
                //       <li className={selectedTimeline === 'month' ? 'active' : 'deactivate'}>
                //         <Link onClick={() => {timelineChange('month')}} to="#">
                //           {ordersSelectedTimelineMonth}
                //         </Link>
                //       </li>
                //       <li className={selectedTimeline === 'overall' ? 'active' : 'deactivate'}>
                //         <Link onClick={() => {timelineChange('overall')}} to="#">
                //           Overall
                //         </Link>
                //       </li>
                //     </ul>
                //   </div>
                // }
            >
                <Line
                    data={{...chartOptions, labels: orderType}}
                    options={options}
                />
            </Cards>
        </>
    );
};

export default ReportBarChart;
