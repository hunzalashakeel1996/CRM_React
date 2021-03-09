import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ShippingWeightView = (props) => {
    return (
        <>
            <Tabs type="card"defaultActiveKey="Duplicate Tracking" style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Duplicate Tracking" key="Duplicate Tracking">
                    Duplicate Tracking  component goes here
                </TabPane>
                <TabPane tab="Weight for Amazon Label" key="Weight for Amazon Label">
                    Weight for Amazon Label component goes here
                </TabPane>
                <TabPane tab="PONumber Weight report" key="PONumber Weight report">
                    PONumber Weight report component goes here
                </TabPane>
                <TabPane tab="Ship All" key="Ship All">
                    Ship All component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingWeightView;
