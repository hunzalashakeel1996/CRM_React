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





const VendorSales = (props) => {


  const dispatch = useDispatch();

  const [state, setState] = useState({
    dataSource: [],
    isLoading: false,
    downLoadLink: '',
  });

  const { controls, dataSource, isLoading, downLoadLink } = state

  const onSubmit = (values) => {


  }


  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const columns = [

    {
      title: 'Vendor Name',
      dataIndex: 'VendorName',
      key: 'VendorName',
    },
    {
      title: 'Total Orders',
      dataIndex: 'TotalOrders',
      key: 'TotalOrders',
    },
    {
      title: 'Total Units',
      dataIndex: 'TotalUnits',
      key: 'TotalUnits',
    },
    {
      title: 'Total Cost',
      dataIndex: 'TotalCost',
      key: 'TotalCost',
    },
    {
      title: 'Total Sales',
      dataIndex: 'TotalSales',
      key: 'TotalSales',
    }


  ]



  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoading} >

      <div>
        {/* <ProjectHeader>
          <PageHeader
            ghost
           
          />
        </ProjectHeader> */}

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

                  <Button style={{ margintTop: 7 }} key="1" type="primary" size="default" htmlType="submit">
                    Search
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

export default VendorSales;
