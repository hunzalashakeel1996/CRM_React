import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Tickets from './tickets';
import withAdminLayout from '../../layout/withAdminLayout';
import Azab from './azab'
import Inventory from './Inventory'
import Orders from './Orders'
import Sales from './Sales'
import Shipping from './Shipping'
import PUStyles from './PUStyles'
import Chatbot from './Chatbot'

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
        <Route path={`${path}/inventory`} component={Inventory} />
        <Route path={`${path}/orders`} component={Orders} />
        <Route path={`${path}/sales`} component={Sales} />
        <Route path={`${path}/shipping`} component={Shipping} />
        <Route path={`${path}/puStyles`} component={PUStyles} />
        <Route path={`${path}/chatbot`} component={Chatbot} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
