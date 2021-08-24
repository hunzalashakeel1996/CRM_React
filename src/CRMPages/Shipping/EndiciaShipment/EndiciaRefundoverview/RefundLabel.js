import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col,Modal,notification } from 'antd';
import { Button, BtnGroup } from '../../../../components/buttons/buttons';
import { Drawer } from '../../../../components/drawer/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { endiciaRefundLabel } from '../../../../redux/apis/DataAction';
const { TabPane } = Tabs;
const { TextArea } = Input;

const RefundlabelView = (props) => {
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
  
   
    const endiciaRefund = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))


        dispatch(endiciaRefundLabel({ trackingno: trackingNo, user: username.LoginName })).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    }

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
   
    return (
        <>
            <Row style={{}}>
                <Cards title="Endica Refund Label" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Endica Refund Label" name="nest-messages" className="Endica-Refund-Label" onFinish={endiciaRefund} validateMessages={validateMessages}>
                    <Row gutter={25}>
                        <Col lg={18} xs={24}  >
                            <div className="atbd-drawer" ><h3>Tracking Number</h3></div>
                            <Form.Item name="Tracking Number" rules={[{ required: true }]}>
                                <Input value={trackingNo} onChange={onChange} />

                                </Form.Item>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Refund</h3></div>
                            <Form.Item>
                                {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                <Button size="default" type="success" htmlType="Submit" > Refund Tracking</Button>
                                {/* </Cards> */}
                                </Form.Item>
                        </Col>

                    </Row>
                    </Form>
                </Cards>
            </Row>
            {/* Check Labels Here Div  */}
            {/* <Row >
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
                
            </Row> */}
            <Modal

                centered
                visible={visible}
                onOk={endiciaRefund}

                onCancel={() => setVisible(false)}>
                <div>
                    <Cards headless>
                        <h1>Sure to Refund?</h1>
                        <h3>This Tracking {trackingNo}</h3>
                    </Cards>
                </div>

            </Modal>



      

        </>
    );
};

export default RefundlabelView;
