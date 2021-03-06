import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { chartTeamData } from '../../../redux/apis/DataAction';
import TeamReportGraph from '../../Dashboard/ComparisonReport/overview/TeamReport';

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

const TeamReport = () => {
  const [form] = Form.useForm();

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
    isLoader: false,
    dataReport: [],
    dataSourceTR: [],
    dataSourceOP: [],
    dataSourceR: [],
    sortedInfo: [],
    filteredInfo: []

  });
  const { dataReport, sortedInfo, filteredInfo } = state;
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };
  //New Sort Start
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({
      ...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setstate({ ...state, filteredInfo: null });
  };


  //New Sort End
  const getTeamReporing = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(chartTeamData({ FROMDATE: state.startDate.format('MM/DD/YYYY'), TODATE: state.endDate.format('MM/DD/YYYY') })).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      //downloadFile(data);

      let tempDataSource = [];
      let tempDataSourceTR = [];
      let tempDataSourceOP = [];
      let tempDataSourceR = [];
      data.map(value => {
        const { USERNAME, QTY, Type } = value;

        if (Type == 'Team Report') {
          return tempDataSourceTR.push({
            USERNAME: USERNAME,
            QTY: QTY,
          });


        } else if(Type == 'Order Process')
        {
          return tempDataSourceOP.push({
            USERNAME: USERNAME,
            QTY: QTY,
          });
        }
         else if(Type == 'Return Received')
        {
          return tempDataSourceR.push({
            USERNAME: USERNAME,
            QTY: QTY,
          });
        }
      //  // console.log(tempDataSourceTR)

        // setstate({ ...state,  isLoader: false });
      });
      setstate({...state, dataReport:data ,  dataSourceTR: [...tempDataSourceTR],dataSourceOP: [...tempDataSourceOP], dataSourceR: [...tempDataSourceR],isLoader: false });





    })

  };


  const columns = [
    {
      title: 'USERNAME',
      dataIndex: 'USERNAME',
      key: 'USERNAME',
      filteredValue: filteredInfo.USERNAME || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.USERNAME.length - b.USERNAME.length,
      sortOrder: sortedInfo.columnKey === 'USERNAME' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'COUNT',
      dataIndex: 'QTY',
      key: 'QTY',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.QTY - d.QTY,
      sortOrder: sortedInfo.columnKey === 'QTY' && sortedInfo.order,
    }
  ];

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>


        <Row >
          <Cards title="Team Report" >
            <Form layout="inline" initialValue="" label="" form={form} id="Team Report" name="nest-messages" onFinish={getTeamReporing} validateMessages={validateMessages}>

             
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10, width:'100%',}} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10, width:'100%', }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>

                <Col span={24}  >
                  <Form.Item >
                     <Button size="large"  style={{ margintTop: 15 }} key="1" type="primary"   htmlType="submit" >
                      Search
                           </Button>
                  </Form.Item>
                </Col>
              

            </Form>
          </Cards>
        </Row>
        <Row >
          <Col xs={24}>
            <Cards title="Team Report">
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={false} dataSource={state.dataSourceTR} columns={columns} onChange={handleChange} />
                </div>

              </ProjectList>
            </Cards>
          </Col>

        </Row>


        <Row style={{}}>
          <Col xs={24}>
            <Cards title="Return Received" >
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={false} dataSource={state.dataSourceR} columns={columns} />
                </div>

              </ProjectList>
            </Cards>
          </Col>

        </Row>

        <Row style={{}}>
          <Col xs={24}>
            <Cards title="Order Process" >
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={false} dataSource={state.dataSourceOP} columns={columns} />
                </div>

              </ProjectList>
            </Cards>
          </Col>

          {dataReport.length > 0 &&
            <Col lg={24} s={24}>

              <TeamReportGraph data={dataReport} />
            </Col>}
        </Row>


      </div>
    </Spin>
  );

};

export default TeamReport;
