import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import StyleCodes from './StyleCodes';
import Variations from './Variations';
import PUAppScript from './PUAppScript';

const { TabPane } = Tabs;

const StylesNotInPUView = (props) => {
    const [activeTab, setActiveTab] = useState('');
    
    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Styles Not in PU'];


    const topManu = [
        {
            tab: 'Style Code',
            key: 'Style Code',
            tabName: <StyleCodes />
        },
        {
            tab: 'Variations',
            key: 'Variations',
            tabName: <Variations />
        },
        {
            tab: `PUAppScript`,
            key: `PUAppScript`,
            tabName: <PUAppScript />
        }

    ];

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                {topManu.map(item => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}



                {


            /* <TabPane tab="Style Code" key="Style Code">
                    <StyleCodes />
                </TabPane>
                <TabPane tab="Variations" key="Variations">
                    <Variations />
                </TabPane>
                <TabPane tab="PUAppScript" key="PUAppScript">
                    <PUAppScript />
                </TabPane> */}
            </Tabs>
        </>
    );
};

export default StylesNotInPUView;
