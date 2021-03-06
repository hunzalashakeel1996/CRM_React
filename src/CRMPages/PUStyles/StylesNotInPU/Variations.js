import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getStyleVariationsNotInPu } from '../../../redux/apis/DataAction';
import { getExcludedStyleVariationsNotInPu } from '../../../redux/apis/DataAction';
import { downloadFile, DownlaodWithReact } from '../../../components/utilities/utilities'



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
    isLoader: false,
  });



  function onChange(value) {
    // console.log(`selected ${value}`);
    setstate({ ...state, vendorname: value })
  }

  function onBlur() {
    // console.log('blur');
  }

  function onFocus() {
    // console.log('focus');
  }

  function onSearch(val) {
    // console.log('search:', val);
  }

  const getStyleVariations = () => {
    setstate({ ...state, isLoader: true })
    dispatch(getStyleVariationsNotInPu({ vendorname: state.vendorname })).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      downloadFile(data);
      notification.success({
        message: 'Successfull Dowload',
        description: `Successfully Download Variations of ${state.vendorname}`,
        onClose: close,
      });
    })
  }
  const getExcludedStyleVariations = () => {
    setstate({ ...state, isLoader: true })
    dispatch(getExcludedStyleVariationsNotInPu({ vendorname: state.vendorname })).then(data => {
      setstate({ ...state, isLoader: false })
      // console.log('My Data: ', data)
      downloadFile(data);
      notification.success({
        message: 'Successfull Dowload',
        description: `Successfully Download Exclude Variations of ${state.vendorname}`,
        onClose: close,
      });
    })
  }





  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
        <Row style={{}}>
          <Cards title="Variations Not in PU" caption="The simplest use of Drawer" >
            <Row gutter={25}>

              <Col xs={24} style={{marginBottom:15}}  >
                <Select placeholder="Vendorname" showSearch allowClear onChange={onChange} style={{ width: '100%', maxWidth:400,}}  >
                  {vendornameState.map((val, i) => (
                    <Option value={val} key={val}>{val}</Option>

                  ))}

                </Select>

              </Col>

              <Col xs={24} >

                 <Button size="large"   style={{marginRight:10, marginBottom:5, backgroundColor: 'rgb(66, 186, 150)', color: 'white'}}   type="success" onClick={getStyleVariations} >Download</Button>

                 <Button size="large"   style={{marginRight:10, marginBottom:5, }}   type="success" onClick={getExcludedStyleVariations} >Downlaod (Excluded Styles)</Button>


              </Col>


            </Row>
          </Cards>
        </Row>
      </Spin>



    </>
  );
};

export default StylesNotInPUView;
