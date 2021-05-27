import React, { lazy, Suspense, useEffect, useState, useDispatch } from 'react';
import { Input, Tabs, Form, Col, DatePicker, Table, Upload, Row, Radio, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Heading from '../../../components/heading/heading';
import { CardBarChart2, EChartCard } from '../../Dashboard (old)/style';
const { TabPane } = Tabs;
const { TextArea } = Input;



const ReportView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    value: "Default",
    products: 'year'
  });





  const onChange = (e) => {
    console.log(e);

    setState({ ...state, value: e.target.value })
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'Today',
          value: 'Today',
        },
        {
          text: 'Week',
          value: 'Week',
        },
        {
          text: 'May',
          value: 'May',
        },
        {
          text: 'Over All',
          value: 'Over All',
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    // {
    //   title: 'Other',
    //   children: [
    //     {
    //       title: 'Age',
    //       dataIndex: 'age',
    //       key: 'age',
    //       width: 150,
    //       sorter: (a, b) => a.age - b.age,
    //     },

    //   ],
    // },
    {
      title: 'Orders',
      children: [
        {
          title: '2020',
          dataIndex: 'orders2020',
          key: 'orders20202020',
          // width: 200,
          width: 80,
        },
        {
          title: '2021',
          dataIndex: 'orders20202021',
          key: 'orders20202021',
          width: 80,
        },
      ],
    },
    {
      title: 'Sales',
      children: [
        {
          title: '2020',
          dataIndex: 'sales2020',
          key: 'sales2020',
          // width: 200,
          width: 100,
        },
        {
          title: '2021',
          dataIndex: 'sales2021',
          key: 'sales2021',
          width: 100,
        },
      ],
    },
    {
      title: 'Pending',
      children: [
        {
          title: '2020',
          dataIndex: 'pending2020',
          key: 'pending2020',
          // width: 200,
          width: 80,
        },
        {
          title: '2021',
          dataIndex: 'pending2021',
          key: 'pending2021',
          width: 80,
        },
      ],
    },
    {
      title: 'Return',
      children: [
        {
          title: '2020',
          dataIndex: 'return2020',
          key: 'return2020',
          // width: 200,
          width: 80,
        },
        {
          title: '2021',
          dataIndex: 'return2021',
          key: 'return2021',
          width: 80,
        },
      ],
    },

  ];




  const data = [];
  for (let i = 0; i < 3; i++) {
    data.push({
      key: i,
      type: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }



  const handleChange = (data) => {
    console.log('ds', data)
  }

  return (
    <>
      <div>


        <Row style={{}} >
          <Cards title="Sales Report">

            <Form>
              <Row >
                <Col span={4} style={{ marginTop: 15 }}>
                  <Radio.Group onChange={onChange} value={state.value}>
                    <Radio value={"Default"}>Default</Radio>
                    <Radio value={"Date"}>Date</Radio>
                  </Radio.Group>
                </Col>

                <Col span={14}>

                  {state.value == "Default" ?
                    <Select defaultValue="Today" style={{ width: 120, marginTop: 7 }} onChange={handleChange}>
                      <Option value="Today">Today</Option>
                      <Option value="1 Week">1 Week</Option>
                      <Option value="1 Month">1 Month</Option>
                    </Select>
                    :
                    <Col>
                      <DatePicker style={{ padding: 10, marginRight: 15 }} size='small' />

                      <DatePicker style={{ padding: 10 }} size='small' />
                    </Col>

                  }
                </Col>

                <Col span={6}>
                  <Button style={{ marginTop: 7 }} key="1" type="primary" size="default" htmlType="submit">
                    Search
                  </Button>

                  {/* <Form.Item name="startDate" rules={[{ required: true }]}>
                
                    <DatePicker style={{ padding: 10 }} size='small' />
                   
                  </Form.Item> */}

                </Col>


              </Row>
            </Form>

          </Cards>
        </Row>

      </div>

 
        <Row gutter={25}>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          
         
         
        </Row>

        <Row gutter={25}>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                {/* <div className="card-chunk"> */}
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1"  style={{color:'red'}}>PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                {/* </div> */}
              </EChartCard>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    {/* <span>PU</span> */}
                    <Heading as="h1">PU</Heading>
                    <h3>Total $7,461</h3>
                    <h3>Item 461</h3>
                    <h3>Sales $70,461</h3>
                    {/* <span>Orders</span> */}
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          
         
         
        </Row>






      <Row>
        <Cards title="Amazon">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>

      <Row>
        <Cards title="Walmart">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>


      <Row>
        <Cards title="PU">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>


      <Row>
        <Cards title="JLC">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={{ x: 'calc(700px + 50%)' }}
          />
        </Cards>
      </Row>



    </>
  );
};

export default ReportView;



{/* <Row> 
        <Col span={11} >
          <Cards
            title="Orders"
            size="medium"
            bodypadding="0px"
          >
            <div className="table-bordered top-seller-table table-responsive">
              <Table columns={sellingColumns} dataSource={sellingData} pagination={false} />
            </div>
          </Cards>
        </Col>
        <Col span={11} style={{ marginLeft: 7 }}>
          <Cards
            title="Sales"
            size="medium"
            bodypadding="0px"
          >
            <div className="table-bordered top-seller-table table-responsive">
              <Table columns={ordersColumns} dataSource={Orders} pagination={false} />
            </div>
          </Cards>
        </Col>

      </Row>
      <Row>
        <Col span={11} >
          <Cards
            title="Orders"
            size="medium"
            bodypadding="0px"
          >
            <div className="table-bordered top-seller-table table-responsive">
              <Table columns={sellingColumns} dataSource={sellingData} pagination={false} />
            </div>
          </Cards>
        </Col>
        <Col span={11} style={{ marginLeft: 7 }}>
          <Cards
            title="Sales"
            size="medium"
            bodypadding="0px"
          >
            <div className="table-bordered top-seller-table table-responsive">
              <Table columns={ordersColumns} dataSource={Orders} pagination={false} />
            </div>
          </Cards>
        </Col>

      </Row> */}


      // const sellingColumns = [
      //   {
      //     title: 'Type',
      //     dataIndex: 'name',
      //     key: 'name'


      //   },
      //   {
      //     title: '2020',
      //     dataIndex: 'price',
      //     key: 'price'

      //   },
      //   {
      //     title: '2021',
      //     dataIndex: 'sold',
      //     key: 'sold'

      //   }
      // ];

      // const ordersColumns = [

      //   {
      //     title: '2020',
      //     dataIndex: 'sales2020',
      //     key: 'sales2020',
      //   },
      //   {
      //     title: '2021',
      //     dataIndex: 'sales2021',
      //     key: 'sales2021',
      //   }
      // ];




      // const Orders = [

      //   {
      //     sales2020: '$3,780.96',
      //     sales2021: '$3,780.96',
      //   },
      //   {
      //     sales2020: '$3,783.430.96',
      //     sales2021: '$3,783.430.96'

      //   }
      // ]


      // const sellingData = [
      //   {
      //     name: "In Stock",
      //     price: 720,
      //     sold: "$1522"
      //   },
      //   {
      //     name: "Over All",
      //     price: 23440,
      //     sold: "$12564"
      //   }
      // ]



