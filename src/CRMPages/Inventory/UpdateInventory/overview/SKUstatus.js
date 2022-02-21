import { InputNumber, Table, Input, Upload, message, Popconfirm, Tabs, Form, Col, Row, Select, Spin, Radio, Checkbox, Divider, Modal, notification } from 'antd';
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
import { webURL, audioPlay, uploadUrl,getShippingTemplateTabUpdateapi, getLeadTimeDateUpdateapi, getSkuReviewsLinkUpdateapi, getSkuStatusUpdateapi, getReportDataapi, getAutoMateSKUapi, getUploadFileUpdateSKUapi, getUploadmarketplace_weightapi, getSanmarSalesUpdateapi, getSanmarSalesEndapi } from '../../../../redux/apis/DataAction';
import Promotions from '../../../../components/Marketplace/Promotions'
import AmazonPUstatus from './Statusoverview/AmazonPUstatus';
import AmazonRiznostatus from './Statusoverview/AmazonRiznostatus';
import AmazonPUUAEstatus from './Statusoverview/AmazonPUUAEstatus';
import AmazonPUCanadastatus from './Statusoverview/AmazonPUCanadastatus';
import AmazonRiznoCanada from './Statusoverview/AmazonRiznoCanada';
import AmazonJeffa from './Statusoverview/AmazonJeffa';
import EbayPUStatus from './Statusoverview/EbayPUStatus';
import WalmartPUStatus from './Statusoverview/WalmartPUStatus';

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



