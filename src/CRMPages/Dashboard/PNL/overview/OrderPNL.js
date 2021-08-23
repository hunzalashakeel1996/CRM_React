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

    const {dataSourceOrder,dataOrderDownload}= props
    // console.log('dataSourceOrder',dataSourceOrder)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[]
  });

  const {sortedInfo,isLoader,dataSourceOrderTemp}=state
 
  useEffect(() => {
    // Update the document title using the browser API
    setState({ ...state, dataSourceOrderTemp: dataSourceOrder });

  },[dataSourceOrder]);
  const dataSource = [];
  let temp =[];

  const columns = [
    {
      title: 'Order no',
      dataIndex: 'orderno',
      key: 'orderno',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.orderno - d.orderno,
      sortOrder: sortedInfo.columnKey === 'orderno' && sortedInfo.order,
    },
    {
      title: 'FULLNAME',
      dataIndex: 'FULLNAME',
      key: 'FULLNAME',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.FULLNAME - d.FULLNAME,
      sortOrder: sortedInfo.columnKey === 'FULLNAME' && sortedInfo.order,
    },
    {
      title: 'Zip',
      dataIndex: 'Zip',
      key: 'Zip',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Zip - d.Zip,
      sortOrder: sortedInfo.columnKey === 'Zip' && sortedInfo.order,
    },
    {
      title: 'State',
      dataIndex: 'State',
      key: 'State',
        
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.State - d.State,
      sortOrder: sortedInfo.columnKey === 'State' && sortedInfo.order,
    },
    {
      title: 'po_shipping',
      dataIndex: 'po_shipping',
      key: 'po_shipping',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.po_shipping - d.po_shipping,
      sortOrder: sortedInfo.columnKey === 'po_shipping' && sortedInfo.order,
    },
    {
      title: 'customerPay',
      dataIndex: 'customerPay',
      key: 'customerPay',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.customerPay - d.customerPay,
      sortOrder: sortedInfo.columnKey === 'customerPay' && sortedInfo.order,
    }
    ,
    {
      title: 'ShippingCost',
      dataIndex: 'ShippingCost',
      key: 'ShippingCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ShippingCost - d.ShippingCost,
      sortOrder: sortedInfo.columnKey === 'ShippingCost' && sortedInfo.order,
    } ,
    
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.cost - d.cost,
      sortOrder: sortedInfo.columnKey === 'cost' && sortedInfo.order,
    },
    {
      title: 'purchaseCost',
      dataIndex: 'purchaseCost',
      key: 'purchaseCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.purchaseCost - d.purchaseCost,
      sortOrder: sortedInfo.columnKey === 'purchaseCost' && sortedInfo.order,
    },
    {
      title: 'Order Total',
      dataIndex: 'ordertotal',
      key: 'ordertotal',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.ordertotal - d.ordertotal,
      sortOrder: sortedInfo.columnKey === 'ordertotal' && sortedInfo.order,
    },
    {
      title: 'Moneycollected',
      dataIndex: 'Moneycollected',
      key: 'Moneycollected',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Moneycollected - d.Moneycollected,
      sortOrder: sortedInfo.columnKey === 'Moneycollected' && sortedInfo.order,
    },
    {
      title: 'commission',
      dataIndex: 'commission',
      key: 'commission',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.commission - d.commission,
      sortOrder: sortedInfo.columnKey === 'commission' && sortedInfo.order,
    },
    {
      title: 'profit',
      dataIndex: 'profit',
      key: 'profit',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.profit - d.profit,
      sortOrder: sortedInfo.columnKey === 'profit' && sortedInfo.order,
    },
    {
      title: 'Isdropship',
      dataIndex: 'Isdropship',
      key: 'Isdropship',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.Isdropship - d.Isdropship,
      sortOrder: sortedInfo.columnKey === 'Isdropship' && sortedInfo.order,
    },
    {
      title: 'IsReplacement',
      dataIndex: 'IsReplacement',
      key: 'IsReplacement',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.IsReplacement - d.IsReplacement,
      sortOrder: sortedInfo.columnKey === 'IsReplacement' && sortedInfo.order,
    },
    {
      title: 'OrderDiscount',
      dataIndex: 'OrderDiscount',
      key: 'OrderDiscount',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.OrderDiscount - d.OrderDiscount,
      sortOrder: sortedInfo.columnKey === 'OrderDiscount' && sortedInfo.order,
    }
    
    
    
    
  ];

  const handleChange = (pagination, filters, sorter) =>  {
    console.log('Various parameters', pagination, filters, sorter);
    setState({...state,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const handleSearch = (searchText) => {
   // temp  = [...temp, dataSourceDetails.filter(item => item['merchantsku']==null?[]:[...item['merchantsku'].toUpperCase().includes(searchText.toUpperCase())])]

   console.log(searchText.toUpperCase())
  //  temp  = [...temp,...dataSourceOrder.filter(item => item['merchantsku']!==null&&item['merchantsku'].toUpperCase().includes(searchText.toUpperCase()))]
    
   
  //  console.log('merchantsku',temp)
    // console.log('merchantsku',dataSourceDetails.filter(item => item['merchantsku']==null?[]:item['merchantsku'].toUpperCase().includes(searchText.toUpperCase())))
   
     temp =[...temp,...dataSourceOrder.filter(item => item['orderno'].toUpperCase().includes(searchText.toUpperCase()))]
    // console.log('orderno',temp)


    //  temp = [...temp,...dataSourceOrder.filter(item => item['ORDERTYPE'].toUpperCase().includes(searchText.toUpperCase()))]
    // console.log('ORDERTYPE',temp)

  //  console.log('dataSourceDetails',temp)
    setState({ ...state, dataSourceOrderTemp: temp });
  };
  const Download = ( data) =>  {
   
  downloadFile(data)
  }
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
  

        <Row >
        <Col md={8} xs={24} style={{marginBottom:10 }}>
               
                  <Input onChange={(event) => { handleSearch(event.target.value) }} placeholder="Filter" patterns />
                
              </Col>
              <Col span={4} >
               
               <Button  style={{marginLeft:10 }}  size="default" type="primary" onClick={(event) => {  Download(dataOrderDownload)  }} > Download</Button>
               
               </Col>
            
          <Col xs={24}>
            <Cards headless>
              {/* <ProjectList> */}

                <div className="table-responsive">
                  <Table pagination={true} scroll={{ x: 5000, y: 1000 }} dataSource={dataSourceOrderTemp} columns={columns} onChange={handleChange}/>
                </div>

              {/* </ProjectList> */}
            </Cards>
          </Col>

        </Row>
      </div>
    </Spin>
  );

};

export default OrderPNL
