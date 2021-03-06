import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiReportOrderstatus } from '../../../../redux/apis/DataAction';
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


      dispatch(apiReportOrderstatus({orderdateto: orderdateto, orderdatefrom: orderdatefrom })).then(data => {
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
      title: 'PurchaseDate',
      dataIndex: 'purchase_date',
      key: 'purchase_date'
    },{
      title: 'Ponumber',
      dataIndex: 'ponumber',
      key: 'ponumber'
 
    },{
      title: 'Orderno',
      dataIndex: 'orderno',
      key: 'orderno'
 
    },
    {
      title: 'Shipped Date',
      dataIndex: 'Shipped_Date',
      key: 'Shipped_Date'
 
    },
    {
      title: 'Released Date',
      dataIndex: 'Released_Date',
      key: 'Released_Date'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Vendorname',
      dataIndex: 'vendorname',
      key: 'vendorname'
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: 'trackingno',
      dataIndex: 'trackingno',
      key: 'trackingno'
    },
    {
      title: 'SystemDate',
      dataIndex: 'SystemDate',
      key: 'SystemDate'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Date Delivered',
      dataIndex: 'Date_Delivered',
      key: 'Date_Delivered'
    },
    {
      title: 'PurchaseOrderNo',
      dataIndex: 'PurchaseOrderNo',
      key: 'PurchaseOrderNo'
    },
    {
      title: 'Trackingcode',
      dataIndex: 'Trackingcode',
      key: 'Trackingcode'
    },
    {
      title: 'Orderstatus',
      dataIndex: 'orderstatus',
      key: 'orderstatus'
    }
    ,
    {
      title: 'Postatus',
      dataIndex: 'postatus',
      key: 'postatus'
    } ,
    {
      title: 'Ordernotes',
      dataIndex: 'ordernotes',
      key: 'ordernotes'
    } ,
    {
      title: 'LatestShipDate',
      dataIndex: 'latest_ship_date',
      key: 'latest_ship_date'
    },
    {
      title: 'LatestDeliveryDate',
      dataIndex: 'LatestDeliveryDate',
      key: 'LatestDeliveryDate'
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

              <div className="table-responsive">
              <Table pagination={false} dataSource={dataSource} columns={columns} onChange={handleChange} />
              </div>

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default OrderPNLSummary
