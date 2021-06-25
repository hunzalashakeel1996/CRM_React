import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs,Form, Table, Upload, Row, Col, DatePicker, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getDeliveyTrackingStatus } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'
// import Form from 'antd/lib/form/Form';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const ShippingReportsView = (props) => {
    const validateMessages = {
        required: '${name} is required!',
        types: {
          email: '${name} is not validate email!',
          number: '${name} is not a validate number!',
        },
        number: {
          range: '${name} must be between ${min} and ${max}',
        },
      };
      const [form] = Form.useForm();
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
         
                <Cards title="Delivery Tracking Status Report" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="PO Numbers" name="nest-messages"  onFinish={getDeliveyTrackingStatusReporting} validateMessages={validateMessages}>
                 <Row gutter={50}>

                            <Col span={8} >
                            <Form.Item name="StartDate" rules={[{ required: true }]}>
                                    <DatePicker placeholder="StartDate" style={{padding:10}} onChange={(date) => { onChange(date, 'startDate') }} />
                                    </Form.Item>
                            </Col>
                            <Col span={8} >
                            <Form.Item name="EndDate" rules={[{ required: true }]}>
                                    <DatePicker placeholder="EndDate" style={{padding:10}}  onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                            </Col>
                            
                            <Col span={8} >
                               <Form.Item>
                                    <Button  size="default" type="success"  htmlType="Submit">
                                        Download
                                  </Button>
                                  </Form.Item>
                               
                            </Col>



                        </Row>
              </Form>
                </Cards>
         
        </Spin>


        </>
    );
};

export default ShippingReportsView;
