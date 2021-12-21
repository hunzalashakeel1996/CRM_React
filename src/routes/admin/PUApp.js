import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const ViewBanners = lazy(() => import('../../CRMPages/PUApp/Banners/ViewBanners'));
const ViewOffers = lazy(() => import('../../CRMPages/PUApp/Offers/ViewOffers'));
const ViewCoupons = lazy(() => import('../../CRMPages/PUApp/Coupons/ViewCoupons'));
const ViewSort = lazy(() => import('../../CRMPages/PUApp/Sort/ViewSort'));
const ViewShipping = lazy(() => import('../../CRMPages/PUApp/Shipping/ViewShipping'));

const PUApp = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/banners`} component={ViewBanners} />
      <Route exact path={`${path}/offers`} component={ViewOffers} />
      <Route exact path={`${path}/coupons`} component={ViewCoupons} />
      <Route exact path={`${path}/sort`} component={ViewSort} />
      <Route exact path={`${path}/shipping`} component={ViewShipping} />
    </Switch>
  );
};

export default PUApp;
