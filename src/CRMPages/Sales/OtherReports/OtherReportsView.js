import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import SummaryReport from './SummaryReport'
import ComparisonReport from './ComparisonReport'
import TopSelling from "./TopSelling";
import PurchaseReport from "./PurchaseReport";

const { TabPane } = Tabs;

const OtherReportsView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Other Reports'];


    const topManu = [
        {
            tab: 'Summary Report',
            key: 'Summary Report',
            tabName: <SummaryReport />
        },
        {
            tab: 'Purchase Report',
            key: 'Purchase Report',
            tabName: <PurchaseReport />
        },
        {
            tab: 'Comparison Report',
            key: 'Comparison Report',
            tabName: <ComparisonReport />
        },
        {
            tab: 'Top Selling',
            key: 'Top Selling',
            tabName: <TopSelling />
        }

    ];

    return (
        <>
            <Tabs type={'card'} defaultActiveKey="Summary Report" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }} >
                {topManu.map(item => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}


                {/* <TabPane tab="Summary Report" key="Summary Report">
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
                </TabPane> */}
            </Tabs>
        </>
    );
};

export default OtherReportsView;
