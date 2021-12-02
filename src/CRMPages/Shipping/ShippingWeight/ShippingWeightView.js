import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PONumberWeight from './PONumberWeight';
import DuplicateTracking from './DuplicateTracking';
import WeightForAmazonLabels from './WeightForAmazonLabels';
import FeatherIcon from 'feather-icons-react';
import { checkPageAccess } from '../../../components/utilities/utilities';


const { TabPane } = Tabs;

const ShippingWeightView = (props) => {

    const [activeTab, setActiveTab] = useState('');
    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Shipping Weight'];
 


    useEffect(() => {
        checkPageAccess(userAccess, 'Shipping', "Shipping Weight", props.history)
    })

    const topManu = [
        {
            tab: 'Duplicate Tracking',
            key: 'Duplicate Tracking',
            tabName: <DuplicateTracking />
        }, 
        {
            tab: 'PONumber Weight report',
            key: 'PONumber Weight report',
            tabName: <PONumberWeight />
        }, 
        {
            tab: 'Weight For Amazon Label',
            key: 'Weight For Amazon Label',
            tabName: <WeightForAmazonLabels />
        }
    ];
  
    return (
        <>
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

                {topManu.map((item, i) => (
                         
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {item.tabName}
                        </TabPane>)

                ))}
         
    
            </Tabs>
           
        </>
    );
};

export default ShippingWeightView;
