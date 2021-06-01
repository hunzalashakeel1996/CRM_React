import { Modal, notification, Spin, Table, Tabs } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getUpdateVendorInventoryapi, getvendor } from '../../../redux/apis/DataAction';
import Regularsku from './overview/Regularsku';


// import { ProjectHeader, ProjectSorting } from './style';
// import Groupsku from './overview/Groupsku'
const { TabPane } = Tabs;

const VendorInventoryView = (props) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('');
    const [state, setstate] = useState({
        Regularvendorstate: [],
        updateData: [],
       VerificationData:[],
       VerificationData: [],
        isLoader: true

    })
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const { Regularvendorstate, isLoader } = state;

    useEffect(() => {
        dispatch(getvendor()).then(data => {
            console.log('aaaaa', data)
            setstate({ ...state, Regularvendorstate: data, isLoader: false })
        })


    }, [])

    let Verificationdata = [];
    let counter = 0;

    const updateVendor = (updateVendorList) => {
        console.log('abc', updateVendorList)

        dispatch(getUpdateVendorInventoryapi(updateVendorList)).then(data => {
            setstate({ ...state, loader: false, updateData: data,  VerificationData: [...updateVendorList]  })
            console.log('12310', data)
            let checkVerificationResult = []
       
        data.map((value,i) => {
            const { Vendorname, Mapprice,Cost } = value;
        return checkVerificationResult.push({
            key: counter++,
               
            vendorName: <span style={{ color: 'black' }} className="date-started">{Vendorname}</span>,            
            changeMapprice: <span style={{ color: 'black' }} className="date-started">{Mapprice}</span>,
            changeCost: <span style={{ color: 'black' }} className="date-started">{Cost}</span>

        });
        console.log('counter',i)
    });
   // console.log(data[0].includes=="Scrub")
  // data[0].includes("Scrub ")
    if (data[0].Confirm=="Confirm"){
        setVisible(true)
        setDataSource(checkVerificationResult)
       
        }
        else {
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            window.location.reload(false)
        }
            console.log('dataSource', dataSource)

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
        console.log(temp)

        setstate({ ...state, VerificationData: temp })
      

        dispatch(getUpdateVendorInventoryapi(temp)).then(result => {
           setVisible(false)
           window.location.reload(false)
        })
    }
    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Regular Skus" key="Regular Skus">
                    {!loader ?
                        <div>
                            <Regularsku Regularvendor={Regularvendorstate} updateVendor={updateVendor} />
                        </div>
                        :
                        <div style={{ textAlign: 'center' }}>
                            <Spin />
                        </div>
                    }
                </TabPane>
                {/* asdad  */}
                {/* <TabPane tab="Group Skus" key="Group Skus">
                    <Groupsku />
                </TabPane> */}
            </Tabs>

            <Modal
                title="Report Summary "
                centered
                visible={visible}

                onOk={() => vendorconfirm()}
                onCancel={() => setVisible(false)}
                width={1000}
            >


                <div className="table-responsive">
                    <Table pagination={true} dataSource={dataSource} columns={columns} />
                </div>



            </Modal>
        </>
    );
};

export default VendorInventoryView;