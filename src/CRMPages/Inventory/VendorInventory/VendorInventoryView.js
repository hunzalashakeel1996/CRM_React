
import { Col, Row, Spin, Tabs, Modal, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from './style';
import { Main } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import Regularsku from './overview/Regularsku'
import Groupsku from './overview/Groupsku'
import { webURL, audioPlay, uploadUrl, getvendor, getUpdateVendorInventoryapi } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;

const VendorInventoryView = (props) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('');
    const [state, setstate] = useState({
        Regularvendorstate: [],
        loader: true,
        updateData: [],
       VerificationData:[],

    })
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const { Regularvendorstate, loader } = state;

    useEffect(() => {
        dispatch(getvendor()).then(data => {
            console.log('aaaaa', data)
            setstate({ ...state, Regularvendorstate: data, loader: false })
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

            setVisible(true)
            setDataSource(checkVerificationResult)
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
                <TabPane tab="Group Skus" key="Group Skus">
                    <Groupsku />
                </TabPane>
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