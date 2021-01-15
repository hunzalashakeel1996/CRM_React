import { Badge, Col, Row, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import AllContacts from './overview/AllContacts';
import GroupChat from './overview/GroupChat';
import PrivetChat from './overview/PrivetChat';
import { ChatSidebar, Content, UL } from './style';

const SingleChat = lazy(() => import('./overview/singleChat'));
const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));
import { Widget, addResponseMessage } from 'react-chat-widget';
 
import 'react-chat-widget/lib/styles.css';

const ChatApp = ({ match }) => {
  let user = useSelector(state => state.auth.login);
  let socket = useSelector(state => state.socket.socket);

    // sockets
    socket ? socket.onmessage = (data) => {
      let message = JSON.parse(data.data)
      console.log('123', message.data)
      if (message.reason === 'chatbotReply') {

        message.data.length>0 ?  addResponseMessage(message.data[0].orderstatus) : addResponseMessage("Sorry, can't find your order")
      }
    } : null

  const handleNewUserMessage = (newMessage) => {
    console.log('inside', socket)
    socket && socket.send(JSON.stringify({ type: 'chatbot', reason: 'userMessage', data: {newMessage}}))
  }

  return (
    <>
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="PU Chat"
          subtitle=""
        />
      </div>
    </>
  );
};

ChatApp.propTypes = {
  match: PropTypes.object,
};

export default ChatApp;
