import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getDeliveyTrackingStatus } from '../../../redux/apis/DataAction';
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
        isLoader: false,
        values: {},
    });
    const onChange = (value, key) => {
        // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };
    const getDeliveyTrackingStatusReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getDeliveyTrackingStatus({ datefrom: state.startDate.format('MM/DD/YYYY'), dateto: state.endDate.format('MM/DD/YYYY') })).then(data => {
            setstate({ ...state, isLoader: false })
            console.log('My Data: ', data)
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download Delivery Tracking Status From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
        })

    };

   
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
            <Row style={{}}>
                <Cards title="Delivery Tracking Status Report" caption="The simplest use of Drawer" >
                <Row gutter={25}>

                            <Col span={8} >
                              
                                    <DatePicker placeholder="StartDate" onChange={(date) => { onChange(date, 'startDate') }} />
                              
                            </Col>
                            <Col span={8} >
                              
                                    <DatePicker placeholder="EndDate"  onChange={(date) => { onChange(date, 'endDate') }} />
                             
                            </Col>
                            
                            <Col span={8} >
                               
                                    <Button onClick={getDeliveyTrackingStatusReporting} size="default" type="success" htmlType="Submit">
                                        Download
                                  </Button>

                               
                            </Col>



                        </Row>
                </Cards>
            </Row>

        </Spin>


        </>
    );
};

export default ShippingReportsView;