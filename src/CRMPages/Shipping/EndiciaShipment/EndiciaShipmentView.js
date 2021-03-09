import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import EndiciaPU from './EndiciaPU';
import EndiciaRizno from './EndiciaRizno';
import EndiciaRefund from './EndiciaRefund';
const { TabPane } = Tabs;

const EndiciaShipmentView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Endica PU" centered>
                <TabPane tab="Endica PU" key="Endica PU">
                    <EndiciaPU />
                </TabPane>
                <TabPane tab="Endicia Rizno" key="Endicia Rizno">
                <EndiciaRizno />
                </TabPane>
                <TabPane tab="Endicia Refund" key="Endicia Refund">
                <EndiciaRefund />
                </TabPane>
            </Tabs>
        </>
    );
};

export default EndiciaShipmentView;
