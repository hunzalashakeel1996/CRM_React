import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image,notification,Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getSalesReport } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
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

const OrderReportsView = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     setstate({ ...state, loader: true })
    // }, []);
    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
        isLoader:false
    });
    const {isLoader}=state

    const onChange = (date, dateString) => {
        // console.log('aaa', date, dateString)
        setstate({ ...state, [dateString]: date });
        console.log(dateString);
    };

    
  
  const getSalesReporting = () => {
    setstate({ ...state, isLoader: true });
    //    console.log('bbb', state.startDate.format('MM/DD/YYYY'))
    //  console.log('bbb', state.endDate.format('MM/DD/YYYY'))
    dispatch(getSalesReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), })).then(data => {
        setstate({ ...state, isLoader: false });
        downloadFile(data);
        notification.success({
            message: 'Successfull Dowload',
            description: `Successfully Download Sales Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
            onClose: close,
        });
    })

};
    
    
    return (
        <>
         <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
            <Row style={{  }}>
                <Cards title="Sales Report" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Sales Report" name="nest-messages" onFinish={getSalesReporting} validateMessages={validateMessages}>
                    <Row gutter={50}>
                        <Col lg={8} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}
                            <Form.Item name="startDate" rules={[{ required: true }]}>
                                <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }}/>
                                </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}
                            <Form.Item name="startDate" rules={[{ required: true }]}>
                                <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}  >
                        {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                        <Form.Item >
                                <Button size="default" type="success" htmlType="Submit">
                                Download
                        </Button>

                        </Form.Item>
                        </Col>

                    </Row>
                </Form>

                </Cards>
            </Row>
            

            </Spin>


        </>
    );
};

export default OrderReportsView;
