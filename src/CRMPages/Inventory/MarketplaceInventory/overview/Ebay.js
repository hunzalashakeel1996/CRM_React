import { Col, Row, Select, Spin, Radio, Checkbox, Divider, message, notification, Input, Modal } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { downloadFile } from '../../../../components/utilities/utilities'

import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { Cards } from '../../../../components/cards/frame/cards-frame';

import { webURL, audioPlay, uploadUrl, getUploadFileUpdateEbayInventoryapi, getEbayHtmlapi } from '../../../../redux/apis/DataAction';
import Column from '../../../../components/Marketplace/Column'
import FilterReport from '../../../../components/Marketplace/FilterReport'
import Promotions from '../../../../components/Marketplace/Promotions'
import Priceupdate from '../../../../components/Marketplace/Priceupdate'
import EbayHtml from './Ebayoverview/EbayHtml'
const { TextArea } = Input;

const Ebay = (props) => {
    //  get vendors from redux 
    let vendorname = useSelector(state => state.tickets.vendornames);
    const { genrateFeed, genrateFilter, vendornameState, brandnameState, collectionState, categorynameState, Type, puStatusState } = props

    const EbayColumn = ['EBAYSTATUS']
    const columnDropdown = ['ADD EBAY INVENTORY', 'UPDATE EBAY INVENTORY', 'ALL', 'OTHER']
    const Ebay = "Ebay"
    const isSeller = "Ebay"

    const dispatch = useDispatch()

    const [state, setstate] = useState({
        dataTo: '',
        file: '',
        vendorname: '',
        vendorstylecode: '',
        EbayHtml: []

    })
    const [visible, setVisible] = useState(false);
    const { dataTo, file } = state

    const changeHandler = (event) => {

        setstate({ ...state, file: event.target.files[0] })

    };
    const dataTohandleChange = (value) => {

        setstate({ ...state, dataTo: value })
    }
    const uploadFileEbayUpdateInventory = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();
        formData.append('File', file);
        formData.append('datato', "IU");
        formData.append('by', username.LoginName);

        dispatch(getUploadFileUpdateEbayInventoryapi(formData)).then(data => {

            downloadFile(data)

            notification.success({
                message: `Successfull Download UpdateEbayInventory Done`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }

    const getHtmlData = () => {



        dispatch(getEbayHtmlapi(state)).then(data => {

            // console.log(data)

            setstate({ ...state, EbayHtml: data })
            setVisible(true)
        })

    }
    const getVendor = (event) => {
        setstate({ ...state, vendorname: event })

    }
    const getVendorStylecode = (event) => {

        setstate({ ...state, vendorstylecode: event.target.value })

    }

    return (
        <>

            <div style={{ marginTop: 10 }}>
                <Row>
                    <Col span={24} >

                        <FilterReport title={'Ebay'} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <Row gutter={50}>
                            <Col span={10} >

                                <Cards headless>
                                    <Row >

                                        <Col span={20}>
                                            <Button size="large" type="primary" onClick={uploadFileEbayUpdateInventory}>Ebay Update Inventory</Button>

                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: 20 }}>
                                        <Col span={20} style={{ width: 300, marginRight: 20 }}>

                                            <Input type="file" onChange={changeHandler} />

                                        </Col>
                                    </Row>
                                </Cards>
                            </Col>
                            <Col span={14} >

                                <Cards headless>
                                    <Row >
                                        <Col span={12} >
                                            
                                                    <Button size="large" type="primary" onClick={() => getHtmlData()}>Report Data</Button>
                                                    </Col>
                                                    <Col span={6}>
                                                    <Select showSearch defaultValue="Vendor Name" onChange={getVendor} style={{ width: 250 }}  >
                                                        {vendorname.map((val, i) => (
                                                            <Option value={val} key={val}>{val}</Option>

                                                        ))}

                                                    </Select>
                                                  
                                        </Col>
                                        <Row gutter={50} style={{marginTop:20}}>
                                            
                                            <Col span={12}>

                                                <Input type="text" onChange={getVendorStylecode} placeholder="Vendor Style code" />

                                            </Col>
                                            <Col>
                                                <TextArea style={{ height: 50 }} />
                                            </Col>
                                        </Row>
                                    </Row>
                                </Cards>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ marginTop: 20 }}>
                        <Column genrateFeed={(col, val) => genrateFeed(Ebay, col, isSeller, val)} additionalColumns={EbayColumn} columnDropdown={columnDropdown} />

                    </Col>
                </Row>


            </div>

            <Modal
                title="Report Summary Add Inventory Template"
                centered
                visible={visible}
                onOk={() => Download(downloadDataState)}

                onCancel={() => setVisible(false)}
                width={1000} >


                <div className="table-responsive">
                    <EbayHtml state={state} />
                </div>



            </Modal>

        </>
    )
}


export default Ebay;