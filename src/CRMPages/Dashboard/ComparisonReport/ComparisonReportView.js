import React, { useEffect, useState } from 'react';
import AmazonComparisonReports from './Amazon/AmazonComparisonReports';
import { Row, Col, Tabs } from 'antd';
import WalmartComparisonReports from './Walmart/WalmartComparisonReports';
import PUComparisonReports from './PU/PUComparisonReports';
import JLCComparisonReports from './JLC/JLCComparisonReports';

const { TabPane } = Tabs;

const ComparisonReportView = () => {

    return (
        <>
            <Tabs type={'card'} defaultActiveKey="Amazon" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }} >
                <TabPane tab="Amazon" key="Amazon">
                    <AmazonComparisonReports />
                </TabPane>
                <TabPane tab="Walmart" key="Walmart">
                    <WalmartComparisonReports />
                </TabPane>
                <TabPane tab="Pulse Uniform" key="Pulse Uniform">
                    <PUComparisonReports />
                </TabPane>
                <TabPane tab="Just Lab Coats" key="Just Lab Coats">
                    <JLCComparisonReports />
                </TabPane>
            </Tabs>
        </>
    );
};

export default ComparisonReportView;
