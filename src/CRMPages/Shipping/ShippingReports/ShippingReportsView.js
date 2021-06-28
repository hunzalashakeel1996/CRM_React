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


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Shipping Reports'];


    const topManu = [
        {
            tab: 'Delivered Tracking Status',
            key: 'Delivered Tracking Status',
            tabName: <DeliveryTrackingStatus />
        }, {
            tab: 'InTransit Tracking',
            key: 'InTransit Tracking',
            tabName: <InTransitTracking />
        }, {
            tab: 'Web Label Orders',
            key: 'Web Label Orders',
            tabName: <WebLabelOrders />
        }, {
            tab: 'Marketplace Data Reports',
            key: 'Marketplace Data Reports',
            tabName: <AllMpShipment />
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
            {/* <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
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
            </Tabs> */}
        </>
    );
};

export default ShippingReportsView;
