import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const AmazonShipmentView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Amazon Orders" centered>
                <TabPane tab="Amazon Orders" key="Amazon Orders">
                    Amazon Orders  component goes here
                </TabPane>
                <TabPane tab="Non Amazon Orders" key="Non Amazon Orders">
                    Non Amazon Orders component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default AmazonShipmentView;
