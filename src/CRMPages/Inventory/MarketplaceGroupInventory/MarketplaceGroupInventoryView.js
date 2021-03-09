import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const MarketplaceGroupInventoryView = (props) => {


    return (
        <>
            <Tabs type="card"defaultActiveKey="Amazon PU" style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Amazon PU" key="Amazon PU">
                    Amazon PU component goes here
                </TabPane>
                <TabPane tab="Amazon Rizno" key="Amazon Rizno">
                    Amazon Rizno component goes here
                </TabPane>
                <TabPane tab="Amazon UAE" key="Amazon UAE">
                    Amazon UAE component goes here
                </TabPane>
                <TabPane tab="Walmart" key="Walmart">
                    Walmart component goes here
                </TabPane>
                <TabPane tab="Walmart Canada" key="Walmart Canada">
                    Walmart Canada component goes here
                </TabPane>
                <TabPane tab="Sears" key="Sears">
                    Sears component goes here
                </TabPane>
                <TabPane tab="Ebay" key="Ebay">
                    Ebay component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default MarketplaceGroupInventoryView;
