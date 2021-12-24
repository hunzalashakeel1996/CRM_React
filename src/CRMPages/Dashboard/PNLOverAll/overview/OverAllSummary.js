import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiSummaryReportOverAll } from '../../../../redux/apis/DataAction';
import { convertLegacyProps } from 'antd/lib/button/button';


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




const OrderPNLSummary = (props) => {

  const {downloadFileDataLink,setIsSearchPressed, isSearchPressed, orderdatefrom, orderdateto, dateFormat, onAddOrder, activeTab, selectedFilter } = props

  let isOrderTypeShow = selectedFilter == 'All' ? true : false

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setstate] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSource: [],
  });

  const {   dataSource } = state

  useEffect(() => {

    if(isSearchPressed){
    setstate({...state, isLoader: true   })


      dispatch(apiSummaryReportOverAll({ dateFormat: dateFormat, orderdateto: orderdateto, orderdatefrom: orderdatefrom })).then(data => {
        console.log(data)
        downloadFileDataLink(data[0])
        setIsSearchPressed(false)
        setstate({
          ...state, isLoader: false, dataSource: data[1]
         
        })


      })
    }

    

  }, [isSearchPressed]);



  const columns = [
    {
      title: 'Vendorname',
      dataIndex: 'vendorname',
      key: 'vendorname'
    },{
      title: 'Total',
      dataIndex: 'Total',
      key: 'Total'
 
    },{
      title: 'Loss',
      dataIndex: 'Loss',
      key: 'Loss'
 
    },
    {
      title: 'Befor PPS',
      dataIndex: 'Befor_PPS',
      key: 'Befor_PPS'
 
    },
    {
      title: 'After PPS',
      dataIndex: 'After_PPS',
      key: 'After_PPS'
    }
  ];

  isOrderTypeShow && columns.splice(1, 1)
  const handleChange = (pagination, filters, sorter) => {
    setstate({
      ...state,
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
              <Table pagination={false} dataSource={dataSource} columns={columns} onChange={handleChange} />
              {/* </div> */}

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default OrderPNLSummary
