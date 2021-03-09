import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const MarketplaceOrdersView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Walmart Orders" centered>
                <TabPane tab="Walmart Orders" key="Walmart Orders">
                    Walmart Orders  component goes here
                </TabPane>
                <TabPane tab="Update Walmart Orders Emails" key="Update Walmart Orders Emails">
                    Update Walmart Orders Emails component goes here
                </TabPane>
                <TabPane tab="Ebay Orders" key="Ebay Orders">
                    Ebay Orders component goes here
                </TabPane>
                <TabPane tab="Sears Orders" key="Sears Orders">
                    Sears Orders component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default MarketplaceOrdersView;
