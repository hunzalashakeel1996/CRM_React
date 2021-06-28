import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import AmazonShipment from './AmazonShipment';
import NonAmazonShipment from './NonAmazonShipment';
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const AmazonShipmentView = (props) => {
    const [activeTab, setActiveTab] = useState('');




    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Amazon Shipment'];


    const topManu = [
        {
            tab: 'Amazon Orders',
            key: 'Amazon Orders',
            tabName: <AmazonShipment />
        },
        {
            tab: 'Non Amazon Orders',
            key: 'Non Amazon Orders',
            tabName: <NonAmazonShipment />
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
                    tab={<span> <FeatherIcon icon="shopping-cart" style={{ width: 15, height: 15, marginRight: 5 }} />Amazon Orders</span>}
                    key="Amazon Orders">
                    <AmazonShipment />
                </TabPane>
                <TabPane 
                tab={<span> <FeatherIcon icon="shopping-bag" style={{ width: 15, height: 15, marginRight: 5 }} />Non Amazon Orders</span>}
                key="Non Amazon Orders">
                    <NonAmazonShipment />
                </TabPane>
            </Tabs> */}
        </>
    );
};

export default AmazonShipmentView;
