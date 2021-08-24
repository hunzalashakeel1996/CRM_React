import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Checkbox,notification,Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { downloadFile } from '../../../components/utilities/utilities'
import { insertAmazonAsinShiping,insertAmazonSheetShiping,amazonShipingValidation,amazonCreateShiping,AmazongenerateFeed,amazonStepStatus } from '../../../redux/apis/DataAction';
const { TabPane } = Tabs;
const { TextArea } = Input;

const EndiciaShipmentView = (props) => {
    
    const [visiblel, setVisibleLabel] = useState(false);
    const [visiblef, setVisibleFeed] = useState(false);
    const dispatch = useDispatch()

    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        values: {},
        dataTo: '',
        file: '',
        dataSource:[],
        asinSheet:'',
        createLabels:'',
        feed:'',
        ordersSheet:'' 
    });
   // var dataSource = [];
    let counter = 0;
    const {dataTo,file,dataSource,asinSheet,createLabels,feed,ordersSheet}=state
    useEffect(()=>{
        dispatch(amazonStepStatus()).then(data => {
                // console.log(data)
                setState({...state,asinSheet:data[0].asin_sheet,createLabels:data[0].create_labels,feed:data[0].feed,ordersSheet:data[0].orders_sheet})
           })
    },[])
    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Mike',
    //         age: 32,
    //         address: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         name: 'John',
    //         age: 42,
    //         address: '10 Downing Street',
    //     },
    // ];
    const columns = [
        {
            title: 'Order NO',
            dataIndex: 'orderno',
            key: 'orderno',
        },
        {
            title: 'Itemno',
            dataIndex: 'itemno',
            key: 'itemno',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }
       
    ];
   
   

        const insertAmazonAsinSheet =()=>{
            let username = [];
            username = JSON.parse(localStorage.getItem('user'))
        
            const formData = new FormData();
        
            formData.append('user', username.LoginName);
            formData.append('File', file);
    dispatch(insertAmazonAsinShiping(formData)).then(data => {

     //   message.success(`file uploaded Update ${data}`);
        notification.success({
            message: `Successfull  ${data}`,
            description: `Successfully Report`,
            onClose: close,
        });
        location.reload();
    })
};
const insertAmazonShipingSheet =()=>{
    let username = [];
    username = JSON.parse(localStorage.getItem('user'))

    const formData = new FormData();

    formData.append('user', username.LoginName);
    formData.append('File', file);

    dispatch(insertAmazonSheetShiping(formData)).then(data => {

     //   message.success(`file uploaded Update ${data}`);
        notification.success({
            message: `Successfull  ${data}`,
            description: `Successfully Report`,
            onClose: close,
        });
        location.reload();
    })
};
    const changeHandler = (event) => {

        setState({ ...state, file: event.target.files[0] })
      
    };
    const startAmazonShipping =()=>{

        dispatch(amazonShipingValidation()).then(data => {
            let datasources =[]
        
            if (data.length)
            data.map(value => {
          
            const { orderno, itemno, item_weight, itemqty, weight, height, lenght, Width,weight_unit,asins } = value;
               
             datasources.push({
                key: counter++,

                orderno: <span style={{ color: 'black' }} className="date-started">{orderno}</span>,
                itemno: <span style={{ color: 'black' }} className="date-started">{itemno}</span>,
                description: <span style={{ color: 'black' }} className="date-started">
                    {asins==""||null?"Asin Not Exists ":""}
                    {item_weight==""||null?"Label Weight Error ":""}
                    {weight==""||null?"Dimension weight Error ":""}
                    {height==""||null?"Dimension height Error ":""}
                    {lenght==""||null?"Dimension lenght Error ":""}
                    {Width==""||null?"Dimension Width Error ":""}
                    {weight_unit==""||null?"Label Weight unit Error ":""}
                
                </span>
                


            });
        });
    
        setState({ ...state, dataSource: datasources })
        })
        setVisibleLabel(true)
    };
    const createAmazonShipinglabel =()=>{
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
    
            // console.log('username',username.LoginName)
        dispatch(amazonCreateShiping({user:username.LoginName})).then(data => {
    
      
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    const generateAmazonShipinglabel =()=>{
         dispatch(AmazongenerateFeed()).then(data => {
               downloadFile(data)
        
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
           
        })
    };
    const ModalOpen = () => {

        setVisibleFeed(true)
    }
    return (
        <>
            <Row style={{  }}>
                <Cards title="Amazon Shiping Label" caption="The simplest use of Drawer" style={{paddingTop:0}}>
                    <Row gutter={25}>
                        <Col sm={12} md={10} lg={6} xl={5} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" style={{ marginLeft: 5}}><h3>Step 1</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 5 }}>

                       
                        <Button type="primary" onClick={insertAmazonAsinSheet} disabled={asinSheet}>Automate  Insert Asins</Button>
                        {/* <Checkbox style={{marginLeft:5}} value="Amazon"></Checkbox> */}
                        <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />  

                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={10} lg={7} xl={6} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" ><h3>Step 2</h3></div>
                            <Button type="primary" onClick={insertAmazonShipingSheet} disabled={ordersSheet}>Insert Amazon Shiping Sheet</Button>
                            <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />  
                        </Col>
                        <Col xs={24} sm={12} md={10} lg={6} xl={6} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" ><h3>Step 3</h3></div>
                            <div className="atbd-drawer" >
                            <Button type="primary" onClick={startAmazonShipping} disabled={createLabels}>Insert Amazon Shiping Sheet</Button>
                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={10} lg={5} xl={5} xxl={5} style={{marginBottom:25}}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Step 4</h3></div>
                            <div className="atbd-drawer" >
                                {/* <Cards title="Total Count" caption="The simplest use of Drawer"> */}
                                <Button type="primary" onClick={ModalOpen} >Generate Feed</Button>

                          
                                {/* </Cards> */}
                            </div>
                        </Col>
                    </Row>
                </Cards>
            </Row>
            {/* Check Labels Here Div  */}
            {/* <Row style={{  }}>
                <Cards title="Check Labels Here" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <TextArea />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button type="success" htmlType="submit">
                                    Search
                        </Button>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                                    Refresh
                        </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col xs={24}>
                            <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                        </Col>

                    </Row>
                </Cards>
            </Row> */}

            <Modal
                title="Amazon Create Label Validation"
                centered
                visible={visiblel}
                onOk={ createAmazonShipinglabel}

                onCancel={() => setVisibleLabel(false)}
                width={1000} >


                <div className="table-responsive">
                    <Table pagination={true} dataSource={dataSource} columns={columns} />
                </div>



            </Modal>
            
            <Modal 
            
                centered
                visible={visiblef}
                onOk={ generateAmazonShipinglabel}

                onCancel={() => setVisibleFeed(false)}
                 >
                     <div>
                    <Cards headless>
                        <h1>Are You Sure?</h1>
                    </Cards>
                </div>

               



            </Modal>


        </>
    );
};

export default EndiciaShipmentView;
