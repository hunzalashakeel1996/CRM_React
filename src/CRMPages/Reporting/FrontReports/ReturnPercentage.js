import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile, getTotals } from '../../../components/utilities/utilities';
import { Button } from '../../../components/buttons/buttons';
import {  } from '../../../redux/apis/DataAction';





const ReturnPercentage = (props) => {


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
      title: 'Vendorstylecode',
      dataIndex: 'Vendorstylecode',
      key: 'Vendorstylecode',
    },
    {
      title: 'Colorcode',
      dataIndex: 'Colorcode',
      key: 'Colorcode',
    },
    {
      title: 'Sizename',
      dataIndex: 'Sizename',
      key: 'Sizename',
    },
    {
      title: 'Ordercount',
      dataIndex: 'Ordercount',
      key: 'Ordercount',
    },
    {
      title: 'Sold',
      dataIndex: 'Sold',
      key: 'Sold',
    },
    {
      title: 'Return',
      dataIndex: 'Return',
      key: 'Return',
    }  ,
  
    {
      title: 'Percentage',
      dataIndex: 'Percentage',
      key: 'Percentage',
    }


  ]



  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoading} >

      <div>
  

        <Row>
          <Cards  title="Target Report Summary Report">
            <Form name="basic"
              onFinish={onSubmit}
              onFinishFailed={onSubmitFailed}>

              <Row>
                <Col span={6}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }} size='small'
                      renderExtraFooter={() => 'extra footer'} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }}
                      renderExtraFooter={() => 'extra footer'} placeholder="End date" />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={3}  >

                  <Button style={{ margintTop: 7 }}  key="1" type="primary" size="default" htmlType="submit">
                    Search
                           </Button>

                </Col>
                <Col span={3}  >

                  <Button   style={{ margintTop: 7 }} key="1" type="success" size="default" onClick={() => { downloadFiles() }}>
                    Download
                           </Button>

                </Col>

              </Row>

            </Form>
          </Cards>
        </Row>
        <Row style={{ marginRight: 15, marginLeft: 15 }}>
          <Col xs={24}>
            <Cards headless>
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

export default ReturnPercentage;
