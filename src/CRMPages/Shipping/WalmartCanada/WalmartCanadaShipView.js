import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

import WalmartCanadaShip from './overview/WalmartCanadaShip';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';
import { checkPageAccess } from '../../../components/utilities/utilities';

const WalmartCanadaShipView = (props) => {
    const [activeTab, setActiveTab] = useState('');




    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Walmart Canada Ship'];

    useEffect(() => {
        checkPageAccess(userAccess, 'Shipping', "Walmart Canada Ship", props.history)
    })
    const topManu = [
       
        ,
        {
            tab: 'Walmart Canada Ship',
            key: 'Walmart Canada Ship',
            tabName: <WalmartCanadaShip />
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
            {/* <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane 
                    tab={<span> <FeatherIcon icon="underline" style={{ width: 15, height: 15, marginRight: 5 }} />Endica PU</span>}
                    key="Endica PU">
                    <EndiciaPU />
                </TabPane>
                <TabPane
                    tab={<span> <FeatherIcon icon="box" style={{ width: 15, height: 15, marginRight: 5 }} />Endicia Rizno</span>}
                    key="Endicia Rizno">
                    <EndiciaRizno />
                </TabPane>
                <TabPane
                    tab={<span> <FeatherIcon icon="rotate-ccw" style={{ width: 15, height: 15, marginRight: 5 }} />Endicia Refund</span>}
                    key="Endicia Refund">
                    <EndiciaRefund />
                </TabPane>
            </Tabs> */}
        </>
    );
};

export default WalmartCanadaShipView;
