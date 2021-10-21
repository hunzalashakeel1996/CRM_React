import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewAllMPShipment = lazy(() => import('../../CRMPages/OrderReportForLabel/AllMPShipment/ViewAllMPShipment'));
const ViewWeborder = lazy(() => import('../../CRMPages/OrderReportForLabel/Weborder/ViewWeborder'));


const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/AllMPShipment`} component={ViewAllMPShipment} />
      <Route exact path={`${path}/WebOrder`} component={ViewWeborder} />
    
    </Switch>
  );
};

export default ProjectRoutes;
