import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { manualShipmentPonumber,manualShipmentPonumberManualTick,manualShipmentAmazonManualShipping,manualShipmentAmazonManualShippingAmazonFileSheet,manualShipmentAmazonManualShippingAmazonFileDownload } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'
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
const ManualShipmentView = (props) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    poNumber:[],
    file:''
  });
  const {poNumber,file}=state;


  const onChange = (event) => {
    console.log(event.target.value)
    setState({ ...state, poNumber: event.target.value });

};
  const manualShipmentPonumberSubmit = () => {
    
    dispatch(manualShipmentPonumber({ Ponumber: poNumber })).then(data => {
    
      downloadFile(data)
    })
};
const manualShipmentPonumberManualTick = () => {
    
  dispatch(manualShipmentPonumber({ Ponumber: poNumber })).then(data => {
  
    downloadFile(data)
  })
};
const AmazonManualShippingAmazonFileSheet =()=>{
  dispatch(manualShipmentAmazonManualShippingAmazonFileSheet()).then(data => {
       // downloadFile(data)
 
     notification.success({
         message: `Successfull Done`,
         description: `Successfully Report`,
         onClose: close,
     });
    
 })
};
const AmazonManualShipping = () => {
  let username = [];
  username = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData();

  formData.append('user', username.LoginName);
  formData.append('File', file);
    
  dispatch(manualShipmentAmazonManualShipping(formData)).then(data => {
    notification.success({
      message: `Successfull  ${data}`,
      description: `Successfully Report`,
      onClose: close,
  });
  location.reload();
   // downloadFile(data)
  })
};
const changeHandler = (event) => {

  setState({ ...state, file: event.target.files[0] })

};
const AmazonManualShippingAmazonFileDownload = () => {
    
  dispatch(manualShipmentAmazonManualShippingAmazonFileDownload()).then(data => {
  
    downloadFile(data)
  })
};
  return (
    <>
      <Row style={{}}>
        <Cards title="PO Numbers" caption="The simplest use of Drawer" >
        <Form layout="inline" initialValue="" label="" form={form} id="PO Numbers" name="nest-messages" onFinish={manualShipmentPonumberSubmit} validateMessages={validateMessages}>
          <Row gutter={25}>
            <Col lg={6} xs={24}  >
            <Form.Item name="PO Numbers" rules={[{ required: true }]}>
              <TextArea placeholder="input here" className="custom" value={poNumber} onChange={onChange} style={{ height: 50 }} />
              </Form.Item>
            </Col>
            <Col lg={4} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
              <Button type="primary" onClick={manualShipmentPonumberSubmit}>Submit</Button>
             
                
              </div>
            </Col>
            <Col lg={4} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
           
              <Button type="success" style={{backgroundColor: '#42ba96',  color:'white'}} onClick={manualShipmentPonumberManualTick}> Manual Tick</Button>
                
              </div>
            </Col>
          </Row>
          </Form>
        </Cards>
      </Row>
      <Row style={{  }}>
        <Cards title="Amazon Manual Shipping" caption="The simplest use of Drawer" >
        <Row gutter={25}>
        <Col lg={6}   >
              

              <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />

           
              </Col>

        </Row>
          <Row style={{ marginTop: 20 }} gutter={25}>
           
              <Col lg={7}   >
              <Button type="success" style={{backgroundColor: '#42ba96',  color:'white'}} onClick={AmazonManualShipping}> Amazon Manual Ship</Button>
              </Col>
              <Col lg={7}  >
              <Button type="success" style={{backgroundColor: '#42ba96',  color:'white'}} onClick={AmazonManualShippingAmazonFileSheet}>Amazon Manual Ship Sheet</Button>
              </Col>
              <Col lg={7}   >
              <Button type="success"  onClick={AmazonManualShippingAmazonFileDownload}>Amazon Manual Ship Donwload</Button> 
              </Col>
           
                        
             

          
            
          </Row>
        </Cards>
      </Row>




    </>
  );
};

export default ManualShipmentView;
