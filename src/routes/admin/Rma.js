import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const RMAView = lazy(() => import('../../CRMPages/RMA/RMAView'));
const RMANotes = lazy(() => import('../../CRMPages/RMA/RMANotes'));
const RMAMonthlyReport = lazy(() => import('../../CRMPages/RMA/RMAMonthlyReport'));


const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/rmaupdates`} component={RMAView} />
      <Route exact path={`${path}/rmanotes`} component={RMANotes} />
      <Route exact path={`${path}/rmamonthlyreport`} component={RMAMonthlyReport} />

    </Switch>
  );
};

export default ProjectRoutes;
