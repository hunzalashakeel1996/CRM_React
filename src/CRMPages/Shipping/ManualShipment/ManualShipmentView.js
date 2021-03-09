import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ManualShipmentView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Ebay " centered>
                <TabPane tab="Ebay " key="Ebay ">
                    Ebay   component goes here
                </TabPane>
                <TabPane tab="Amaazon" key="Amaazon">
                    Amaazon component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default ManualShipmentView;
