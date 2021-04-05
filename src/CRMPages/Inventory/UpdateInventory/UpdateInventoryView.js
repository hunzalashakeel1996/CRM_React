import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs,Spin } from 'antd';
import AmazonUpdateInventory from './overview/AmazonUpdateInventory';
import AmazonCanadaUpdateInvenory from './overview/AmazonCanadaUpdateInvenory';
import AmazonUAEUpdateInventory from './overview/AmazonUAEUpdateInventory';
import AmazonUpdateSubinventory from './overview/AmazonUpdateSubinventory';
const { TabPane } = Tabs;

const UpdateInventoryView = (props) => {

    const [activeTab, setActiveTab] = useState('');

    // const [state, setState] = useState({
      
    //     loaderState: true
    // });

  
    return (
        <>
     
            <Tabs defaultActiveKey={activeTab} onChange={(key) => {setActiveTab(key)}} centered>
                <TabPane tab="Amazon Inventory" key="Amazon Inventory">
                <AmazonUpdateInventory />
                </TabPane>
                <TabPane tab="Amazon Canada Inventory" key="Amazon Canada Inventory">
                <AmazonCanadaUpdateInvenory />
                </TabPane>
                <TabPane tab="Amazon UAE Inventory" key="Amazon UAE Inventory">
                <AmazonUAEUpdateInventory />
                </TabPane>
                <TabPane tab="Amazon Subinventory" key="Amazon Subinventory">
                <AmazonUpdateSubinventory />
                </TabPane>
                <TabPane tab="Amazon Group Skus" key="Amazon Group Skus">
                    Amazon Group Skus component goes here
                </TabPane>
                <TabPane tab="Skus Status" key="Skus Status">
                    Skus Status component goes here
                </TabPane>
            </Tabs>
      
        </>
    );
};

export default UpdateInventoryView;
