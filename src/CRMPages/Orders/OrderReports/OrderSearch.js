import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getOrderSearch } from '../../../redux/apis/DataAction';
import { downloadFile,DownlaodWithReact } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const OrderReportsView = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setstate({ ...state, loader: true })
    }, []);

    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        VendorName: null,
        values: {},
        isLoader: false,
    });
    const onChange = (value, key) => {
        // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };

    const getOrderSearchReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getOrderSearch({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), vendorname: state.VendorName })).then(data => {
            setstate({ ...state, isLoader: false })
            console.log('My Data: ', data)
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download OrderReport of ${state.VendorName}  From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
           // let tempDataSource = [];
            // data[1] .map(value => {
            //     const { orderno, itemno,stylecode,stylename,vendorstylecode,colorcode,sizename,itemqty,backorderdate,ponumber,order_status,vendorname} = value;
            //     return tempDataSource.push({
            //         orderno: orderno,
            //         itemno: itemno,
            //         stylecode: stylecode,
            //         stylename: stylename,
            //         vendorstylecode: vendorstylecode,
            //         colorcode: colorcode,
            //         sizename: sizename,
            //         itemqty: itemqty,
            //         backorderdate: backorderdate,
            //         ponumber: ponumber,
            //         order_status: order_status,
            //         vendorname: vendorname,
            //     });
            // });
            // setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
        })

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
            title: 'VendorName',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'PONumber',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'MerchantSku',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'VendorStyleCode',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ColorName',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'SizeName',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Cost',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ItemQty',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'OrderType',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'IsMap',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'MapPrice',
            dataIndex: 'age',
            key: 'age',
        },

    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
            <Row style={{  }}>
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
                                    mode="multiple"
                                    allowClear
                                    onChange={(VendorName) => { onChange(VendorName, 'VendorName') }} 
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
                            <DatePicker onChange={(date) => { onChange(date, 'startDate') }} />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                            <DatePicker onChange={(date) => { onChange(date, 'endDate') }} />
                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button onClick={getOrderSearchReporting} size="default" type="success" htmlType="Submit">
                                    Download
                        </Button>

                            </div>
                        </Col>



                    </Row>



                </Cards>
            </Row>

            {/* INSTOCK SOLD REPORT */}

           
            {/* <Row style={{  }}>

                <Col xs={24}>
                    <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>

            </Row> */}

            </Spin>


        </>
    );
};

export default OrderReportsView;
