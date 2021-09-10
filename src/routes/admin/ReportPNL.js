import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewReportPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/ViewReportPNL'));
const detailPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/DetailPNL'));
const ItemPNLSummary = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/ItemPNLSummary'));
const OrderPNLSummary = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/OrderPNLSummary'));
const PricePNLSummary = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/PricePNLSummary'));
const OrderPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/OrderPNL'));
const ItemPNL = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/ItemPNL'));
const SummaryDetails = lazy(() => import('../../CRMPages/Dashboard/PNL/overview/SummaryDetails'));
const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/ViewReportPNL`} component={ViewReportPNL} />
      <Route exact path={`${path}/detailPNL`} component={detailPNL} />
      <Route exact path={`${path}/ItemPNLSummary`} component={ItemPNLSummary} />
      <Route exact path={`${path}/OrderPNLSummary`} component={OrderPNLSummary} />
      <Route exact path={`${path}/PricePNLSummary`} component={PricePNLSummary} />
      <Route exact path={`${path}/OrderPNL`} component={OrderPNL} />
      <Route exact path={`${path}/ItemPNL`} component={ItemPNL} />
      <Route exact path={`${path}/SummaryDetails/:vendorname/:startDate/:endDate/:dateFormat/:ORDERTYPE/:Value`} component={SummaryDetails} />

    </Switch>
  );
};

export default ProjectRoutes;
