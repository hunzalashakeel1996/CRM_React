import { Input,  message, Tabs,  Col, Row, Select,  Radio, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { UploadOutlined } from '@ant-design/icons';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../components/utilities/utilities'
import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { webURL, audioPlay, uploadUrl,getSubSkuStatusUpdateapi,getGroupAsinSetupapi,getGroupScrubsetSetupapi,getAutoMateGroupapi,getUploadFileUpdateGroupapi } from '../../../../redux/apis/DataAction';
import Promotions from '../../../../components/Marketplace/Promotions'
import AmazonPUstatus from './Statusoverview/AmazonPUstatus';
import AmazonRiznostatus from './Statusoverview/AmazonRiznostatus';
import AmazonPUUAEstatus from './Statusoverview/AmazonPUUAEstatus';
import AmazonPUCanadastatus from './Statusoverview/AmazonPUCanadastatus';

const { TextArea } = Input;
const { TabPane } = Tabs;
const options = [
    { label: 'True', value: 'True' },
    { label: 'False', value: 'False' },

];
const Report = [
    { label: 'SKU', value: 'SKU' },
    { label: 'ASIN', value: 'ASIN' },

];



const Groupstatus = () => {

     const Seller =['Amazon','AmazonRizno','AmazonUae','AmazonCanada','Walmart','WalmartCanada','Sears']
    const [activeTab, setActiveTab] = useState('');
    const dispatch = useDispatch()

    const [state, setstate] = useState({
        dataTo: '',
        forceCheck: false,
        reasonText: '',
        file: '',
        buttonStatus: 'able',
        textAreaStatus: 'disabled',
        radioButtonValue: true,
        status:''
    })
    const { status,dataTo, forceCheck, buttonStatus, textAreaStatus, reasonText, file, radioButtonValue } = state
    const [selectedRow, selectedRowsset] = useState([])

    const onChangeForceCheck = (e) => {

        // // console.log(`checked = ${e.target.checked}`);
        if (e.target.checked === true) {
            setstate({ ...state, forceCheck: e.target.checked, buttonStatus: 'disabled', textAreaStatus: 'able' })
        }
        else if (e.target.checked === false) {
            setstate({ ...state, forceCheck: e.target.checked, buttonStatus: 'able', textAreaStatus: 'disabled' })
        }


    }
    const onChangetextArea = (e) => {

        if (e.target.value == "") {
            setstate({ ...state, buttonStatus: 'disabled', textAreaStatus: 'able' })
        }
        else if (e.target.value.length != "") {
            setstate({ ...state, reasonText: e.target.value, buttonStatus: 'able', textAreaStatus: 'able' })
        }


    }

    // const fileDetails = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             // console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);

    //             // console.log('file', info.fileList[0].originFileObj);
    //             setstate({ ...state, file: info.fileList[0].originFileObj })
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };
    const dataTohandleChange = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataTo: value })
    }


    const uploadFile = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        // console.log('file', file)
        const formData = new FormData();
        formData.append('File', file);
        formData.append('datato', dataTo);
        formData.append('forcecheck', forceCheck);
        formData.append('reasontext', reasonText);
        formData.append('by', username.LoginName);

        dispatch(getUploadFileUpdateGroupapi(formData)).then(data => {

        
        
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })

    }
    const ScrubsetAsinuploadFile = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

       
        const formData = new FormData();
        formData.append('File', file);
     

        formData.append('by', username.LoginName);

        dispatch(getGroupScrubsetSetupapi(formData)).then(data => {

          //  message.success(`file uploaded Update ${data}`);

            //window.location.reload();
            notification.success({
                message: 'Successfull Setup',
                description: `Successfully Report`,
                onClose: close,
            });
    
        })
    }
    const changeHandler = (event) => {

        setstate({ ...state, file: event.target.files[0] })
        // setSelectedFile(event.target.files[0]);
        // setIsSelected(true);
    };
   


    const onChangeRadioButton = e => {
        setstate({ ...state, radioButtonValue: e.target.value })

    };
    const automateSKU = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        formData.append('datato', dataTo);
        formData.append('status', radioButtonValue);


        dispatch(getAutoMateGroupapi(formData)).then(data => {

        
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
      

    }
    const GropAsinuploadFile = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
       

        dispatch(getGroupAsinSetupapi(formData)).then(data => {
          
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
    

        })
      

    }


    const statushandleChange = (value) => {
        setstate({ ...state, status: value })
    }
    
    const subSkuStatusUpdate = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        formData.append('datato', dataTo);
        formData.append('status', status);

        dispatch(getSubSkuStatusUpdateapi(formData)).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })



    }
    return (
        <>


            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={10} >

                    <Cards headless>
                        <Row >
                            <Col span={10}>
                                 <Button size="large"  type="primary" onClick={GropAsinuploadFile}>Group Asin Setup</Button>

                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col span={8} style={{ width: 300, marginRight: 20 }}>
                                {/* <Upload {...fileDetails}>
                                     <Button size="large"  icon={<UploadOutlined />} >Click to Upload</Button>
                                </Upload> */}

                                <input type="file" onChange={changeHandler} />

                            </Col>
                        </Row>
                    </Cards>
                </Col>

                <Col span={10} >

                    <Cards headless>
                    <Row >
                            <Col span={10}>
                                 <Button size="large"  type="primary" onClick={ScrubsetAsinuploadFile}>Scrub set Asin</Button>

                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col span={8} style={{ width: 300, marginRight: 20 }}>
                                {/* <Upload {...fileDetails}>
                                     <Button size="large"  icon={<UploadOutlined />} >Click to Upload</Button>
                                </Upload> */}

                                <input type="file" onChange={changeHandler} />

                            </Col>
                        </Row>
                    </Cards>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={16}>
                <Col span={10} >
                    <Cards headless>
                        <Row>
                            <Col span={10} >
                                 <Button size="large"  type="primary" onClick={automateSKU}>Automate SKU</Button>
                            </Col>

                            <Col span={8}>

                                <Radio.Group
                                    options={options}
                                    onChange={onChangeRadioButton}
                                 
                                    optionType="button"
                                    buttonStyle="solid"
                                />



                            </Col>
                            <Col span={6}>
                                <Select defaultValue="select" onChange={dataTohandleChange} style={{ width: 100 }}>
                                    <Option value="PU">PU</Option>
                                    <Option value="Rizno">Rizno</Option>


                                </Select>



                            </Col>
                        </Row>

                        <Row style={{ marginTop: 20 }}>
                            <Col span={10} style={{ width: 300, }}>
                               
                                <input type="file" onChange={changeHandler} />
                            </Col>
                        </Row>
                    </Cards>
                </Col>



                <Col span={10} >
                <Cards headless>
                        <Row gutter={25}>
                            <Col span={8} >
                                <Button type="primary" onClick={subSkuStatusUpdate}>SKU Status</Button>
                            </Col>
                            <Col span={10}>
                              
                                       <Select style={{ width:  '100%'}}defaultValue="select" onChange={dataTohandleChange}  >
                                       {Seller.map(item =>(
                                       <Option value={item}>{item}</Option> ))}
                                       </Select>
                             
                              


                            </Col>
                           {dataTo&&
                            <Col span={5}>
                                <Select defaultValue="select" onChange={statushandleChange}  >
                                    <Option value="Active">Active</Option>
                                    <Option value="InActive">InActive</Option>
                              </Select>
                            </Col>}
                        </Row>

                        <Row style={{ marginTop: 50 }}>
                            <Col span={10} style={{ width: 300, }}>
                               
                                <input type="file" onChange={changeHandler} />
                            </Col>
                        </Row>
                    </Cards>
                </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
                <Col span={20} >
                    <Cards headless>

                        <Tabs defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} centered>
                            <TabPane tab="Amazon PU" key="Amazon PU">
                                <AmazonPUstatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                            </TabPane>
                            <TabPane tab="Amazon Rizno" key="Amazon Rizno">
                                <AmazonRiznostatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea}  state={state} />
                            </TabPane>
                            <TabPane tab="Amazon Canada" key="Amazon Canada">
                                <AmazonPUCanadastatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea}  state={state} />
                            </TabPane>
                            <TabPane tab="Amazon UAE" key="Amazon UAE">
                                <AmazonPUUAEstatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea}  state={state} />
                            </TabPane>

                        </Tabs>

                    </Cards>
                </Col>
            </Row>


        </>
    )

}
// ReactDOM.render(<EditableTable />, mountNode);


export default Groupstatus;