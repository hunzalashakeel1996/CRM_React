import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import EbayManualShipment from './EbayManualShipment';
import AmazonManualShipment from './AmazonManualShipment';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';

const ManualShipmentView = (props) => {
    const [activeTab, setActiveTab] = useState('');



    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Manual Shipment'];


    const topManu = [
        {
            tab: 'Amazon',
            key: 'Amazon',
            tabName: <AmazonManualShipment />
        }
    ];

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

                {topManu.map(item => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}

            </Tabs>
        </>
    );
};

export default ManualShipmentView;
