import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col,notification,Spin } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile } from '../../../components/utilities/utilities'
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetWeightforAmazonLabelUpoadFile,GetWeightforAmazonLabelDownload} from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ShippingWeightView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    file:'',
    isLoader:false

  });
  const {file,isLoader}=state
  const dispatch = useDispatch()
  const changeHandler = (event) => {

    setState({ ...state, file: event.target.files[0] })

};

const insertWeightCalculationSheet = () => {
  let username = [];
  username = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData();

  formData.append('user', username.LoginName);
  formData.append('File', file);
  setState({ ...state, isLoader: true })
  dispatch(GetWeightforAmazonLabelUpoadFile(formData)).then(data => {
    setState({ ...state, isLoader: false })
      //   message.success(`file uploaded Update ${data}`);
      notification.success({
          message: `Successfull Upload Done`,
          description: `Successfully Report`,
          onClose: close,
      });
     
  })
};
const WeightCalculationDown =()=>{
  setState({ ...state, isLoader: true })
  dispatch(GetWeightforAmazonLabelDownload()).then(data => {
    setState({ ...state, isLoader: false })
        downloadFile(data)
 
     notification.success({
         message: `Successfull  ${data}`,
         description: `Successfully Report`,
         onClose: close,
     });
    
 })
};
  return (
    <>
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
      <Row style={{}}>
        <Cards title="Weight Calculation" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                 <Button size="large"  type="success" onClick={insertWeightCalculationSheet}> Shipping Weight</Button>

                <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />


              </div>
            </Col>
            <Col lg={6} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 2</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                 <Button size="large"  type="success" onClick={WeightCalculationDown}> Download Shippping Tracking</Button>
              
                {/* </Cards> */}
              </div>
            </Col>

          </Row>
        </Cards>
      </Row>

      </Spin>



    </>
  );
};

export default ShippingWeightView;
