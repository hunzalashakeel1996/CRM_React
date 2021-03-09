import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import UpdateOrderNotes from './UpdateOrderNotes';

const { TabPane } = Tabs;

const ShippingNotesView = (props) => {
    return (
        <>
            <Tabs type="card" defaultActiveKey="Notes"  style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                <TabPane tab="Update Orders Notes" key="Update Orders Notes">
                    <UpdateOrderNotes />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingNotesView;