const SKUstatus = () => {

    const deliveryinfoSeller = [
        { seller: 'Amazon PU', value: 'deliveryinfo' },
        { seller: 'Amazon Rizno', value: 'Rizno_deliveryinfo' },
        { seller: 'Amazon Canada', value: 'Amazon_CA_Deliveryinfo' },
        { seller: 'Amazon UAE', value: 'amazon_UE_deliveryinfo' },
        // {seller:'Walmart',value:''},
        { seller: 'WalmartCanada', value: 'walmart_ca_delivetyinfo' },
        //{seller:'Sears',value:''},      
        { seller: 'Ebay', value: 'Ebaydeliveryinfo' },
        { seller: 'Amazon Jeffa', value: 'Jeffa_Deliveryinfo' },
        { seller: 'AmazonRiznoCanada', value: 'AmazonRiznoCanada_Deliveryinfo' }
    ];
    const Seller = ['Amazon', 'AmazonRizno', 'AmazonUae', 'AmazonCanada', 'Walmart', 'WalmartCanada', 'Sears', 'Ebay']
    const Process = ['Walmart SKU Link', 'Amazon Top Review', 'Walmart Review pages']
    const [activeTab, setActiveTab] = useState('');
    const dispatch = useDispatch()

    let sellerName = ['Amazon PU', 'Amazon Rizno', 'Amazon UAE', 'Amazon Canada', 'Walmart', 'WalmartCanada', 'Sears', 'Ebay', 'Amazon Jeffa', 'AmazonRiznoCanada']
  
    let vendornameState = useSelector(state => state.tickets.vendornames);

    const [state, setstate] = useState({
        dataTo: '',
        forceCheck: false,
        reasonText: '',
        file: '',
        buttonStatus: 'able',
        textAreaStatus: 'disabled',
        radioButtonValue: true,
        status: '',
        dataToSKU: '',
        isLoader: false,
        dataToLTD: '',
        dataToLTDSeller: '',
        LTDstatus: '',
        buttonStatusLTD: '',
        textAreaStatusLTD: '',
        textAreaStatusSTT:'',
        buttonStatusSTT:'',
        dataToSTT:'',
        sttstatus:'',
        dataToSTTseller:''
    })
    const {dataToSTTseller,textAreaStatusSTT, buttonStatusSTT,dataToSTT,sttstatus,textAreaStatusLTD, buttonStatusLTD, LTDstatus, dataToLTDSeller, dataToLTD, dataToSKU, status, dataTo, forceCheck, buttonStatus, textAreaStatus, reasonText, file, radioButtonValue, isLoader } = state
    
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

    const onChangetextAreaLTD = (e) => {

        setstate({ ...state, textAreaStatusLTD: e.target.value })
    }

    const onChangetextAreaSTT= (e) => {

        setstate({ ...state, textAreaStatusSTT: e.target.value })
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

   
    const dataTohandleChangeSKU = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataToSKU: value })
    }

    const dataTohandleChangeProcess = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataTo: value })
    }

    const dataTohandleChangeAutomateSKU = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataTo: value })
    }
    const dataTohandleChange = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataTo: value })
    }
    const dataTohandleChangeLTDSeller = (value) => {
         console.log(`selected ${value}`);
        setstate({ ...state, dataToLTDSeller: value })
    }
    const dataTohandleChangeLTD = (value) => {
      //   console.log(`selected ${value}`);
        setstate({ ...state, dataToLTD: value })
    }
    const handleChangeLTD = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, LTDstatus: value })
    }

    const statushandleChange = (value) => {
        setstate({ ...state, status: value })
    }

    const stthandleChange = (value) => {
        
        setstate({ ...state, sttstatus: value.target.value })
    }
    const dataTohandleChangeSTT = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataToSTT: value })
    }
    const dataTohandleChangeSTTSeller = (value) => {
        // console.log(`selected ${value}`);
        setstate({ ...state, dataToSTTseller: value })
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
        setstate({ ...state, isLoader: true })
        dispatch(getUploadFileUpdateSKUapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
            notification.success({
                message: `Successfull Upload File Update SKU ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });


        })

    }
    const MarketPlaceuploadFile = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        // console.log('file', file)
        const formData = new FormData();
        formData.append('File', file);
        formData.append('datato', dataTo);

        formData.append('by', username.LoginName);
        setstate({ ...state, isLoader: true })
        dispatch(getUploadmarketplace_weightapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })

            notification.success({
                message: `Successfull marketplace weight Update ${data}`,
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
    const sanmarSalesUpdatestart = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        setstate({ ...state, isLoader: true })
        dispatch(getSanmarSalesUpdateapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
            notification.success({
                message: `Successfull Start ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })

    };
    const sanmarSalesUpdateend = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);

        setstate({ ...state, isLoader: true })
        dispatch(getSanmarSalesEndapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
            notification.success({
                message: `Successfull End ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })

    }


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
        setstate({ ...state, isLoader: true })
        dispatch(getAutoMateSKUapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }
    const reportData = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        formData.append('uploadtype', radioButtonValue);
        setstate({ ...state, isLoader: true })
        dispatch(getReportDataapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
            // console.log(data)
            //   message.success(`file uploaded Update Done` );
            downloadFile(data)


            //window.location.reload();

        })
        notification.success({
            message: 'Successfull Dowload',
            description: `Successfully Report`,
            onClose: close,
        });

    }

    const skuStatusUpdate = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        formData.append('datato', dataToSKU);
        formData.append('status', status);
        setstate({ ...state, isLoader: true })
        dispatch(getSkuStatusUpdateapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }


    const ltdStatusUpdate = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        let sellerColumn = deliveryinfoSeller.find(x => x.seller === dataToSeller)


        setstate({ ...state, isLoader: true })
        dispatch(getLeadTimeDateUpdateapi({ ReasonLTD: textAreaStatusLTD, Seller: sellerColumn.value, status: LTDstatus, Vendorname: dataToLTD, user: username.LoginName })).then(data => {
            setstate({ ...state, isLoader: false })
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }
    const sttStatusUpdate = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        // let sellerColumn = deliveryinfoSeller.find(x => x.seller === dataToSTTseller)

        setstate({ ...state, isLoader: true })
        dispatch(getShippingTemplateTabUpdateapi({ ReasonSTT: textAreaStatusSTT, Seller: dataToSTTseller, status: sttstatus, Vendorname: dataToSTT, user: username.LoginName })).then(data => {
            setstate({ ...state, isLoader: false })
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }
    const skuReviewsLinkUpdate = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append('user', username.LoginName);
        formData.append('File', file);
        formData.append('datato', dataTo);
        // formData.append('status', status);
        setstate({ ...state, isLoader: true })
        dispatch(getSkuReviewsLinkUpdateapi(formData)).then(data => {
            setstate({ ...state, isLoader: false })
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
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

                <Row gutter={16} style={{ marginTop: 10 }}>
                    <Col span={10} >

                        <Cards headless>
                            <Row >
                                <Col span={10}>
                                    <Button size="large" type="primary" onClick={MarketPlaceuploadFile}>MarketPlace Price Weight</Button>

                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Col span={8} style={{ width: 300, marginRight: 20 }}>

                                    <input type="file" onChange={changeHandler} />

                                </Col>
                            </Row>
                        </Cards>
                    </Col>

                    <Col span={10} >

                        <Cards headless>
                            <Row >
                                <Col span={3}  >


                                    <Button size="large" type="primary" onClick={sanmarSalesUpdatestart} >Sanmar Sale Start</Button>

                                </Col>

                                <Col span={3} offset={8}>

                                    <Button size="large" type="danger" onClick={sanmarSalesUpdateend}>Sanmar Sale End </Button>


                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Col span={6} style={{ width: 300, marginRight: 20 }}>
                                    {/* <input  type="file" onChange={changeHandler} /> */}
                                </Col>
                            </Row>
                        </Cards>
                    </Col>
                </Row>

                <Row style={{ marginTop: 10 }} gutter={16}>
                    <Col span={10}>
                        <Cards headless>
                            <Row>
                                <Col span={10} >
                                    <Button size="large" type="primary" onClick={automateSKU}>Automate SKU</Button>
                                </Col>

                                <Col span={8}>

                                    <Radio.Group
                                        options={options}
                                        onChange={onChangeRadioButton}
                                        //  value={automateSKU}
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
                                    {/* <Upload {...fileDetails}>
                                     <Button size="large"  icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload> */}
                                    <input type="file" onChange={changeHandler} />
                                </Col>
                            </Row>
                        </Cards>
                    </Col>



                    <Col span={10} >
                        <Cards headless>
                            <Row>

                                <Col span={8}>
                                    <Button size="large" type="primary" onClick={reportData}>Report Data</Button>
                                </Col>

                                <Col span={8}>
                                    <Radio.Group
                                        options={Report}
                                        onChange={onChangeRadioButton}
                                        // value={value3}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />


                                </Col>

                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Col span={10}>
                                    <input type="file" onChange={changeHandler} />
                                </Col>
                            </Row>
                        </Cards>
                    </Col>

                </Row>
                <Row style={{ marginTop: 10 }} gutter={16} >
                    <Col span={10} >
                        <Cards headless>
                            <Row gutter={25}>
                                <Col span={8} >
                                    <Button type="primary" onClick={skuStatusUpdate}>SKU Status</Button>
                                </Col>
                                <Col span={10}>

                                    <Select style={{ width: '100%' }} defaultValue="select" onChange={dataTohandleChangeSKU}  >
                                        {Seller.map(item => (
                                            <Option value={item}>{item}</Option>))}
                                    </Select>
                                </Col>
                                {dataToSKU &&
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
                    <Col span={10} >
                        <Cards headless>
                            <Row gutter={50}>
                                <Col span={10} >
                                    <Button type="primary" onClick={skuReviewsLinkUpdate}>Link/Reviews Update</Button>
                                </Col>
                                <Col span={11}>

                                    <Select style={{ width: '100%' }} defaultValue="select" onChange={dataTohandleChangeProcess}  >
                                        {Process.map(item => (
                                            <Option value={item}>{item}</Option>))}
                                    </Select>
                                </Col>

                            </Row>

                            <Row style={{ marginTop: 50 }}>
                                <Col span={10} style={{ width: 300, }}>

                                    <input type="file" onChange={changeHandler} />
                                </Col>
                            </Row>
                        </Cards>
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }} gutter={16} >
                    <Col span={10} >
                        <Cards headless>
                            <Row gutter={25}>
                                <Col span={10} >
                                    <Button type="primary" onClick={ltdStatusUpdate} disabled={textAreaStatusLTD.length > 0 ? false : true}  >Lead Time Days</Button>
                                </Col>
                                <Col span={10}>

                                    <Select style={{ width: '100%' }} defaultValue="select" onChange={dataTohandleChangeLTDSeller}  >
                                        {sellerName.map(item => (
                                            <Option value={item}>{item}</Option>))}
                                    </Select>
                                </Col>

                                {dataToLTDSeller &&
                                    <Col style={{ marginTop: 40 }} span={10}>

                                        <Select style={{ width: '100%' }} defaultValue="select" onChange={dataTohandleChangeLTD}  >
                                            {vendornameState.map(item => (
                                                <Option value={item}>{item}</Option>))}
                                        </Select>
                                    </Col>
                                }
                                {dataToLTD &&
                                    <Col style={{ marginTop: 40 }} span={10}>

                                        <InputNumber size="small" min={1} max={15} defaultValue={0} onChange={handleChangeLTD} />
                                    </Col>}
                                {LTDstatus &&
                                    <Col style={{ marginTop: 40 }} span={10}>
                                        <TextArea placeholder="Reason" onChange={onChangetextAreaLTD} disabled={LTDstatus > 0 ? false : true} />
                                    </Col>}
                            </Row>

                        </Cards>
                    </Col>
                    <Col span={10} >
                        <Cards headless>
                            <Row gutter={25}>
                                <Col span={12} >
                                    <Button type="primary" onClick={sttStatusUpdate} disabled={textAreaStatusSTT.length > 0 ? false : true}  >Shipping Template Tab</Button>
                                </Col>
                                <Col span={10}>
                                    <Select style={{ width: '100%' }} defaultValue="select" onChange={dataTohandleChangeSTTSeller}  >
                                        {sellerName.map(item => (
                                            <Option value={item}>{item}</Option>))}
                                    </Select>
                                </Col>
                                {dataToSTTseller &&
                                    <Col style={{ marginTop: 40 }} span={10}>
                                        <Select style={{ width: '100%' }} defaultValue="select" onChange={dataTohandleChangeSTT}  >
                                            {vendornameState.map(item => (
                                                <Option value={item}>{item}</Option>))}
                                        </Select>
                                    </Col>
                                }
                                {dataToSTT &&
                                    <Col style={{ marginTop: 40 }} span={10}>

                                        <Input size="small"   onChange={stthandleChange} />
                                    </Col>}

                                {sttstatus &&
                                    <Col style={{ marginTop: 40 }} span={10}>
                                        {console.log(sttstatus)}
                                        <TextArea placeholder="Reason" onChange={onChangetextAreaSTT} disabled={sttstatus !=''? false : true} />
                                    </Col>}
                            </Row>

                        </Cards>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={20}>
                        <Cards headless>

                            <Tabs defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} centered>
                                <TabPane tab="Amazon PU" key="Amazon PU">
                                    <AmazonPUstatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Amazon Rizno" key="Amazon Rizno">
                                    <AmazonRiznostatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Amazon Canada" key="Amazon Canada">
                                    <AmazonPUCanadastatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Amazon UAE" key="Amazon UAE">
                                    <AmazonPUUAEstatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Amazon Rizno Canada" key="Amazon Rizno Canada ">
                                    <AmazonRiznoCanada  changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Amazon Jeffa " key="Amazon Jeffa">
                                    <AmazonJeffa  changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Ebay PU" key="Ebay PU">
                                    <EbayPUStatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                                <TabPane tab="Walmart PU" key="Walmart PU">
                                    <WalmartPUStatus changeHandler={changeHandler} uploadFile={uploadFile} dataTohandleChange={dataTohandleChange} onChangeForceCheck={onChangeForceCheck} onChangetextArea={onChangetextArea} state={state} />
                                </TabPane>
                            </Tabs>

                        </Cards>
                    </Col>

                </Row>

            </Spin>
        </>
    )

}
// ReactDOM.render(<EditableTable />, mountNode);


export default SKUstatus;