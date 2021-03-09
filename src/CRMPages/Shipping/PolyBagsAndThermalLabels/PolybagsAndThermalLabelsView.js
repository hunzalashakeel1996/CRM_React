import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PolyBags from './PolyBags'
import ThermalBags from './ThermalBags'

const { TabPane } = Tabs;

const PolyBagsAndThermalLabelsView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Poly Bag" centered>
                <TabPane tab="Poly Bag" key="Poly Bag">
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
