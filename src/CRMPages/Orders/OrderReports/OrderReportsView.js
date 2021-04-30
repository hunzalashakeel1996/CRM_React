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

    return (
        <div >
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                <TabPane tab="PNL" key="PNL">
                    <PNL onLoaderStateChange={(state) => { setIsLoader(state) }} />
                </TabPane>
                <TabPane tab="Sales Report" key="Sales Report">
                    <SalesReport />
                </TabPane>
                <TabPane tab="PO's Net Amount Report" key="PO's Net Amount Report">
                    <PONetAmount />
                </TabPane>
                <TabPane tab="Instock Order Report" key="Instock Order Report">
                    <InStockOrders />
                </TabPane>
                <TabPane tab="Order Search" key="Order Search">
                    <OrderSearch />
                </TabPane>
                <TabPane tab="Order Confirmation Number" key="Order Confirmation Number">
                    <OrderConfirmationNumber />
                </TabPane>
                <TabPane tab="Back Order Items" key="Back Order Items">
                    <BackOrderItems />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default OrderReportsView;
