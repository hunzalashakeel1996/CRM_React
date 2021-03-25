import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import SummaryReport from './SummaryReport'
import ComparisonReport from './ComparisonReport'
import TopSelling from "./TopSelling";
import  PurchaseReport  from "./PurchaseReport";

const { TabPane } = Tabs;

const OtherReportsView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type={'card'} defaultActiveKey="Summary Report" style={{marginTop: 20, marginLeft: 20, marginRight: 20}} >
                <TabPane tab="Summary Report" key="Summary Report">
                    <SummaryReport />
                </TabPane>
                <TabPane tab="Purchase Report" key="Purchase Report">
                    <PurchaseReport />
                </TabPane>
                <TabPane tab="Comparison Report" key="Comparison Report">
                    <ComparisonReport/>
                </TabPane>
                <TabPane tab="Top Selling" key="Top Selling">
                   <TopSelling/>
                </TabPane>
            </Tabs>
        </>
    );
};

export default OtherReportsView;
