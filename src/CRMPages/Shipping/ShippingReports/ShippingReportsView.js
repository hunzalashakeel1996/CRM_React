import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import DeliveryTrackingStatus from './DeliveryTrackingStatus';
import InTransitTracking from './InTransitTracking';
import WebLabelOrders from './WebLabelOrders';
import AllMpShipment from './AllMPShipment';

const { TabPane } = Tabs;

const ShippingReportsView = (props) => {
    return (
        <>
            <Tabs type="card"defaultActiveKey="Delivered Tracking Status" style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                <TabPane tab="Delivered Tracking Status" key="Delivered Tracking Status">
                    <DeliveryTrackingStatus />
                </TabPane>
                <TabPane tab="InTransit Tracking" key="InTransit Tracking">
                    <InTransitTracking />
                </TabPane>
                <TabPane tab="Web Label Orders" key="Web Label Orders">
                    <WebLabelOrders />
                </TabPane>
                <TabPane tab="All MP Shipment" key="Marketplace Data Reports">
                    <AllMpShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingReportsView;
