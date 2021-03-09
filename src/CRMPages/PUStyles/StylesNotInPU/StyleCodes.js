import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Select } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Modal, alertModal } from '../../../components/modals/antd-modals';

import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;


function onChange(value) {
  console.log(`selected ${value}`);
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

const StylesNotInPUView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},


  });
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
      <Row style={{ marginLeft: 20, marginRight: 20 }}>
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
                <Button size="default" type="success" htmlType="Download">
                  Download
                        </Button>
                {/* </Cards> */}
              </div>
            </Col>
            <Col lg={6} xs={24}>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download (Excluded Styles)</h3></div>
              <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                <Button size="default" type="danger" htmlType="Downlaod (Excluded Styles)">
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




    </>
  );
};

export default StylesNotInPUView;
