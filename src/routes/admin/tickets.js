import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ViewTickets = lazy(() => import('../../CRMPages/Tickets/ViewTickets'));
const AddTicket = lazy(() => import('../../CRMPages/Tickets/AddTicket'));
const AddReminder = lazy(() => import('../../CRMPages/Reminders/AddReminder'));
const TicketDetails = lazy(() => import('../../CRMPages/Tickets/TicketDetails'));
const ViewReminders = lazy(() => import('../../CRMPages/Reminders/ViewReminders'));
// const CreateTicket = lazy(() => import('../../CRMPages/Tickets/CreateTicket'));

const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={ViewTickets} />
      <Route exact path={`${path}/viewTickets`} component={ViewTickets} />
      <Route exact path={`${path}/addTicket`} component={AddTicket} />
      <Route exact path={`${path}/addReminder`} component={AddReminder} />
      <Route path={`${path}/ticketDetails/:id`} component={TicketDetails} />
      <Route exact path={`${path}/viewReminders`} component={ViewReminders} />
      <Route exact path={`${path}/viewReminders/:ReminderID`} component={ViewReminders} />
      {/* <Route path={`${path}/createTicket`} component={CreateTicket} /> */}
    </Switch>
  );
};

export default ProjectRoutes;
