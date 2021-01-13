import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewPUUpdateInventory = lazy(() => import('../../CRMPages/Inventory/PUUpdateInventory/ViewPUUpdateInventory'));
const ViewVendorinventory = lazy(() => import('../../CRMPages/Inventory/Vendorinventory/ViewVendorinventory'));
const Vieweditinventory = lazy(() => import('../../CRMPages/Inventory/EditInventory/Vieweditinventory'));
//const AddTicket = lazy(() => import('../../CRMPages/Tickets/AddTicket'));
const ViewAzabReport = lazy(() => import('../../CRMPages/Azab/ViewAzabReport'));

// const CreateTicket = lazy(() => import('../../CRMPages/Tickets/CreateTicket'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
        {/* UPDATE INVENTORY  */}
      <Route exact path={`${path}/PUUpdateInventory`} component={ViewPUUpdateInventory} />
      <Route exact path={`${path}/PUUpdateInventory/ViewPUUpdateInventory`} component={ViewPUUpdateInventory} />
      <Route exact path={`${path}/Vendorinventory/ViewVendorinventory`} component={ViewVendorinventory} />
      <Route exact path={`${path}/EditInventory/Vieweditinventory`} component={Vieweditinventory} />
      {/* ADD INVENTORY  */}
      {/* <Route exact path={`${path}/PUAddInventory/ViewPUUpdateInventory`} component={ViewAzabReport} /> */}
   
      {/* <Route path={`${path}/createTicket`} component={CreateTicket} /> */}
    </Switch>
  );
};

export default ProjectRoutes;
