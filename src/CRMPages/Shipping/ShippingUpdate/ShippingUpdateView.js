import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

import ShippingUpdate from './overview/ShippingUpdate';
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const ShippingRUpdateView = (props) => {
    const [activeTab, setActiveTab] = useState('');


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Shipping Update'];


    const topManu = [
        {
            tab: 'Shipping Update',
            key: 'Shipping Update',
            tabName: <ShippingUpdate />
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

export default ShippingRUpdateView;
