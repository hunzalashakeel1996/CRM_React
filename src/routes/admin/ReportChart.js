import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewTickets = lazy(() => import('../../CRMPages/Tickets/ViewTickets'));
const AddTicket = lazy(() => import('../../CRMPages/Tickets/AddTicket'));
const AddReminder = lazy(() => import('../../CRMPages/Reminders/AddReminder'));
const TicketDetails = lazy(() => import('../../CRMPages/Tickets/TicketDetails'));
const ViewReminders = lazy(() => import('../../CRMPages/Reminders/ViewReminders'));
// const CreateTicket = lazy(() => import('../../CRMPages/Tickets/CreateTicket'));
import ComparisonReportView from './../../CRMPages/Dashboard/ComparisonReport/ComparisonReportView';
import WelcomePage from './../../CRMPages/Dashboard/WelcomePage/WelcomePage';
import NotFoundPage from './../../CRMPages/NotFoundPage/NotFoundPage';

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>

      {/* <Route exact path={`${path}`} component={ JSON.parse(JSON.parse(localStorage.getItem('userRole'))[0].top_navigation).Dashboard.includes('Comparison Report') ? ComparisonReportView : WelcomePage} /> */}
      <Route exact path={`${path}`} component={WelcomePage} />
      <Route exact path={`${path}/comparisonGraph`} component={ComparisonReportView} />
      <Route exact path={`${path}/welcomePage`} component={WelcomePage} />
      
    </Switch>
  );
};

export default ProjectRoutes;
//