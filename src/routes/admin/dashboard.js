import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import Tickets from './tickets';

const Dashboard = lazy(() => import('../../container/dashboard'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* <Route exact path={path} component={Dashboard} /> */}
      {/* <Route path={`${path}/social`} component={Dashboard} /> */}
      <Route path={`${path}/ticket`} component={Tickets} />
    </Switch>
  );
};

export default DashboardRoutes;
