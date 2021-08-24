import './static/css/style.css';

import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ProtectedRoute from './components/utilities/protectedRoute';
import config from './config/config';
import firebase from './firebase';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import { connectSocket } from './redux/socket/socketAction';
import { setHeaderWithWebToken, getDepartsAPI,getVendorName, getPolyBags } from './redux/apis/DataAction';
// import { getVendorName } from './redux/apis/DataAction';
import { addDepart,addVendorName } from './redux/ticket/actionCreator';

// eslint-disable-next-line import/no-extraneous-dependencies
const { theme } = config;


const ProviderConfig = () => {
  const dispatch = useDispatch();
  const { rtl, user, topMenu, darkMode, socket } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      user: state.auth.login,
      socket: state.socket.socket
    };
  });

  const [path, setPath] = useState(window.location.pathname);
  const [socketTemp, setSocket] = useState(socket === null ? null : socket);
  //aa
  useEffect(() => {
    // connectSocket(user.LoginID)
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }//
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  useEffect(() => {
    Notification.requestPermission(result => {
      if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(async (reg) => {
          // let a = await messaging.getToken({vapidKey: "BJ6G0B9lW13RHZhpALupcHOBMybQTKiflLxRAle4bxQNUYrP8mQfY5poWNBfP7mrMMxkzU5stnUizBp9LkC-CjY"})
          // // console.log('aaadsfd', a)
          let title = 'Reminder from CRM';
          let body = 'Provide details to Paul on skype';
          if (reg)
            // reg.showNotification(title, { body: body });
            // const msg = firebase.messaging();
            firebase.messaging().getToken()
            .then(token => {
              // console.log('token', token)
            })
        });
      }
    });

    // timeout logic so taht multiple sockets not created 
    setTimeout(() => {
      (socket === null && user !== null) &&dispatch(connectSocket(user.LoginID))
    }, 4000);

    Promise.all([dispatch(getDepartsAPI()), getPolyBags(""),localStorage.getItem('user')&&dispatch(getVendorName({}))]).then(data=>{
      // console.log('cehjcig', data)
      dispatch(addDepart(data[0]) )
      data[2] && dispatch(addVendorName(data[2][0]))
      // console.log('asdasdsa0', data)
    })

    // dispatch(getDepartsAPI({})).then(departs => {
    //   dispatch(addDepart(departs))
    //   // setState({ ...state, departs, loader: false  });
    // })
    // dispatch(getVendorName({})).then(departs => {
    //   // console.log('aaaa', departs)
    //   dispatch(addVendorName(departs[0]))
    //   // setState({ ...state, departs, loader: false  });
    // })
    // get vendor api

    
    // setHeaderWithWebToken()
  }, []);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
        <Router basename={process.env.PUBLIC_URL}>
          {user=== null? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
            {user && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
              <Redirect to="/admin" />
            )}
        </Router>
        {/* </ReactReduxFirebaseProvider> */}
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
