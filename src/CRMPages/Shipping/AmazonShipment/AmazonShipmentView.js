import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import AmazonShipment from './AmazonShipment';
import NonAmazonShipment from './NonAmazonShipment';
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const AmazonShipmentView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane
                    tab={<span> <FeatherIcon icon="shopping-cart" style={{ width: 15, height: 15, marginRight: 5 }} />Amazon Orders</span>}
                    key="Amazon Orders">
                    <AmazonShipment />
                </TabPane>
                <TabPane 
                tab={<span> <FeatherIcon icon="shopping-bag" style={{ width: 15, height: 15, marginRight: 5 }} />Non Amazon Orders</span>}
                key="Non Amazon Orders">
                    <NonAmazonShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default AmazonShipmentView;
