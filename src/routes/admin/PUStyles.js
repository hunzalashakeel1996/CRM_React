import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const StylesNotInPUView = lazy(() => import('../../CRMPages/PUStyles/StylesNotInPU/StylesNotInPUView'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={StylesNotInPUView} />
      <Route exact path={`${path}/stylesNotInPU`} component={StylesNotInPUView} />
    </Switch>
  );
};

export default ProjectRoutes;
