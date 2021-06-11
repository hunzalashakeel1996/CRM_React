import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getInstockReport, getInstockSoldReport } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const OrderReportsView = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        setstate({ ...state, loader: false })
    }, []);
    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
        isLoader: false,
    });
    const {isLoader}=state
    const onChange = (value, key) => {
        // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };

    const getInstockReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getInstockReport({ datefrom: state.startDate.format('MM/DD/YYYY'), dateto: state.endDate.format('MM/DD/YYYY'), flag: state.POType })).then(data => {
            setstate({ ...state, isLoader: false })
            console.log('My Data: ', data)
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download InStock Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
        })

     };
    // const getInstockSoldReporting = () => {

    //     setstate({ ...state, isLoader: true })
    //     dispatch(getInstockSoldReport({ orderdate: state.orderdate.format('MM/DD/YYYY') })).then(data => {
    //         // setstate({ ...state, isLoader: false })
    //         console.log('My Data: ', data)
    //         //downloadFile(data);
    //         notification.success({
    //             message: 'Successfull Rendered',
    //             description: `Successfully Rendered InStock Sold Report From ${state.orderdate.format('MM/DD/YYYY')}`,
    //             onClose: close,
    //         });
    //         let tempDataSource = [];
    //         data[1].map(value => {
    //             const { vendorname, Total } = value;
    //             return tempDataSource.push({
    //                 vendorname: vendorname,
    //                 Total: Total,
    //             });
    //         });
    //         setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
    //     })

    // };


    const columns = [
        {
            title: 'VendorName',
            dataIndex: 'vendorname',
            key: 'vendorname',
        },
        {
            title: 'OrderCount',
            dataIndex: 'Total',
            key: 'Total',
        },
    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row style={{}}>
                    <Cards title="Instock Order Reports" caption="The simplest use of Drawer" >
                        <Row gutter={25}>
                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}
                                <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                    <DatePicker onChange={(date) => { onChange(date, 'startDate') }} />
                                </div>
                            </Col>
                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}
                                <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                    <DatePicker onChange={(date) => { onChange(date, 'endDate') }} />
                                </div>
                            </Col>
                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                                <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                    <Button onClick={getInstockReporting} size="default" type="success" htmlType="Submit">
                                        Download
                        </Button>

                                </div>
                            </Col>



                        </Row>



                    </Cards>
                </Row>

                {/* INSTOCK SOLD REPORT */}

                {/* INSTOCK SOLD REPORT */}
                {/* <Row style={{}}>
                    <Cards title="Instock Sold Report" caption="The simplest use of Drawer" >
                        <Row gutter={25}>
                            <Col lg={8} xs={24}  >
                              
                                <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                    <DatePicker onChange={(date) => { onChange(date, 'orderdate') }} />
                                </div>
                            </Col>
                            <Col lg={8} xs={24}  >
                               
                                <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                    <Button onClick={getInstockSoldReporting} size="default" type="success" htmlType="Submit">
                                        GetReport
                        </Button>
                                </div>
                            </Col>
                        </Row>
                    </Cards>
                </Row>
                <Row style={{}}>

                    <Col xs={24}>
                    <Table pagination={true} dataSource={state.dataSource} columns={columns} />
                    </Col>

                </Row> */}

            </Spin>


        </>
    );
};

export default OrderReportsView;
