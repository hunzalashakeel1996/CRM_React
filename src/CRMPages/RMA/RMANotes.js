import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

const RMAView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    RMA:[]
  });
  const{RMA}=state

  const onChange = (event) => {
    // console.log(event.target.value)
    setState({ ...state, RMA: event.target.value });

};

const RMA_All = () => {

  dispatch(getRMA_All({ms:RMA})).then(data => {
      // console.log(data)
     
      setState({ ...state, dataSource: datasources })
  })

};
  return (
    <>
      <Row style={{}}>
        <Cards title="RMA Notes Insert" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 0 }}>
              <TextArea placeholder="input here" className="custom"  onChange={onChange} style={{ height: 50,  width: '100%', maxWidth:400, marginBottom:10, }} />
              </div>
            </Col>
            <Col xs={24}  >
            <Button type="success" >Update</Button>
              {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button type="success" htmlType="Submit">
                  Update
                        </Button>
              </div> */}
            </Col>
          </Row>
        </Cards>
      </Row>
    </>
  );
};

export default RMAView;
