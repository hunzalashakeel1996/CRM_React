import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { downloadFile } from '../../../components/utilities/utilities'
import { getReturnPercentageReport } from '../../../redux/apis/DataAction';


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



const ReturnPercentage = (props) => {
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
    sortedInfo:[]
  });
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };
  const {sortedInfo}=state
  const getReturnPercentageReporting = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getReturnPercentageReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered Return Percentage Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      // console.log(data[0]);
      data[1].map(value => {
         // console.log(value)
        const { vendorstylecode, colorcode,sizename,ordercount,Sold,Return,percentage } = value;
        const RP = percentage+'%';
       
        return tempDataSource.push({
          vendorstylecode: vendorstylecode,
          colorcode: colorcode,
          sizename: sizename,
          ordercount: ordercount,
          Sold: Sold,
          Return: Return,
          percentage: RP,
        });

      });
      setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });




    })

  };

  
  const getReturnPercentageReportingDownlaod = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getReturnPercentageReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      downloadFile(data[0]);
      notification.success({
        message: 'Successfull Download',
        description: `Successfully Download Return Percentage From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      // console.log(data[0]);
      data[1].map(value => {
         // console.log(value)
        const { vendorstylecode, colorcode,sizename,ordercount,Sold,Return,percentage } = value;
        
        const RP = percentage+'%';
        return tempDataSource.push({
          vendorstylecode: vendorstylecode,
          colorcode: colorcode,
          sizename: sizename,
          ordercount: ordercount,
          Sold: Sold,
          Return: Return,
          percentage: RP,
        });

      });
      setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });




    })

  };


  const columns = [
    {
      title: 'VendorStyleCode',
      dataIndex: 'vendorstylecode',
      key: 'vendorstylecode',
    },
    {
      title: 'ColorCode',
      dataIndex: 'colorcode',
      key: 'colorcode',
    },
    {
      title: 'Size',
      dataIndex: 'sizename',
      key: 'sizename',
    },
    {
      title: 'OrderCount',
      dataIndex: 'ordercount',
      key: 'ordercount',
        
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ordercount - d.ordercount,
      sortOrder: sortedInfo.columnKey === 'ordercount' && sortedInfo.order,
    },
    {
      title: 'Sold',
      dataIndex: 'Sold',
      key: 'Sold',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Sold - d.Sold,
      sortOrder: sortedInfo.columnKey === 'Sold' && sortedInfo.order,
    },
    {
      title: 'Return',
      dataIndex: 'Return',
      key: 'Return',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Return - d.Return,
      sortOrder: sortedInfo.columnKey === 'Return' && sortedInfo.order,
    },
    {
      title: 'Return Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
    },
    
    
  ];

  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
  

        <Row>
          <Cards  title="Return Percentage">
          <Form layout="inline" initialValue="" label="" form={form} id="Return Percentage" name="nest-messages" onFinish={getReturnPercentageReporting} validateMessages={validateMessages}>

              <Row style={{width:'100%'}}>
                <Col  xs={24} sm={12} lg={8}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                  <DatePicker style={{ padding: 10, width:'100%', }} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
                  </Form.Item>
                </Col>
               
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                  <DatePicker style={{ padding: 10, width:'100%', }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                  </Form.Item>
                </Col>
               
                <Col span={24} >
                <Form.Item >
                   <Button size="large"   style={{ margintTop: 7, marginRight:10, }}  key="1" type="primary"   htmlType="submit">
                    Search
                           </Button>
                          
                   <Button size="large"    style={{ margintTop: 7 }} key="1" type="success"   htmlType="submit">
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
                  <Table pagination={false} scroll={{ x: 1500, y: 500 }} dataSource={state.dataSource} columns={columns} onChange={handleChange}/>
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
