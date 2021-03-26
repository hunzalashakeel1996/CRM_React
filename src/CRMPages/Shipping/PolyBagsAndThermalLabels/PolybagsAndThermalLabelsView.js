import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PolyBags from './PolyBags'
import ThermalBags from './ThermalBags'
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const PolyBagsAndThermalLabelsView = (props) => {
    return (
        <>
            <Tabs type="card" defaultActiveKey="Poly Bag" style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }} >
                <TabPane 
                tab={<span> <FeatherIcon icon="users" style={{ width: 20, height: 20, marginRight:5 }} />Poly Bag</span>} 
                key="Poly Bag" >
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
