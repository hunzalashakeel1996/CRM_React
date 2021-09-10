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




const ItemPNLSummary = (props) => {
  const { dataSourceItemsummary, dataSourceItemsummaryTempParent, onAddItem, activeTab } = props
  //  console.log('ItemPNL',dataSourceItemsummaryTempParent)
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [state, setstate] = useState({

    sortedInfo: [],
    dataSource: [],
    isLoader: false,
    dataSourceOrdersummaryTemp: []
  });

  const { sortedInfo, isLoader, dataSourceOrdersummaryTemp } = state
  useEffect(() => {
    if (activeTab === 'ItemPNLSummary' && dataSourceItemsummaryTempParent && dataSourceItemsummaryTempParent.length > 0) {

      setstate({ ...state, dataSourceOrdersummaryTemp: dataSourceItemsummaryTempParent });
      let order = []
      let loss = []
      let profit = []
      for (let i = 0; i < dataSourceItemsummaryTempParent.length; i++) {

        if (order.filter(value => value.ORDERTYPE === dataSourceItemsummaryTempParent[i].ORDERTYPE).length <= 0) {
          order.push(dataSourceItemsummaryTempParent[i])
        }
        else {
          let indexTemp = order.findIndex(item => item.ORDERTYPE === dataSourceItemsummaryTempParent[i].ORDERTYPE)
          order[indexTemp] = { ...order[indexTemp], Item_count: order[indexTemp].Item_count + dataSourceItemsummaryTempParent[i].Item_count }
        }

        if (loss.filter(value => value.ORDERTYPE === dataSourceItemsummaryTempParent[i].ORDERTYPE).length <= 0) {
          // console.log(JSON.parse(dataSourceItemsummaryTempParent[i].Total_item_loss.split('$')[1]))
          
          let tempItemSummary = {...dataSourceItemsummaryTempParent[i], Total_item_loss:JSON.parse(dataSourceItemsummaryTempParent[i].Total_item_loss.split('$')[1])}
          loss.push(tempItemSummary)
        //  loss.push(dataSourceItemsummaryTempParent[i])
        }
        else {
          let indexTemp = loss.findIndex(item => item.ORDERTYPE === dataSourceItemsummaryTempParent[i].ORDERTYPE)
            // console.log(dataSourceItemsummaryTempParent[i].Total_item_loss)

          loss[indexTemp] = { ...loss[indexTemp], Total_item_loss: loss[indexTemp].Total_item_loss + JSON.parse(dataSourceItemsummaryTempParent[i].Total_item_loss.split('$')[1]) }

        }

        if (profit.filter(value => value.ORDERTYPE === dataSourceItemsummaryTempParent[i].ORDERTYPE).length <= 0) {
          
          let tempItemSummary = {...dataSourceItemsummaryTempParent[i], Total_item_profit:JSON.parse(dataSourceItemsummaryTempParent[i].Total_item_profit.split('$')[1])}
          profit.push(tempItemSummary)
          // profit.push(dataSourceItemsummaryTempParent[i])
        }
        else {
          let indexTemp = profit.findIndex(item => item.ORDERTYPE === dataSourceItemsummaryTempParent[i].ORDERTYPE)
          profit[indexTemp] = { ...profit[indexTemp], Total_item_profit: profit[indexTemp].Total_item_profit +  JSON.parse(dataSourceItemsummaryTempParent[i].Total_item_profit.split('$')[1])  }
        }


      }

      onAddItem({ order: order, loss: loss, profit: profit })
    }

  }, [activeTab, dataSourceItemsummaryTempParent]);
  const filter = (value) => {
    console.log(value)
    var val = [];
    let temp = []
    let placeholder = ``;

    return <Input
      placeholder={placeholder}
      size='small'
      onChange={e => {

        temp = [...temp, ...dataSourceItemsummaryTempParent.filter(item => JSON.stringify(item[value]).toUpperCase().includes(e.target.value.toString().toUpperCase()))]
        console.log('temp', temp)
        setstate({ ...state, dataSourceOrdersummaryTemp: temp });

      }}
    />
  }
  const columns = [
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


    },
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Item count</p>
      </div>,

      children: [
      {
        title: <>
        { filter('Item_count')}
        </>,
         dataIndex: 'Item_count',
         key: 'Item_count',
      },
      {
        
          key: 'Item_count',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.Item_count - d.Item_count,
          sortOrder: sortedInfo.columnKey === 'Item_count' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },
    // {
    //   title: 'Item count',
    //   dataIndex: 'Item_count',
    //   key: 'Item_count',
    //   defaultSortOrder: 'descend',
    //   sorter: (c, d) => c.Item_count - d.Item_count,
    //   sortOrder: sortedInfo.columnKey === 'Item_count' && sortedInfo.order,
    // },
    
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Total Item Profit Count</p>
      </div>,

      children: [
      {
        title: <>
        { filter('Total_item_profit')}
        </>,
         dataIndex: 'profitLink',
         key: 'Total_item_profit',
      },
      {
        
          key: 'Total_item_profit',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.Total_item_profit - d.Total_item_profit,
          sortOrder: sortedInfo.columnKey === 'Total_item_profit' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },

    // {
    //   title: 'Total Item Profit',
    //   dataIndex: 'Total_item_profit',
    //   key: 'Total_item_profit',
    //   defaultSortOrder: 'descend',
    //   sorter: (c, d) => c.Total_item_profit - d.Total_item_profit,
    //   sortOrder: sortedInfo.columnKey === 'Total_item_profit' && sortedInfo.order,
    // },
    
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Total Item Loss Count</p>
      </div>,

      children: [
      {
        title: <>
        { filter('Total_item_loss')}
        </>,
         dataIndex: 'lossLink',
         key: 'Total_item_loss',
      },
      {
        
          key: 'Total_item_loss',
          defaultSortOrder: 'descend',
          sorter: (c, d) => c.Total_item_loss - d.Total_item_loss,
          sortOrder: sortedInfo.columnKey === 'Total_item_loss' && sortedInfo.order,
          width:30,
        
        
      }
      ]


    },
    // {
    //   title: 'Total Item Loss',
    //   dataIndex: 'Total_item_loss',
    //   key: 'Total_item_loss',

    //   defaultSortOrder: 'descend',
    //   sorter: (c, d) => c.Total_item_loss - d.Total_item_loss,
    //   sortOrder: sortedInfo.columnKey === 'Total_item_loss' && sortedInfo.order,
    // },
    {
      title:     
      <div style={{height: 63, display:'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
      <p style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Percentge</p>
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
          sorter: (c, d) => c.percentge - d.percentge,
          sortOrder: sortedInfo.columnKey === 'percentge' && sortedInfo.order,
          width:30,
        
        
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

export default ItemPNLSummary
