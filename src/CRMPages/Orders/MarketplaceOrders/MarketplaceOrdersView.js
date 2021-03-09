import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import WalmartOrders from './WalmartOrders'
import EbayOrders from './EbayOrders'
import SearsOrders from './SearsOrders'

const { TabPane } = Tabs;

const MarketplaceOrdersView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Walmart Orders" centered>
                <TabPane tab="Walmart Orders" key="Walmart Orders">
                    <WalmartOrders />
                </TabPane>
                <TabPane tab="Ebay Orders" key="Ebay Orders">
                    <EbayOrders />
                </TabPane>
                <TabPane tab="Sears Orders" key="Sears Orders">
                    <SearsOrders />
                </TabPane>
            </Tabs>
        </>
    );
};

export default MarketplaceOrdersView;
