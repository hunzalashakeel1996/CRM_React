import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ShippingReportsView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Delivered Tracking Status" centered>
                <TabPane tab="Delivered Tracking Status" key="Delivered Tracking Status">
                    Delivered Tracking Status  component goes here
                </TabPane>
                <TabPane tab="InTransit Tracking" key="InTransit Tracking">
                    InTransit Tracking component goes here
                </TabPane>
                <TabPane tab="Web Label Orders" key="Web Label Orders">
                    Web Label Orders component goes here
                </TabPane>
                <TabPane tab="Marketplace Data Reports" key="Marketplace Data Reports">
                    Marketplace Data Reports component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingReportsView;
