import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const EndiciaShipmentView = (props) => {
    return (
        <>
            <Tabs type="card"defaultActiveKey="Endica PU" style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="Endica PU" key="Endica PU">
                    Endica PU  component goes here
                </TabPane>
                <TabPane tab="Endicia Rizno" key="Endicia Rizno">
                    Endicia Rizno component goes here
                </TabPane>
                <TabPane tab="Endicia Refund" key="Endicia Refund">
                    Endicia Refund component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default EndiciaShipmentView;
