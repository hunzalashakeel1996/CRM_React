import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, notification,Spin } from 'antd';
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
        isLoader:false
    });

    const dispatch = useDispatch()
    const { states, file, marketplace, startDate, endDate,isLoader } = state
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
        setState({ ...state, isLoader: true });
        dispatch(inTransitsTrackingInsert(formData)).then(data => {
            setState({ ...state, isLoader: false });
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
        
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
         
            {/* MARKETPLACE CHECKBOXES  */}
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Cards title="Marketplaces" caption="The simplest use of Drawer" >
                    <Row gutter={50}>

                    <Col xs={24} sm={12} md={10} lg={6} xl={6} xxl={5} style={{marginBottom:25}}>
                            
                            <div className="atbd-drawer" style={{ marginLeft: 0 }}>

                                 <Button size="large"  type="success" style={{backgroundColor: '#42ba96',  color:'white', marginRight:8,}} onClick={insertTransitsSheet}>Insert In-Transit Sheet</Button>

                                <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />

                            </div>
                        </Col>


                    </Row>
                    {/* MARKETPLACE CHECKBOXES  */}

                </Cards>
              
                </Spin>



        </>
    );
};

export default InTransittrackingInsert;
