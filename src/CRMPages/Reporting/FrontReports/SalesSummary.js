import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { downloadFile } from '../../../components/utilities/utilities'
import { chartSaleSummaryData } from '../../../redux/apis/DataAction';
import SaleSummaryGraph from '../../Dashboard/ComparisonReport/overview/SaleSummary';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];




const SalesSummary = () => {


  const dispatch = useDispatch();
  // useEffect(() => {
  //   setstate({ ...state, loader: true })
  // }, []);
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    date: null,
    dateString: null,
    checkData: [],
    checked: null,
    values: {},
    AddDays: null,
    isLoader: false,
    downloadLink:'',
    dataReport:[],
  });
  const {downloadLink,dataReport}=state
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const getSalesSummaryReporting = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(chartSaleSummaryData({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered Pending  Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      // console.log(data[0] );
      setstate({ ...state,downloadLink:data[0] });
      data[1].map(value => {
        // // console.log(value)
        const { Revenue_Sources, Total_Orders,Profit_Orders,Profit_Amouont,Loss_Orders,Loss_Amount } = value;
        // const total = (value.POCOMINGTOMORROW + value.PO_COMING_TODAY_NON_SHIPPING + value.PO_DELIVERED_NON_SHIPPED);
        //// console.log(total);
        const PA = '$ '+Profit_Amouont.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const lA = '$ '+Loss_Amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return tempDataSource.push({
          Revenue_Sources: Revenue_Sources,
          Total_Orders: Total_Orders,
          Profit_Orders: Profit_Orders,
          Profit_Amouont: PA,
          Loss_Orders: Loss_Orders,
          Loss_Amount: lA,
        });

      });
      setstate({ ...state,dataReport:data[1], dataSource: [...tempDataSource], isLoader: false });




    })

  };

  
  const getSalesSummaryReportingDownlaod = () => {

    setstate({ ...state, isLoader: true })

    dispatch(chartSaleSummaryData({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      downloadFile(data[0]);
      notification.success({
        message: 'Successfull Download',
        description: `Successfully Download Pending  Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      // console.log(data[0]);
      data[1].map(value => {
         // console.log(value)
        const { Revenue_Sources, Total_Orders,Profit_Orders,Profit_Amouont,Loss_Orders,Loss_Amount } = value;
        
        const PA = '$ '+Profit_Amouont.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const lA = '$ '+Loss_Amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return tempDataSource.push({
          Revenue_Sources: Revenue_Sources,
          Total_Orders: Total_Orders,
          Profit_Orders: Profit_Orders,
          Profit_Amouont: PA,
          Loss_Orders: Loss_Orders,
          Loss_Amount: lA,
        });

      });
      setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });




    })

  };


  const columns = [
    {
      title: 'Revenue Source',
      dataIndex: 'Revenue_Sources',
      key: 'Revenue_Sources',
    },
    {
      title: 'Total Orders',
      dataIndex: 'Total_Orders',
      key: 'Total_Orders',
    },
    {
      title: 'Profit Orders',
      dataIndex: 'Profit_Orders',
      key: 'Profit_Orders',
    },
    {
      title: 'Profit Amouont',
      dataIndex: 'Profit_Amouont',
      key: 'Profit_Amouont',
    },
    {
      title: 'Loss Orders',
      dataIndex: 'Loss_Orders',
      key: 'Loss_Orders',
    },
    {
      title: 'Loss Amouont',
      dataIndex: 'Loss_Amount',
      key: 'Loss_Amount',
    },
    
    
  ];



  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
       
        <Row>
          <Cards  title="Sales Summary">
            <Form name="basic">

              <Row>
                <Col span={6}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                  <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                  <DatePicker style={{ padding: 10 }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}  >

                   <Button size="large"  onClick={getSalesSummaryReporting} style={{ margintTop: 7 }}  key="1" type="primary"   htmlType="submit">
                    Search
                           </Button>

                </Col>
                <Col span={3}  >

                   <Button size="large"  onClick={getSalesSummaryReportingDownlaod}   style={{ margintTop: 7 }} key="1" type="success"   >
                    Download
                           </Button>

                </Col>

              </Row>

            </Form>
          </Cards>
        </Row>
        <Row >
          <Col xs={24}>
            <Cards headless>
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={true} dataSource={state.dataSource} columns={columns} />
                </div>

              </ProjectList>
            </Cards>
          </Col>
          {dataReport.length>0&&
         <Col lg={24} s={24}>
          
          <SaleSummaryGraph data={dataReport}/>
        </Col>}
        </Row>
      </div>
    </Spin>
  );

};

export default SalesSummary;
