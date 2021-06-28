import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import RMANotes from './RMANotes';
import RMAMonthlyReport from './RMAMonthlyReport';

const { TabPane } = Tabs;


    
const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
const tabChildBar = JSON.parse(userAccess.top_navigation)['RMA Updates'];


const topManu = [
    {
        tab: 'RMA Notes',
        key: 'RMA Notes',
        tabName: <RMANotes />
    },
    {
        tab: 'RMA Monthly Report',
        key: 'RMA Monthly Report',
        tabName: <RMAMonthlyReport />
    }

];

const RMAView = (props) => {
    return (
        <>
            <Tabs type="card" defaultActiveKey="RMA Notes" style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                {topManu.map(item => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}


                {/* <TabPane tab="RMA Notes" key="RMA Notes">
                    <RMANotes />
                </TabPane>
                <TabPane tab="RMA Monthly Report" key="RMA Monthly Report">
                    <RMAMonthlyReport />
                </TabPane> */}
            </Tabs>
        </>
    );
};

export default RMAView;
