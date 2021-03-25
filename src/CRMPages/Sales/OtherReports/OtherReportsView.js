import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const OtherReportsView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Summary Report" key="Summary Report">
                    Summary Report  component goes here
                </TabPane>
                <TabPane tab="Purchase Report" key="Purchase Report">
                    Purchase Report component goes here
                </TabPane>
                <TabPane tab="Comparison Report" key="Comparison Report">
                    Comparison Report component goes here
                </TabPane>
                <TabPane tab="Top Selling" key="Top Selling">
                    Top Selling component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default OtherReportsView;
