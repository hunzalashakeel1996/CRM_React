import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col,Modal,notification } from 'antd';
import { Button, BtnGroup } from '../../../../components/buttons/buttons';
import { Drawer } from '../../../../components/drawer/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { checkEndiciaRefundLabel } from '../../../../redux/apis/DataAction';
const { TabPane } = Tabs;
const { TextArea } = Input;

const EndiciaShipmentView = (props) => {
    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        values: {},
        trackingNo: '',
        trackingNoRefund: '',
        dataSource:[]
    });
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
      const [form] = Form.useForm();
  
    const dispatch = useDispatch()
    
    const [visible, setVisible] = useState(false);
    const { trackingNo,trackingNoRefund,dataSource } = state
    let counter = 0;
  
    const columns = [
        {
            title: 'Order NO',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: 'PO Number',
            dataIndex: 'poNumber',
            key: 'poNumber',
        },
        {
            title: 'Tracking NO',
            dataIndex: 'trackingNo',
            key: 'trackingNo',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

    ];
   

    const checkEndiciaRefund = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))


        dispatch(checkEndiciaRefundLabel({ ms: trackingNoRefund })).then(data => {
                // console.log(data)
                let datasources = []

                if (data.length)
                    data.map(value => {
    
                        const { orderno, TrackingNo, ponumber,status } = value;
    
                        datasources.push({
                            key: counter++,
    
                            orderNo: <span style={{ color: 'black' }} className="date-started">{orderno}</span>,
                          
                            trackingNo: <span style={{ color: 'black' }} className="date-started">{TrackingNo}</span>,
                            poNumber: <span style={{ color: 'black' }} className="date-started">{ponumber}</span>,
                            status: <span style={{ color: 'black' }} className="date-started">{status}</span>,
                              });
                    });
                    setState({ ...state, dataSource: datasources })
        })
    }
    const onChange = (event) => {
        // console.log(event.target.value)
        setState({ ...state, trackingNo: event.target.value });

    };
    const onChangeRefund = (event) => {
        // console.log(event.target.value)
        setState({ ...state, trackingNoRefund: event.target.value });

    };
    const openModal =()=>{
        setVisible(true)
    }
    const refreshPage =()=>{
        location.reload();
    }
    return (
        <>
        
            {/* Check Labels Here Div  */}
            <Row >
                <Cards title="Check Refund Labels Here" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Check Refund Labels Here" name="nest-messages" className="Check-Refund " onFinish={checkEndiciaRefund} validateMessages={validateMessages}>
                    <Row gutter={25}>
                        <Col lg={12} xs={24}  >
                        <Form.Item name="Tracking Number" rules={[{ required: true }]}>
                            <TextArea placeholder="input here" className="custom" value={trackingNoRefund} onChange={onChangeRefund} style={{ height: 50 }} />
                            </Form.Item>
                        </Col>
                        <Col lg={6} xs={24}  >
                        <Form.Item>
                           
                             
                           <Button type="primary" size="default" type="success" htmlType="Submit" > Search</Button>
                           </Form.Item>
                        </Col>
                        <Col lg={6} xs={24}  >
                        <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                           
                             
                           <Button type="primary" onClick={refreshPage}> Refresh</Button>
                           </div>
                        </Col>
                    </Row>
                    </Form>
                    <Row style={{ marginTop: 20 }}>

                        <Col xs={24}>
                            <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                        </Col>

                    </Row>
                
                </Cards>
                
            </Row>
      
        </>
    );
};

export default EndiciaShipmentView;
