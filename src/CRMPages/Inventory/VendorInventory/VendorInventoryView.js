import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const VendorInventoryView = (props) => {


    return (
        <>
            <Tabs defaultActiveKey="Regular Skus" centered>
                <TabPane tab="Regular Skus" key="Regular Skus">
                    Regular skus component goes here
                </TabPane>
                <TabPane tab="Group Skus" key="Group Skus">
                    Group Skus component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default VendorInventoryView;
