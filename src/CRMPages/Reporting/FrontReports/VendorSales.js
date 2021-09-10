import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { chartVendorSalesData } from '../../../redux/apis/DataAction';
import VendorSalestGraph from '../../Dashboard/ComparisonReport/overview/VendorSales';


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



const VendorSales = (props) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   setstate({ ...state, loader: true })
  // }, []);
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    date: null,
    dateString: null,
    checkData: [],
    checked: null,
    values: {},
    isLoader: false,
    dataReport:[],
    sortedInfo:[]
  });
const {dataReport,sortedInfo}=state
  const onChange = (value, key) => {
    // // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };
  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setstate({...state,
     
      sortedInfo: sorter,
    });
  };
  


 const setAgeSort = () => {
    setstate({...state,
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  const getVendorSalesReporing = () => {
    // console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(chartVendorSalesData({ FROMDATE: state.startDate.format('MM/DD/YYYY'), TODATE: state.endDate.format('MM/DD/YYYY') })).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered Vendor Sales Reports From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      data.map(value => {
        const { VENDORNAME, TotalOrders, TotalUnits,TotalCost,TotalSales } = value;   
          return tempDataSource.push({
            VENDORNAME: VENDORNAME,
            TotalOrders: TotalOrders,
            TotalUnits: TotalUnits,
            TotalCost: TotalCost,
            TotalSales: TotalSales,
          });
     
      });
      setstate({ ...state,dataReport:data, dataSource: [...tempDataSource],isLoader: false });
   
     
      
      
    })

  };


  const columns = [
    {
      title: 'VendorName',
      dataIndex: 'VENDORNAME',
      key: 'VENDORNAME',
    },
    {
      title: 'TotalOrders',
      dataIndex: 'TotalOrders',
      key: 'TotalOrders',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.TotalOrders - d.TotalOrders,
      sortOrder: sortedInfo.columnKey === 'TotalOrders' && sortedInfo.order,
    },
    {
      title: 'TotalUnits',
      dataIndex: 'TotalUnits',
      key: 'TotalUnits',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.TotalUnits - d.TotalUnits,
      sortOrder: sortedInfo.columnKey === 'TotalUnits' && sortedInfo.order,
    },
    {
      title: 'TotalCost',
      dataIndex: 'TotalCost',
      key: 'TotalCost',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.TotalCost - d.TotalCost,
      sortOrder: sortedInfo.columnKey === 'TotalCost' && sortedInfo.order,
    },
    {
      title: 'TotalSales',
      dataIndex: 'TotalSales',
      key: 'TotalSales',
      defaultSortOrder: 'descend',
      sorter: (c, d) => c.TotalSales - d.TotalSales,
      sortOrder: sortedInfo.columnKey === 'TotalSales' && sortedInfo.order,
    },
  ];

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
        {/* <ProjectHeader>
          <PageHeader
            ghost
           
          />
        </ProjectHeader> */}

        <Row>
          <Cards  title="Vendor Sales">
          <Form layout="inline"  initialValue="" label="" form={form} id="Vendor Sales" name="nest-messages" onFinish={getVendorSalesReporing} validateMessages={validateMessages}>

              <Row style={{  width:'100%',}} >
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10, width:'100%',}} size='small' onChange={(date) => { onChange(date, 'startDate') }} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
              
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item name="endDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10, width:'100%', }}
                      placeholder="End date" onChange={(date) => { onChange(date, 'endDate') }} />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                
                <Col span={24}  >
                <Form.Item >
                   <Button size="large"    style={{ margintTop: 15 }} key="1" type="primary"   htmlType="submit">
                    Search
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
                  <Table pagination={false} dataSource={state.dataSource} columns={columns} onChange={handleChange} />
                </div>

              </ProjectList>
            </Cards>
          </Col>
          {dataReport.length>0&&
        <Col lg={24} s={24}>
          
          <VendorSalestGraph data={dataReport}/>
        </Col>}
        </Row>
      </div>
    </Spin>
  );

};

export default VendorSales;
