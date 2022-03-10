import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { downloadFile } from '../../../components/utilities/utilities'
import { getRequest_Refund_Tracking_Report_count } from '../../../redux/apis/DataAction';


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



const RefundReportCount = (props) => {
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
    sortedInfo:[],
    downloadDataLink:''
  });
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };
  const {sortedInfo,downloadDataLink}=state
  const geRefundRequestCount = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getRequest_Refund_Tracking_Report_count({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY')})).then(data => {
      setstate({ ...state, isLoader: false })
   //    console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Request Refunded Count Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
    
      setstate({ ...state,downloadDataLink:data[0], dataSource: data[1], isLoader: false });




    })

  };

  const columns = [
   
    {
      title: 'REFUNDDATE',
      dataIndex: 'REFUNDDATE',
      key: 'REFUNDDATE',
    },
    {
      title: 'Refunded',
      dataIndex: 'Refunded',
      key: 'Refunded',
        
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Refunded - d.Refunded,
      sortOrder: sortedInfo.columnKey === 'Refunded' && sortedInfo.order,
    },
    {
      title: 'Not_Refund',
      dataIndex: 'Not_Refund',
      key: 'Not_Refund',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Not_Refund - d.Not_Refund,
      sortOrder: sortedInfo.columnKey === 'Not_Refund' && sortedInfo.order,
    },
    {
      title: 'Cannot_Be_Refunded',
      dataIndex: 'Cannot_Be_Refunded',
      key: 'Cannot_Be_Refunded',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Cannot_Be_Refunded - d.Cannot_Be_Refunded,
      sortOrder: sortedInfo.columnKey === 'Cannot_Be_Refunded' && sortedInfo.order,
    }
    
    
  ];
  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  const download = (event) => {
    downloadFile(downloadDataLink)


  }
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
      <Row style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          <Col span={24}>
            <Cards title="Refund Report Count">
              <Row gutter={25}>
                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }} placeholder="Start date" size='small' onChange={(date) => { onChange(date, 'startDate') }} />

                </Col>

                <Col xs={24} md={10} lg={8} style={{ marginBottom: 10 }}>
                  <DatePicker style={{ padding: 10, width: '100%', }}
                    placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                </Col>

            

              </Row>

              <Row>
                <Col xs={24} style={{ marginBottom: 10 }}>
                  {/* <Button size="large" type="primary" onClick={getsummary_report_order_wise} style={{ marginRight: 10, }} > Search</Button> */}
                  <Button size="large" type="primary" onClick={geRefundRequestCount} style={{ marginRight: 10, }} > Search</Button> 
                  {/* {console.log('dataSourceOrdersummary.length',dataSourceOrdersummary.length)} */}
                   <Button size="large" type="success"
                    onClick={() => { download() }} >
                    Download
                  </Button>
                </Col>
              </Row>

           

            </Cards>
          </Col>

        </Row>

        
        <Row >
          <Col xs={24}>
            <Cards headless>
              <ProjectList>

                <div className="table-responsive">
                  <Table pagination={true}  dataSource={state.dataSource} columns={columns} onChange={handleChange}/>
                </div>

              </ProjectList>
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default RefundReportCount;
