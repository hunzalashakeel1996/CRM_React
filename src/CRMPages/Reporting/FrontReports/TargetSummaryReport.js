import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { downloadFile } from '../../../components/utilities/utilities'
import { getTargetReport } from '../../../redux/apis/DataAction';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];






const TargetSummaryReport = (props) => {


  const dispatch = useDispatch();
  useEffect(() => {
    setstate({ ...state, loader: true })
  }, []);
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
  });
  const onChange = (value, key) => {
    // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const getTargetSummaryReporting = () => {
    console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getTargetReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered TargetSummary Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      console.log(data[0]);
      data[1].map(value => {
         console.log(value)
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

  
  const getTargetReportingDownlaod = () => {
    console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getTargetReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      console.log('My Data: ', data)
      downloadFile(data[0]);
      notification.success({
        message: 'Successfull Download',
        description: `Successfully Download TargetSummary Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      console.log(data[0]);
      data[1].map(value => {
         console.log(value)
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
    },
    {
      title: 'Walmart',
      dataIndex: 'Walmart',
      key: 'Walmart',
    },
    {
      title: 'Sears',
      dataIndex: 'Sears',
      key: 'Sears',
    },
    {
      title: 'Ebay',
      dataIndex: 'Ebay',
      key: 'Ebay',
    },
    {
      title: 'Target',
      dataIndex: 'Target',
      key: 'Target',
    },
    {
      title: 'Diff',
      dataIndex: 'Diff',
      key: 'Diff',
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

                  <Button onClick={getTargetSummaryReporting} style={{ margintTop: 7 }}  key="1" type="primary" size="default" htmlType="submit">
                    Search
                           </Button>

                </Col>
                <Col span={3}  >

                  <Button onClick={getTargetReportingDownlaod}  style={{ margintTop: 7 }} key="1" type="success" size="default">
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

        </Row>
      </div>
    </Spin>
  );

};

export default TargetSummaryReport;
