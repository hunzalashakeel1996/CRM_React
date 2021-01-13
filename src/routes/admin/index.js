import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Tickets from './tickets';
import Azab from './azab'
import Inventory from './Inventory'
import withAdminLayout from '../../layout/withAdminLayout';

const Admin = () => {
  const { path } = useRouteMatch();
  // const Tickets = () => import('./tickets')

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Tickets} />
        <Route path={`${path}/ticket`} component={Tickets} />
        <Route path={`${path}/azab`} component={Azab} />
        <Route path={`${path}/Inventory`} component={Inventory} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
