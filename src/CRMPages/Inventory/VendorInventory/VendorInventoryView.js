import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const VendorInventoryView = (props) => {
    const [activeTab, setActiveTab] = useState('');
   
    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Regular Skus" key="Regular Skus">
                    {formatDate(date)}
                </TabPane>
                <TabPane tab="Group Skus" key="Group Skus">
                    Group Skus component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default VendorInventoryView;
