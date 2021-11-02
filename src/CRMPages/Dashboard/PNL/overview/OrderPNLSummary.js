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




const OrderPNLSummary = (props) => {

  const { dataSourceOrdersummary, dataSourceOrdersummaryTempParent, onAddOrder, activeTab } = props

  //console.log('OrderPNLSummary',dataSourceOrdersummaryTempParent)

  let isOrderTypeShow = dataSourceOrdersummaryTempParent[0]&&dataSourceOrdersummaryTempParent[0].ORDERTYPE==undefined?true:false

  // // console.log('orderPNLSumamry', dataSourceOrdersummaryTempParent)
  // console.log('orderPNLSumamry', isOrderTypeShow)
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setstate] = useState({

    sortedInfo: [],

    isLoader: false,
    dataSourceOrdersummaryTemp: [],
  });

  const { sortedInfo, isLoader, dataSourceOrdersummaryTemp } = state

  useEffect(() => {
  
    if (activeTab === 'OrderPNLSummary' && dataSourceOrdersummaryTempParent && dataSourceOrdersummaryTempParent.length > 0) {
   
      setstate({ ...state, dataSourceOrdersummaryTemp: dataSourceOrdersummaryTempParent });
      findTotalValues(dataSourceOrdersummaryTempParent)

    }


  }, [activeTab, dataSourceOrdersummaryTempParent]);

  const findTotalValues = (data) => {
    let order = []
      let loss = []
      let profit = []

    for (let i = 0; i < data.length; i++) {

      if (order.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
        order.push(data[i])
      }
      else {
        let indexTemp = order.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        order[indexTemp] = { ...order[indexTemp], order_count: order[indexTemp].order_count + data[i].order_count }
      }

      if (loss.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {

        let tempItemSummary = {...data[i], Total_item_loss:data[i].Total_item_loss}
        loss.push(tempItemSummary)
        // loss.push(data[i])
      }
      else {
        let indexTemp = loss.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)

        loss[indexTemp] = { ...loss[indexTemp], loss: loss[indexTemp].loss + data[i].loss }

      }

      if (profit.filter(value => value.ORDERTYPE === data[i].ORDERTYPE).length <= 0) {
     
        let tempItemSummary = {...data[i], Total_item_profit:data[i].Total_item_profit}
        profit.push(tempItemSummary)
      }
      else {
        let indexTemp = profit.findIndex(item => item.ORDERTYPE === data[i].ORDERTYPE)
        profit[indexTemp] = { ...profit[indexTemp], profit: profit[indexTemp].profit + data[i].profit }
      }


    }

    onAddOrder({ order, loss, profit,data })
  }

  const filter = (value) => {
    // console.log(value)
    var val = [];
    let temp = []
    let placeholder = ``;

    return <Input
      placeholder={placeholder}
      size='small'
      onChange={e => {
        temp = [...temp, ...dataSourceOrdersummaryTempParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]
        // console.log('temp',temp)
        setstate({ ...state, dataSourceOrdersummaryTemp: [...temp] });
        findTotalValues(temp)

      }}
    />
  }

  let columns = [
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Vendorname</p>
        </div>,

      children: [
        {
          title: <>
            { filter('vendorname')}
          </>,
          dataIndex: 'vendorname',
          key: 'vendorname',
        },


      ]

    },
    
     
      {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>ORDERTYPE</p>
        </div>,

      children: [
        {
          title: <>
            { filter('ORDERTYPE')}
          </>,
          dataIndex: 'ORDERTYPE',
          key: 'ORDERTYPE',
        },


      ]


    }
  
    ,
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Order count</p>
        </div>,

      children: [
        {
          title: <>
            { filter('order_count')}
          </>,
          dataIndex: 'order_count',
          key: 'order_count',
        },
        {

          key: 'order_count',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.order_count - d.order_count,
          sortOrder: sortedInfo.columnKey === 'order_count' && sortedInfo.order,
          width: 30,


        }
      ]


    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Profit Count</p>
        </div>,

      children: [
        {
          title: <>
            { filter('profit')}
          </>,
          dataIndex: 'profitLink',
          key: 'profit',
        },
        {

          key: 'profit',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.profit - d.profit,
          sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
          width: 30,


        }
      ]


    }
    ,
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Loss Count</p>
        </div>,

      children: [
        {
          title: <>
            { filter('loss')}
          </>,
          dataIndex: 'lossLink',
          key: 'loss',
        },
        {

          key: 'loss',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.loss - d.loss,
          sortOrder: sortedInfo.columnKey === 'loss' && sortedInfo.order,
          width: 30,


        }
      ]


    },
    {
      title:
        <div style={{ height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>Percentge</p>
        </div>,

      children: [
        {
          title: <>
            { filter('percentge')}
          </>,
          dataIndex: 'percentge',
          key: 'percentge',
        },
        {

          key: 'percentge',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.percentge.split('%')[0] - d.percentge.split('%')[0],
          sortOrder: sortedInfo.columnKey === 'percentge' && sortedInfo.order,
          width: 30,


        }
      ]


    }
    // {
    //   title: 'Percentge',
    //   dataIndex: 'percentge',
    //   key: 'percentge',
    //   defaultSortOrder: 'descend',
    //   sorter: (c, d) => c.percentge - d.percentge,
    //   sortOrder: sortedInfo.columnKey === 'percentge' && sortedInfo.order,
    // }

  ];

  isOrderTypeShow&&columns.splice(1, 1)
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
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
              <Table pagination={false} dataSource={dataSourceOrdersummaryTemp} columns={columns} onChange={handleChange} />
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