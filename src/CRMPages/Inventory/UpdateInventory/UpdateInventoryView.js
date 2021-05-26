import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs,Spin } from 'antd';
import AmazonUpdateInventory from './overview/AmazonUpdateInventory';
import AmazonCanadaUpdateInvenory from './overview/AmazonCanadaUpdateInvenory';
import AmazonUAEUpdateInventory from './overview/AmazonUAEUpdateInventory';
import AmazonUpdateSubinventory from './overview/AmazonUpdateSubinventory';
import SKUstatus from './overview/SKUstatus';
import GroupStatus from './overview/GroupStatus';
const { TabPane } = Tabs;

const UpdateInventoryView = (props) => {

    const [activeTab, setActiveTab] = useState('');

    // const [state, setState] = useState({
      
    //     loaderState: true
    // });

  
    return (
        <>
      {/* <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} > */}
            <Tabs type="card" style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }} defaultActiveKey={activeTab} onChange={(key) => {setActiveTab(key)}} centered>
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
                <GroupStatus/>
                </TabPane>
                <TabPane tab="Skus Status" key="Skus Status">
                <SKUstatus/>
                </TabPane>
            </Tabs>
            {/* </Spin > */}
        </>
    );
};

export default UpdateInventoryView;
