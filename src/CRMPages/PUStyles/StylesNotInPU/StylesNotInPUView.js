import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const StylesNotInPUView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Variations" centered>
                <TabPane tab="Variations" key="Variations">
                    Variations component goes here
                </TabPane>
                <TabPane tab="Style Code" key="Style Code">
                    Style Code component goes here
                </TabPane>
            </Tabs>
        </>
    );
};

export default StylesNotInPUView;
