import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import EndiciaPU from './EndiciaPU';
import EndiciaRizno from './EndiciaRizno';
import EndiciaRefund from './EndiciaRefund';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';
import { checkPageAccess } from '../../../components/utilities/utilities';

const EndiciaShipmentView = (props) => {

    const [activeTab, setActiveTab] = useState('');
    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Endicia Shipment'];

    useEffect(() => {
        checkPageAccess(userAccess, 'Shipping', "Endicia Shipment", props.history)
    })

    const topManu = [
        {
            tab: 'Endicia PU',
            key: 'Endicia PU',
            tabName: <EndiciaPU />
        },
        {
            tab: 'Endicia Rizno',
            key: 'Endicia Rizno',
            tabName: <EndiciaRizno />
        }
        ,
        {
            tab: 'Endicia Refund',
            key: 'Endicia Refund',
            tabName: <EndiciaRefund />
        }
    ];

    return (
        <>

            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

                {topManu.map((item,i) => (
                    tabChildBar?.includes(item.tab) && (
                        <TabPane tab={item.tab} key={item.key}>
                            {console.log(i)}
                            {item.tabName}
                        </TabPane>)

                ))}

            </Tabs>
       
        </>
    );
};

export default EndiciaShipmentView;
