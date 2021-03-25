import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Select, Spin,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Modal, alertModal } from '../../../components/modals/antd-modals';
import {getStylesNotInPu} from '../../../redux/apis/DataAction';
import {getExcludedStylesNotInPu} from '../../../redux/apis/DataAction';
import { downloadFile,DownlaodWithReact } from '../../../components/utilities/utilities'

 
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;



const StylesNotInPUView = (props) => {
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

 const getStyleCodes = () =>
{
  setstate({ ...state, isLoader: true })
   dispatch(getStylesNotInPu({ vendorname:state.vendorname})).then(data => {
    setstate({ ...state, isLoader: false })
   console.log('My Data: ', data)
    downloadFile(data);
    notification.success({
      message: 'Successfull Dowload',
      description: `Successfully Download StyleCodes of ${state.vendorname}`,
      onClose: close,
  });
    })
}
const getExcludedStyleCodes = () =>
{
  setstate({ ...state, isLoader: true })
   dispatch(getExcludedStylesNotInPu({ vendorname:state.vendorname})).then(data => {
    setstate({ ...state, isLoader: false })

    console.log('My Data: ', data)
    downloadFile(data);
    notification.success({
      message: 'Successfull Dowload',
      description: `Successfully Download Excluded StyleCodes of ${state.vendorname}`,
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
    <Spin indicator={<img src="/img/icons/loader.gif" style={{width: 100, height: 100}}/>} spinning={state.isLoader} >
      <Row style={{  }}>
        <Cards title="Style Codes Not in PU " caption="The simplest use of Drawer" >

          <Row gutter={25}>
            <Col lg={6} xs={24}  >
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>VendorName</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Select
                  showSearch
                  style={{ width: 300 }}
                  placeholder="Select a Vendor"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <option value="Wonder Wink Scrubs">Wonder Wink Scrubs</option>
                  <option value="Maevn">Maevn</option>
                  <option value="Barco Uniforms">Barco Uniforms</option>
                  <option value="Cherokee">Cherokee</option>
                  <option value="Landau">Landau</option>
                  <option value="Adar">Adar</option>
                  <option value="Healing Hands">Healing Hands</option>
                  <option value="Natural Uniforms">Natural Uniforms</option>
                  <option value="Meta">Meta</option>
                  <option value="Whitecross">Whitecross</option>
                </Select>

              </div>
            </Col>
            <Col lg={6} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button onClick={getStyleCodes} size="default" type="success" htmlType="Download">
                  Download
                        </Button>
                {/* </Cards> */}
              </div>
            </Col>
            <Col lg={6} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download (Excluded Styles)</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button onClick={getExcludedStyleCodes}  size="default" type="danger" htmlType="Downlaod (Excluded Styles)">
                  Download (Excluded Styles)
                        </Button>
                {/* </Cards> */}
              </div>
            </Col>
            <Col lg={6} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>For More Info</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button onClick={info} type="info" style={{ margin: '5px' }}>
                  Info
                </Button>
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

export default StylesNotInPUView;
