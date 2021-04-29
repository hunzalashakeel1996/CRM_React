import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col,notification} from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile } from '../../../components/utilities/utilities'
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getDupicateTracking} from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ShippingWeightView = (props) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    value:[]
  });
  const {value}=state
  const checkDuplicateTracking =(val,status)=>{
      
    dispatch(getDupicateTracking({ms:value,st:status})).then(data => {
          downloadFile(data)
   
       notification.success({
           message: `Successfull  ${data}`,
           description: `Successfully Report`,
           onClose: close,
       });
      
   })
};
const onChange = (event) => {
  console.log(event.target.value)
  setState({ ...state, value: event.target.value });

};
  return (
    <>
      <Row style={{  }}>
        <Cards title="Duplicate Trackings" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
              <TextArea placeholder="input here" className="custom" value={value} onChange={onChange} style={{ height: 50 }} />
              </div>
            </Col>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
              <Button type="success" onClick={(val)=>{checkDuplicateTracking(val,'POnumber')} }>Po number</Button>
              </div>
            </Col>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
              <Button type="success" onClick={ (val)=>{checkDuplicateTracking(val,'orderno')}  }>Orderno</Button>
             </div>
            </Col>
          </Row>
        </Cards>
      </Row>
      




    </>
  );
};

export default ShippingWeightView;
