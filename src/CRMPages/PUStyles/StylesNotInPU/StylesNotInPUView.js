import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import StyleCodes from './StyleCodes';
import Variations from './Variations';

const { TabPane } = Tabs;

const StylesNotInPUView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Style Code" centered>
            <TabPane tab="Style Code" key="Style Code">
                    <StyleCodes />
                </TabPane>
                <TabPane tab="Variations" key="Variations">
                    <Variations />
                </TabPane>
               
            </Tabs>
        </>
    );
};

export default StylesNotInPUView;
