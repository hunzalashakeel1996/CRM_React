import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Modal, alertModal } from '../../../components/modals/antd-modals';
import { getStylesNotInPu } from '../../../redux/apis/DataAction';
import { getExcludedStylesNotInPu } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'


import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;



const StylesNotInPUView = (props) => {
  //  get vendors from redux 
  let vendornameState = useSelector(state => state.tickets.vendornames);
  const dispatch = useDispatch();
  useEffect(() => {
    setstate({ ...state, loader: true })
  }, []);
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    vendorname: "",
    isLoader: false,
  });

  const { vendorname } = state

  function onChange(value) {
    console.log(`selected ${value}`);
    setstate({ ...state, vendorname: value })
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  const getStyleCodes = () => {
    setstate({ ...state, isLoader: true })
    dispatch(getStylesNotInPu({ vendorname: vendorname })).then(data => {
      setstate({ ...state, isLoader: false })
      console.log('My Data: ', data)
      downloadFile(data);
      notification.success({
        message: 'Successfull Dowload',
        description: `Successfully Download StyleCodes of ${vendorname}`,
        onClose: close,
      });
    })
  }
  const getExcludedStyleCodes = () => {
    setstate({ ...state, isLoader: true })
    dispatch(getExcludedStylesNotInPu({ vendorname: vendorname })).then(data => {
      setstate({ ...state, isLoader: false })

      console.log('My Data: ', data)
      downloadFile(data);
      notification.success({
        message: 'Successfull Dowload',
        description: `Successfully Download Excluded StyleCodes of ${vendorname}`,
        onClose: close,
      });
    })
  }




  const info = () => {
    alertModal.info({
      title: 'This report is based on the following logics on Backend',
      content: (
        <div>

          <p>- For vendors WW, Maevn and Barco, We removed A,X,Y from Stylecode before matching</p>
          <p>- Matching is based on Style,Color,Size and UPC</p>
          <p>- IF qty is less than 20 for any variation we exclude that variation</p>
          <p>- Provided VendorStatus excluded.</p>
          <p>- Proivded Brands exluced</p>

        </div>
      ),
      onOk() { },
    });
  };


  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
        <Row style={{}}>
          <Cards title="Style Codes Not in PU " caption="The simplest use of Drawer" >

            <Row gutter={25}>
              <Col span={8}  >


                <Select placeholder="Vendorname" allowClear onChange={onChange} style={{ width: 300 }}  >
                  {vendornameState.map((val, i) => (
                    <Option value={val} key={val}>{val}</Option>

                  ))}

                </Select>


              </Col>
              <Col span={3} >

                <Button size="default" type="success" onClick={getStyleCodes} >Download</Button>

              </Col>
              <Col span={6}>


                <Button size="default" type="danger" onClick={getExcludedStyleCodes} >Downlaod (Excluded Styles)</Button>


              </Col>
              <Col span={5}>
                <Button size="default" type="info" onClick={info} >For More Info</Button>



              </Col>

            </Row>
          </Cards>
        </Row>
      </Spin>



    </>
  );
};

export default StylesNotInPUView;
