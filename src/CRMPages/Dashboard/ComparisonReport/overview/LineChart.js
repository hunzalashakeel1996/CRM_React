import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Spin, Row, Col } from 'antd';
import { RevenueWrapper } from '../style';
import { ChartjsAreaChart } from '../../../../components/charts/chartjs';
import { customTooltips, chartLinearGradient } from '../../../../components/utilities/utilities';
import { performanceFilterData, performanceGetData } from '../../../../redux/chartContent/actionCreator';
import { apilineChartGraph } from '../../../../redux/apis/DataAction';
import { Cards } from '../../../../components/cards/frame/cards-frame';

let graphLine = [
    {
        "users": ["72.6K", [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65], [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]]
        , "sessions": ["87.2k", [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 30], [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 25]]
        , "bounce": ["26.3%", [35, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 30], [20, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 25]]
        , "duration": ["2m 18s", [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65], [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]]
        , "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        ,"sellerType":[[[],[]],[[],[]]]
    },
    {
        "users": ["72.6K", [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65], [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]]
        , "sessions": ["87.2k", [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 30], [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 25]]
        , "bounce": ["26.3%", [35, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 30], [20, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 25]]
        , "duration": ["2m 18s", [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65], [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]]
        , "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        ,"sellerType":[[[],[]],[[],[]]]
    }
]

