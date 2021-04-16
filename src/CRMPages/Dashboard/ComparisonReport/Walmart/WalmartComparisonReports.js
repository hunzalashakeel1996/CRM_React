import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cards } from '../../../../components/cards/frame/cards-frame';
import { CardBarChart } from './style';
import { Bar } from 'react-chartjs-2';
import ReportBarChart from '../ReportBarChar';

const WalmartComparisonReports = () => {
  const [state, setState] = useState({
    selectedTimeline: 'week',
    isLoading: false,
    ordersReport: {
      today: [140, 727],
      week: [[3135, 4564, 5645, 3287], [2552, 4536, 5434, 2645]],
      month: [[1753, 1653, 1553, 1853, 1953, 1753, 1653, 1553, 1853, 1953,1753, 1653 ], [1743, 1653, 1553, 1853, 1953, 1743, 1653, 1553, 1853, 1953, 1657, 1564]],
      overall: [45122, 175072]
    },
    salesReport: {
      today: [140, 727],
      week: [[3135, 4564, 5645, 3287], [2552, 4536, 5434, 2645]],
      month: [[1753, 1653, 1553, 1853, 1953, 1753, 1653, 1553, 1853, 1953,1753, 1653 ], [1743, 1653, 1553, 1853, 1953, 1743, 1653, 1553, 1853, 1953, 1657, 1564]],
      overall: [45122, 175072]
    },
    retrurnReport: {
      today: [140, 727],
      week: [[3135, 4564, 5645, 3287], [2552, 4536, 5434, 2645]],
      month: [[1753, 1653, 1553, 1853, 1953, 1753, 1653, 1553, 1853, 1953,1753, 1653 ], [1743, 1653, 1553, 1853, 1953, 1743, 1653, 1553, 1853, 1953, 1657, 1564]],
      overall: [45122, 175072]
    },
    pendingReport: {
      today: [140, 727],
      week: [[3135, 4564, 5645, 3287], [2552, 4536, 5434, 2645]],
      month: [[1753, 1653, 1553, 1853, 1953, 1753, 1653, 1553, 1853, 1953,1753, 1653 ], [1743, 1653, 1553, 1853, 1953, 1743, 1653, 1553, 1853, 1953, 1657, 1564]],
      overall: [45122, 175072]
    },
    ordersSelectedTimeline: 'today',
    salesSelectedTimeline: 'today',
    returnSelectedTimeline: 'today',
    pendingSelectedTimeline: 'today',
  });
  const { ordersReport, ordersSelectedTimeline, salesReport, retrurnReport, pendingReport, salesSelectedTimeline, returnSelectedTimeline, pendingSelectedTimeline } = state;

  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <ReportBarChart title='Orders' isTimelineChange={(timeline) => {setState({...state, ordersSelectedTimeline: timeline})}} dataset={ordersReport[ordersSelectedTimeline]} />
        </Col>

        <Col span={12}>
          <ReportBarChart title='Sales' isTimelineChange={(timeline) => {setState({...state, salesSelectedTimeline: timeline})}} dataset={salesReport[salesSelectedTimeline]} />
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <ReportBarChart title='Return' isTimelineChange={(timeline) => {setState({...state, returnSelectedTimeline: timeline})}} dataset={retrurnReport[returnSelectedTimeline]} />
        </Col>

        <Col span={12}>
          <ReportBarChart title='Pending' isTimelineChange={(timeline) => {setState({...state, pendingSelectedTimeline: timeline})}} dataset={pendingReport[pendingSelectedTimeline]} />
        </Col>
      </Row>
    </>
  );
};

export default WalmartComparisonReports;
