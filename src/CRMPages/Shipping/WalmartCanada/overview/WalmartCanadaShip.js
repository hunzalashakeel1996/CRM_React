import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col, notification, Modal,Spin } from 'antd';
import { Button, BtnGroup } from '../../../../components/buttons/buttons';
import { Drawer } from '../../../../components/drawer/drawer';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile } from '../../../../components/utilities/utilities'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { insertFedexShipingSheet,insertFedexShipingSheetvalidation,createShipingFedex, endiciaShipingValidation,endiciaShipingCreateShiping,multipleCreateLabel,endiciaShipingcheckcount,endiciaVerifyLabel } from '../../../../redux/apis/DataAction';
// import Form from 'antd/lib/form/Form';
const { TabPane } = Tabs;
const { TextArea } = Input;
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
const WalmartCanadaShip = (props) => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        values: {},
        file: '',
        dataSource: [],
        checkCount:'',
        orderno: [],
        isLoader: false,
    });
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const { file,dataSource,checkCount,orderno,isLoader } = state
    let counter = 0;
  
    const columns = [
        {
            title: 'Order NO',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
        }
        ,
        {
            title: 'StreetAddress1',
            dataIndex: 'streetAddress1',
            key: 'streetAddress1',
        },
        {
            title: 'StreetAddress2',
            dataIndex: 'streetAddress2',
            key: 'streetAddress2',
        }
        ,{
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        }
        ,{
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        }
    ];
    const columnsvalidation = [
        {
            title: 'Order NO',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }
    ];
    const onChange = (event) => {
        // console.log(event.target.value)
        setState({ ...state, orderno: event.target.value });

    };
    const changeHandler = (event) => {

        setState({ ...state, file: event.target.files[0] })

    };

    const insertFedexSheet = () => {
        setState({ ...state, isLoader: true});
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        dispatch(insertFedexShipingSheet(formData)).then(data => {
            // console.log(data)
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull file uploaded  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            // location.reload();
            setState({ ...state, isLoader: false});
        })
    };
    const startFedexShipping = () => {
        setState({ ...state, isLoader: true});
        dispatch(insertFedexShipingSheetvalidation()).then(data => {
       
            let datasources = []

            if (data.length)
                data.map(value => {

                    const { orderno, Dimension } = value;

                    datasources.push({
                        key: counter++,

                        orderno: <span style={{ color: 'black' }} className="date-started">{orderno}</span>,
                      
                        description: <span style={{ color: 'black' }} className="date-started">
                            {Dimension == "" || null ? "Dimension Not Valid " : ""}
                          
                                     </span>
                          });
                });
           
            setState({ ...state, dataSource: datasources, isLoader: false })
        })
        setVisible(true)
    };
    const createFedexShipinglabel = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        setState({ ...state, isLoader: true});
        dispatch(createShipingFedex({ user: username.LoginName })).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setState({ ...state, isLoader: false});
        })
    };
    const checkEndiciaLabel =()=>{
        dispatch(multipleCreateLabel()).then(data => {
              downloadFile(data)
       
           notification.success({
               message: `Successfull  ${data}`,
               description: `Successfully Report`,
               onClose: close,
           });
          
       })
   };
   const checkEndiciaLabelCount =()=>{
    dispatch(endiciaShipingcheckcount()).then(data => {
        // console.log(data)
         setState({...state,checkCount:data[0].today_count})
   
      
      
   })
};
const refreshPage =()=>{
    location.reload();
}
const verifyLabel = () => {

    dispatch(endiciaVerifyLabel({ms:orderno})).then(data => {
        // console.log(data)
        let datasources = []

        if (data.length)
            data.map(value => {

                const { orderno,fullname,STREETADDRESS1,STREETADDRESS2,CITY,STATE,COUNTRY } = value;

                datasources.push({
                    key: counter++,

                    orderNo: <span style={{ color: 'black' }} className="date-started">{orderno}</span>,
                    fullName: <span style={{ color: 'black' }} className="date-started">{fullname}</span>,
                    streetAddress1: <span style={{ color: 'black' }} className="date-started">{STREETADDRESS1}</span>,
                    STREETADDRESS2: <span style={{ color: 'black' }} className="date-started">{STREETADDRESS2}</span>,
                    city: <span style={{ color: 'black' }} className="date-started">{CITY}</span>,
                    state: <span style={{ color: 'black' }} className="date-started">{STATE}</span>,
                    country: <span style={{ color: 'black' }} className="date-started">{COUNTRY}</span>,
                  
                  
                      });
            });

        setState({ ...state, dataSource: datasources })
    })
  
};
    return (
        <>
          <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
            <Row style={{}}>
                <Cards title="Walmart Canada Shiping Label" caption="The simplest use of Drawer" >
                
                    <Row gutter={25}>
                        <Col xs={24} sm={12} md={10} lg={6} xl={6} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Step 1</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}>

                                 <Button size="large"  type="success" style={{backgroundColor: '#42ba96',  color:'white', marginRight:8,}} onClick={insertFedexSheet}> Insert Shipping</Button>

                                <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />

                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={10} lg={6} xl={6} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Step 2</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                 <Button size="large"  type="success"  style={{backgroundColor: '#42ba96',  color:'white'}} onClick={startFedexShipping}> Start Walmart Canada Shipping</Button>

                          
                            </div>
                        </Col>
                        {/* <Col xs={24} sm={12} md={10} lg={6} xl={6} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Step 3</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                             <Button size="large"  type="success"  style={{backgroundColor: '#42ba96',  color:'white'}} onClick={checkEndiciaLabel}>Check Endicia Label</Button>
                           
                               
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={10} lg={6} xl={6} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Total Count</h3></div>
                            <div className="atbd-drawer" style={{ marginRight: 0 }}>
                             <Button size="large"  type="primary" onClick={checkEndiciaLabelCount}> Today Count</Button>:{checkCount}
                            
                             
                            </div>
                        </Col> */}
                    </Row>
                </Cards>
            </Row>
          
            {/* Check Labels Here Div  */}
            <Row style={{}}>
                <Cards title="Check Labels Here" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Check Labels Here" name="nest-messages" onFinish={verifyLabel} validateMessages={validateMessages} style={{width: '100%'}}>
                    <Row gutter={25} style={{width: '100%'}}>

                        <Col xs={24} lg={8}  >
                        <Form.Item name="Tracking Number"rules={[{ required: true }]}>
                            <TextArea placeholder="input here" className="custom" value={orderno} onChange={onChange} style={{ height: 50,width:'100%' }} />
                          </Form.Item>
                        </Col>

                        <Col  xs={24} >
                        <Form.Item style={{float:'left',}}>
                             <Button size="large"  type="success"    type="success" htmlType="Submit"> Search</Button>
                   
                            </Form.Item>


                            <Form.Item style={{float:'left',}}>
                       
                            <div className="atbd-drawer" style={{ marginLeft: 0,  }}>
                           
                             
                             <Button size="large"  type="primary" onClick={refreshPage}> Refresh</Button>
                            </div>
                            </Form.Item>
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
            </Spin>
            <Modal
                title="Walamrt Canada Create Label Validation"
                centered
                visible={visible}
                onOk={createFedexShipinglabel}

                onCancel={() => setVisible(false)}
                width={1000} >


                <div className="table-responsive">
                    <Table pagination={true} dataSource={dataSource} columns={columnsvalidation} />
                </div>



            </Modal>


        </>
    );
};

export default WalmartCanadaShip;

