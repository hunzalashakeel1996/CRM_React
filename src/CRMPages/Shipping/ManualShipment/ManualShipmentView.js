import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import EbayManualShipment from './EbayManualShipment';
import AmazonManualShipment from './AmazonManualShipment';
const { TabPane } = Tabs;

const ManualShipmentView = (props) => {
    return (
        <>
            <Tabs type="card" defaultActiveKey="Ebay " style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane tab="Amazon" key="Amazon">
                    <AmazonManualShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ManualShipmentView;
