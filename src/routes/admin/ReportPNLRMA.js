import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewPNLRMA = lazy(() => import('../../CRMPages/Dashboard/PNLRMA/ViewPNLRMA'));
const RMAQty = lazy(() => import('../../CRMPages/Dashboard/PNLRMA/overview/RMAQty'));
const ReplecmentOrder = lazy(() => import('../../CRMPages/Dashboard/PNLRMA/overview/ReplecmentOrder'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/ViewPNLRMA`} component={ViewPNLRMA} />
      <Route exact path={`${path}/ReportRMAQty`} component={RMAQty} />
      <Route exact path={`${path}/ReplecmentOrder`} component={ReplecmentOrder} />

    </Switch>
  );
};

export default ProjectRoutes;
