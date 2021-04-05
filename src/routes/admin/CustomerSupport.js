import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const CustomerSupportView = lazy(() => import('../../CRMPages/CustomerSupport/CustomerSupportView'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={CustomerSupportView} />
      <Route exact path={`${path}/emailTemplate`} component={CustomerSupportView} />
   
    </Switch>
  );
};

export default ProjectRoutes;
