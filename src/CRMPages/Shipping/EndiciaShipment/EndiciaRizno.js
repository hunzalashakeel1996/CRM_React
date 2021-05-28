import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, notification, Modal } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../components/utilities/utilities'
import { insertRiznoEndiciaShipingSheet, endiciaRiznoShipingValidation,riznoEndiciaShipingCreateShiping,multipleCreateLabelRizno,endiciaRiznoShipingcheckcount,endiciaVerifyLabel } from '../../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const EndiciaShipmentView = (props) => {
    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        values: {},
        file: '',
        dataSource: [],
        checkCount:'',
        orderno: [],
    });
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const { file,dataSource,checkCount,orderno } = state
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
        console.log(event.target.value)
        setState({ ...state, orderno: event.target.value });

    };
    const changeHandler = (event) => {

        setState({ ...state, file: event.target.files[0] })

    };

    const insertRiznoEndiciaSheet = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        dispatch(insertRiznoEndiciaShipingSheet(formData)).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    const startEndiciaRiznoShipping = () => {

        dispatch(endiciaRiznoShipingValidation()).then(data => {
            console.log(data)
            let datasources = []

            if (data.length)
                data.map(value => {

                    const { orderno, MailClass, Label_Weight_float } = value;

                    datasources.push({
                        key: counter++,

                        orderno: <span style={{ color: 'black' }} className="date-started">{orderno}</span>,
                      
                        description: <span style={{ color: 'black' }} className="date-started">
                            {MailClass == "" || null ? "Mailclass Not Valid " : ""}
                            {Label_Weight_float == "" || null ? "Label Weight . Error" : ""}
                        </span>
                          });
                });

            setState({ ...state, dataSource: datasources })
        })
        setVisible(true)
    };
    const createRiznoEndiciaShipinglabel = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

   
        dispatch(riznoEndiciaShipingCreateShiping({ user: username.LoginName })).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    const checkEndiciaRiznoLabel =()=>{
        dispatch(multipleCreateLabelRizno()).then(data => {
              downloadFile(data)
       
           notification.success({
               message: `Successfull  ${data}`,
               description: `Successfully Report`,
               onClose: close,
           });
          
       })
   };
   const checkEndiciaRiznoLabelCount =()=>{
    dispatch(endiciaRiznoShipingcheckcount()).then(data => {
        console.log(data)
         setState({...state,checkCount:data[0].today_count})
   
      
      
   })
};
const refreshPage =()=>{
    location.reload();
}
const verifyLabel = () => {

    dispatch(endiciaVerifyLabel({ms:orderno})).then(data => {
        console.log(data)
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
            <Row style={{}}>
                <Cards title="Endica Rizno Shiping Label" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>

                                <Button type="success"  style={{backgroundColor: '#42ba96',  color:'white'}} onClick={insertRiznoEndiciaSheet}> Insert Shipping</Button>

                                <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />

                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 2</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button type="success"  style={{backgroundColor: '#42ba96',  color:'white'}} onClick={startEndiciaRiznoShipping}> Start Endicia Shipping</Button>

                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 3</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <Button type="success"  style={{backgroundColor: '#42ba96',  color:'white'}} onClick={checkEndiciaRiznoLabel}>Check Endicia Label</Button>
                           
                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col lg={6} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Total Count</h3></div>
                            <div className="atbd-drawer" style={{ marginRight: 20 }}>
                            <Button type="primary" onClick={checkEndiciaRiznoLabelCount}> Today Count</Button>:{checkCount}
                            
                                {/* </Cards> */}
                            </div>
                        </Col>
                    </Row>
                </Cards>
            </Row>
            {/* Check Labels Here Div  */}
            <Row style={{}}>
                <Cards title="Check Labels Here" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <TextArea placeholder="input here" className="custom" value={orderno} onChange={onChange} style={{ height: 50 }} />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <Button type="success" style={{backgroundColor: '#42ba96',  color:'white'}} onClick={verifyLabel}> Search</Button>
                   
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                           
                             
                            <Button type="primary" onClick={refreshPage}> Refresh</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col xs={24}>
                            <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                        </Col>

                    </Row>
                </Cards>
            </Row>
            <Modal
                title="Endicia Rizno Create Label Validation"
                centered
                visible={visible}
                onOk={createRiznoEndiciaShipinglabel}

                onCancel={() => setVisible(false)}
                width={1000} >


                <div className="table-responsive">
                    <Table pagination={true} dataSource={dataSource} columns={columnsvalidation} />
                </div>



            </Modal>
           

        </>
    );
};

export default EndiciaShipmentView;