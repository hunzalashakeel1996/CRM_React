import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import UpdateOrderNotes from './UpdateOrderNotes';
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;

const ShippingNotesView = (props) => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }}  style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Update Orders Notes</span>}
                key="Update Orders Notes">
                    <UpdateOrderNotes />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingNotesView;
