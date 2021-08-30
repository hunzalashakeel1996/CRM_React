import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewReportPNLMP = lazy(() => import('../../CRMPages/Dashboard/PNLMP/ViewReportPNLMP'));
const OrderPNL = lazy(() => import('../../CRMPages/Dashboard/PNLMP/overview/OrderPNL'));
const ItemPNL = lazy(() => import('../../CRMPages/Dashboard/PNLMP/overview/ItemPNL'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/ViewReportPNLMP`} component={ViewReportPNLMP} />
      <Route exact path={`${path}/OrderPNL`} component={OrderPNL} />
      <Route exact path={`${path}/ItemPNL`} component={ItemPNL} />

    </Switch>
  );
};

export default ProjectRoutes;
