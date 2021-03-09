import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AmazonShipmentView = lazy(() => import('../../CRMPages/Shipping/AmazonShipment/AmazonShipmentView'));
const EndiciaShipmentView = lazy(() => import('../../CRMPages/Shipping/EndiciaShipment/EndiciaShipmentView'));
const PolyBagsAndThermalLabelsView = lazy(() => import('../../CRMPages/Shipping/PolyBagsAndThermalLabels/PolyBagsAndThermalLabelsView'));
const ManualShipmentView = lazy(() => import('../../CRMPages/Shipping/ManualShipment/ManualShipmentView'));
const ShippingReportsView = lazy(() => import('../../CRMPages/Shipping/ShippingReports/ShippingReportsView'));
const ShippingWeightView = lazy(() => import('../../CRMPages/Shipping/ShippingWeight/ShippingWeightView'));
const ShippingNotesView = lazy(() => import('../../CRMPages/Shipping/ShippingNotes/ShippingNotesView'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={PolyBagsAndThermalLabelsView} />
      <Route exact path={`${path}/polyBagsAndThermalLabels`} component={PolyBagsAndThermalLabelsView} />
      <Route exact path={`${path}/amazonShipment`} component={AmazonShipmentView} />
      <Route exact path={`${path}/endiciaShipment`} component={EndiciaShipmentView} />
      <Route exact path={`${path}/manualShipment`} component={ManualShipmentView} />
      <Route exact path={`${path}/shippingReports`} component={ShippingReportsView} />
      <Route exact path={`${path}/shippingWeight`} component={ShippingWeightView} />
      <Route exact path={`${path}/shippingNotes`} component={ShippingNotesView} />
    </Switch>
  );
};

export default ProjectRoutes;
