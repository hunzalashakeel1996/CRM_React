import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import UpdateOrderNotes from './UpdateOrderNotes';
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const ShippingNotesView = (props) => {
    const [activeTab, setActiveTab] = useState('');



    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.child_bar)['Shipping Notes'];


    const topManu = [
        {
            tab: 'Update Orders Notes',
            key: 'Update Orders Notes',
            tabName: <UpdateOrderNotes />
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
            {/* <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }}  style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Update Orders Notes</span>}
                key="Update Orders Notes">
                    <UpdateOrderNotes />
                </TabPane>
            </Tabs> */}
        </>
    );
};

export default ShippingNotesView;
