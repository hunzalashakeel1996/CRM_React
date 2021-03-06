import React, { useState } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification, {askNotification} from './notification';
import Settings from './settings';
import Support from './support';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';

import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import firebase from '../../../firebase';
import { useHistory } from "react-router-dom";
import { logoutAPI } from '../../../redux/apis/DataAction';

const AuthInfo = ({ rtl }) => {
  const dispatch = useDispatch();
  let user = useSelector(state => state.auth.login);
  const history = useHistory();

  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = async e => {
    // Notification.requestPermission().then(permission => {
    //   setState({ ...state, loader: true })
        // logoutUser(data)
      if (await askNotification() == 'granted') {
        console.log('inse1')
        firebase.messaging().getToken().then(token => {
          let data = {token, LoginName: user.LoginName}
          logoutUser(data)
        })
      }
      else{
        console.log('inse2')
          let data = {token: 'not provided', LoginName: user.LoginName}
          logoutUser(data)
      }
    // })
    
  };

  const logoutUser = (data) => {
    dispatch(logoutAPI(data)).then(res => {
      // console.log('logout',res);
      localStorage.removeItem('user')
      localStorage.removeItem('userRole')
      window.location.reload(); 
    })
  }

  const userContent = (
    <UserDropDwon>
      <div style={{width: 1000}} className="user-dropdwon">
        <figure className="user-dropdwon__info">
          {/* <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" /> */}
          <figcaption>
            <Heading as="h5">{`${user.FirstName} ${user.LastName}`}</Heading>
          </figcaption>
        </figure>
        {/* <ul className="user-dropdwon__links">
          <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul> */}
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = value => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle('english')} to="#">
        <img src={'/static/img/flag/english.png'} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('germany')} to="#">
        <img src={'/static/img/flag/germany.png'} alt="" />
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('spain')} to="#">
        <img src={'/static/img/flag/spain.png'} alt="" />
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('turky')} to="#">
        <img src={'/static/img/flag/turky.png'} alt="" />
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      {/* <Message /> */}
      <Notification />

      {/* <Settings /> */}
      {/* <Support /> */}
      {/* <div className="nav-author">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="head-example">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div> */}

      <div className="nav-author" >
        <Popover  placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
