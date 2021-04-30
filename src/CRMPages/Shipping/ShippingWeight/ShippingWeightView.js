import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PONumberWeight from './PONumberWeight';
import DuplicateTracking from './DuplicateTracking';
import WeightForAmazonLabels from './WeightForAmazonLabels';
import FeatherIcon from 'feather-icons-react';


const { TabPane } = Tabs;

const ShippingWeightView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane
                    tab={<span> <FeatherIcon icon="copy" style={{ width: 15, height: 15, marginRight: 5 }} />Duplicate Tracking</span>}
                    key="Duplicate Tracking">
                    <DuplicateTracking />
                </TabPane>
                <TabPane
                    tab={<span> <FeatherIcon icon="layers" style={{ width: 15, height: 15, marginRight: 5 }} />Weight for Amazon Label</span>}
                    key="Weight for Amazon Label">
                    <WeightForAmazonLabels />
                </TabPane>
                <TabPane
                    tab={<span> <FeatherIcon icon="layout" style={{ width: 15, height: 15, marginRight: 5 }} />PONumber Weight report</span>}
                    key="PONumber Weight report">
                    <PONumberWeight />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingWeightView;
