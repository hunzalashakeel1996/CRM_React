import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import EbayManualShipment from './EbayManualShipment';
import AmazonManualShipment from './AmazonManualShipment';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';

const ManualShipmentView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane 
                    tab={<span> <FeatherIcon icon="package" style={{ width: 15, height: 15, marginRight: 5 }} />Amazon</span>}
                    key="Amazon">
                    <AmazonManualShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ManualShipmentView;
