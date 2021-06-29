import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Form,Input, Tabs, Table, Upload, Row, Col, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getPolyBags, } from '../../../redux/apis/DataAction';
import { BasicFormWrapper } from '../styled';
import {SuccessButton} from './../../../components/buttons/SuccessButton';

const { TabPane } = Tabs;
const { TextArea } = Input;

const PolyBagsAndThermalLabelsView = (props) => {
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    date: null,
    dateString: null,
    checkData: [],
    checked: null,
    POType: null,
    values: {},
    isLoader: false,
    dataSource:[],
    smallBags:'',
    largeBags:''
  });
  const {dataSource,smallBags,largeBags,isLoader}=state

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 25 },
  };
  const [form] = Form.useForm();  
  
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
  const dispatch = useDispatch();
  useEffect(() => {
    // setstate({ ...state, loader: true })
  
    let counter = 0;
  dispatch(getPolyBags("")).then(data => {
    setstate({ ...state, isLoader: false,smallBags:data[0].Remaing_Small,largeBags:data[0].Remaing_Large })
   
    let tempdatasource = []
    if (data.length)
    data.map(value => {
   
        const { ID, Remaing_Large, Remaing_Small, Shipping_order, date } = value;

        tempdatasource.push({
            key: counter++,

            ID: <span style={{ color: 'black' }} className="date-started">{ID}</span>,
            Remaing_Large: <span style={{ color: 'black' }} className="date-started">{Remaing_Large}</span>,
            Remaing_Small: <span style={{ color: 'black' }} className="date-started">{Remaing_Small}</span>,
            Shipping_order: <span style={{ color: 'black' }} className="date-started">{Shipping_order}</span>,
            date: <span style={{ color: 'black' }} className="date-started">{date}</span>,
        


        });
        
    });
   
    setstate({...state,dataSource:tempdatasource})
  })
}, []);
  
  


    const getPolyBagsReporting = () => {

      setstate({ ...state, isLoader: true })
    
    };
    
    const columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
      },
      {
        title: 'Remaing Large',
        dataIndex: 'Remaing_Large',
        key: 'Remaing_Large',
      },
      {
        title: 'Remaining Small',
        dataIndex: 'Remaing_Small',
        key: 'Remaing_Small',
      },
      {
        title: 'Shipping order',
        dataIndex: 'Shipping_order',
        key: 'Shipping_order',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      }

    ];
    return (
      <>
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
          {/* <Row>
            <Col>
            <div style={{Color:'red'}}><h3>Small Bags less than 5000 Kindly Arrange New Bags</h3></div>
            </Col>
            <Col>
            <div style={{Color:'red'}}><h3>Large Bag less than 2500 Kindly Arrange New Bags</h3></div>
            </Col>
          </Row> */}
        
        {/* <BasicFormWrapper>
          <Form {...layout} form={form} id="new_ticket" name="nest-messages"  validateMessages={validateMessages}>
           
          <Row>
            <Cards title="Endica Shiping Label" caption="The simplest use of Drawer" >
              <Row gutter={25}>
                <Col lg={8} xs={24}  >
                 
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                  
                  <Form.Item name='Small' label="" rules={[{ required: true }]}>
                    <Input placeholder="Small"/>
                    </Form.Item>
                    <div  ><h3 style={{color:'red'}}>{smallBags<5000?'Small Bags less than 5000 Kindly Arrange New Bags':''} </h3></div>
                  </div>
                  
                </Col>
                <Col lg={8} xs={24}>
               
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                
                 
                  <Form.Item name='Large' label="" rules={[{ required: true }]}>
                    <Input placeholder="Large"/>
                    </Form.Item>
                    <div  ><h3 style={{color:'red'}}>{smallBags<2500?'Large Bag less than 2500 Kindly Arrange New Bags':''} </h3></div>
                  </div>
                </Col>
                <Col lg={8} xs={24}>
                   
                      <div className="atbd-drawer" style={{ marginLeft: 20 }}>
              

                          <Button size="large" type="success" htmlType="Update" style={{backgroundColor: '#42ba96', marginTop: 8, color:'white'}}>
                            Update
                        </Button>
                     
                  </div>
                </Col>

              </Row>
            </Cards>
          </Row>
          </Form>
        </BasicFormWrapper> */}
          {/* Summary Div  */}
       
                <Row>
                <Cards title="Poly Bags" caption="The simplest use of Drawer" >
                     <Row style={{ marginTop: 20 }}>

                        <Col xs={24}>
                        <Table pagination={true} dataSource={dataSource} columns={columns} />
                        </Col>

                    </Row>
                </Cards>
            </Row>
        </Spin>

      </>
    );
  };

  export default PolyBagsAndThermalLabelsView;
