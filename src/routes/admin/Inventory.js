import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const VendorInventoryView = lazy(() => import('../../CRMPages/Inventory/VendorInventory/VendorInventoryView'));
const UpdateInventoryView = lazy(() => import('../../CRMPages/Inventory/UpdateInventory/UpdateInventoryView'));
const MarketplaceGroupInventoryView = lazy(() => import('../../CRMPages/Inventory/MarketplaceGroupInventory/MarketplaceGroupInventoryView'));
const MarketplaceInventoryView = lazy(() => import('../../CRMPages/Inventory/MarketplaceInventory/MarketplaceInventoryView'));
const GoogleMarketPlace = lazy(() => import('../../CRMPages/Inventory/GoogleMarketPlace/GoogleMarketPlace'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={VendorInventoryView} />
      <Route exact path={`${path}/vendorInventory`} component={VendorInventoryView} />
      <Route exact path={`${path}/updateInventory`} component={UpdateInventoryView} />
      <Route exact path={`${path}/marketplaceGroupInventory`} component={MarketplaceGroupInventoryView} />
      <Route exact path={`${path}/marketplaceInventory`} component={MarketplaceInventoryView} />
      <Route exact path={`${path}/googleMarketPlace`} component={GoogleMarketPlace} />
      {/* <Route path={`${path}/createTicket`} component={CreateTicket} /> */}
    </Switch>
  );
};

export default ProjectRoutes;
