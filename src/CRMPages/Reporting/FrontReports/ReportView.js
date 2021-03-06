import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import SalesReport from './SalesReport';
import TeamReport from './TeamReport';
import ComparisonReport from './ComparisonReport';
import ReturnRecieved from './ReturnReceived';
import OrderProcess from './OrderProcess';
import VendorSales from './VendorSales';
import UnShippedOrders from './UnShippedOrders';
import SalesSummary from './SalesSummary';
import TargetSummaryReport from './TargetSummaryReport';
import ReturnPercentage from './ReturnPercentage';
import RefundReport from './RefundReport';
import RefundReportCount from './RefundReportCount';

import FeatherIcon from 'feather-icons-react';
import { checkPageAccess } from '../../../components/utilities/utilities';


const { TabPane } = Tabs;
const ReportView = (props) => {
    const [activeTab, setActiveTab] = useState('');


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['FrontReports'];
    
    useEffect(() => {
        checkPageAccess(userAccess, 'Reporting', "FrontReports", props.history)
    })

    const topManu = [
        {
            tab: 'SalesReport',
            key: 'SalesReport',
            tabName: <SalesReport />
        },
        {
            tab: 'ComparisonReport',
            key: 'ComparisonReport',
            tabName: <ComparisonReport />
        },
        {
            tab: `TeamReport`,
            key: `TeamReport`,
            tabName: <TeamReport />
        },
        {
            tab: `Vendor Sales`,
            key: `Vendor Sales`,
            tabName: <VendorSales />
        },
        {
            tab: `Un-Shipped Orders`,
            key: `Un-Shipped Orders`,
            tabName: <UnShippedOrders />
        },
        {
            tab: `Target Summary Report`,
            key: `Target Summary Report`,
            tabName: <TargetSummaryReport />
        }
        ,
        {
            tab: `Return Percentage`,
            key: `Return Percentage`,
            tabName: <ReturnPercentage />
        },
        {
            tab: `RefundReport`,
            key: `RefundReport`,
            tabName: <RefundReport />
        },
        {
            tab: `RefundReportCount`,
            key: `RefundReportCount`,
            tabName: <RefundReportCount />
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


        </>
    );
};

export default ReportView;
