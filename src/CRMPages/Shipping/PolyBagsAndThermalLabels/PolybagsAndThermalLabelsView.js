import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PolyBags from './PolyBags'
import ThermalBags from './ThermalBags'

const { TabPane } = Tabs;

const PolyBagsAndThermalLabelsView = (props) => {
    return (
        <>
            <Tabs type="card" defaultActiveKey="Poly Bag" style={{marginLeft: 20, marginRight: 20, marginTop: 20}} >
                <TabPane tab="Poly Bag" key="Poly Bag" >
                    <PolyBags />
                </TabPane>
                <TabPane tab="Thermal Bags" key="Thermal Bags">
                   <ThermalBags />
                </TabPane>
            </Tabs>
        </>
    );
};

export default PolyBagsAndThermalLabelsView;
