import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../../components/buttons/buttons';
import { Drawer } from '../../../../components/drawer/drawer';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { getShippingUpdateapi } from '../../../../redux/apis/DataAction';
// import DatePicker from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../../components/datePicker/datePicker';
import { apistyleNotMatched } from '../../../../redux/apis/DataAction';
import { downloadFile, DownlaodWithReact } from '../../../../components/utilities/utilities'

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

const ShippingUpdate = (props) => {
    const Shipping = ['Endicia', 'EndiciaRizno', 'DHL', 'UPS','Fedex']

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    //  get vendors from redux 
    let vendornameState = useSelector(state => state.tickets.vendornames);

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
        file:'',
        dataTo:''
    });
    const { isLoader,file,dataTo } = state

    const onChange = (value, key) => {
        // // console.log('aaa', date, dateString)
        setstate({ ...state, [key]: value });

    };

    const shippingUpdateFile = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName);
        formData.append('File', file);
        formData.append('datato', dataTo);
     

        dispatch(getShippingUpdateapi(formData)).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }

   
    const dataTohandleChange = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataTo: value })
    }
    const changeHandler = (event) => {

        setstate({ ...state, file: event.target.files[0] })

    };
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="Shipping Update" caption="The simplest use of Drawer" >
                      
                            <Row gutter={50}>

                                <Col span={10}>
                                     <Select style={{ width: 150}} defaultValue="select" onChange={dataTohandleChange}  >
                                        {Shipping.map(item => (
                                            <Option value={item}>{item}</Option>))}
                                    </Select>
                                </Col>
                                
                                <Col span={8}>
                                   
                                   <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                   
                                           <Button size="default" type="success" onClick={shippingUpdateFile} > Insert </Button>
                                    
                                   </div>
                               </Col>
                            </Row>
                            <Row style={{ marginTop: 50 }}>
                            <Col span={10} style={{ width: 300, }}>

                                <input type="file" onChange={changeHandler} />
                            </Col>
                        </Row>

                    </Cards>
                </Row>


            </Spin>


        </>
    );
};

export default ShippingUpdate;
