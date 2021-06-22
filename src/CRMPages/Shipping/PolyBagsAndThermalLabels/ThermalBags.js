import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Form,Input, Tabs,Table,  Upload, Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getThermalBags } from '../../../redux/apis/DataAction';
import { BasicFormWrapper } from '../styled';

const { TabPane } = Tabs;
const { TextArea } = Input;

const PolyBagsAndThermalLabelsView = (props) => {
  const dispatch = useDispatch();

        const [state, setState] = useState({
          selectionType: 'checkbox',
          selectedRowKeys: null,
          selectedRows: null,
          values: {},
          isLoader: true,
          dataSource:[]
        });

        const {dataSource} = state
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
        useEffect(() => {
          // setstate({ ...state, loader: true })
        
          let counter = 0;
        dispatch(getThermalBags("")).then(data => {
      
          let tempdatasource = []
          if (data.length)
          data.map(value => {
         
              const { Amazon, Date, ID, Remaing_total_label, UPS,USPS,shiping_label } = value;
      
              tempdatasource.push({
                  key: counter++,
      
                  ID: <span style={{ color: 'black' }} className="date-started">{ID}</span>,
                  shiping_label: <span style={{ color: 'black' }} className="date-started">{shiping_label}</span>,
                  UPS: <span style={{ color: 'black' }} className="date-started">{UPS}</span>,
                  USPS: <span style={{ color: 'black' }} className="date-started">{USPS}</span>,
                  Date: <span style={{ color: 'black' }} className="date-started">{Date}</span>,
                  Remaing_total_label: <span style={{ color: 'black' }} className="date-started">{Remaing_total_label}</span>,
                  Amazon: <span style={{ color: 'black' }} className="date-started">{Amazon}</span>,
              
      
      
              });
              
          });
          setState({...state,dataSource:tempdatasource, isLoader: false })
        })
      }, []);
        
        
   
        const columns = [
            {
              title: 'Date',
              dataIndex: 'Date',
              key: 'Date',
            },
            {
              title: 'Shipped Label',
              dataIndex: 'shiping_label',
              key: 'shiping_label',
            },
            {
              title: 'Remaining UPS',
              dataIndex: 'UPS',
              key: 'UPS',
            },
            {
                title: 'Remaining USPS',
                dataIndex: 'USPS',
                key: 'USPS',
              },
              {
                title: 'Remaining Amazon',
                dataIndex: 'Amazon',
                key: 'Amazon',
              },
              {
                title: 'Remaining Total Labels',
                dataIndex: 'Remaing_total_label',
                key: 'Remaing_total_label',
              },
              
          ];
    return (
        <>
          <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
          {/* <BasicFormWrapper>
          <Form {...layout} form={form} id="new_Thermalbags" name="nest-messages"  validateMessages={validateMessages}>
           
            <Row style={{  }}>
                <Cards title="Endica Shiping Label" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                          
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <Form.Item name='UPS' label="" rules={[{ required: true }]}>
                            <Input placeholder="UPS"/>
                            </Form.Item>
                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                       
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <Form.Item name='USPS' label="" rules={[{ required: true }]}>
                            <Input placeholder="USPS"/>
                            </Form.Item>

                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                           
                            
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <Form.Item name='Amazon' label="" rules={[{ required: true }]}>
                            <Input placeholder="Amazon"/>
                            </Form.Item>

                            </div>
                            
                        </Col>
                        <Col lg={6} xs={24}>
                           
                            <div className="atbd-drawer" style={{ marginLeft: 20, marginTop:8 }}>
                                <Button size="large" type="success" htmlType="Update" style={{backgroundColor: '#42ba96',  color:'white'}}>
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
                <Cards title="Thermal Labels" caption="The simplest use of Drawer" >
                     <Row style={{ marginTop: 20 }}>

                        <Col xs={24}>
                                <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />                         
                        </Col>

                    </Row>
                </Cards>
            </Row>
                   

                </Spin>


        </>
    );
};

export default PolyBagsAndThermalLabelsView;
