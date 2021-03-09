import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PONumberWeight from './PONumberWeight';
import DuplicateTracking from './DuplicateTracking';
import WeightForAmazonLabels from './WeightForAmazonLabels';


const { TabPane } = Tabs;

const ShippingWeightView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Duplicate Tracking" centered>
                <TabPane tab="Duplicate Tracking" key="Duplicate Tracking">
                    <DuplicateTracking />
                </TabPane>
                <TabPane tab="Weight for Amazon Label" key="Weight for Amazon Label">
                    <WeightForAmazonLabels />
                </TabPane>
                <TabPane tab="PONumber Weight report" key="PONumber Weight report">
                    <PONumberWeight />
                </TabPane>
                <TabPane tab="Ship All" key="Ship All">
                    Ship All component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingWeightView;
