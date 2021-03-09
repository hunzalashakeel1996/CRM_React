import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const UpdateInventoryView = (props) => {


    return (
        <>
            <Tabs type="card"defaultActiveKey="Amazon Inventory" style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Amazon Inventory" key="Amazon Inventory">
                    Amazon Inventory component goes here
                </TabPane>
                <TabPane tab="Amazon Canada Inventory" key="Amazon Canada Inventory">
                    Amazon Canada Inventory component goes here
                </TabPane>
                <TabPane tab="Amazon Group Skus" key="Amazon Group Skus">
                    Amazon Group Skus component goes here
                </TabPane>
                <TabPane tab="Skus Status" key="Skus Status">
                    Skus Status component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default UpdateInventoryView;
