import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PolyBags from './PolyBags'
import ThermalBags from './ThermalBags'
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../../styled';

const { TabPane } = Tabs;

const PolyBagsAndThermalLabelsView = (props) => {
    const [activeTab, setActiveTab] = useState('');


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.child_bar)['PolyBags and Thermal Labels'];


    const topManu = [
        {
            tab: 'Poly Bag',
            key: 'Poly Bag',
            tabName: <PolyBags />
        },
        {
            tab: 'Thermal Bags',
            key: 'Thermal Bags',
            tabName: <ThermalBags />
        }

    ];

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

                {topManu.map(item => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}

            </Tabs>
            {/* <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }} >
                <TabPane 
                tab={<span> <FeatherIcon icon="briefcase" style={{ width: 15, height: 15, marginRight:5 }} />Poly Bag</span>} 
                key="Poly Bag" >
                    <PolyBags />
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="shopping-bag" style={{ width: 15, height: 15, marginRight:5 }} />Thermal Bags</span>} 
                key="Thermal Bags">
                    <ThermalBags />
                </TabPane>
            </Tabs> */}
        </>
    );
};

export default PolyBagsAndThermalLabelsView;
