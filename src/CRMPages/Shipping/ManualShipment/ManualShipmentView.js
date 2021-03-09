import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import EbayManualShipment from './EbayManualShipment';
import AmazonManualShipment from './AmazonManualShipment';
const { TabPane } = Tabs;

const ManualShipmentView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Ebay " centered>
                
                <TabPane tab="Amazon" key="Amazon">
                <AmazonManualShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ManualShipmentView;
