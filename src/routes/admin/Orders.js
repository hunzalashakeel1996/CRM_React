import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const MarketplaceOrdersView = lazy(() => import('../../CRMPages/Orders/MarketplaceOrders/MarketplaceOrdersView'));
const OrderReportsView = lazy(() => import('../../CRMPages/Orders/OrderReports/OrderReportsView'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={MarketplaceOrdersView} />
      <Route exact path={`${path}/marketplaceOrders`} component={MarketplaceOrdersView} />
      <Route exact path={`${path}/orderReports`} component={OrderReportsView} />
    </Switch>
  );
};

export default ProjectRoutes;
