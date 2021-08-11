import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryReportOrderWise } from '../../../../redux/apis/DataAction';


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




const OrderPNL = (props) => {

    const {dataSourceOrder}= props
    // console.log('orderPNL',dataSourceOrder)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setstate] = useState({
   
    sortedInfo:[],
   
    isLoader:false
  });

  const {sortedInfo,isLoader}=state
 


  const columns = [
    {
      title: 'Vendorname',
      dataIndex: 'vendorname',
      key: 'vendorname',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.vendorname - d.vendorname,
      sortOrder: sortedInfo.columnKey === 'vendorname' && sortedInfo.order,
    },
    {
      title: 'Order count',
      dataIndex: 'order_count',
      key: 'order_count',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.order_count - d.order_count,
      sortOrder: sortedInfo.columnKey === 'order_count' && sortedInfo.order,
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.profit - d.profit,
      sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
    },
    {
      title: 'Loss',
      dataIndex: 'loss',
      key: 'loss',
        
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.loss - d.loss,
      sortOrder: sortedInfo.columnKey === 'loss' && sortedInfo.order,
    },
    {
      title: 'Percentge',
      dataIndex: 'percentge',
      key: 'percentge',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.percentge - d.percentge,
      sortOrder: sortedInfo.columnKey === 'percentge' && sortedInfo.order,
    }
    
  ];

  const handleChange = (pagination, filters, sorter) =>  {
    console.log('Various parameters', pagination, filters, sorter);
    setstate({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };


  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
  

        <Row >
          <Col xs={24}>
            <Cards headless>
              {/* <ProjectList> */}

                {/* <div className="table-responsive"> */}
                  <Table pagination={false} dataSource={dataSourceOrder} columns={columns} onChange={handleChange}/>
                {/* </div> */}

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default OrderPNL
