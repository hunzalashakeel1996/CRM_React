import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewReportPNLWeb = lazy(() => import('../../CRMPages/Dashboard/PNLWeb/ViewReportPNLWeb'));
const OrderPNL = lazy(() => import('../../CRMPages/Dashboard/PNLWeb/overview/OrderPNL'));
const ItemPNL = lazy(() => import('../../CRMPages/Dashboard/PNLWeb/overview/ItemPNL'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/ViewReportPNLWeb`} component={ViewReportPNLWeb} />
      <Route exact path={`${path}/OrderPNL`} component={OrderPNL} />
      <Route exact path={`${path}/ItemPNL`} component={ItemPNL} />

    </Switch>
  );
};

export default ProjectRoutes;
