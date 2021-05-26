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
import { getOverViewReport} from '../../../redux/apis/DataAction';



const ReportView = (props) => {


  const dispatch = useDispatch();
  useEffect(() => {
    setstate({ ...state, loader: true })

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
    console.log(e);
    setstate({ ...state, rType: e.target.value })

  }


  const onChange = (e) => {
    console.log(e);
    setstate({ ...state, oType: e })

  }

  const onDateChange = (value, key) => {
    setstate({ ...state, [key]: value });

  };



  const getOverViewReporting = () => {

    setstate({ ...state, isLoader: true })
    console.log(state.rType);
    if (state.rType == 'Date') {

      dispatch(getOverViewReport({ FROMDATE: state.startDate.format('MM/DD/YYYY'), TODATE: state.endDate.format('MM/DD/YYYY'), oType: '1', rType: state.rType })).then(data => {
        setstate({ ...state, isLoader: false })
        console.log('My Data: ', data)
        //downloadFile(data);
        notification.success({
          message: 'Successfull Rendered',
          description: `Successfully Rendered Sales Reports From ${state.startDate.format('MM/DD/YYYY')}`,
          onClose: close,
        });
        let tempDataSource = [];
        console.log(data);
        data[0].map(value => {
          console.log(value)
          const { TYPE, TOTALORDER,  ITEMCOUNT, TOTALAMOUNT} = value;
       

          return tempDataSource.push({
            TYPE: TYPE,
            TOTALORDER: TOTALORDER,
            ITEMCOUNT: ITEMCOUNT,
            TOTALAMOUNT: TOTALAMOUNT,
          });

        });
        setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
      })

    }else if(state.rType == 'Default')
    {
      dispatch(getOverViewReport({ FROMDATE: '', TODATE: '', oType: state.oType, rType: state.rType })).then(data => {
        setstate({ ...state, isLoader: false })
        console.log('My Data: ', data)
        //downloadFile(data);
        notification.success({
          message: 'Successfull Rendered',
          description: `Successfully Rendered Sales Reports }`,
          onClose: close,
        });
        let tempDataSource = [];
        console.log(data);
        data[0].map(value => {
          console.log(value)
          const { TYPE, TOTALORDER,  ITEMCOUNT, TOTALAMOUNT} = value;
          
         

          
          return tempDataSource.push({
            TYPE: TYPE,
            TOTALORDER: TOTALORDER,
            ITEMCOUNT: ITEMCOUNT,
            TOTALAMOUNT: TOTALAMOUNT,
          });

        });
        setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
      })
    }


  };






  return (

    <>
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
      <div>


        <Row style={{}} >
          <Cards title="Sales Report">

            <Form>
              <Row >
                <Col span={4} style={{ marginTop: 15 }}>
                  <Radio.Group onChange={onChangeDefault} value={state.rType}>
                    <Radio value={"Default"}>Default</Radio>
                    <Radio value={"Date"}>Date</Radio>
                  </Radio.Group>
                </Col>

                <Col span={14}>

                  {state.rType == "Default" ?
                    <Select
                      showSearch
                      style={{ width: 300 }}
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
                    :
                    <Col>
                      <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onDateChange(date, 'startDate') }} />

                      <DatePicker style={{ padding: 10 }} size='small' onChange={(date) => { onDateChange(date, 'endDate') }} />
                    </Col>

                  }
                </Col>

                <Col span={6}>
                  <Button onClick={getOverViewReporting} style={{ marginTop: 7 }} key="1" type="primary" size="default" htmlType="submit">
                    Search
                  </Button>
                  

                  

                </Col>


              </Row>
            </Form>

          </Cards>
        </Row>

      </div>


      <Row gutter={25}>
        {state.dataSource.map((value) => (
          
          <Col span={6}>
          <Cards headless>
            <EChartCard>
              <div >
                <CardBarChart2 >
            
                  <Heading as="h2" style={{fontColor: "Blue"}} >
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
        )) }
        
        


      </Row>




      </Spin>

    </>
   
  );
};

export default ReportView;

