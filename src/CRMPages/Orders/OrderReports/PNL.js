import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, notification ,Spin} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getPNLReport } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const antIcon = <img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />;

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
    const dispatch = useDispatch();
    const [form] = Form.useForm();

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

    const {isLoader}= state

    const btn = (
         <Button size="large"  type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
        </Button>
    );
    const multipleChange = childData => {
        setstate({ ...state, checkData: childData });
    };


    const onChange = (date, dateString) => {
        // // console.log('aaa', date, dateString)
        setstate({ ...state, [dateString]: date });
        // console.log(dateString);
    };
    const getPNLReporting = () => {
        setstate({ ...state, isLoader: true });
        //    // console.log('bbb', state.startDate.format('MM/DD/YYYY'))
        //  // console.log('bbb', state.endDate.format('MM/DD/YYYY'))
        dispatch(getPNLReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), })).then(data => {
            setstate({ ...state, isLoader: false });
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download PNL Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
        })

    };

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'Order NO',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Full Name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'STREET ADDRESS 1',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'STREET ADDRESS 2',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'City',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'State',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Country',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <>
          <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
            <Row >
                <Cards title="Profit & Loss Report (PNL)" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Profit & Loss Report (PNL)" name="nest-messages" onFinish={getPNLReporting} validateMessages={validateMessages}>
                    <Row gutter={30}>
                        <Col lg={9} md={9} xs={24}  >
                        <Form.Item name="startDate" rules={[{ required: true }]}>
                                <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }} />
                                </Form.Item>
                        </Col>
                        <Col lg={9} md={9} xs={24}  >
                        <Form.Item name="endDate" rules={[{ required: true }]}>
                                <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                </Form.Item>
                        </Col>
                        <Col lg={5} md={6} xs={24}  >
                        <Form.Item >
                                 <Button size="large"     type="success" htmlType="Submit">
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
