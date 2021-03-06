import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select, notification, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { downloadFile, DownlaodWithReact } from '../../../components/utilities/utilities'
import {apiWalmartGetOrderSheetUpload,getwalmartDuplicateOrderapi,apiMissingEmailUpdateOrder, apiDeleteSKUOnWalmart, apiDeleteSKUOnWalmartUpload, apiWalmartGetCanadaOrderSheetMethod, apiWalmartGetCanadaOrderSheetUpload, apiWalmartGetUSAOrderSheetUpload, apiWalmartGetUSAOrderSheetMethod, apiWalmartCustomerEmail, apiWalmartGetOrder, apiWalmartGetSingleOrder } from '../../../redux/apis/DataAction';

import './MarketplaceOrders.css';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

function onChange(value) {
    // console.log(`selected ${value}`);
}

function onBlur() {
    // console.log('blur');
}

function onFocus() {
    // console.log('focus');
}

function onSearch(val) {
    // console.log('search:', val);
}


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
const MarketplaceOrdersView = (props) => {
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
        Pono: [],
        isLoader: false,
        singlePonumber: [],
        file: ''
    });
    const { Pono, isLoader, singlePonumber, file } = state
    const multipleChange = childData => {
        setstate({ ...state, checkData: childData });
    };


    const onChange = (date, dateString) => {
        setstate({ ...state, date, dateString });

    };


    const getWalmartCustomerEmail = () => {

        setstate({ ...state, isLoader: true })
        dispatch(apiWalmartCustomerEmail({ pono_: Pono })).then(data => {
            // console.log(data)
            setstate({ ...state, isLoader: false })
            downloadFile(data);
            notification.success({
                message: 'Successfull Dowload',
                description: `Successfully Download  WalmartCustomerEmail `,
                onClose: close,
            });
        })

    };
    const getPOno = (value) => {
        console.log('getPOno', value)
        setstate({ ...state, Pono: value })
    }
    const getWalmartSinglePonumber = (value) => {

        setstate({ ...state, singlePonumber: value })
    }
    const getWalmartOrderApi = () => {

        setstate({ ...state, isLoader: true });
        dispatch(apiWalmartGetOrder()).then(data => {
            console.log('apiWalmartGetOrder', data)
            notification.success({
                message: 'Successfull Get Order ',
                description: `Successfully Walmart Get order`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false });
        })
    }
    const getWalmartDuplicateOrder = () => {

        setstate({ ...state, isLoader: true });
        dispatch(getwalmartDuplicateOrderapi()).then(data => {
            downloadFile(data)
            notification.success({
                message: 'Successfull Get Order ',
                description: `Successfully Walmart Get order`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false });
        })
    }
    const getWalmartSingleOrderApi = () => {

        setstate({ ...state, isLoader: true });
     let   poNumb = []
      let  ponumber = singlePonumber.split("\n")

      ponumber.map(item=>{
        poNumb.push( parseInt(item))
      })
        // ponumber.forEach(function (obj) {
        //     poNumb.push( parseInt(obj))

         
        // })

        dispatch(apiWalmartGetSingleOrder(poNumb)).then(data => {
            console.log('apiWalmartGetOrder', data)
            notification.success({
                message: 'Successfull Get Order ',
                description: `Successfully Walmart Get order`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false });
        })
    }
    
    const getMissingEmailUpdateAPI = () => {

        setstate({ ...state, isLoader: true });
        dispatch(apiMissingEmailUpdateOrder({ POId: singlePonumber })).then(data => {
            console.log('apiWalmartGetOrder', data)
            notification.success({
                message: 'Successfull Get Order ',
                description: `Successfully Walmart Get order`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false });
        })
    }

    const insertWalmartUSAOrderSheet = () => {

        setstate({ ...state, isLoader: true })
        let username = []
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName)
        formData.append('file', file)

        dispatch(apiWalmartGetUSAOrderSheetUpload(formData)).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        })
    }
    const getWalmartUSAOrdersheet = () => {
        setstate({ ...state, isLoader: true })
        dispatch(apiWalmartGetUSAOrderSheetMethod()).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        });
    }
    const changeHandler = (event) => {

        setstate({ ...state, file: event.target.files[0] })

    };
    const insertWalmartCanadaOrderSheet = () => {

        setstate({ ...state, isLoader: true })
        let username = []
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName)
        formData.append('file', file)

        dispatch(apiWalmartGetOrderSheetUpload(formData)).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        })
    }
    const getWalmartCanadaOrdersheet = () => {
        setstate({ ...state, isLoader: true })
        dispatch(apiWalmartGetCanadaOrderSheetMethod()).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        });
    }

    const insertSheetSkuDeleteOnWalmart = () => {

        setstate({ ...state, isLoader: true })
        let username = []
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName)
        formData.append('file', file)

        dispatch(apiDeleteSKUOnWalmartUpload(formData)).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        })
    }

    const deleteSkuOnWalmart = () => {
        setstate({ ...state, isLoader: true })
        dispatch(apiDeleteSKUOnWalmart()).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        });
    }

    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
                <Row >
                    <Cards title="Get Walmart Orders (API) - USA" caption="The simplest use of Drawer" >
                        {/* <Form layout="inline" initialValue="" label="" form={form} id="Get Walmart Orders (API) - USA" name="nest-messages"  validateMessages={validateMessages}> */}
                        <Row style={{ marginBottom: 20 }} gutter={15}>
                            <Col span={4}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>StartDate</h3></div> */}

                                <DatePicker placeholder="StartDate" style={{ padding: 10, width: '100%', }} onChange={onChange} />

                            </Col>
                            <Col span={4}>
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>EndDate</h3></div> */}

                                <DatePicker placeholder="EndDate" style={{ padding: 10 }} onChange={onChange} />

                            </Col>

                            <Col span={4}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders</h3></div> */}

                                <Button size="large" type="success" >
                                    GetOrders
                                </Button>
                            </Col>
                            <Col span={6}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders Api</h3></div> */}

                                <Button size="large" type="success" onClick={getWalmartOrderApi}>
                                    Get Walmart Order Api
                                </Button>

                            </Col>
                            <Col span={4}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders Api</h3></div> */}

                                <Button size="large" type="success" onClick={getWalmartDuplicateOrder}>
                                Walmart Duplicate Order
                                </Button>




                            </Col>


                        </Row>
                        <hr
                            style={{
                                color: 'black',
                                backgroundColor: 'black',
                                height: 2
                            }}
                        />
                        <Row style={{ marginTop: 20 }} gutter={15}>


                            <Col lg={6} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Insert Ponumber</h3></div> */}

                                <TextArea placeholder="Insert Ponumber" style={{ padding: 10 }} onChange={(e) => { getWalmartSinglePonumber(e.target.value) }} />

                            </Col>

                            <Col lg={6} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetSingleOrders Api</h3></div> */}

                                <Button size="large" type="success" onClick={getWalmartSingleOrderApi}>
                                    GetSingleOrders Api
                                </Button>

                                <Button size="large" type="success" onClick={getMissingEmailUpdateAPI}>
                                Update Missing Emails
                                </Button>




                            </Col>


                        </Row>
                        {/* </Form> */}

                    </Cards>
                </Row>
                {/* USA WALMART SHEET METHOD */}
                <Row gutter={25}>
                    <Col span={12}>
                        <Cards title="Get Walmart Orders (Sheet Method) - USA" caption="The simplest use of Drawer" >
                            <Row gutter={25}>
                                <Col lg={8} xs={24}>
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Upload Walmart Order Sheet</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={insertWalmartUSAOrderSheet}> Insert Sheet</Button>
                                        <br></br>
                                        <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />
                                        {/* </Cards> */}
                                    </div>
                                </Col>

                                <Col lg={8} xs={24}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={getWalmartUSAOrdersheet}> GetOrders</Button>


                                    </div>
                                </Col>
                            </Row>
                        </Cards>
                    </Col>
                    {/* CANADA WALMART SHEET METHOD */}
                    <Col span={12}>
                        <Cards title="Get Walmart Orders (Sheet Method) - Canada" caption="The simplest use of Drawer" >
                            <Row gutter={25}>
                                <Col lg={8} xs={24}>
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Upload Walmart Order Sheet</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={insertWalmartCanadaOrderSheet}> Insert Sheet</Button>
                                        <br></br>
                                        <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />
                                        {/* </Cards> */}
                                    </div>
                                </Col>

                                <Col lg={8} xs={24}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={getWalmartCanadaOrdersheet}> GetOrders</Button>


                                    </div>
                                </Col>



                            </Row>

                        </Cards>
                    </Col>
                </Row>

                {/* WALMART EMAILS */}
                {/* Check Labels Here Div  */}
                <Row gutter={25}>
                    <Col span={12}>
                        <Cards title="Download  Customer Emails" caption="The simplest use of Drawer" >
                            <Form layout="inline" initialValue="" label="" form={form} id="Download Customer Emails" name="nest-messages" onFinish={getWalmartCustomerEmail} validateMessages={validateMessages}>
                                <Row gutter={50}>
                                    <Col lg={15} xs={24}  >
                                        <Form.Item name="Customer Emails" rules={[{ required: true }]}>
                                            <TextArea style={{ padding: 10 }} onChange={(e) => { getPOno(e.target.value) }} />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={6} xs={24}  >
                                        <Form.Item>
                                            <Button size="large" type="success" htmlType="submit">
                                                Downlaod
                                            </Button>

                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Cards>
                    </Col>
                    <Col span={12}>
                        <Cards title="Delete Sku" caption="The simplest use of Drawer" >
                            <Row gutter={25}>
                                <Col lg={8} xs={24}>
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Upload Walmart Order Sheet</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={insertSheetSkuDeleteOnWalmart}> Insert Sheet</Button>
                                        <br></br>
                                        <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />
                                        {/* </Cards> */}
                                    </div>
                                </Col>

                                <Col lg={8} xs={24}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={deleteSkuOnWalmart}> Delete Sku</Button>

                                    </div>
                                </Col>
                            </Row>
                        </Cards>
                    </Col>
                </Row>

            </Spin>




        </>
    );
};

export default MarketplaceOrdersView;
