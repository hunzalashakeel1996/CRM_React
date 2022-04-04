import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image, Select,Spin,notification } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { apiAmazonRiznoPhonerSheet,apiAmazonFBAGetOrderSheet} from '../../../redux/apis/DataAction';
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



function onSearch(val) {
    // console.log('search:', val);
}

const AmazonRiznoOrders = (props) => {

    const dispatch = useDispatch();

   
    const [state, setstate] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
        isLoader:false,
        file: ''
    });
    const {isLoader,file}=state
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };


    const onChange = (date, dateString) => {
        setstate({ ...state, date, dateString });

    };
    const changeHandler = (event) => {

        setstate({ ...state, file: event.target.files[0] })

    };
    const insertAmazonFBAOrderSheet = () => {
        
        setstate({ ...state, isLoader: true })
        let username =[]
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName)
        formData.append('file', file)

        dispatch(apiAmazonRiznoPhonerSheet(formData)).then(data => {

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
  
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >
            <Row style={{ }}>
                <Cards title="Amazon Rizno Orders " caption="Phone Number Update" >
                    <Row gutter={25}>
                        

                    <Col lg={8} xs={24}>
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>Upload Walmart Order Sheet</h3></div> */}
                                <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                    {/* <Cards title="Step 2" caption="The simplest use of Drawer"> */}
                                    <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }} onClick={insertAmazonFBAOrderSheet}> Phone Number Insert Sheet</Button>
                                    <br></br>
                                    <input type="file" style={{ marginTop: 10 }} onChange={changeHandler} />
                                    {/* </Cards> */}
                                </div>
                            </Col>

                            <Col lg={8} xs={24}  >
                                {/* <div className="atbd-drawer" style={{ marginLeft: 0 }}><h3>GetOrders</h3></div> */}
                                <div className="atbd-drawer" style={{ marginLeft: 0 }}>
                                    <Button size="large" type="success" style={{ backgroundColor: '#42ba96', color: 'white', marginRight: 8, }}   onClick={getAmazonFBAOrderSheet} > Phone Number Update</Button>


                                </div>
                            </Col>



                    </Row>


                </Cards>
            </Row>
            </Spin>
           





        </>
    );
};

export default AmazonRiznoOrders;
