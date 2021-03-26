import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import RMANotes from './RMANotes';
import RMAMonthlyReport from './RMAMonthlyReport';

const { TabPane } = Tabs;

const RMAView = (props) => {
    return (
        <>
            <Tabs type="card" defaultActiveKey="RMA Notes" style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane tab="RMA Notes" key="RMA Notes">
                    <RMANotes />
                </TabPane>
                <TabPane tab="RMA Monthly Report" key="RMA Monthly Report">
                    <RMAMonthlyReport />
                </TabPane>
            </Tabs>
        </>
    );
};

export default RMAView;
