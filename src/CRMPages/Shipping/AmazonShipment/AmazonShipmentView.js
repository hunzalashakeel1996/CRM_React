import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import AmazonShipment from './AmazonShipment';
import NonAmazonShipment from './NonAmazonShipment';

const { TabPane } = Tabs;

const AmazonShipmentView = (props) => {
    return (
        <>
            <Tabs type="card"defaultActiveKey="Amazon Orders" style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                <TabPane tab="Amazon Orders" key="Amazon Orders">
                    <AmazonShipment />
                </TabPane>
                <TabPane tab="Non Amazon Orders" key="Non Amazon Orders">
                    <NonAmazonShipment />
                </TabPane>
            </Tabs>
        </>
    );
};

export default AmazonShipmentView;
