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
import FeatherIcon from 'feather-icons-react';

const { TabPane } = Tabs;
const ReportView = (props) => {
    const [activeTab, setActiveTab] = useState('');

     return (
        <>
            <Tabs type="card" defaultActiveKey={"SalesReport"} onChange={(key) => { setActiveTab(key) }}  style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />SalesReport</span>}
                key="SalesReport">
                    <SalesReport />
                    
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />ComparisonReport</span>}
                key="ComparisonReport">
                    <ComparisonReport />
                    
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />TeamReport</span>}
                key="TeamReport">
                    <TeamReport />
                </TabPane>
                {/* <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Return Recieved</span>}
                key="Return Recieved">
                    <ReturnRecieved />
                </TabPane> */}
                {/* <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Order Process</span>}
                key="Order Process">
                    <OrderProcess />
                </TabPane> */}
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Vendor Sales</span>}
                key="Vendor Sales">
                    <VendorSales />
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Un-Shipped Orders</span>}
                key="Un-Shipped Orders">
                    <UnShippedOrders />
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Sales Summary</span>}
                key="Sales Summary">
                    <SalesSummary />
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Target Summary Report</span>}
                key="Target Summary Report">
                    <TargetSummaryReport />
                </TabPane>
                <TabPane
                tab={<span> <FeatherIcon icon="book-open" style={{ width: 15, height: 15, marginRight: 5 }} />Return Percentage
                </span>}
                key="Return Percentage">
                    <ReturnPercentage/>
                </TabPane>
            </Tabs>
            
        </>
    );
};

export default ReportView;
