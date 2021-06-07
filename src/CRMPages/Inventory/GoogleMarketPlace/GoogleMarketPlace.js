import { Modal, notification, Spin, Table, Tabs,Row,Col,Select } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { useDispatch,useSelector } from 'react-redux';
import { getGoogleMarketPlaceVerifyapi} from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
let requestObjInventroy = {
    vendorFilter: ""

};
const GoogleMarketPlace = (props) => {      
    let vendornameState = useSelector(state => state.tickets.vendornames);

         const [state,setState]=useState({
            file:'',
            dataTo:'',
            loaderState:true

          })
    
     const {file,dataTo,loaderState}=state;
     
    const dispatch = useDispatch();

      const uploadFile = () => {
        setState({...state,loaderState:true})
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        console.log('file', file)
        const formData = new FormData();
        formData.append('File', file);
        formData.append('datato', dataTo);
        formData.append('vendorFilter', requestObjInventroy.vendorFilter);
        formData.append('by', username.LoginName);

        dispatch(getGoogleMarketPlaceVerifyapi(formData)).then(data => {

            notification.success({
                message: `Successfull Upload File Update SKU ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });


        })

    }
    const genrateFilter = (obj, e, isArray) => {

        if (isArray)

            requestObjInventroy[obj] = [...e]
        else {

            requestObjInventroy[obj] = e
        }

    };
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={10} style={{ marginLeft: 20 }}>

                    <Cards headless>
                        <Row >
                            <Col span={10}>
                                <Button type="primary" onClick={""}>GoogleMarketPlace Not Approve</Button>

                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col span={8} style={{ width: 300, marginRight: 20 }}>
                            
                                <input type="file" onChange={uploadFile} />

                            </Col>
                        </Row>
                    </Cards>
                </Col>
                </Row>
                <Row gutter={50} style={{marginBottom: 20}}>
                    <Col span={8} >
                      

                          

                                <Select placeholder='Vendor Name' mode="multiple" allowClear onChange={(val) => { props.genrateFilter('vendorFilter', val, true) }} style={{ width: 300 }}  >
                                    {vendornameState.map((val, i) => (
                                        <Option value={`''${val}''`} key={val}>{val}</Option>

                                    ))}

                                </Select>
                         

                    </Col>
                    </Row>
            </Spin>
        </>
    );
};

export default GoogleMarketPlace;
