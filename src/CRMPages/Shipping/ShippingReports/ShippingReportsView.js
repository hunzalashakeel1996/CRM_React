import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import DeliveryTrackingStatus from './DeliveryTrackingStatus';
import InTransitTracking from './InTransitTracking';
import WebLabelOrders from './WebLabelOrders';
import AllMpShipment from './AllMPShipment';
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const ShippingReportsView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                <TabPane 
                tab={<span> <FeatherIcon icon="truck" style={{ width: 15, height: 15, marginRight: 5 }} />Delivered Tracking Status</span>}
                key="Delivered Tracking Status">
                    <DeliveryTrackingStatus />
                </TabPane>
                <TabPane
                    tab={<span> <FeatherIcon icon="corner-right-down" style={{ width: 15, height: 15, marginRight: 5 }} />InTransit Tracking</span>}
                    key="InTransit Tracking">
                    <InTransitTracking />
                </TabPane>
                <TabPane 
                    tab={<span> <FeatherIcon icon="paperclip" style={{ width: 15, height: 15, marginRight: 5 }} />Web Label Orders</span>}
                    key="Web Label Orders">
                    <WebLabelOrders />
                </TabPane>
                <TabPane 
                    tab={<span> <FeatherIcon icon="server" style={{ width: 15, height: 15, marginRight: 5 }} />All MP Shipment</span>}
                    key="Marketplace Data Reports">
                    <AllMpShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingReportsView;
