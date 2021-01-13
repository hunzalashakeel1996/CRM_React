import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ReportsView = lazy(() => import('../../CRMPages/Sales/Reports/ReportsView'));
const BalanceSheetView = lazy(() => import('../../CRMPages/Sales/BalanceSheet/BalanceSheetView'));
const OtherReportsView = lazy(() => import('../../CRMPages/Sales/OtherReports/OtherReportsView'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={ReportsView} />
      <Route exact path={`${path}/reports`} component={ReportsView} />
      <Route exact path={`${path}/otherReports`} component={OtherReportsView} />
      <Route exact path={`${path}/balanceSheet`} component={BalanceSheetView} />
    </Switch>
  );
};

export default ProjectRoutes;
