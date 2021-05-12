import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewTickets = lazy(() => import('../../CRMPages/Tickets/ViewTickets'));
const AddTicket = lazy(() => import('../../CRMPages/Tickets/AddTicket'));
const AddReminder = lazy(() => import('../../CRMPages/Reminders/AddReminder'));
const TicketDetails = lazy(() => import('../../CRMPages/Tickets/TicketDetails'));
const ViewReminders = lazy(() => import('../../CRMPages/Reminders/ViewReminders'));
// const CreateTicket = lazy(() => import('../../CRMPages/Tickets/CreateTicket'));
import ComparisonReportView from './../../CRMPages/Dashboard/ComparisonReport/ComparisonReportView';

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={ComparisonReportView} />
      <Route exact path={`${path}/comparisonGraph`} component={ComparisonReportView} />
    </Switch>
  );
};

export default ProjectRoutes;
