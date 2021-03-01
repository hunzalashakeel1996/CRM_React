import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const OrderReportsView = (props) => {
    return (
        <div >
            <Tabs defaultActiveKey="PNL" style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="PNL" key="PNL">
                   
                    PNL  component goes here<br />
                </TabPane>
                <TabPane tab="Sales Report" key="Sales Report">
                    Sales Report component goes here
                </TabPane>
                <TabPane tab="PO's Net Amount Report" key="PO's Net Amount Report">
                    PO's Net Amount Report component goes here
                </TabPane>
                <TabPane tab="Instock Order Report" key="Instock Order Report">
                    Instock Order Report component goes here
                </TabPane>
                <TabPane tab="Order Search" key="Order Search">
                    Order Search component goes here
                </TabPane>
                <TabPane tab="Order Confirmation Number" key="Order Confirmation Number">
                    Order Confirmation Number component goes here
                </TabPane>
                <TabPane tab="Back Order Items" key="Back Order Items">
                    Back Order Items component goes here
                </TabPane>
            </Tabs>
        </div>
    );
};

export default OrderReportsView;
