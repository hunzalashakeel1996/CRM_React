import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const VendorInventoryView = (props) => {
   
    return (
        <>
            <Tabs defaultActiveKey="Regular Skus" style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Regular Skus" key="Regular Skus">
                    {formatDate(date)}
                </TabPane>
                <TabPane tab="Group Skus" key="Group Skus">
                    Group Skus component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default VendorInventoryView;