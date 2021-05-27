import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile, getTotals } from '../../../components/utilities/utilities';
import { Button } from '../../../components/buttons/buttons';
import { } from '../../../redux/apis/DataAction';





const TeamReport = (props) => {


  const dispatch = useDispatch();

  const [state, setState] = useState({
    dataSource: [],
    isLoading: false,
    downLoadLink: '',
  });

  const { controls, dataSource, isLoading, downLoadLink } = state

  const onSubmit = (values) => {


  }


  const downloadFiles = () => {
    setState({ ...state })
    // console.log("Button 2 clicked!");
    // console.log(state.downLoadLink);

    if (downLoadLink == "") {
      notification.error({
        message: 'Download Failed',
        description: `Please Select Record First`,
        onClose: close,
      });
    }
    else {

      downloadFile(downLoadLink);
      notification.success({
        message: 'Successfull Dowload',
        description: `File Downloaded`,
        onClose: close,
      });

    }

  }

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const columns = [

    {
      title: 'UserName',
      dataIndex: 'User name',
      key: 'User name',
    },
    {
      title: 'Count',
      dataIndex: 'Count',
      key: 'Count',
    }

  ]



  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoading} >

      <div>


        <Row>
          <Cards title="Team Report" >
            <Form name="basic"
              onFinish={onSubmit}
              onFinishFailed={onSubmitFailed}>

              <Row>
                <Col span={6}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }} size='small' />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }}
                      placeholder="End date" />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}  >

                  <Button style={{ margintTop: 15 }} key="1" type="primary" size="default" htmlType="submit">
                    Search
                           </Button>

                </Col>


              </Row>

            </Form>
          </Cards>
        </Row>
        <Row style={{}}>
          <Col xs={24}>
            <Cards title="All Over">
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={true} dataSource={dataSource} columns={columns} />
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
                    <Table pagination={true} dataSource={dataSource} columns={columns} />
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
                    <Table pagination={true} dataSource={dataSource} columns={columns} />
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
