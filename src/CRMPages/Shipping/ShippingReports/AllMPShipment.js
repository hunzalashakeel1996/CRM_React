import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getAllMPShipments } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const ShippingReportsView = (props) => {


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
        POType: null,
        values: {},
        isLoader: false,
    });

    const onChange = (value, key) => {
        // // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };

    const getAllMPShipmentsReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getAllMPShipments()).then(data => {
            setstate({ ...state, isLoader: false })
            // console.log('My Data: ', data)
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download All Shipment`,
                onClose: close,
            });
        })

    };
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
                <Row style={{}}>
                    <Cards title="Get Report" caption="The simplest use of Drawer" >
                        <Row gutter={25}>
                            <Col lg={24} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                                <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                    <Button onClick={getAllMPShipmentsReporting} size="default" type="success" htmlType="download" style={{ marginLeft: 0 }}>
                                        Download
                        </Button>

                                </div>
                            </Col>



                        </Row>
                    </Cards>
                </Row>


            </Spin>

        </>
    );
};

export default ShippingReportsView;
