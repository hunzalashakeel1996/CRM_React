import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { downloadFile } from '../../../components/utilities/utilities'
import { chartTargetSummaryData } from '../../../redux/apis/DataAction';
import TargetSummaryGraph from '../../Dashboard/ComparisonReport/overview/TargetSummary';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const validateMessages = {
  required: '${name} is required!',
  types: {
    email: '${name} is not validate email!',
    number: '${name} is not a validate number!',
  },
  number: {
    range: '${name} must be between ${min} and ${max}',
  },
};





const TargetSummaryReport = (props) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
 
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
    dataReport:[],
    sortedInfo:[]
  });
  const {downloadLink,dataReport,sortedInfo}=state
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const getTargetSummaryReporting = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(chartTargetSummaryData({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered TargetSummary Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      // console.log(data[0]);
      data[1].map(value => {
         // console.log(value)
        const { vendorname, Amazon,Walmart,Sears,Ebay,Target,Diff } = value;
        
       
        return tempDataSource.push({
          vendorname: vendorname,
          Amazon: Amazon,
          Walmart: Walmart,
          Sears: Sears,
          Ebay: Ebay,
          Target: Target,
          Diff: Diff,
        });

      });
      setstate({ ...state,dataReport:data[1], dataSource: [...tempDataSource], isLoader: false });




    })

  };
  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  
  const getTargetReportingDownlaod = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(chartTargetSummaryData({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      downloadFile(data[0]);
      notification.success({
        message: 'Successfull Download',
        description: `Successfully Download TargetSummary Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      // console.log(data[0]);
      data[1].map(value => {
         // console.log(value)
        const { vendorname, Amazon,Walmart,Sears,Ebay,Target,Diff } = value;
        
       
        return tempDataSource.push({
          vendorname: vendorname,
          Amazon: Amazon,
          Walmart: Walmart,
          Sears: Sears,
          Ebay: Ebay,
          Target: Target,
          Diff: Diff,
        });

      });
      setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });




    })

  };


  const columns = [
    {
      title: 'VendorName',
      dataIndex: 'vendorname',
      key: 'vendorname',
    },
    {
      title: 'Amazon',
      dataIndex: 'Amazon',
      key: 'Amazon',
      
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Amazon - d.Amazon,
      sortOrder: sortedInfo.columnKey === 'Amazon' && sortedInfo.order,
    },
    {
      title: 'Walmart',
      dataIndex: 'Walmart',
      key: 'Walmart',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Walmart - d.Walmart,
      sortOrder: sortedInfo.columnKey === 'Walmart' && sortedInfo.order,
    },
    {
      title: 'Sears',
      dataIndex: 'Sears',
      key: 'Sears',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Sears - d.Sears,
      sortOrder: sortedInfo.columnKey === 'Sears' && sortedInfo.order,
    },
    {
      title: 'Ebay',
      dataIndex: 'Ebay',
      key: 'Ebay',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Ebay - d.Ebay,
      sortOrder: sortedInfo.columnKey === 'Ebay' && sortedInfo.order,
    },
    {
      title: 'Target',
      dataIndex: 'Target',
      key: 'Target',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Target - d.Target,
      sortOrder: sortedInfo.columnKey === 'Target' && sortedInfo.order,
    },
    {
      title: 'Diff',
      dataIndex: 'Diff',
      key: 'Diff',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Diff - d.Diff,
      sortOrder: sortedInfo.columnKey === 'Diff' && sortedInfo.order,
    },
    
    
  ];



  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
        {/* <ProjectHeader>
          <PageHeader
            ghost
           
          />
        </ProjectHeader> */}

        <Row>
          <Cards  title="Target Report Summary Report">
          <Form layout="inline" initialValue="" label="" form={form} id="Target Report Summary Report" name="nest-messages" onFinish={getTargetReportingDownlaod} validateMessages={validateMessages}>

              <Row style={{width:'100%'}}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                  <DatePicker style={{padding: 10, width:'100%', }} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
                  </Form.Item>
                </Col>
               
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                  <DatePicker style={{ padding: 10, width:'100%', }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                  </Form.Item>
                </Col>
             
                <Col span={24}  >
                <Form.Item >
                   <Button size="large"  style={{ margintTop: 7, marginRight:10, }}  key="1" type="primary"   htmlType="submit">
                    Search
                           </Button>
                           
                   <Button size="large"   style={{ margintTop: 7 }} key="1" type="success"   htmlType="submit">
                    Download
                           </Button>
                           </Form.Item>
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
                  <Table pagination={false} dataSource={state.dataSource} columns={columns} onChange={handleChange} />
                </div>

              </ProjectList>
            </Cards>
          </Col>
      
          {dataReport.length>0&&
         <Col lg={24} s={24}>
          
          <TargetSummaryGraph data={dataReport}/>
        </Col>}
        </Row>
      </div>
    </Spin>
  );

};

export default TargetSummaryReport;
