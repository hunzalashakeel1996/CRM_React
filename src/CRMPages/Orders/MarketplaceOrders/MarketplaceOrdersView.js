import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import WalmartOrders from './WalmartOrders'
import EbayOrders from './EbayOrders'
import SearsOrders from './SearsOrders'
import { checkPageAccess } from '../../../components/utilities/utilities';

const { TabPane } = Tabs;

const MarketplaceOrdersView = (props) => {
    const [activeTab, setActiveTab] = useState('');


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Marketplace Orders'];
    useEffect(() => {

        checkPageAccess(userAccess, 'Orders', "Marketplace Orders", props.history)
    })
    const topManu = [
        {
            tab: 'Walmart Orders',
            key: 'Walmart Orders',
            tabName: <WalmartOrders />
        },
        {
            tab: 'Ebay Orders',
            key: 'Ebay Orders',
            tabName: <EbayOrders />
        },
        {
            tab: `Sears Orders`,
            key: `Sears Orders`,
            tabName: <SearsOrders />
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
                {/* <TabPane tab="Walmart Orders" key="Walmart Orders">
                    <WalmartOrders />
                </TabPane>
                <TabPane tab="Ebay Orders" key="Ebay Orders">
                    <EbayOrders />
                </TabPane>
                <TabPane tab="Sears Orders" key="Sears Orders">
                    <SearsOrders />
                </TabPane> */}
            </Tabs>
        </>
    );
};

export default MarketplaceOrdersView;
