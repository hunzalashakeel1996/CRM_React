import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import UpdateOrderNotes from './UpdateOrderNotes';

const { TabPane } = Tabs;

const ShippingNotesView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Notes" centered>
                <TabPane tab="Update Orders Notes" key="Update Orders Notes">
                    <UpdateOrderNotes />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ShippingNotesView;
