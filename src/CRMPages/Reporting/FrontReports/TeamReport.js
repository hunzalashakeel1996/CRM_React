import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { getTeamReport } from '../../../redux/apis/DataAction';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const TeamReport = (props) => {


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
    isLoader: false,
  });
  const onChange = (value, key) => {
    // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const getTeamReporing = () => {
    console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getTeamReport({ FROMDATE: state.startDate.format('MM/DD/YYYY'), TODATE: state.endDate.format('MM/DD/YYYY') })).then(data => {
      setstate({ ...state, isLoader: false })
      console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered All Team Reports From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
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
      //  console.log(tempDataSourceTR)
      
        // setstate({ ...state,  isLoader: false });
      });
      setstate({ ...state, dataSourceTR: [...tempDataSourceTR],dataSourceOP: [...tempDataSourceOP], dataSourceR: [...tempDataSourceR],isLoader: false });
      // setstate({ ...state,  isLoader: false });
      // setstate({ ...state,  isLoader: false });
     
      
      
    })

  };


  const columns = [
    {
      title: 'USERNAME',
      dataIndex: 'USERNAME',
      key: 'USERNAME',
    },
    {
      title: 'COUNT',
      dataIndex: 'QTY',
      key: 'QTY',
    },
  ];



  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>


        <Row>
          <Cards title="Team Report" >
            <Form name="basic"
            >

              <Row>
                <Col span={6}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}  >

                  <Button onClick={getTeamReporing} style={{ margintTop: 15 }} key="1" type="primary" size="default" >
                    Search
                           </Button>

                </Col>


              </Row>

            </Form>
          </Cards>
        </Row>
        <Row style={{}}>
          <Col xs={24}>
            <Cards title="">
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={true} dataSource={state.dataSourceTR} columns={columns} />
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
                  <Table pagination={true} dataSource={state.dataSourceR}  columns={columns} />
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
                  <Table pagination={true} dataSource={state.dataSourceOP} columns={columns} />
                </div>

              </ProjectList>
            </Cards>
          </Col>

        </Row>

      </div>
    </Spin>
  );

};

export default TeamReport;
