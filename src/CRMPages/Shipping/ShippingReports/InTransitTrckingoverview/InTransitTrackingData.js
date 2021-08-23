import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, notification } from 'antd';
import { Button, BtnGroup } from '../../../../components/buttons/buttons';
import {  inTransitsTrackingData } from '../../../../redux/apis/DataAction';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../components/utilities/utilities'
import { useDispatch, useSelector } from 'react-redux';
// import { Checkbox } from '../../../components/checkbox/checkbox';




const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

let sellerList = []
const InTransitTrackingData = (props) => {
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
    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
        states: [],
        file: '',
        marketplace: [],
        startDate: '',
        endDate: '',
    });

    const sellerName = ['Amazon', 'Walmart', 'sears', 'Ebay', 'NewEgg', 'PU', 'JLC']
    const dispatch = useDispatch()
    const { states, file, marketplace, startDate, endDate } = state
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };
    const onChange = (date, dateString) => {
        setState({ ...state, date, dateString });

    };
    const onChangeTextArea = (event) => {
        console.log(event.target.value)
        setState({ ...state, states: event.target.value });

    };
    const changeHandler = (event) => {

        setState({ ...state, file: event.target.files[0] })

    };
    const insertTransitsSheet = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        dispatch(inTransitsTrackingInsert(formData)).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    let username = [];
    const onListCheckChange = (val, i, isChecked) => {
        // console.log(isChecked)

        if (isChecked) {
            console.log('if', val)
            sellerList.push(
                val

            )
        }
        else {

            let index = sellerList.indexOf(val)
            sellerList.splice(index, 1)

        }

        setState({ ...state, marketplace: sellerList });

    }
    const onChangeStartDate = (value) => {
        console.log(value.format('MM/DD/YYYY'))
        setState({ ...state, startDate: value });
    }
    const onChangeEndDate = (value) => {
        console.log(value.format('MM/DD/YYYY'))
        setState({ ...state, endDate: value.format('MM/DD/YYYY') });
    }
    const insertTransitsData = () => {
        console.log('seller',sellerList)

        if (sellerList.length > 0) {
            dispatch(inTransitsTrackingData({ state: states, orderdatefrom: startDate, orderdateto: endDate, marketplace: marketplace })).then(data => {
                downloadFile(data)
                //   message.success(`file uploaded Update ${data}`);
                notification.success({
                    message: `Successfull  ${data}`,
                    description: `Successfully Report`,
                    onClose: close,
                });
                location.reload();
            })
        }
        else
            alert('Select Seller')
        
    };
    return (
        <>
         <Form layout="inline" initialValue="" label="" form={form} id="InTransit" name="nest-messages" onFinish={insertTransitsData} validateMessages={validateMessages}>
           
                <Cards title="InTransit Tracking Report" caption="The simplest use of Drawer" >
                   
                     
                            <Row gutter={50}>

                                {sellerName.map((val, i) => (

                                    <Col span={5} style={{ marginLeft: 10, marginTop: 10 }}>

                                        {/* <Cards headless > */}

                                        <Checkbox onChange={(e) => { onListCheckChange(val, i, e.target.checked) }}>

                                            {val}

                                            {/* <img src={`/img/icons/${val}.png`} width="70" height="70" style={{marginLeft:10}}/>  */}

                                        </Checkbox>

                                        {/* </Cards> */}

                                    </Col>

                                ))}

                            </Row>
                            <Row gutter={25} style={{ marginTop: 20 }}>
                                <Col Span={8} >
                                    <Form.Item name="StartDate" rules={[{ required: true }]}>
                                        <DatePicker placeholder="StartDate" style={{ padding: 10 }} onChange={(date) => { onChangeStartDate(date) }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}  >
                                    <Form.Item name="EndDate" rules={[{ required: true }]}>
                                        <DatePicker placeholder="EndDate" style={{ padding: 10 }} onChange={(date) => { onChangeEndDate(date) }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="State input here" rules={[{ required: true }]}>
                                        <TextArea placeholder="State input here" style={{ padding: 10 }} className="custom" value={states} onChange={onChangeTextArea} style={{ height: 50 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Col span={6}>
                                    <Form.Item>
                                        <Button type="success" htmlType="Submit"  > Report Data</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                   
                   
                </Cards>

          
            {/* MARKETPLACE CHECKBOXES  */}
           
            </Form>



        </>
    );
};

export default InTransitTrackingData;