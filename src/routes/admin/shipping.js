import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AddBags = lazy(() => import('../../CRMPages/Shipping/AddBags'));
//const AddTicket = lazy(() => import('../../CRMPages/Tickets/AddTicket'));

// const CreateTicket = lazy(() => import('../../CRMPages/Tickets/CreateTicket'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    
    <Switch>
      <Route exact path={`${path}`} component={AddBags} />

   
      {/* <Route path={`${path}/createTicket`} component={CreateTicket} /> */}
    </Switch>
    
    
  );
};

export default ProjectRoutes;
