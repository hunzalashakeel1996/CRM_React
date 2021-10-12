import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const StyleChartTool = lazy(() => import('../../CRMPages/StyleChartTool/StyleChartToolView'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={StyleChartTool} />
      <Route exact path={`${path}/customStyleSheet`} component={StyleChartTool} />
    </Switch>
  );
};

export default ProjectRoutes;
