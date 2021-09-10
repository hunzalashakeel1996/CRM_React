import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, notification } from 'antd';
import { Button, BtnGroup } from '../../../../components/buttons/buttons';
import { inTransitsTrackingInsert } from '../../../../redux/apis/DataAction';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../components/utilities/utilities'
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
// import { Checkbox } from '../../../components/checkbox/checkbox';




const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

let sellerList = []
const InTransittrackingInsert = (props) => {
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

    const dispatch = useDispatch()
    const { states, file, marketplace, startDate, endDate } = state
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };
    const onChange = (date, dateString) => {
        setState({ ...state, date, dateString });

    };
    const onChangeTextArea = (event) => {
        // console.log(event.target.value)
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
        // // console.log(isChecked)

        if (isChecked) {
            // console.log('if', val)
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
    
    return (
        <>
         <Form layout="inline" initialValue="" label="" form={form} id="InTransit" name="nest-messages" onFinsh={insertTransitsSheet} validateMessages={validateMessages}>
          
            {/* MARKETPLACE CHECKBOXES  */}
         
                <Cards title="Marketplaces" caption="The simplest use of Drawer" >
                    <Row gutter={50}>

                        <Col span={12}   >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <Form.Item name="Select File" rules={[{ required: true }]}>

                                <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />

                                </Form.Item>
                        </Col>
                        <Col span={12} >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <Form.Item>

                                 <Button size="large"  icon={<UploadOutlined />}  htmlType="Submit"  > </Button>


                            </Form.Item>
                        </Col>



                    </Row>
                    {/* MARKETPLACE CHECKBOXES  */}

                </Cards>
              
            </Form>



        </>
    );
};

export default InTransittrackingInsert;
