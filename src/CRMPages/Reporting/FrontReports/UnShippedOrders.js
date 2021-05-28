import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { useDispatch } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { getUnshippedOrders } from '../../../redux/apis/DataAction';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const formInit = {
  reportType: '',
  VendorName: []
}





const UnShippedOrders = (props) => {


  const dispatch = useDispatch();
  useEffect(() => {
    setstate({ ...state, loader: true })
  }, []);
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
  });
  const onChange = (value, key) => {
    // console.log('aaa', date, dateString)
    setstate({ ...state, [key]: value });

  };

  const getUnshippedOrder = () => {
    console.log('aaaaa')
    setstate({ ...state, isLoader: true })

    dispatch(getUnshippedOrders({ FROMDATE: state.startDate.format('MM/DD/YYYY'), addday: state.AddDays})).then(data => {
      setstate({ ...state, isLoader: false })
      console.log('My Data: ', data)
      //downloadFile(data);
      notification.success({
        message: 'Successfull Rendered',
        description: `Successfully Rendered Pending  Reports From ${state.startDate.format('MM/DD/YYYY')}`,
        onClose: close,
      });
      let tempDataSource = [];
      console.log(data);
      data.map(value => {
        // console.log(value)
        const { POCOMINGTOMORROW, PO_COMING_TODAY_NON_SHIPPING,PO_DELIVERED_NON_SHIPPED } = value;
        const total = (value.POCOMINGTOMORROW + value.PO_COMING_TODAY_NON_SHIPPING + value.PO_DELIVERED_NON_SHIPPED);
        console.log(total);
        return tempDataSource.push({
          POCOMINGTOMORROW: POCOMINGTOMORROW,
          PO_COMING_TODAY_NON_SHIPPING: PO_COMING_TODAY_NON_SHIPPING,
          PO_DELIVERED_NON_SHIPPED: PO_DELIVERED_NON_SHIPPED,
          total: total
        });

      });
      setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });




    })

  };


  const columns = [
    {
      title: 'POs Coming Tomorrow',
      dataIndex: 'POCOMINGTOMORROW',
      key: 'POCOMINGTOMORROW',
    },
    {
      title: 'POs Coming Today Non Shipping',
      dataIndex: 'PO_COMING_TODAY_NON_SHIPPING',
      key: 'PO_COMING_TODAY_NON_SHIPPING',
    },
    {
      title: 'PO Delivered Non Shippeds',
      dataIndex: 'PO_DELIVERED_NON_SHIPPED',
      key: 'PO_DELIVERED_NON_SHIPPED',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    
  ];



  return (
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <div>
        {/* <ProjectHeader>
          <PageHeader
            ghost
          
          />
        </ProjectHeader> */}

        <Row>
          <Cards title="Unshipped Report">
            <Form name="basic">

              <Row>
                <Col lg={8} xs={24}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    <DatePicker style={{ padding: 10 }} size='small' placeholder='From' onChange={(date) => { onChange(date, 'startDate') }} />
                  </Form.Item>
                </Col>
                
                <Col lg={8} xs={24}>
                  <Select
                    showSearch
                    style={{ width: 300 }}
                    size="large"
                    placeholder="Add Days"
                    optionFilterProp="children"
                    onChange={(AddDays) => { onChange(AddDays, 'AddDays') }}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>

                </Col>


               
                <Col lg={8} xs={24}  >
                               
                                <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                    <Button onClick={getUnshippedOrder} size="default" type="primary" htmlType="Submit">
                                        Search
                        </Button>

                                </div>
                            </Col>



              </Row>

              <Row >
                <Col span={24}>
                  <Table className="full-width-table" dataSource={state.dataSource} columns={columns} />
                </Col>
              </Row>

            </Form>
          </Cards>
        </Row>
      </div>
    </Spin>
  );
};

export default UnShippedOrders;