const TotalRevenue = () => {
    console.log(graphLine)

console.log(graphLine[0].sellerType)
    var currentDate = new Date();
    var pastYear = currentDate.getFullYear() - 1;
    var currentYear = currentDate.getFullYear();
    currentDate.setFullYear(pastYear);
    currentDate.setFullYear(currentYear);


    const dispatch = useDispatch();
    // const { performanceState, preIsLoading } = useSelector(state => {

    //     return {

    //         performanceState: graphLine,

    //         preIsLoading: false

    //     };
    // });
    const [state, setState] = useState({
        revenue: ['Amazon','Amazon','Amazon','Amazon'],
        isLoading: false,
        orderTypeList: [],
        selectOrderType: ['Amazon','Amazon','Amazon','Amazon'],
        dataCurrentYear: [],
        dataLastYear: [],
        lastYearDate: currentDate.getFullYear() - 1,
        currentYearDate: currentDate.getFullYear(),
        performanceState: graphLine,
        preIsLoading: false,
        performanceDatasets: [],
        orderStatusSelect: ''


    });
    const {revenue, orderStatusSelect, performanceDatasets, performanceState, lastYearDate, currentYearDate, dataCurrentYear, dataLastYear, orderTypeList, selectOrderType, isLoading } = state

    const status = ['Order', 'Sales']

    useEffect(() => {

        setState({ ...state, isLoading: true })

        dispatch(apilineChartGraph()).then(data => {
            console.log(data)
            const orderTypeList = [... new Set(data.map(item => item.OrderType))]
            console.log(orderTypeList)

            status.map((value, i) => {

                let dataGraphCurrent = []
                let dataGraphLast = []

                let resultCurrent = data.filter(item => item['OrderType'] === 'Amazon' && item['status'] === value && item['year'] === currentYearDate)
                let resultLast = data.filter(item => item['OrderType'] === 'Amazon' && item['status'] === value && item['year'] === lastYearDate)


                //   console.log(value, resultCurrent)

                resultCurrent.map(value => {
                    const { Ordercount } = value
                    dataGraphCurrent.push(Ordercount)
                })
                graphLine[i].users[1] = dataGraphCurrent

                resultLast.map(value => {
                    const { Ordercount } = value
                    dataGraphLast.push(Ordercount)
                })
                graphLine[i].users[2] = dataGraphLast



                performanceDatasetsFunction(i)
                i++;
            })

            setState({
                ...state,
                performanceState: graphLine,
                orderTypeList: orderTypeList,
                dataCurrentYear: data.filter(item => item['year'] === currentYearDate),
                dataLastYear: data.filter(item => item['year'] === lastYearDate),
                isLoading: false
            });

        })

        console.log(performanceState)

    }, []);

    const handleActiveChangeRevenue = (value, index) => {
        let tempdata = []
        let orderStatus = ['Order', 'Sales']
        //  console.log(marketplaces[index])
        let dataGraphCurrent = []
        let dataGraphLast = []
        let tempPerformanceDatasets = performanceDatasets
        let resultCurrent = dataCurrentYear.filter(item => item['status'] === orderStatus[index] && item['OrderType'] === value)
        let resultLast = dataLastYear.filter(item => item['status'] === orderStatus[index] && item['OrderType'] === value)


        resultCurrent.map(value => {
            const { Ordercount } = value
            dataGraphCurrent.push(Ordercount)
        })
        graphLine[index].users[1] = dataGraphCurrent

        resultLast.map(value => {
            const { Ordercount } = value
            dataGraphLast.push(Ordercount)
        })
        graphLine[index].users[2] = dataGraphLast

        tempdata.push([{

            data: graphLine[index].users[1],
            borderColor: '#0000FF',
            borderWidth: 4,
            fill: true,
            backgroundColor: () =>
                chartLinearGradient(document.getElementById('performance'), 300, {
                    start: '#5F63F230',
                    end: '#ffffff05',
                }),
            label: `${currentYearDate} period`,
            pointStyle: 'circle',
            pointRadius: '0',
            hoverRadius: '9',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#5F63F2',
            hoverBorderWidth: 5,
            //   amount: '$7,596',
            amountClass: 'current-amount',
            sellerType: status[index]
        }
            ,
        {
            data: graphLine[index].users[2],
            borderColor: '#FF0000',
            borderWidth: 2,
            fill: false,
            backgroundColor: '#00173750',
            label: `${lastYearDate} period`,
            // borderDash: [3, 3],
            pointRadius: '0',
            hoverRadius: '0',
            //   amount: '$3,258',
            amountClass: 'prev-amount',
            sellerType: status[index]
        }])

        //   console.log(tempdata)



        tempPerformanceDatasets[index] = tempdata[0]
        //Change revenue
        let tempRevenue=[...revenue];
        tempRevenue[index]=value

        //   console.log(tempPerformanceDatasets)
        setState({
            ...state,
            performanceState: [...graphLine],
            revenue: tempRevenue,
            selectOrderType: tempRevenue,
            performanceDatasets: tempPerformanceDatasets,
            orderStatusSelect: orderStatus[index]

        });
        //   performanceDatasetsFunction(index)
        //  return dispatch(performanceFilterData(value));
    };

    const performanceDatasetsFunction = (val) => {
        let tempdata = performanceDatasets

        tempdata.push([
            {

                data: performanceState[val].users[2],
                borderColor: '#0000FF',
                borderWidth: 4,
                fill: true,
                backgroundColor: () =>
                    chartLinearGradient(document.getElementById('performance'), 300, {
                        start: '#5F63F230',
                        end: '#ffffff05',
                    }),
                label: `${currentYearDate} period`,
                pointStyle: 'circle',
                pointRadius: '0',
                hoverRadius: '9',
                pointBorderColor: '#fff',
                pointBackgroundColor: '#5F63F2',
                hoverBorderWidth: 5,
                //   amount: '$7,596',
                amountClass: 'current-amount',
                sellerType: status[val]
            }
            ,
            {
                data: performanceState[val].users[1],
                borderColor: '#FF0000',
                borderWidth: 2,
                fill: false,
                backgroundColor: '#00173750',
                label: `${lastYearDate} period`,
                // borderDash: [3, 3],
                pointRadius: '0',
                hoverRadius: '0',
                //   amount: '$3,258',
                amountClass: 'prev-amount',
                sellerType: status[val]
            }])
        setState({ ...state, performanceDatasets: [...tempdata] });
        // ]
        //   console.log(performanceDatasets,'&',tempdata)
    }

    // console.log( performanceDatasets[0][0])
    return (
        <>

            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoading} >
                <Row gutter={20} style={{height:isLoading?2000:null}}>
                    <Col span={18}>

                        {/* {console.log(performanceDatasets)} */}
                        {performanceDatasets.map((val, index) => (

                            <RevenueWrapper>
                                { (

                                    <Cards
                                        isbutton={ 
                                            <div className="card-nav" >
                                                <ul>
                                                    {orderTypeList.map(item => (

                                                        < li className={selectOrderType=== item && performanceDatasets[index][0].sellerType === orderStatusSelect ? 'active' : 'deactivate'} >
                                                            <Link onClick={() => handleActiveChangeRevenue(item, index)}>
                                                                {item}
                                                            </Link>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        }
                                       
                                        title={`${performanceDatasets.length > 0 &&performanceDatasets[index][0].sellerType}->${state.selectOrderType[index]}`}
                                        size="large"
                                    > 
                                       {console.log(performanceDatasets[index][0].sellerType)}
                                        <div className="performance-lineChart">
                                            <ul>

                                                {performanceDatasets.length > 0 &&
                                                    performanceDatasets[index].map((item, key) => {
                                                        return (
                                                            <li key={key + 1} className="custom-label">
                                                                <strong className={item.amountClass}>{item.amount}</strong>
                                                                <div>
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: item.borderColor,
                                                                        }}
                                                                    />
                                                                    {item.label}
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>

                                            <ChartjsAreaChart
                                                id="performance"
                                                labels={performanceState.labels}
                                                datasets={performanceDatasets[index]}
                                                options={{
                                                    maintainAspectRatio: true,
                                                    elements: {
                                                        z: 9999,
                                                    },
                                                    legend: {
                                                        display: false,
                                                        position: 'bottom',
                                                        align: 'start',
                                                        labels: {
                                                            boxWidth: 6,
                                                            display: false,
                                                            usePointStyle: true,
                                                        },
                                                    },
                                                    hover: {
                                                        mode: 'index',
                                                        intersect: false,
                                                    },
                                                    tooltips: {
                                                        mode: 'label',
                                                        intersect: false,
                                                        backgroundColor: '#FF0000',
                                                        position: 'average',
                                                        enabled: false,
                                                        custom: customTooltips,
                                                        callbacks: {
                                                            title() {
                                                                return `Total Revenue`;
                                                            },
                                                            label(t, currentDate) {
                                                                const { yLabel, datasetIndex } = t;
                                                                return `<span class="chart-data">${yLabel}</span> <span class="data-label">${currentDate.datasets[datasetIndex].label}</span>`;
                                                            },
                                                        },
                                                    },
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                gridLines: {
                                                                    color: '#00173750',
                                                                    //  borderDash: [3, 3],
                                                                    zeroLineColor: '#00173750',
                                                                    zeroLineWidth: 1,
                                                                    zeroLineBorderDash: [3, 3],
                                                                },
                                                                ticks: {
                                                                    beginAtZero: true,
                                                                    fontSize: 13,
                                                                    fontColor: '#00173750',
                                                                    suggestedMin: 50,
                                                                    suggestedMax: 80,
                                                                    stepSize: 20,
                                                                    callback(label) {
                                                                        return label;
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                        xAxes: [
                                                            {
                                                                gridLines: {
                                                                    display: true,
                                                                    zeroLineWidth: 2,
                                                                    zeroLineColor: 'transparent',
                                                                    color: 'transparent',
                                                                    z: 1,
                                                                    tickMarkLength: 0,
                                                                },
                                                                ticks: {
                                                                    padding: 10,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                                height={window.innerWidth <= 575 ? 200 : 120}
                                            />

                                        </div>

                                    </Cards>



                                )}

                            </RevenueWrapper >
                        ))}

                    </Col>
                </Row>

            </Spin>

        </>
    );
};

export default TotalRevenue;
