import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AddNewUsersView = lazy(() => import('../../CRMPages/UserManagement/AddNewUsers'));
const ManageUsersView = lazy(() => import('../../CRMPages/UserManagement/ManageUsers'));
const UserRights = lazy(() => import('../../CRMPages/UserManagement/UserRights'));
const AddNavigationTab = lazy(() => import('../../CRMPages/UserManagement/AddNavigationTab'));


const ProjectRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      
      <Route exact path={`${path}/addNewUsers`} component={AddNewUsersView} />
      <Route exact path={`${path}/manageUser`} component={ManageUsersView} />
      <Route exact path={`${path}/AddNavigationTab`} component={AddNavigationTab} />
      <Route exact path={`${path}/userRights/:id`} component={UserRights} />


    </Switch>
  );
};

export default ProjectRoutes;
