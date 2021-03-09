import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const PolybagsAndThermalLabelsView = (props) => {
    return (
        <>
            <Tabs type="card"defaultActiveKey="PolyBags"  style={{marginLeft: 20, marginTop: 20}}>
                <TabPane tab="PolyBags" key="PolyBags" >
                    PolyBags  component goes here
                </TabPane>
                <TabPane tab="Thermal Labels" key="Thermal Labels">
                    Thermal Labels component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default PolybagsAndThermalLabelsView;
