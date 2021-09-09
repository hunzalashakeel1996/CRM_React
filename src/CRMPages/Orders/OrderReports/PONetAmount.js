import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs,Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getPONetAmount } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'


const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
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
const {isLoader}=state
    const getPONetAmountReporting = () => {

        setstate({ ...state, isLoader: true })
        dispatch(getPONetAmount({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), flag: state.POType })).then(data => {
            setstate({ ...state, isLoader: false })
            // console.log('My Data: ', data)
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download PONetAmount With ${state.POType} Breakup From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
                onClose: close,
            });
        })

    };


    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row style={{}}>
                    <Cards title="PO's Net Amount" caption="The simplest use of Drawer" >
                    <Form  initialValue="" label="" form={form} id="Profit & Loss Report (PNL)" name="nest-messages" onFinish={getPONetAmountReporting} validateMessages={validateMessages}>
                        <Row gutter={25}>
                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div> */}
                                <Form.Item name="startDate" rules={[{ required: true }]}>
                                    <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'startDate') }} />
                                    </Form.Item>
                            </Col>
                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div> */}
                                <Form.Item name="startDate" rules={[{ required: true }]}>
                                    <DatePicker style={{ padding: 10 }} onChange={(date) => { onChange(date, 'endDate') }} />
                                    </Form.Item>
                            </Col>
                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Breakup</h3></div> */}
                                <Form.Item name="Select a Breakup" rules={[{ required: true }]}>
                                    <Select style={{ padding: 10 }}
                                        showSearch
                                        style={{ width: 300 }}
                                        size="large"
                                        placeholder="Select a Breakup"
                                        optionFilterProp="children"
                                        onChange={(POType) => { onChange(POType, 'POType') }}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <option value="Amount">Amount</option>
                                        <option value="Breakup">Breakup</option>
                                    </Select>
                                    </Form.Item>
                            </Col>



                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col lg={6} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div> */}
                                <Form.Item >
                                    <Button  size="default" type="success" htmlType="Submit">
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
const test1 = {padding: 20,}
export default OrderReportsView;
