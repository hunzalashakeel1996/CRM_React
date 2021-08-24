import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Checkbox,Modal } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../components/utilities/utilities'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { insertNonAmazonSheetShiping,nonAmazonShipingValidation,nonAmazonCreateShiping,nonAmazongenerateFeed } from '../../../redux/apis/DataAction';
const { TabPane } = Tabs;
const { TextArea } = Input;

const EndiciaShipmentView = (props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        values: {},
        file: '',
        dataSource:[],
    });
    const {file,dataSource}=state
    let counter = 0;
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
   
    
const insertNonAmazonSheet =()=>{
    let username = [];
    username = JSON.parse(localStorage.getItem('user'))

    const formData = new FormData();

    formData.append('user', username.LoginName);
    formData.append('File', file);

    dispatch(insertNonAmazonSheetShiping(formData)).then(data => {

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
    const startNonAmazonShipping =()=>{

        dispatch(nonAmazonShipingValidation()).then(data => {
            let datasources =[]
            // console.log(data)
         //   message.success(`file uploaded Update ${data}`);
            // notification.success({
            //     message: `Successfull  ${data}`,
            //     description: `Successfully Report`,
            //     onClose: close,
            // });
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
        setVisible(true)
    };
    const createNonAmazonShipinglabel =()=>{
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
    
            // console.log('username',username.LoginName)
        dispatch(nonAmazonCreateShiping({user:username.LoginName})).then(data => {
    
         //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    const generateNonAmazonShipinglabel =()=>{
       
        dispatch(nonAmazongenerateFeed()).then(data => {

            downloadFile(data)
         //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
           
        })
    };
    return (
        <>
            <Row style={{  }}>
                <Cards title="Non Amazon Shiping Label" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        
                        <Col lg={8} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                        <Button type="primary" onClick={insertNonAmazonSheet}>Automate  Insert Asins</Button>
                        <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />  
                        <br></br>
                              
                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col lg={8} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 2</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            
                             <Button type="primary" onClick={startNonAmazonShipping}>  Start Non Amazon Shipping</Button>
                        
                                {/* </Cards> */}
                            </div>
                        </Col>
                        <Col lg={8} xs={24}>
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Step 3</h3></div>
                            <div className="atbd-drawer" style={{ marginRight: 20 }}>
                                {/* <Cards title="Total Count" caption="The simplest use of Drawer"> */}
                                <Button type="primary" onClick={generateNonAmazonShipinglabel}>Generate Feed</Button>
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
            </Row>
             */}
            <Modal
                title="Non Amazon Create Label Validation"
                centered
                visible={visible}
                onOk={createNonAmazonShipinglabel}

                onCancel={() => setVisible(false)}
                width={1000} >


                <div className="table-responsive">
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                </div>



            </Modal>


        </>
    );
};

export default EndiciaShipmentView;
