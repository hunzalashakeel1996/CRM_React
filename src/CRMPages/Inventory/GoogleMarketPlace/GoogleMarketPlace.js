import { Modal, notification, Spin, Table, Tabs,Row,Col,Select } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { useDispatch,useSelector } from 'react-redux';
import { getGoogleMarketPlaceVerifyapi,getGoogleMarketplaceNotVerifyUploadapi} from '../../../redux/apis/DataAction';
import { checkPageAccess, downloadFile } from '../../../components/utilities/utilities';
const { TabPane } = Tabs;
let requestObjInventroy = {
    vendorFilter: ""

};
const GoogleMarketPlace = (props) => {      

    let vendornameState = useSelector(state => state.tickets.vendornames);

         const [state,setState]=useState({
            file:'',
            dataTo:'',
            loaderState:false

          })
    
     const {file,dataTo,loaderState}=state;

     useEffect(() => {
        const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

        checkPageAccess(userAccess, 'Inventory', "Google MarketPlace", props.history)
    })
     
    const dispatch = useDispatch();

      const uploadFile = () => {
        setState({ ...state, file: event.target.files[0] })

    }
 
    
    const googleMarketplaceNotVerify = () => {
        setState({...state,loaderState:true})
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        // console.log('file', file)
        const formData = new FormData();
        formData.append('File', file);
     //  formData.append('datato', dataTo);
      
        formData.append('by', username.LoginName);

        dispatch(getGoogleMarketplaceNotVerifyUploadapi(formData)).then(data => {
            setState({...state,loaderState:false})
            notification.success({
                message: `Successfull Upload File Update SKU ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });


        })

    }
    const getGoogleVerifyReport = () => {
        setState({...state,loaderState:true})
        // let username = [];
        // username = JSON.parse(localStorage.getItem('user'))

        // // console.log('file', file)
        // const formData = new FormData();
        // formData.append('File', file);
        // formData.append('datato', dataTo);
      
        // formData.append('by', username.LoginName);

        dispatch(getGoogleMarketPlaceVerifyapi({'vendorFilter':requestObjInventroy.vendorFilter.toString()})).then(data => {
            setState({...state,loaderState:false})
             // console.log('Google Market Place',data)
            downloadFile(data)
            notification.success({
                message: `Successfull Download Google Markerplace Verift Report`,
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

            <Row style={{ margin: '15px 15px',}}>
                

            <Cards title="GoogleMarketPlace Not Approve">
                            <Col span={20} >
                
                                 <Button size="large"  type="primary" onClick={googleMarketplaceNotVerify}>GoogleMarketPlace Not Approve</Button>
                              
                                </Col>
                   
                                <Col span={24} style={{ marginTop: 10 }}>
                 
                                <input type="file" onChange={uploadFile} />
                              
                                </Col>
                                </Cards>
                </Row>
                <Row style={{ margin: '0px 15px',}}>
                <Cards title="GoogleMarketPlace ">
                    <Col span={24} >
                      
                
                          

                                <Select placeholder='Vendor Name' mode="multiple" allowClear onChange={(val) => { genrateFilter('vendorFilter', val, true) }} style={{ maxWidth: 300, width:'100%', }}  >
                                    {vendornameState.map((val, i) => (
                                        <Option value={`''${val}''`} key={val}>{val}</Option>

                                    ))}

                                </Select>
                         
                              
                    </Col>
                    <Col span ={6} style={{ marginTop: 10 }}>
                     <Button size="large"    type="success" onClick={getGoogleVerifyReport} >Generate</Button>


                </Col>
                </Cards>
                    </Row>
            </Spin>
        </>
    );
};

export default GoogleMarketPlace;
