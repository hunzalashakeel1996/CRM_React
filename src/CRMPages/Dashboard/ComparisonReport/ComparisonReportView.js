import React, { useEffect, useState } from 'react';
import ComparisonReports from './overview/ComparisonReports'
import SaleReport from './overview/SaleReport'
import TeamReport from './overview/TeamReport'
import VendorSales from './overview/VendorSales'
import SaleSummary from './overview/SaleSummary'
import TargetSummary from './overview/TargetSummary'
import { Row, Col, Tabs } from 'antd';

const { TabPane } = Tabs;

const ComparisonReportView = () => {

    return (
        <>
            <Tabs type={'card'} defaultActiveKey="ComparisonReport" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }} >
                <TabPane tab="Comparison Report" key="ComparisonReport">
                    <ComparisonReports />
                </TabPane>
                {/* <TabPane tab="Sale Report" key="SaleReport">
                    <SaleReport />
                </TabPane>
                <TabPane tab="Team Report" key="TeamReport">
                    <TeamReport />
                </TabPane>
                <TabPane tab="Vendor Sales" key="VendorSales">
                    <VendorSales />
                </TabPane>
                <TabPane tab="Sale Sumary" key="SaleSummary">
                    <SaleSummary />
                </TabPane>
                <TabPane tab="Target Sumary" key="TargetSummary">
                    <TargetSummary />
                </TabPane> */}
            </Tabs>
        </>
    );
};

export default ComparisonReportView;
