import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Col, DatePicker, Table, Upload, Row, Radio, Select, notification, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Heading from '../../../components/heading/heading';
import { CardBarChart2, EChartCard } from '../../Dashboard (old)/style';
import ComparisonBarChart from '../../Dashboard/ComparisonReport/ComparisonBarChart';
const { TabPane } = Tabs;
const { TextArea } = Input;
// import { getCRMOrderReport,getCRMOrderReportPU,getCRMOrderReportJLC,getCRMOrderReportWM } from '../../../redux/apis/DataAction';
import { chartAmazonData, chartWalmartData, chartJLCData, chartPUData } from '../../../redux/apis/DataAction';


const ReportView = (props) => {

  let tempDataSourceCRMReport=[]
  let tempDataSourceCRMReportWM=[]
  let tempDataSourceCRMReportPU=[]
  let tempDataSourceCRMReportJLC=[]
  const dispatch = useDispatch();
  useEffect(async() => {
    setstate({ ...state, isLoader: true })
   
    Promise.all([dispatch(chartAmazonData()), dispatch(chartWalmartData()), dispatch(chartPUData()), dispatch(chartJLCData())]).then(data => {
      var AmazonData = JSON.parse(data[0])
      var WalmartData = JSON.parse(data[1])
      var PUData = JSON.parse(data[2])
      var JLCData = JSON.parse(data[3])
     // console.log(AmazonData,WalmartData,PUData,JLCData)
      let dataTemp = [AmazonData, WalmartData, PUData, JLCData]

      let dataTempState = [tempDataSourceCRMReport, tempDataSourceCRMReportWM, tempDataSourceCRMReportPU, tempDataSourceCRMReportJLC]
      dataTemp.map((value,index) => {
      //  console.log('val',dataTemp[a])
        value.Table.map(value=> {
        console.log(dataTempState[index])
        const { TodayDate, OrdersCountCurrent,  OrdersCountOld, PendingOrderCurrent,PendingOrderOld,ReturnCurrentRMA,ReturnOldRMA,SalesCurrent,SalesOld} = value;
     
          console.log('aaaa', SalesCurrent === null)
        return dataTempState[index].push({
          TodayDate: TodayDate,
          OrdersCountCurrent: OrdersCountCurrent,
          OrdersCountOld: OrdersCountOld,
          PendingOrderCurrent: PendingOrderCurrent,
          PendingOrderOld: PendingOrderOld,
          ReturnCurrentRMA: ReturnCurrentRMA,
          ReturnOldRMA: ReturnOldRMA,
          // SalesCurrent: '$ '+ SalesCurrent === null ? '0' : SalesCurrent.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
          // SalesOld: '$ '+SalesOld=== null ? '0' : SalesOld.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
            SalesCurrent:  SalesCurrent === null ?"-": SalesCurrent,
          SalesOld: SalesOld,
        });

      });
     
    });

    setstate({ ...state, dataSourceCRM: tempDataSourceCRMReport,dataSourceCRMWM:tempDataSourceCRMReportWM,dataSourceCRMPU:tempDataSourceCRMReportPU,dataSourceCRMJLC:tempDataSourceCRMReportJLC, isLoader: false });

    })
  }, []);
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    rType: "Default",
    products: 'year',
    electionType: 'checkbox',
    date: null,
    dateString: null,
    checkData: [],
    checked: null,
    values: {},
    AddDays: null,
    isLoader: false,
    oType: '1',
    dataSource: [],
    dataSourceCRM :[],
    dataSourceCRMPU :[],
    dataSourceCRMJLC :[],
    dataSourceCRMWM :[],
  });





  const onChangeDefault = (e) => {
    // console.log(e);
    setstate({ ...state, rType: e.target.value })

  }


  const onChange = (e) => {
    // console.log(e);
    setstate({ ...state, oType: e })

  }

  const onDateChange = (value, key) => {
    setstate({ ...state, [key]: value });

  };






  // const getCRMOrderReporting = () => {
  //   console.log("Function 1")
  //   setstate({ ...state, isLoader: true })
  //     dispatch(getCRMOrderReport()).then(data => {
  //       setstate({ ...state, isLoader: false })
  //       // console.log('My Data: ', data)
  //       //downloadFile(data);
  //       notification.success({
  //         message: 'Successfull Rendered',
  //         description: `Successfully Rendered Sales Reports `,
  //         onClose: close,
  //       });
  //       let tempDataSourceCRMReport = [];
        
  //       data = JSON.parse(data);
  //       // console.log(typeof(data));
  //       // console.log(data);
  //       data.Table.map(value => {
  //         // console.log(value)
  //         const { TodayDate, OrdersCountCurrent,  OrdersCountOld, PendingOrderCurrent,PendingOrderOld,ReturnCurrentRMA,ReturnOldRMA,SalesCurrent,SalesOld} = value;
       

  //         return tempDataSourceCRMReport.push({
  //           TodayDate: TodayDate,
  //           OrdersCountCurrent: OrdersCountCurrent,
  //           OrdersCountOld: OrdersCountOld,
  //           PendingOrderCurrent: PendingOrderCurrent,
  //           PendingOrderOld: PendingOrderOld,
  //           ReturnCurrentRMA: ReturnCurrentRMA,
  //           ReturnOldRMA: ReturnOldRMA,
  //           SalesCurrent: '$ '+SalesCurrent.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //           SalesOld: '$ '+SalesOld.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //         });

  //       });
  //       setstate({ ...state, dataSourceCRM: [...tempDataSourceCRMReport], isLoader: false });
  //       console.log(tempDataSourceCRMReport)
  //       console.log(state.dataSourceCRM)
  //     })
  // };


  // //CRM PU REPORT

  // const getCRMOrderPUReportingPU = () => {
  //   console.log("Function 2")
  //   setstate({ ...state, isLoader: true })
  //     dispatch(getCRMOrderReportPU()).then(data => {
  //       setstate({ ...state, isLoader: false })
  //       // console.log('My Data: ', data)
  //       //downloadFile(data);
  //       notification.success({
  //         message: 'Successfull Rendered',
  //         description: `Successfully Rendered Sales Reports `,
  //         onClose: close,
  //       });
  //       let tempDataSourceCRMReportPU = [];
        
  //       data = JSON.parse(data);
  //       // console.log(typeof(data));
  //       // console.log(data);
  //       data.Table.map(value => {
  //         // console.log(value)
  //         const { TodayDate, OrdersCountCurrent,  OrdersCountOld, PendingOrderCurrent,PendingOrderOld,ReturnCurrentRMA,ReturnOldRMA,SalesCurrent,SalesOld} = value;
       

  //         return tempDataSourceCRMReportPU.push({
  //           TodayDate: TodayDate,
  //           OrdersCountCurrent: OrdersCountCurrent,
  //           OrdersCountOld: OrdersCountOld,
  //           PendingOrderCurrent: PendingOrderCurrent,
  //           PendingOrderOld: PendingOrderOld,
  //           ReturnCurrentRMA: ReturnCurrentRMA,
  //           ReturnOldRMA: ReturnOldRMA,
  //           SalesCurrent: '$ '+ SalesCurrent.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //           SalesOld: '$ '+ SalesOld.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //         });

  //       });
  //       setstate({ ...state, dataSourceCRMPU: [...tempDataSourceCRMReportPU], isLoader: false });
  //       console.log(tempDataSourceCRMReportPU)
  //       console.log(state.dataSourceCRMPU)

  //     })
  // };

  // //CRM JLC REPORT

  // const getCRMOrderPUReportingJLC = () => {
  //   console.log("Function 3")
  //   setstate({ ...state, isLoader: true })
  //     dispatch(getCRMOrderReportJLC()).then(data => {
  //       setstate({ ...state, isLoader: false })
  //       // console.log('My Data: ', data)
  //       //downloadFile(data);
  //       notification.success({
  //         message: 'Successfull Rendered',
  //         description: `Successfully Rendered Sales Reports `,
  //         onClose: close,
  //       });
  //       let tempDataSourceCRMReportJLC = [];
        
  //       data = JSON.parse(data);
  //       // console.log(typeof(data));
  //       // console.log(data);
  //       data.Table.map(value => {
  //         // console.log(value)
  //         const { TodayDate, OrdersCountCurrent,  OrdersCountOld, PendingOrderCurrent,PendingOrderOld,ReturnCurrentRMA,ReturnOldRMA,SalesCurrent,SalesOld} = value;
       

  //         return tempDataSourceCRMReportJLC.push({
  //           TodayDate: TodayDate,
  //           OrdersCountCurrent: OrdersCountCurrent,
  //           OrdersCountOld: OrdersCountOld,
  //           PendingOrderCurrent: PendingOrderCurrent,
  //           PendingOrderOld: PendingOrderOld,
  //           ReturnCurrentRMA: ReturnCurrentRMA,
  //           ReturnOldRMA: ReturnOldRMA,
  //           SalesCurrent: '$ '+SalesCurrent.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //           SalesOld: '$ '+SalesOld.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //         });

  //       });
  //       setstate({ ...state, dataSourceCRMJLC: [...tempDataSourceCRMReportJLC], isLoader: false });
  //       console.log(tempDataSourceCRMReportJLC)
  //       console.log(state.dataSourceCRMJLC)
  //     })
  // };

  // //CRM WM REPORT

  // const getCRMOrderPUReportingWM = () => {
  //   console.log("Function 4")
  //   setstate({ ...state, isLoader: true })
  //     dispatch(getCRMOrderReportWM()).then(data => {
  //       setstate({ ...state, isLoader: false })
  //       // console.log('My Data: ', data)
  //       //downloadFile(data);
  //       notification.success({
  //         message: 'Successfull Rendered',
  //         description: `Successfully Rendered Sales Reports `,
  //         onClose: close,
  //       });
  //       let tempDataSourceCRMReportWM = [];
        
  //       data = JSON.parse(data);
  //       // console.log(typeof(data));
  //       // console.log(data);
  //       data.Table.map(value => {
  //         // console.log(value)
  //         const { TodayDate, OrdersCountCurrent,  OrdersCountOld, PendingOrderCurrent,PendingOrderOld,ReturnCurrentRMA,ReturnOldRMA,SalesCurrent,SalesOld} = value;
       

  //         return tempDataSourceCRMReportWM.push({
  //           TodayDate: TodayDate,
  //           OrdersCountCurrent: OrdersCountCurrent,
  //           OrdersCountOld: OrdersCountOld,
  //           PendingOrderCurrent: PendingOrderCurrent,
  //           PendingOrderOld: PendingOrderOld,
  //           ReturnCurrentRMA: ReturnCurrentRMA,
  //           ReturnOldRMA: ReturnOldRMA,
  //           SalesCurrent: '$ '+SalesCurrent.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //           SalesOld: '$ '+SalesOld.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  //         });

  //       });
  //       setstate({ ...state, dataSourceCRMWM: [...tempDataSourceCRMReportWM], isLoader: false });
  //       console.log(tempDataSourceCRMReportWM)
  //       console.log(state.dataSourceCRMWM)
  //     })
  // };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'TodayDate',
      key: 'TodayDate',
      width: 100,
      fixed: 'left',
      
     
    },
  
    {
      title: 'Orders',
      children: [
        {
          title: '2020',
          dataIndex: 'OrdersCountOld',
          key: 'OrdersCountOld',
          // width: 200,
          width: 80,
        },
        {
          title: '2021',
          dataIndex: 'OrdersCountCurrent',
          key: 'OrdersCountCurrent',
          width: 80,
        },
      ],
    },
    {
      title: 'Sales',
      children: [
        {
          title: '2020',
          dataIndex: 'SalesOld',
          key: 'SalesOld',
          // width: 200,
          width: 100,
        },
        {
          title: '2021',
          dataIndex: 'SalesCurrent',
          key: 'SalesCurrent',
          width: 100,
        },
      ],
    },
    {
      title: 'Pending',
      children: [
        {
          title: '2020',
          dataIndex: 'PendingOrderOld',
          key: 'PendingOrderOld',
          // width: 200,
          width: 80,
        },
        {
          title: '2021',
          dataIndex: 'PendingOrderCurrent',
          key: 'PendingOrderCurrent',
          width: 80,
        },
      ],
    },
    {
      title: 'Return',
      children: [
        {
          title: '2020',
          dataIndex: 'ReturnOldRMA',
          key: 'ReturnOldRMA',
          // width: 200,
          width: 80,
        },
        {
          title: '2021',
          dataIndex: 'ReturnCurrentRMA',
          key: 'ReturnCurrentRMA',
          width: 80,
        },
      ],
    },

  ];





  const handleChange = (data) => {
    // console.log('ds', data)
  }


  return (

    <>
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
    



      <Row>

      {/* <Col span={6}>
                  <Button onClick={getCRMOrderReporting} style={{ marginTop: 7, marginLeft:5, marginBottom:15 }} key="1" type="primary" size="default" htmlType="submit">
                    Amazon
                  </Button>
                  <Button onClick={getCRMOrderPUReportingPU} style={{ marginTop: 7, marginLeft:5, marginBottom:15 }} key="1" type="primary" size="default" htmlType="submit">
                    PU
                  </Button>
                  <Button onClick={getCRMOrderPUReportingJLC} style={{ marginTop: 7, marginLeft:5, marginBottom:15 }} key="1" type="primary" size="default" htmlType="submit">
                    JLC
                  </Button>
                  <Button onClick={getCRMOrderPUReportingWM} style={{ marginTop: 7, marginLeft:5, marginBottom:15 }} key="1" type="primary" size="default" htmlType="submit">
                    Walmart
                  </Button>
               

                  

                </Col> */}
        <Cards title="Amazon">
        {/* {console.log(state.dataSource)} */}
          <Table
            
            columns={columns}
            dataSource={state.dataSourceCRM}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>

      <Row>
        <Cards title="Walmart">
        {/* {console.log(state.dataSourceCRMWM)} */}
          <Table
            columns={columns}
            dataSource={state.dataSourceCRMWM}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>


      <Row>
        <Cards title="PU">
        {/* {console.log(state.dataSourceCRMPU)} */}
          <Table
            columns={columns}
            dataSource={state.dataSourceCRMPU}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>


      <Row>
        <Cards title="JLC">
          <Table
            columns={columns}
            dataSource={state.dataSourceCRMJLC}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>

      </Spin>

    </>
   
  );
};

export default ReportView;

