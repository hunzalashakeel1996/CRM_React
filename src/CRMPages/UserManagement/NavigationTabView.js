import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import DeleteNavigationTab from './DeleteNavigationTab'
import AddNavigationTab from './AddNavigationTab'
import { checkPageAccess } from '../../components/utilities/utilities';


const { TabPane } = Tabs;

const NavigationTabView = (props) => {
    const [activeTab, setActiveTab] = useState('');


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Add Navigation Tab'];

    useEffect(() => {
        checkPageAccess(userAccess, 'User Management', "Add Navigation Tab", props.history)
    })

    const topManu = [
        {
            tab: 'Add Navigation',
            key: 'Add Navigation',
            tabName: <AddNavigationTab />
        },
        {
            tab: 'Delete Navigation',
            key: 'Delete Navigation',
            tabName: <DeleteNavigationTab />
        }

    ];

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

                {topManu.map(item => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}

            </Tabs>
        </>
    );
};

export default NavigationTabView;
