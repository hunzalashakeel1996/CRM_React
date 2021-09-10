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
const { TabPane } = Tabs;
const { TextArea } = Input;
import { BasicFormWrapper } from '../../styled';
import { chartSaleData } from '../../../redux/apis/DataAction';
import SaleReport from '../../Dashboard/ComparisonReport/overview/SaleReport';

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


const ReportView = (props) => {
  const [form] = Form.useForm();
 
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  var Type = [];
  const dispatch = useDispatch();
  let totalOrder = 0;
  let totalAmount = 0;
  let itemCount = 0;
  


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
    dataSourceCRM: [],
    dataSourceCRMPU: [],
    dataSourceCRMJLC: [],
    dataSourceCRMWM: [],
    dataSale: [[]]

  });


  const { dataSource, loaderState, dataSale } = state;


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



  const getOverViewReporting = () => {


    if (state.rType == 'Date') {
      setstate({ ...state,isLoader: true })
      dispatch(chartSaleData({ FROMDATE: state.startDate.format('MM/DD/YYYY'), TODATE: state.endDate.format('MM/DD/YYYY'), oType: '1', rType: state.rType })).then(data => {        let tempDataSource = [];

        data[0].map(value => {

          const { TYPE, TOTALORDER,  ITEMCOUNT, TOTALAMOUNT} = value;

          totalOrder =+TOTALORDER
          totalAmount =+TOTALAMOUNT
          itemCount =+ITEMCOUNT
           tempDataSource.push({
            TYPE: TYPE,
            TOTALORDER: TOTALORDER,
            ITEMCOUNT: ITEMCOUNT,
            TOTALAMOUNT: TOTALAMOUNT,

          });

        });
         tempDataSource.push({
          TYPE: "Total",
          TOTALORDER: totalOrder,
          ITEMCOUNT: itemCount,
          TOTALAMOUNT: totalAmount,

        });
        setstate({ ...state, dataSource: [...tempDataSource], isLoader: false,dataSale:data });

        notification.success({
          message: 'Successfull Rendered',
          description: `Successfully Rendered Sales Reports From ${state.startDate.format('MM/DD/YYYY')}`,
          onClose: close,
        });
      })

    }else if(state.rType == 'Default')
    {
          setstate({ ...state,isLoader: true })
      dispatch(chartSaleData({ FROMDATE: '', TODATE: '', oType: state.oType, rType: state.rType })).then(data => {

        let tempDataSource = [];
        // // console.log(data);
        data[0].map(value => {
          // // console.log(value)
          const { TYPE, TOTALORDER,  ITEMCOUNT, TOTALAMOUNT} = value;

          totalOrder =totalOrder+TOTALORDER
          totalAmount =totalAmount+TOTALAMOUNT
          itemCount =itemCount+ITEMCOUNT



           tempDataSource.push({
            TYPE: TYPE,
            TOTALORDER: TOTALORDER,
            ITEMCOUNT: ITEMCOUNT,
            TOTALAMOUNT: TOTALAMOUNT,
          });

        });

         tempDataSource.push({
          TYPE: "Total",
          TOTALORDER: totalOrder,
          ITEMCOUNT: itemCount,
          TOTALAMOUNT: totalAmount,

        });

        notification.success({
          message: 'Successfull Rendered',
          description: `Successfully Rendered Sales Reports }`,
          onClose: close,
        });
        setstate({ ...state, dataSource: [...tempDataSource], isLoader: false, dataSale:data });
      })
    }


  };


  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  return (

    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
        <div>


          <Row  >
            <Cards title="Sales Report">

              {/* <BasicFormWrapper> */}
              <Form layout="inline" form={form} id="Sales Report" name="nest-messages" onFinish={getOverViewReporting} validateMessages={validateMessages}>


                <Col xs={24} style={{ marginBottom: 10 }}>
                  <Radio.Group onChange={onChangeDefault} value={state.rType}>
                    <Radio value={"Default"}>Default</Radio>
                    <Radio value={"Date"}>Date</Radio>
                  </Radio.Group>
                </Col>

                <Col xs={24}>

                  {state.rType == "Default" ?
                    <Col span={10}>
                      <Form.Item rules={[{ required: true }]} name="Select Dropdown" label="">
                        <Select
                          showSearch
                          style={{ width: '100%', maxWidth:420, }}
                          size="large"
                          placeholder="Search By"
                          optionFilterProp="children"
                          onChange={(value) => { onChange(value, 'value') }}
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="1">Today</Option>
                          <Option value="7">Week</Option>
                          <Option value="30">Month</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    :
                    <Row>
                      <Col xs={24} md={10} lg={8}>
                        <Form.Item label="" name="startDate" rules={[{ required: true }]}>
                          <DatePicker  style={{ padding: 10, width: '100%'  }} size='default' onChange={(date) => { onDateChange(date, 'startDate') }} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={10} lg={8}>
                        <Form.Item  label="" name="endDate" rules={[{ required: true }]}>
                          <DatePicker style={{ padding: 10, width: '100%'  }} size='default' onChange={(date) => { onDateChange(date, 'endDate') }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  }
                </Col >

                <Col span={4}>
                  <Form.Item >
                     <Button size="large"   style={{ margintTop: 15 }} key="1" type="primary"   htmlType="submit">
                      Search
                   </Button>
                  </Form.Item>
                </Col>



              </Form>
              {/* </BasicFormWrapper> */}

            </Cards>
          </Row>
          {/* <Row gutter={20}>
        
       
        </Row> */}
        </div>


        <Row gutter={25}>
          {state.dataSource.map((value) => (

            <Col xs={24} sm={12} md={8} lg={6}>
              <Cards headless>
                <EChartCard>
                  <div >
                    <CardBarChart2 >

                      <Heading as="h2" style={{ fontColor: "Blue" }} >
                        {value.TYPE}</Heading>
                      <h3>Orders {value.TOTALORDER}</h3>
                      <h3>Items {value.ITEMCOUNT}</h3>
                      <h4>Amount $ {value.TOTALAMOUNT.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </h4>

                    </CardBarChart2>
                  </div>
                </EChartCard>
              </Cards>
            </Col>
          ))}

          {dataSale[0].length > 0 &&
            <Col lg={24} s={24}>

              <SaleReport data={dataSale} />
            </Col>}


        </Row>




      </Spin>

    </>

  );
};

export default ReportView;

