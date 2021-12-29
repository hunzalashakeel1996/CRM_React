import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewReportOrderstatus = lazy(() => import('../../CRMPages/Dashboard/PNLOrderStatus/ViewReportOrderstatus'));
const PNLOrderStatus = lazy(() => import('../../CRMPages/Dashboard/PNLOrderStatus/overview/PNLOrderStatus'));


const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
        <Route exact path={`${path}/ViewReportOrderstatus`} component={ViewReportOrderstatus} />
        <Route exact path={`${path}/PNLOrderStatus`} component={PNLOrderStatus} />

    </Switch>
  );
};

export default ProjectRoutes;
