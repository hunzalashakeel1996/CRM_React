import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { apiShipAll } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ShippingWeightView = (props) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    orderno: {},
  });
const {orderno}=state

  const onChange =(event)=>{

    setState({...state,orderno:event.target.value})

  }

  const ShipAll =()=>{

    dispatch(apiShipAll({order:orderno})).then(data=>{

    })
  }
  return (
    <>
      <Row style={{  }}>
        <Cards title="Update Order Notes" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 0, marginBottom:10, width:'100%', maxWidth:400,  }}>
                <TextArea onChange={onChange}/>
              </div>
            </Col>
            <Col xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                 <Button size="large"  type="primary" onClick={ShipAll}> Insert</Button>
              </div>
            </Col>
          </Row>
        </Cards>
      </Row>
      




    </>
  );
};

export default ShippingWeightView;
