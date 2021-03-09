import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
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

const OrderReportsView = (props) => {


    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
    });
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };


    const onChange = (date, dateString) => {
        setstate({ ...state, date, dateString });

    };

    const dataSource = [
        {
            key: '1',
            name: 'Sanmar',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'Cherokee',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'OrderNo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ItemNo',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'VendorName',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'StyleCode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'StyleName',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'VendorStyleCode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ColorCode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ItemQty',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'BackOrderDate',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'PONumber',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'OrderStatus',
            dataIndex: 'age',
            key: 'age',
        },

    ];
    return (
        <>
            <Row style={{ marginLeft: 20, marginRight: 20 }}>
                <Cards title="Order Search" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Select a Vendor</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Select
                                    showSearch
                                    style={{ width: 300 }}
                                    size="large"
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
                                   
                                    <option value="Adar">Adar</option>
                                    <option value="Ahead Corporate">Ahead Corporate</option>
                                    <option value="AllStar Chef">AllStar Chef</option>
                                    <option value="Alpha Broder">Alpha Broder</option>
                                    <option value="ATN Compression Socks">ATN Compression Socks</option>
                                    <option value="Augusta Sportswear">Augusta Sportswear</option>
                                    <option value="Barco Uniforms">Barco Uniforms</option>
                                    <option value="Bodek and Rhodes">Bodek and Rhodes</option>
                                    <option value="California Uniform">California Uniform</option>
                                    <option value="Carolina Made">Carolina Made</option>
                                    <option value="Charles River Apparel">Charles River Apparel</option>
                                    <option value="Cherokee">Cherokee</option>
                                    <option value="Cherokee School">Cherokee School</option>
                                    <option value="Cutter&amp;Buck">Cutter&amp;Buck</option>
                                    <option value="Delta Apparel">Delta Apparel</option>
                                    <option value="Dickies">Dickies</option>
                                    <option value="Edwards">Edwards</option>
                                    <option value="Fame Fabrics">Fame Fabrics</option>
                                    <option value="Forum Novelties">Forum Novelties</option>
                                    <option value="Hanes">Hanes</option>
                                    <option value="Healing Hands">Healing Hands</option>
                                    <option value="Heritage sportswear">Heritage sportswear</option>
                                    <option value="IguanaMed">IguanaMed</option>
                                    <option value="kavio">kavio</option>
                                    <option value="Key Apparel">Key Apparel</option>
                                    <option value="KOI">KOI</option>
                                    <option value="Landau">Landau</option>
                                    <option value="Life Threads">Life Threads</option>
                                    <option value="Maevn">Maevn</option>
                                    <option value="Med Couture">Med Couture</option>
                                    <option value="Meta">Meta</option>
                                    <option value="Natural Uniforms">Natural Uniforms</option>
                                    <option value="Novatech">Novatech</option>
                                    <option value="OttoCap">OttoCap</option>
                                    <option value="PortWest">PortWest</option>
                                    <option value="Prestige">Prestige</option>
                                    <option value="Pulse Uniform">Pulse Uniform</option>
                                    <option value="Renfro">Renfro</option>
                                    <option value="RoutetoCute">RoutetoCute</option>
                                    <option value="RoyalApperal">RoyalApperal</option>
                                    <option value="S&amp;S Activewear">S&amp;S Activewear</option>
                                    <option value="Sanmar">Sanmar</option>
                                    <option value="Soffe">Soffe</option>
                                    <option value="Spectrum Uniforms">Spectrum Uniforms</option>
                                    <option value="Think Medical">Think Medical</option>
                                    <option value="TiedyaUSA">TiedyaUSA</option>
                                    <option value="Tri mountain">Tri mountain</option>
                                    <option value="Tscapparel">Tscapparel</option>
                                    <option value="TSF Sportswear">TSF Sportswear</option>
                                    <option value="Uncommon Threads">Uncommon Threads</option>
                                    <option value="VF Imagewear">VF Imagewear</option>
                                    <option value="Whispering Pines Sportswear">Whispering Pines Sportswear</option>
                                    <option value="Whitecross">Whitecross</option>
                                    <option value="Wonder Wink Scrubs">Wonder Wink Scrubs</option>
                                </Select>
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={onChange} />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={onChange} />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button size="default" type="success" htmlType="Submit">
                                    Download
                        </Button>

                            </div>
                        </Col>



                    </Row>



                </Cards>
            </Row>

            {/* INSTOCK SOLD REPORT */}

           
            <Row style={{ marginLeft: 20, marginRight: 20 }}>

                <Col xs={24}>
                    <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>

            </Row>




        </>
    );
};

export default OrderReportsView;
