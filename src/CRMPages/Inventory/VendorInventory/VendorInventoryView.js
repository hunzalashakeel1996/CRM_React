import { Modal, notification, Spin, Table, Tabs } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getUpdateVendorInventoryapi, getvendor, getUpdateWebVendorInventoryapi, getWebvendor } from '../../../redux/apis/DataAction';
import Regularsku from './overview/Regularsku';
import WebInventory from './overview/WebInventory';


// import { ProjectHeader, ProjectSorting } from './style';
// import Groupsku from './overview/Groupsku'
const { TabPane } = Tabs;

const VendorInventoryView = (props) => {

    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Vendor Inventory'];

    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('');
    const [state, setstate] = useState({
        Regularvendorstate: [],
        webVendorstate: [],
        isLoader: true,
        updateData: [],
        VerificationData: [],

    })





    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const { Regularvendorstate, isLoader, webVendorstate } = state;

    useEffect(() => {
        Promise.all([dispatch(getvendor()), dispatch(getWebvendor())]).then(data => {
            setstate({ ...state, Regularvendorstate: data[0], webVendorstate: data[1], isLoader: false })
        })
        // dispatch(getvendor()).then(data => {
        //     // console.log('Regular', data)
        //     setstate({ ...state, Regularvendorstate: data, isLoader: false })
        // })

        // dispatch(getWebvendor()).then(data => {
        //     // console.log('web', data)
        //     setstate({ ...state, webVendorstate: data, isLoader: false })
        // })

    }, [])

    let Verificationdata = [];
    let counter = 0;

    const updateWebVendor = (updateVendorList) => {
        // console.log('abc', updateVendorList)
        setstate({ ...state, isLoader: true })

        /// Web Update inventory

        dispatch(getUpdateWebVendorInventoryapi(updateVendorList)).then(data => {
            setstate({ ...state, isLoader: false, updateData: data, VerificationData: [...updateVendorList] })
            // console.log('12310', data)
            let checkVerificationResult = []

            data.map((value, i) => {
                const { Vendorname, Mapprice, Cost } = value;
                return checkVerificationResult.push({
                    key: counter++,

                    vendorName: <span style={{ color: 'black' }} className="date-started">{Vendorname}</span>,
                    changeMapprice: <span style={{ color: 'black' }} className="date-started">{Mapprice}</span>,
                    changeCost: <span style={{ color: 'black' }} className="date-started">{Cost}</span>

                });

            });
            // // console.log(data[0].includes=="Scrub")
            // data[0].includes("Scrub ")
            if (data[0].Confirm == "Confirm") {
                setVisible(true)
                setDataSource(checkVerificationResult)

            }
            else {
                notification.success({
                    message: `Successfull  ${data}`,
                    description: `Successfully Report`,
                    onClose: close,
                });
                //  window.location.reload(false)
            }
            // console.log('dataSource', dataSource)

        })

    }
    const updateVendor = (updateVendorList) => {
        // console.log('abc', updateVendorList)
        setstate({ ...state, isLoader: true })

        dispatch(getUpdateVendorInventoryapi(updateVendorList)).then(data => {
            setstate({ ...state, isLoader: false, updateData: data, VerificationData: [...updateVendorList] })
            // console.log('12310', data)
            let checkVerificationResult = []

            data.map((value, i) => {
                const { Vendorname, Mapprice, Cost } = value;
                return checkVerificationResult.push({
                    key: counter++,

                    vendorName: <span style={{ color: 'black' }} className="date-started">{Vendorname}</span>,
                    changeMapprice: <span style={{ color: 'black' }} className="date-started">{Mapprice}</span>,
                    changeCost: <span style={{ color: 'black' }} className="date-started">{Cost}</span>

                });

            });
            // // console.log(data[0].includes=="Scrub")
            // data[0].includes("Scrub ")
            if (data[0].Confirm == "Confirm") {
                setVisible(true)
                setDataSource(checkVerificationResult)

            }
            else {
                notification.success({
                    message: `Successfull  ${data}`,
                    description: `Successfully Report`,
                    onClose: close,
                });
                //  window.location.reload(false)
            }
            // console.log('dataSource', dataSource)

        })


    }
    const columns = [
        {
            title: 'vendorName',
            dataIndex: 'vendorName',
            key: 'vendorName',
        },
        {
            title: 'changeMapprice',
            dataIndex: 'changeMapprice',
            key: 'changeMapprice',
        },
        {
            title: 'changeCost',
            dataIndex: 'changeCost',
            key: 'changeCost',
        }

    ];
    const vendorconfirm = () => {
        let temp = [...state.VerificationData]
        temp.map(value => {
            value.vendorconfirm = "confirm"
        })
        // console.log(temp)

        setstate({ ...state, VerificationData: temp })


        dispatch(getUpdateVendorInventoryapi(temp)).then(result => {
            setVisible(false)
            window.location.reload(false)
        })
    }


    

    const topManu = [
        {
            tab: 'Regular Skus',
            key: 'Regular Skus',
            tabName: <Regularsku Regularvendor={Regularvendorstate} updateVendor={updateVendor} />
        },
        {
            tab: 'Web Vendors',
            key: 'Web Vendors',
            tabName: <WebInventory webVendor={webVendorstate} updateVendor={updateWebVendor} />

        }


    ];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >


                <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

                    {topManu.map(item => (
                        tabChildBar?.includes(item.tab) && (
                            <TabPane tab={item.tab} key={item.key}>
                                {item.tabName}
                            </TabPane>)

                    ))}

                </Tabs>


                {/* <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20 }}>
                    <TabPane tab="Regular Skus" key="Regular Skus">
                      
                        <Regularsku Regularvendor={Regularvendorstate} updateVendor={updateVendor} />

                    </TabPane>
                    <TabPane tab="Web Vendors" key="Web Vendors">

                        <WebInventory webVendor={webVendorstate} updateVendor={updateWebVendor} />

                   


                    </TabPane>
                </Tabs> */}

                <Modal
                    title="Report Summary "
                    centered
                    visible={visible}

                    onOk={() => vendorconfirm()}
                    onCancel={() => setVisible(false)}
                    width={1000}
                >



                    <Table pagination={true} dataSource={dataSource} columns={columns} />




                </Modal>
            </Spin>
        </>
    );
};

export default VendorInventoryView;