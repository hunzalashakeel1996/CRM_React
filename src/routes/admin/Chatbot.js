import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Chatbot = lazy(() => import('../../CRMPages/Chatbot/Chatbot'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={Chatbot} />
      <Route exact path={`${path}/chat`} component={Chatbot} />
   
      {/* <Route path={`${path}/createTicket`} component={CreateTicket} /> */}
    </Switch>
  );
};

export default ProjectRoutes;
