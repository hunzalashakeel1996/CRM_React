import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const OverAllSummary = lazy(() => import('../../CRMPages/Dashboard/PNLOverAll/overview/OverAllSummary'));
const ProfitBeforePPS = lazy(() => import('../../CRMPages/Dashboard/PNLOverAll/overview/ProfitBeforePPS'));
const ViewReportPNLOverAll = lazy(() => import('../../CRMPages/Dashboard/PNLOverAll/ViewReportPNLOverAll'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
        <Route exact path={`${path}/ViewReportPNLOverAll`} component={ViewReportPNLOverAll} />
      <Route exact path={`${path}/OverAllSummary`} component={OverAllSummary} />
      <Route exact path={`${path}/ProfitBeforePPS`} component={ProfitBeforePPS} />

    </Switch>
  );
};

export default ProjectRoutes;
