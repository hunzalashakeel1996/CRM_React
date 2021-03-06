import React, { Suspense, lazy, useEffect } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import Tickets from './tickets';
import ReportChart from './ReportChart';
import Azab from './azab'
import Inventory from './Inventory'
import withAdminLayout from '../../layout/withAdminLayout';
import Orders from './Orders'
import Sales from './Sales'
import Shipping from './shipping'
import RMA from './Rma'
import PUStyles from './PUStyles'
import Chatbot from './Chatbot'
import UserManagement from './UserManagement'
import CustomerSupport from './CustomerSupport'
import Reporting from './Reporting'
import ReportPNL from './ReportPNL'
import ReportPNLWeb from './ReportPNLWeb'
import ReportPNLMP from './ReportPNLMP'
import ReportPNLRMA from './ReportPNLRMA'
import StyleChart from './StyleChart'
import PNLOverAll from './PNLOverAll'
import ReportOrderStatus from './ReportOrderStatus'
import OrderReportForLabel from './OrderReportForLabel'
import PUApp from './PUApp'

import ComparisonReportView from './../../CRMPages/Dashboard/ComparisonReport/ComparisonReportView';
import NotFoundPage from '../../CRMPages/NotFoundPage/NotFoundPage';

const Admin = () => {
  const { path } = useRouteMatch();


  // const Tickets = () => import('./tickets')
  return (
      <Switch>

        <Suspense
          fallback={
            <div className="spin">
              <Spin />
            </div>
          }
        >
          <Route path={path} component={ReportChart} />
          <Route path={`${path}/graph`} component={ReportChart} />
          <Route path={`${path}/ticket`} component={Tickets} />
          <Route path={`${path}/azab`} component={Azab} />
          <Route path={`${path}/inventory`} component={Inventory} />
          <Route path={`${path}/orders`} component={Orders} />
          <Route path={`${path}/sales`} component={Sales} />
          <Route path={`${path}/shipping`} component={Shipping} />
          <Route path={`${path}/rma`} component={RMA} />
          <Route path={`${path}/puStyles`} component={PUStyles} />
          <Route path={`${path}/chatbot`} component={Chatbot} />
          <Route path={`${path}/userManagement`} component={UserManagement} />
          <Route path={`${path}/customerSupport`} component={CustomerSupport} />
          <Route path={`${path}/reporting`} component={Reporting} />
          <Route path={`${path}/PNL`} component={ReportPNL} />
          <Route path={`${path}/ReportPNLWeb`} component={ReportPNLWeb} />
          <Route path={`${path}/ReportPNLMP`} component={ReportPNLMP} />
          <Route path={`${path}/ReportPNLRMA`} component={ReportPNLRMA} />
          <Route path={`${path}/PNLOverAll`} component={PNLOverAll} />
          <Route path={`${path}/ReportOrderStatus`} component={ReportOrderStatus} />
          <Route path={`${path}/styleChart`} component={StyleChart} />
          <Route path={`${path}/NotFoundPage`} component={NotFoundPage} />
          <Route path={`${path}/orderreportforlabel`} component={OrderReportForLabel} />
          <Route path={`${path}/PUApp`} component={PUApp} />

          {/* <Redirect to="/admin" /> */}
          {/* <Route path="*" >
            <NotFoundPage />
        </Route> */}
        </Suspense>
       
      </Switch>
  );
};

export default withAdminLayout(Admin);