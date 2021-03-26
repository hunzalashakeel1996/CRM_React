import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {getStyleVariationsNotInPu} from '../../../redux/apis/DataAction';
import {getExcludedStyleVariationsNotInPu} from '../../../redux/apis/DataAction';
import { downloadFile,DownlaodWithReact } from '../../../components/utilities/utilities'

 

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

const getStyleVariations = () =>
{
  setstate({ ...state, isLoader: true })
   dispatch(getStyleVariationsNotInPu({ vendorname:state.vendorname})).then(data => {
    setstate({ ...state, isLoader: false })
   console.log('My Data: ', data)
    downloadFile(data);
    notification.success({
      message: 'Successfull Dowload',
      description: `Successfully Download Variations of ${state.vendorname}`,
      onClose: close,
  });
    })
}
const getExcludedStyleVariations = () =>
{
  setstate({ ...state, isLoader: true })
   dispatch(getExcludedStyleVariationsNotInPu({ vendorname:state.vendorname})).then(data => {
    setstate({ ...state, isLoader: false })
    console.log('My Data: ', data)
    downloadFile(data);
    notification.success({
      message: 'Successfull Dowload',
      description: `Successfully Download Exclude Variations of ${state.vendorname}`,
      onClose: close,
  });
    })
}

const downloadFile =(data)=>
{
var d = new Date();
var n = d.getTime();
var a = document.createElement('a');
a.href = `http://localhost:47463/admin/${data}`;
a.target = '_blank';
a.download = `http://localhost:47463/admin/${data}`;
document.body.appendChild(a);
a.click();

}



  return (
    <>
    <Spin indicator={<img src="/img/icons/loader.gif" style={{width: 100, height: 100}}/>} spinning={state.isLoader} >
      <Row style={{  }}>
        <Cards title="Variations Not in PU" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col lg={8} xs={24}  >
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
            <Col lg={8} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button onClick={getStyleVariations} size="default" type="success" htmlType="Download">
                  Download
                        </Button>
                {/* </Cards> */}
              </div>
            </Col>
            <Col lg={8} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download (Excluded Styles)</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button onClick={getExcludedStyleVariations} size="default" type="danger" htmlType="Downlaod (Excluded Styles)">
                  Download (Excluded Styles)
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
