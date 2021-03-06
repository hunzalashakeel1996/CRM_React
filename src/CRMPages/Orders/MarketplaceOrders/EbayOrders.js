import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select,notification } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { apiEbayGetOrderSheetUpload,apiAmazonFBAGetOrderSheet} from '../../../redux/apis/DataAction';

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
const EbayOrdersView = (props) => {
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
        file:''
    });
    const {file}=state
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };

    const insertEbayOrderSheet = () => {
        
        setstate({ ...state, isLoader: true })
        let username =[]
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName)
        formData.append('file', file)

        dispatch(apiEbayGetOrderSheetUpload(formData)).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        })
    }

    const getAmazonFBAOrderSheet = () => {
        
        setstate({ ...state, isLoader: true })
        let username =[]
        username = JSON.parse(localStorage.getItem('user'))
       

        dispatch(apiAmazonFBAGetOrderSheet({user:username.LoginName})).then(data => {

            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            setstate({ ...state, isLoader: false })
        })
    }

    const onChange = (date, dateString) => {
        setstate({ ...state, date, dateString });

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
    
    const changeHandler = (event) => {

        setstate({ ...state, file: event.target.files[0] })

    };

    return (
        <>
            <Row style={{  }}>
                <Cards title="Get Ebay Orders (API)" caption="The simplest use of Drawer" >
                <Form layout="inline" initialValue="" label="" form={form} id="Get Ebay Orders (API) - USA" name="nest-messages"  validateMessages={validateMessages}>
                    <Row gutter={50}>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div>
                             <Form.Item name="startDate" rules={[{ required: true }]}>
                                <DatePicker style={{ padding: 10 }} onChange={onChange} />
                                </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div>
                            <Form.Item name="endDate" rules={[{ required: true }]}>
                                <DatePicker style={{ padding: 10 }} onChange={onChange} />
                                </Form.Item>
                        </Col>

                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>GetOrders</h3></div>
                            <Form.Item >
                                 <Button size="large"    type="success" htmlType="Submit">
                                    GetOrders
                        </Button>

                        </Form.Item >
                        </Col>



                    </Row>
                </Form>

                </Cards>
            </Row>
            {/* USA WALMART SHEET METHOD */}
         
                <Cards title="Get Ebay Orders (Sheet Method)" caption="The simplest use of Drawer" >
                <Row >
                                <Col lg={8} xs={24}>
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Upload Walmart Order Sheet</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={insertEbayOrderSheet}> Insert Sheet</Button>
                                        <br></br>
                                        <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />
                                        {/* </Cards> */}
                                    </div>
                                </Col>
    
                                <Col lg={8} xs={24}  >
                                    {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders</h3></div> */}
                                    <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                        <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }}   onClick={getAmazonFBAOrderSheet} > GetOrders</Button>
    
    
                                    </div>
                                </Col>
                                </Row>
                                 </Cards>
           
           





        </>
    );
};

export default EbayOrdersView;
