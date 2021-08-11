import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewReportPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/ViewReportPNL'));
const detailPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/DetailPNL'));
const itemPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/ItemPNL'));
const orderPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/OrderPNL'));
const pricePNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/PricePNL'));


const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/ViewReportPNL`} component={ViewReportPNL} />
      <Route exact path={`${path}/detailPNL`} component={detailPNL} />
      <Route exact path={`${path}/itemPNL`} component={itemPNL} />
      <Route exact path={`${path}/orderPNL`} component={orderPNL} />
      <Route exact path={`${path}/pricePNL`} component={pricePNL} />

    </Switch>
  );
};

export default ProjectRoutes;
