import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs, Modal, Spin } from 'antd';
import PNL from './PNL';
import SalesReport from './SalesReport'
import PONetAmount from './PONetAmount'
import InStockOrders from './InStockOrders'
import OrderSearch from './OrderSearch'
import OrderConfirmationNumber from './OrderConfirmationNumber'
import BackOrderItems from './BackOrderItems'

const { TabPane } = Tabs;

const OrderReportsView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Order Reports'];

    console.log(tabChildBar);
  

    const topManu = [
        {
            tab: 'PNL',
            key: 'PNL',
            tabName: <PNL onLoaderStateChange={(state) => { setIsLoader(state) }} />
        },
        {
            tab: 'Sales Report',
            key: 'Sales Report',
            tabName: <SalesReport />
        },
        {
            tab: `PO's Net Amount Report`,
            key: `PO's Net Amount Report`,
            tabName: <PONetAmount />
        },
        {
            tab: 'Instock Order Report',
            key: 'Instock Order Report',
            tabName: <InStockOrders />
        },
        {
            tab: 'Order Search',
            key: 'Order Search',
            tabName: <OrderSearch />
        },
        {
            tab: 'Order Confirmation Number',
            key: 'Order Confirmation Number',
            tabName: <OrderConfirmationNumber />
        }, {
            tab: 'Back Order Items',
            key: 'Back Order Items',
            tabName: <BackOrderItems />
        }
    ];


    return (
        <div >
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                {topManu.map(item =>
                tabChildBar?.includes(item.tab) && (
                    <TabPane tab={item.tab} key={item.key}>
                        {item.tabName}
                    </TabPane>))}
            </Tabs>
        </div>
    );
};

export default OrderReportsView;
